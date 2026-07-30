# Dragon Realm Adventure

Dragon Realm Adventure adalah RPG turn-based berbasis browser dengan seluruh gameplay di dalam satu file HTML dan Service Worker kecil untuk dukungan offline. Jelajahi empat area, lawan monster dan boss, kumpulkan equipment dengan rarity berbeda, selesaikan quest, lalu bangun karakter lintas World Reset.

Tidak ada framework, dependency, proses build, atau backend. Cukup buka game di browser modern.

## Fitur utama

- Pertarungan turn-based dengan serangan biasa, magic strike, HP/MP potion dari inventory, dan flee.
- 28 monster biasa dan 12 boss dari level rendah hingga level 100.
- Ability monster: Heavy Strike, Venom, Mana Burn, Regeneration, dan Life Drain.
- Empat area: Whispering Woods, Ashen Caverns, Wyrmspire Ruins, dan Dragon's Crown.
- Slot equipment mencakup Right Hand, Left Hand untuk off-hand/shield, Two-Handed Weapon, Body Armor, Helmet, Bottom, Shoes, serta dua accessory.
- Rarity dinamis dari Common hingga Legendary; item dengan nama dasar yang sama dapat memiliki rarity dan bonus stat berbeda.
- Shop untuk membeli dan menjual item, lengkap dengan deskripsi dan harga yang menyesuaikan World Tier.
- Blacksmith untuk meningkatkan seluruh stat yang dimiliki equipment hingga `+5`.
- Tavern dengan tiga tawaran quest persisten dan cooldown refresh satu jam.
- Quest tier Bronze, Silver, Gold, Mythic, dan Primordial.
- Origin Stats acak yang membuat setiap karakter baru memiliki atribut awal berbeda.
- Title permanen dari title quest dan boss. Semua title yang terbuka aktif secara akumulatif.
- World Reset mulai level 100 dengan bonus stat permanen dan tingkat kesulitan yang terus meningkat.
- Save migration untuk mempertahankan kompatibilitas dengan save versi lama.
- Autosave setiap 30 detik, manual save/load, dan keyboard shortcut.
- Offline cache dan pemulihan lifecycle untuk Chrome mobile.

## Mulai bermain

### Cara paling cepat

Unduh repository ini, lalu buka [`index.html`](./index.html) menggunakan browser modern seperti Chrome, Edge, atau Firefox.

### Menjalankan melalui local server

Local server direkomendasikan agar perilaku browser sama dengan versi yang nanti di-host.

```bash
python -m http.server 8000
```

Kemudian buka:

```text
http://localhost:8000/
```

Alternatifnya, gunakan extension seperti Live Server di Visual Studio Code.

> [!IMPORTANT]
> Data permainan disimpan di `localStorage` browser dengan key `dragonRealmSave`. Save terikat pada browser, perangkat, dan alamat halaman yang digunakan. Menghapus site data atau berpindah origin dapat membuat save lama tidak terlihat.

### Bermain offline

Versi yang di-host dapat dibuka kembali tanpa jaringan setelah offline cache selesai disiapkan:

1. Buka game dalam kondisi online.
2. Tunggu halaman selesai dimuat.
3. Setelah itu, game dapat dibuka kembali ketika Chrome berada dalam airplane mode.

Service Worker menyimpan halaman game, sedangkan save tetap berada di `localStorage`. Ketika Chrome mobile membekukan atau membuang tab dari memori, game akan memuat halaman dari offline cache dan memulihkan UI dari save lokal.

> [!NOTE]
> Setelah deployment versi baru, buka game online setidaknya satu kali agar cache offline menerima versi terbaru. Mode offline tidak tersedia ketika `index.html` dibuka langsung melalui protokol `file://`, tetapi file lokal itu sendiri tetap dapat dijalankan tanpa jaringan.

## Alur permainan

1. Tentukan nama karakter dan dapatkan Origin Stats.
2. Jelajahi dungeon untuk mencari monster.
3. Menangkan pertarungan untuk memperoleh EXP, gold, loot, dan kemungkinan blacksmith ore.
4. Gunakan Tavern untuk mengambil quest dan Shop untuk mengelola item.
5. Pasang serta upgrade equipment agar siap menghadapi boss level tinggi.
6. Capai level 100 dan lakukan World Reset untuk memperkuat karakter secara permanen.
7. Kejar title yang bertahan melewati World Reset.

## Sistem penting

### Origin Stats

Karakter baru memperoleh delapan token stat acak di atas fondasi `90 HP`, `40 MP`, `8 ATK`, dan `3 DEF`. Token HP/MP bernilai `+5`, sedangkan token ATK/DEF bernilai `+1`. Origin ditentukan oleh alokasi yang paling dominan: Vitalborn untuk HP, Aetherborn untuk MP, Warborn untuk ATK, Ironborn untuk DEF, dan Versatile ketika alokasi tertinggi berimbang.

`Legacy` bukan jenis origin pemain. Label tersebut sebelumnya hanya menjadi fallback save lama. Save yang kehilangan label origin kini meminta pemulihan satu kali; pemain memilih kembali nama origin sebelumnya tanpa mengubah statistik atau progres. Jika data alokasi masih tersedia, nama origin dipulihkan secara otomatis.

### Equipment dan Blacksmith

Equipment dapat meningkatkan ATK, DEF, HP, dan MP. Weapon atau gear lain yang memiliki lebih dari satu bonus stat akan meningkatkan seluruh bonus tersebut ketika upgrade berhasil.

Right Hand menerima seluruh weapon satu tangan. Left Hand menerima shield atau weapon ringan yang memiliki kompatibilitas off-hand; weapon main-hand-only tidak dapat dipasang di sana. Weapon dua tangan memakai kedua tangan sekaligus: memasangnya otomatis melepas weapon kanan dan kiri, sedangkan memasang shield atau weapon satu tangan akan melepas weapon dua tangan. Kontribusi ATK weapon dua tangan dikalikan `×1,5`, tetapi statistiknya hanya dihitung satu kali.

Bow membutuhkan satu Arrow untuk setiap Normal Attack atau Magic Strike. Shop menjual paket berisi 10 Arrow dan inventory menampilkannya sebagai stack. Ketika Arrow habis, bow tidak memberikan bonus ATK sehingga serangan memakai kekuatan karakter tanpa weapon. Format ammo sudah menyimpan jenis serta efek Arrow standar sebagai fondasi crafting Arrow berefek pada pengembangan Blacksmith berikutnya.

Tersedia tujuh basis bow: Hunter Bow, Recurve Bow, Ironwood Warbow, Arcane Longbow, Stormcaller Bow, Dragonwing Bow, dan Celestial Starbow. Hanya Hunter Bow yang dijual di Shop; enam bow lainnya diperoleh melalui loot atau reward quest sesuai tier. Setiap basis bow tetap dapat memiliki rarity dan hasil upgrade yang berbeda.

Armor kini khusus slot tubuh. Katalog defensif menyediakan 10 shield, 13 body armor, 10 helmet, 10 bottom, dan 10 shoes dari common hingga legendary. Setiap slot memiliki pilihan spesialis DEF/HP/MP serta hybrid ATK agar build tidak bergantung pada satu jalur gear. Equipment endgame tertentu hanya tersedia dari quest tier Mythic atau Primordial. Save lama otomatis memigrasikan base stat defensif sambil mempertahankan rarity dan level upgrade.

Statistik monster mempertimbangkan perluasan equipment secara bertahap. Early dan mid game memperoleh tambahan HP/ATK ringan, boss mendapat scaling tersendiri, sedangkan multiplier Area untuk monster normal dibuat lebih landai dan dibatasi agar level tinggi tetap menantang tanpa lonjakan statistik berlebihan.

Tersedia 21 variasi accessory untuk dua slot aktif. Pilihannya mencakup spesialis ATK, DEF, HP, MP, serta hybrid, mulai dari Copper Ring dan Mana Bead sampai Void Locket, Titan Emblem, Lich Crown, dan Hydra Heart. Empat accessory common tersedia langsung di Shop; variasi lain diperoleh dari loot, quest, atau boss. Rarity meningkatkan seluruh stat dasar yang dimiliki accessory.

Blacksmith memiliki batas `+5`. Biaya dan peluang sukses bergantung pada rarity:

| Rarity | Biaya dasar | Peluang sukses |
| --- | ---: | ---: |
| Common | 1 ore | 80% |
| Uncommon | 2 ore | 60% |
| Rare | 3 ore | 50% |
| Epic | 5 ore | 40% |
| Legendary | 7 ore | 30% |

Biaya aktual adalah biaya dasar ditambah level upgrade saat ini. Upgrade yang gagal hanya menghabiskan ore; equipment tidak hancur dan levelnya tidak turun.

### Material monster

Monster biasa memiliki peluang 60% menjatuhkan material crafting, sedangkan boss memiliki peluang 40%. Tersedia 32 jenis material yang mengikuti keluarga dan ability monster, seperti Slime Gel, Goblin Scrap, Troll Blood, Runestone, Phoenix Ash, Dragon Scale, hingga Primordial Scale.

Monster level 50 ke atas menjatuhkan dua unit material. Boss memperoleh satu unit tambahan. Material tersimpan di inventory dan dapat dijual, tetapi penggunaannya sebagai resep equipment akan ditambahkan pada pengembangan Blacksmith berikutnya.

Item non-equipment dengan ID yang sama ditampilkan sebagai satu stack, misalnya `Small HP Potion ×5`. Shop juga menampilkan satu baris per stack; tombol `Sell` menjual satu unit setiap kali ditekan. Equipment tetap terpisah karena setiap instance dapat memiliki rarity, statistik, dan upgrade berbeda.

### Tavern dan quest

Tavern menyediakan maksimal tiga kontrak. Tawaran tetap sama saat pemain keluar-masuk Tavern dan quest yang diterima akan dihapus dari papan.

Papan dapat menghasilkan tawaran baru setelah cooldown satu jam. Pemain tidak perlu menyelesaikan seluruh quest aktif untuk memperoleh tawaran baru ketika refresh sudah tersedia.

Selain quest perburuan, Tavern dapat memberikan Supply Request untuk mengumpulkan material. Material hanya dikurangi ketika jumlahnya cukup dan pemain menekan tombol penyerahan di Tavern. Menjual material sebelum diserahkan akan mengurangi progres yang tersedia.

### Title

Title tidak perlu dipilih. Semua title yang sudah dibuka selalu aktif, bonusnya dijumlahkan, dan progresnya tidak hilang saat World Reset.

Title diperoleh melalui tantangan jangka panjang dan dari mengalahkan setiap jenis boss sesuai persyaratan yang ditampilkan di dalam game.

Daftar title, progres, persyaratan, dan efek dibuka melalui tombol `View Titles` di panel Player Info. Daftar ditampilkan dalam modal agar side panel tetap ringkas.

### World Reset

Tombol World Reset hanya muncul setelah karakter mencapai level 100.

- Biaya dasar reset pertama adalah 10.000 gold.
- Biaya dasar reset berikutnya dikalikan `1,5` untuk setiap World Tier.
- Primordial Dragon menjatuhkan Primordial Aegis dan World Seed.
- Primordial Aegis adalah armor yang dapat dipakai sampai World Reset menghapus equipment bersama progres lainnya.
- Menggunakan World Seed memberi `+15` ke seluruh base stat dan memakai harga normal.
- Reset tanpa World Seed memberi `+10` ke seluruh base stat dan dikenai biaya tambahan `1,5×`.
- World Seed akan dikonsumsi jika digunakan sebagai katalis.
- Setiap World Tier meningkatkan kekuatan monster sebesar 25% dan harga Shop sebesar 20%.
- Title, progres title, Origin Stats, jumlah World Reset, serta bonus permanen tetap dipertahankan.

## Keyboard shortcut

Shortcut diabaikan ketika pemain sedang mengetik dan tidak akan menjalankan tombol yang sedang disabled.

| Konteks | Tombol | Aksi |
| --- | --- | --- |
| Town | `E` | Explore |
| Town | `R` | Rest |
| Town | `S` | Buka Shop |
| Town | `T` | Buka Tavern |
| Town | `B` | Buka Blacksmith |
| Battle | `A` atau `1` | Attack |
| Battle | `M` atau `2` | Magic Strike |
| Battle | `P` atau `3` | Gunakan HP potion |
| Battle | `N` atau `4` | Gunakan MP potion |
| Battle | `F` | Flee |
| Global | `Ctrl+S` / `Cmd+S` | Manual save |
| Global | `Esc` | Tutup panel lokasi atau bantuan |
| Global | `?` | Tampilkan bantuan shortcut |

## Struktur proyek

```text
dragon-realm/
├── index.html      # Seluruh HTML, CSS, data, dan logika game
├── sw.js           # Offline cache dan pemulihan navigation
├── README.md       # Dokumentasi proyek
└── CHANGELOG.md    # Riwayat perubahan
```

## Changelog

Riwayat fitur, perbaikan bug, dan perubahan deployment tersedia di [`CHANGELOG.md`](./CHANGELOG.md).

## Deploy ke GitHub Pages

1. Push repository ke GitHub.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main`, folder `/ (root)`, lalu simpan.
5. Setelah deployment selesai, buka root URL proyek:

```text
https://<username>.github.io/<repository>/
```

## Deploy ke Vercel

1. Import repository GitHub ke Vercel.
2. Pilih **Framework Preset: Other**.
3. Pastikan **Root Directory** menunjuk ke root repository.
4. Biarkan Build Command dan Output Directory kosong.
5. Tekan **Deploy**.

Vercel akan menyajikan `index.html` langsung pada root domain:

```text
https://<project-name>.vercel.app/
```

> [!NOTE]
> Proyek ini adalah game single-player statis. Mode multiplayer/LAN belum termasuk dalam build saat ini karena fitur tersebut memerlukan lapisan jaringan atau server tambahan.

## Pengembangan

Semua tampilan, data, dan logika gameplay berada di dalam `index.html`; `sw.js` hanya menangani offline cache. Saat melakukan perubahan:

- Pertahankan logika gameplay di satu file jika ingin menjaga game tetap portabel.
- Naikkan versi cache di `sw.js` jika strategi atau aset offline berubah.
- Uji new game, equip/unequip, Shop, Tavern, Blacksmith, battle, save/load, dan World Reset.
- Pastikan save lama tetap dapat dimigrasikan.
- Periksa game melalui desktop dan viewport mobile.
- Hindari mengubah key `dragonRealmSave` tanpa strategi migrasi.

Belum ada build step atau automated test runner yang disertakan. Validasi utama dilakukan langsung di browser dan dengan pemeriksaan sintaks JavaScript.
