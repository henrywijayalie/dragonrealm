# Dragon Realm Adventure

Dragon Realm Adventure adalah RPG turn-based berbasis browser dengan seluruh gameplay di dalam satu file HTML dan Service Worker kecil untuk dukungan offline. Jelajahi empat area, lawan monster dan boss, kumpulkan equipment dengan rarity berbeda, selesaikan quest, lalu bangun karakter lintas World Reset.

Tidak ada framework, dependency, proses build, atau backend. Cukup buka game di browser modern.

## Fitur utama

- Pertarungan turn-based dengan serangan biasa, magic strike, HP/MP potion dari inventory, dan flee.
- Monster biasa, boss utama, 12 monster elemental, dan enam rare elemental boss dari level rendah hingga level 100.
- Ability monster: Heavy Strike, Venom, Mana Burn, Regeneration, dan Life Drain.
- Empat area: Whispering Woods, Ashen Caverns, Wyrmspire Ruins, dan Dragon's Crown.
- Slot equipment mencakup Right Hand, Left Hand untuk off-hand/shield, Two-Handed Weapon, Body Armor, Helmet, Bottom, Shoes, serta dua accessory.
- Rarity drop dinamis dari Common hingga Epic; Unique, Legendary, dan Mythical hanya dapat dibuat melalui Tier Fusion.
- Shop untuk membeli dan menjual item, lengkap dengan deskripsi dan harga yang menyesuaikan World Tier.
- Equipment dan Inventory berada dalam satu dialog khusus agar tampilan utama tetap ringkas.
- Blacksmith untuk refine hingga `+10`, downgrade, salvage, Tier Fusion, dan crafting Elemental Arrow.
- Tavern dengan tiga tawaran quest persisten dan cooldown refresh satu jam.
- Quest tier Bronze, Silver, Gold, Mythic, dan Primordial.
- Lima pilihan Origin dengan fokus dan statistik awal berbeda untuk membentuk gaya bermain karakter baru.
- Title permanen dari title quest dan boss. Semua title yang terbuka aktif secara akumulatif.
- World Reset mulai level 100 dengan bonus stat permanen dan tingkat kesulitan yang terus meningkat.
- Save migration untuk mempertahankan kompatibilitas dengan save versi lama.
- Autosave berbasis perubahan yang diperiksa setiap 30 detik, manual save/load, dan keyboard shortcut. Save tidak dijalankan selama battle.
- Offline cache dan pemulihan lifecycle untuk Chrome mobile.
- Ikon SVG lokal pada navigasi, battle, dan dialog tanpa ketergantungan CDN sehingga tetap tampil saat offline.

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

1. Tentukan nama karakter, lalu pilih Origin yang sesuai dengan gaya bermain.
2. Jelajahi dungeon untuk mencari monster.
3. Menangkan pertarungan untuk memperoleh EXP, gold, loot, dan kemungkinan blacksmith ore.
4. Gunakan Tavern untuk mengambil quest dan Shop untuk mengelola item.
5. Pasang serta upgrade equipment agar siap menghadapi boss level tinggi.
6. Capai level 100 dan lakukan World Reset untuk memperkuat karakter secara permanen.
7. Kejar title yang bertahan melewati World Reset.

## Sistem penting

### Origin Stats

Setelah menentukan nama, pemain baru memilih satu dari lima Origin. Dialog menampilkan fokus, penjelasan, dan statistik sebelum pilihan dibuat. Origin tidak dapat diganti dan tetap dipertahankan ketika melakukan World Reset.

| Origin | Fokus | Statistik awal |
| --- | --- | --- |
| Vitalborn | Daya tahan dan cadangan HP | 115 HP, 45 MP, 9 ATK, 4 DEF |
| Aetherborn | Magic Strike dan cadangan MP | 95 HP, 65 MP, 9 ATK, 4 DEF |
| Warborn | Serangan fisik | 95 HP, 45 MP, 12 ATK, 5 DEF |
| Ironborn | Pertahanan | 95 HP, 45 MP, 10 ATK, 7 DEF |
| Versatile | Perkembangan seimbang | 100 HP, 50 MP, 10 ATK, 5 DEF |

Setiap profil tetap menggunakan delapan token stat di atas fondasi `90 HP`, `40 MP`, `8 ATK`, dan `3 DEF`. Token HP/MP bernilai `+5`, sedangkan token ATK/DEF bernilai `+1`.

`Legacy` bukan jenis origin pemain. Label tersebut sebelumnya hanya menjadi fallback save lama. Save yang kehilangan label origin kini meminta pemulihan satu kali; pemain memilih kembali nama origin sebelumnya tanpa mengubah statistik atau progres. Jika data alokasi masih tersedia, nama origin dipulihkan secara otomatis.

### Equipment dan Blacksmith

Equipment dapat meningkatkan ATK, DEF, HP, dan MP. Weapon atau gear lain yang memiliki lebih dari satu bonus stat akan meningkatkan seluruh bonus tersebut ketika upgrade berhasil.

Tombol `Inventory` membuka satu dialog yang menampilkan seluruh equipment terpasang dan isi inventory secara berdampingan. Pada layar smartphone, kedua bagian disusun vertikal dan dapat digulir. Equip, unequip, dan penggunaan item dilakukan langsung dari dialog ini.

Right Hand menerima seluruh weapon satu tangan. Left Hand menerima shield atau weapon ringan yang memiliki kompatibilitas off-hand; weapon main-hand-only tidak dapat dipasang di sana. Weapon dua tangan memakai kedua tangan sekaligus: memasangnya otomatis melepas weapon kanan dan kiri, sedangkan memasang shield atau weapon satu tangan akan melepas weapon dua tangan. Kontribusi ATK weapon dua tangan dikalikan `×1,5`, tetapi statistiknya hanya dihitung satu kali.

Bow membutuhkan satu Arrow untuk setiap Normal Attack atau Magic Strike. Shop menjual Arrow per unit melalui input jumlah dan inventory menampilkannya sebagai stack. Ketika Arrow habis, bow tidak memberikan bonus ATK sehingga serangan memakai kekuatan karakter tanpa weapon. Format ammo sudah menyimpan jenis serta efek Arrow standar sebagai fondasi crafting Arrow berefek pada pengembangan Blacksmith berikutnya.

Tersedia tujuh basis bow: Hunter Bow, Recurve Bow, Ironwood Warbow, Arcane Longbow, Stormcaller Bow, Dragonwing Bow, dan Celestial Starbow. Hanya Hunter Bow yang dijual di Shop; enam bow lainnya diperoleh melalui loot atau reward quest sesuai tier. Setiap basis bow tetap dapat memiliki rarity dan hasil upgrade yang berbeda.

Armor kini khusus slot tubuh. Katalog defensif menyediakan 10 shield, 13 body armor, 10 helmet, 10 bottom, dan 10 shoes dari common hingga legendary. Setiap slot memiliki pilihan spesialis DEF/HP/MP serta hybrid ATK agar build tidak bergantung pada satu jalur gear. Equipment endgame tertentu hanya tersedia dari quest tier Mythic atau Primordial. Save lama otomatis memigrasikan base stat defensif sambil mempertahankan rarity dan level upgrade.

Statistik monster mempertimbangkan perluasan equipment dan Tier Fusion secara bertahap. Early game tetap mendekati statistik dasar, kemudian scaling HP/ATK meningkat pada level 20, 40, 60, 80, dan 100. Monster normal level 100 memperoleh multiplier equipment-balance `×1,85 HP` dan `×1,34 ATK`, sedangkan boss level 100 memperoleh `×2,50 HP` dan `×1,90 ATK`, sebelum World Tier diterapkan.

Monster normal tetap memakai Area scaling hingga maksimum `×1,60`. Boss sekarang memiliki Area scaling terpisah yang lebih landai hingga maksimum `×1,35`, sehingga boss level tinggi tidak menjadi lebih lemah daripada encounter normal pada area yang sama.

Rentang encounter Eclipse Seraph, Astral Juggernaut, Rift Stalker, Starforged Golem, Nether Phoenix, dan Chaos Dragon diperpanjang bertahap sampai level 100. Ini mencegah pool monster kembali ke musuh lama yang jauh lebih lemah setelah pemain melewati level 80.

DEF tetap mengurangi damage sebesar setengah nilainya, tetapi tidak dapat lagi menurunkan semua serangan menjadi 1 damage. Monster normal memiliki minimum damage sebesar 10%–25% ATK berdasarkan level, sedangkan boss selalu memberikan minimal 30% ATK sebelum efek ability. Dengan demikian, build DEF tetap memperpanjang daya tahan tanpa membuat Unique, Legendary, atau Mythical armor menghapus seluruh risiko pertarungan.

Tersedia 21 variasi accessory untuk dua slot aktif. Pilihannya mencakup spesialis ATK, DEF, HP, MP, serta hybrid, mulai dari Copper Ring dan Mana Bead sampai Void Locket, Titan Emblem, Lich Crown, dan Hydra Heart. Empat accessory common tersedia langsung di Shop; variasi lain diperoleh dari loot, quest, atau boss. Rarity meningkatkan seluruh stat dasar yang dimiliki accessory.

Blacksmith memiliki batas `+10`. Setiap percobaan membutuhkan ore dan gold. Biaya dasar serta peluang sukses bergantung pada rarity:

| Rarity | Ore dasar | Gold dasar | Peluang sukses |
| --- | ---: | ---: | ---: |
| Common | 1 | 200 | 80% |
| Uncommon | 2 | 600 | 60% |
| Rare | 3 | 1.500 | 50% |
| Epic | 5 | 4.000 | 40% |
| Unique | 6 | 7.000 | 35% |
| Legendary | 7 | 10.000 | 30% |
| Mythical | 10 | 25.000 | 20% |

Biaya ore aktual adalah ore dasar ditambah level refine saat ini. Biaya gold adalah gold dasar dikali `(level refine saat ini + 1)`, kemudian disesuaikan dengan multiplier harga World Tier. Pada World Tier 0, percobaan Legendary dari `+9` ke `+10` membutuhkan 16 ore dan 100.000 gold.

Kegagalan selalu menghabiskan ore dan gold, dengan konsekuensi berdasarkan level saat percobaan dimulai:

| Percobaan refine | Konsekuensi jika gagal |
| --- | --- |
| `+0 → +1` sampai `+3 → +4` | Level tetap |
| `+4 → +5` dan `+5 → +6` | Turun 1 level |
| `+6 → +7` dan `+7 → +8` | Turun 2 level |
| `+8 → +9` | Turun 3 level |
| `+9 → +10` | 80% equipment hancur permanen; 20% kembali ke `+0` |

Percobaan `+9 → +10` selalu menampilkan konfirmasi risiko sebelum resource dipotong.

Blacksmith juga menyediakan tiga layanan lain:

- `Downgrade` menurunkan equipment terpasang satu refine level per transaksi hingga `+0`. Ore yang kembali adalah 50%—dibulatkan ke bawah—dari biaya ore level yang dilepas. Setiap downgrade juga memiliki ongkos gold.
- `Salvage` menghancurkan equipment yang berada di inventory menjadi Forge Scrap. Rarity dan refine level yang lebih tinggi memberikan lebih banyak scrap. Equipment terpasang tidak muncul dalam daftar salvage.
- `Tier Fusion` mempertahankan satu equipment pilihan sebagai core lalu mengonsumsi dua salinan equipment `+0` dengan nama dasar dan rarity yang sama. Refine level milik core dipertahankan, sedangkan catalyst yang sudah memiliki refine tidak dapat digunakan.

Contohnya, Wooden Sword Common `+3` dapat dipilih sebagai core bersama dua Wooden Sword Common `+0`. Hasilnya adalah Wooden Sword Uncommon `+3`. Jika equipment `+3` tidak dipilih sebagai core, equipment tersebut tidak dapat dikonsumsi sebagai catalyst.

Urutan fusion adalah Common → Uncommon → Rare → Epic → Unique → Legendary → Mythical. Biaya dasarnya adalah 2.500, 7.500, 25.000, 75.000, 125.000, dan 200.000 gold untuk setiap tahap tersebut. Seluruh ongkos Blacksmith menyesuaikan multiplier harga World Tier.

Mythical adalah rarity maksimum. Unique, Legendary, dan Mythical sama-sama eksklusif Tier Fusion; monster normal, boss, dan reward Tavern hanya dapat memberikan equipment sampai Epic. Shop juga tidak menjual ketiga rarity tersebut. Equipment Mythical masih dapat di-refine hingga `+10`, dengan biaya lebih tinggi dan peluang sukses dasar 20%.

Multiplier stat rarity tingkat tinggi dibuat bertahap: Epic `×1,95`, Unique `×2,25`, Legendary `×2,70`, dan Mythical `×3,20`. Refine tetap ditambahkan sesudah multiplier rarity sehingga investasi Blacksmith terasa kuat, tetapi lonjakan dari Legendary ke Mythical tidak terlalu ekstrem.

Refine, Downgrade, Salvage, Tier Fusion, dan Craft Elemental Arrows dipisahkan menjadi lima menu. Hanya daftar layanan yang sedang dipilih yang ditampilkan. Tombol kembali atau `Esc` kembali ke menu Blacksmith terlebih dahulu; `Esc` berikutnya meninggalkan Blacksmith.

### Material monster

Monster biasa memiliki peluang 60% menjatuhkan material crafting, sedangkan boss memiliki peluang 40%. Tersedia 32 jenis material yang mengikuti keluarga dan ability monster, seperti Slime Gel, Goblin Scrap, Troll Blood, Runestone, Phoenix Ash, Dragon Scale, hingga Primordial Scale.

Monster level 50 ke atas menjatuhkan dua unit material. Boss memperoleh satu unit tambahan. Material tersimpan di inventory dan dapat dijual, tetapi penggunaannya sebagai resep equipment akan ditambahkan pada pengembangan Blacksmith berikutnya.

Forge Scrap tidak berasal dari monster. Material ini diperoleh dengan menghancurkan equipment melalui layanan Salvage dan disimpan sebagai stack di inventory untuk sistem crafting berikutnya.

### Elemental combat

Enam elemen—Fire, Lightning, Ice, Earth, Poison, dan Wind—memiliki monster, stone, arrow, dan status masing-masing. Monster elemental memiliki peluang 10% memicu skill elemennya. Monster kebal terhadap status dari elemen yang sama, tetapi tetap menerima base damage serangan.

Elemental Arrow juga memiliki peluang proc dasar 10%. Bow menampilkan pilihan `Next Arrow`; pilihan tersimpan dan otomatis berpindah ke elemental arrow tertua yang tersedia, lalu Arrow standar, ketika ammo terpilih habis. Normal Attack dan Magic Strike sama-sama memakai satu arrow. Blacksmith mengubah 10 Arrow standar, satu stone terkait, dan ongkos 250 gold sebelum multiplier World Tier menjadi 10 Elemental Arrow.

Rare elemental boss memiliki peluang encounter 1% ketika tidak ada boss utama pending dan hanya dapat dikalahkan satu kali per World Tier. Kemenangan menjamin lima stone dan memiliki peluang 15% menjatuhkan satu bagian Epic Elemental Sovereign Set. Enam bagian set mengaktifkan `Elemental Ward`, yang mengurangi direct damage monster elemental sebesar 15%.

Elemental Sovereign Set merupakan satu-satunya equipment yang bertahan saat World Reset. Seluruh instance—termasuk duplikat, rarity hasil fusion, refine, dan rolled stats—dilepas lalu dipindahkan ke inventory. Stone, elemental arrow, serta equipment lain tetap di-reset.

Title permanen `Elemental Killer` membutuhkan 25 kemenangan atas masing-masing dari enam rare elemental boss dan minimal World Tier 25. Totalnya 150 kemenangan elemental boss. Efeknya ditampilkan sebagai `Elemental Effect Chance +5%`, yaitu menaikkan peluang efek elemental pemain dari 10% menjadi 15%; peluang skill monster tetap 10%.

Battle log dikelompokkan menjadi kartu `Turn N` bertimestamp dengan tempo tetap Fast (600 ms). Potion dan upaya Flee adalah aksi turn, sementara kontrol dikunci selama response monster diselesaikan.

### Magic Strike

Biaya dasar Magic Strike meningkat mengikuti level pemain: 10 MP pada level 1–10, kemudian bertambah 10 MP setiap memasuki kelompok sepuluh level berikutnya. Level 91–100 memiliki biaya dasar 100 MP. Jenis weapon yang digunakan menentukan damage dan efisiensi akhirnya:

| Weapon | Damage Magic Strike | Biaya MP |
| --- | ---: | ---: |
| Staff | 200% ATK | 125% biaya dasar |
| Wand | 175% ATK | 75% biaya dasar |
| Weapon lain atau tanpa weapon | 150% ATK | 100% biaya dasar |

Biaya akhir dibulatkan ke atas ke kelipatan 5 MP. Pada level 100, Magic Strike membutuhkan 125 MP dengan Staff, 75 MP dengan Wand, dan 100 MP dengan weapon lain. Staff adalah Two-Handed Weapon untuk burst damage tinggi, sedangkan Wand adalah Main-Hand Weapon yang hanya dapat dipasang di Right Hand dan lebih hemat MP. Karena bonus ATK Staff masih memperoleh multiplier Two-Handed `×1,5`, setiap 1 ATK Staff berkontribusi sampai 3 damage Magic Strike sebelum bonus ATK lain—lebih kuat daripada weapon standar tanpa mencapai efektivitas 3,6 dari profil lama.

Tersedia lima Staff: Oak Staff, Runebark Staff, Enchanted Staff, Stormcaller Staff, dan Astral Staff. Tersedia enam Wand: Apprentice Wand, Runic Wand, Ember Wand, Voidglass Wand, Moonveil Wand, dan Archon Wand. Oak Staff dan Apprentice Wand tersedia di Shop; equipment berikutnya diperoleh melalui loot atau quest sesuai progres. Stormcaller Staff dan Moonveil Wand mulai tersedia sebagai reward Tavern Gold, sedangkan Astral Staff dan Archon Wand merupakan reward Tavern Epic untuk tier Mythic ke atas. Seluruhnya tetap dapat dinaikkan rarity-nya melalui Tier Fusion.

Save lama yang memiliki Enchanted Staff otomatis mengenalinya sebagai Staff. Jika save sementara pernah memiliki Wand di Left Hand, migrasi memindahkannya dengan aman ke inventory. Tombol battle dan deskripsi equipment menampilkan profil Magic Strike yang sedang aktif.

Bow tetap memakai profil standar dan membutuhkan satu Arrow. Jika Arrow habis, perhitungan Magic Strike mengabaikan bonus ATK bow seperti serangan normal.

Item non-equipment dengan ID yang sama ditampilkan sebagai satu stack, misalnya `Small HP Potion ×5`. Daftar Sell menyediakan input jumlah untuk menjual sebagian atau seluruh stack, sedangkan equipment tetap dijual satu instance karena setiap equipment dapat memiliki rarity, statistik, dan upgrade berbeda. Harga menggunakan wording konsisten `Buy`, `Sell`, `Buy total`, dan `Sell total`.

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
| Town | `I` | Buka Equipment & Inventory |
| Town | `S` | Buka Shop |
| Town | `T` | Buka Tavern |
| Town | `B` | Buka Blacksmith |
| Battle | `A` atau `1` | Attack |
| Battle | `M` atau `2` | Magic Strike |
| Battle | `P` atau `3` | Gunakan HP potion |
| Battle | `N` atau `4` | Gunakan MP potion |
| Battle | `F` | Flee |
| Global | `Ctrl+S` / `Cmd+S` | Manual save |
| Global | `Esc` | Tutup dialog, panel lokasi, atau bantuan |
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
