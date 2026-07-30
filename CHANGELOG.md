# Changelog

Catatan perkembangan Dragon Realm Adventure dikelompokkan berdasarkan tanggal pengerjaan.

## 30 Juli 2026

- Menambahkan sepuluh monster normal untuk level 20–50 dan sepuluh monster normal untuk level 50–80, lengkap dengan kurva statistik dan ability.
- Menata ulang tombol Battle, Town, dan Keyboard Shortcuts dengan ukuran sentuh serta grid yang proporsional pada layar smartphone.
- Target monster dari quest aktif tetap dapat ditemui jika berada di luar batas encounter normal; target yang masih sesuai rentang level tetap menggunakan peluang kemunculan biasa.
- Mengganti katalis World Reset dari Primordial Aegis menjadi World Seed.
- Primordial Dragon sekarang menjatuhkan Primordial Aegis sebagai armor dan World Seed sebagai key item.
- World Seed tidak dapat dijual atau digunakan secara manual dan dikonsumsi ketika melengkapi World Reset.
- Save lama yang sudah mengalahkan Primordial Dragon otomatis menerima World Seed jika belum memilikinya.
- Menambahkan 32 jenis material crafting yang dapat dijatuhkan monster.
- Memperluas drop khusus keluarga monster dengan Goblin Scrap, Troll Blood, Reptile Scale, Runestone, Storm Essence, Phoenix Ash, Chaos Fragment, dan material baru lainnya.
- Monster biasa memiliki peluang 60% memperoleh material, sedangkan boss memiliki peluang 40% agar material boss lebih menantang diperoleh.
- Jenis material mengikuti keluarga atau ability monster; monster level 50 ke atas dan boss menghasilkan jumlah lebih banyak.
- Menggabungkan item non-equipment sejenis menjadi satu stack pada Inventory dan daftar Sell.
- Tombol `Sell` menjual satu unit dari stack setiap kali ditekan, sedangkan equipment tetap ditampilkan per instance.
- Menambahkan Supply Request di Tavern untuk mengumpulkan dan menyerahkan material sebagai quest.
- Material quest dikurangi sesuai kebutuhan saat diserahkan; menjual material akan menurunkan jumlah yang siap dikumpulkan.
- Monster sumber material quest tetap dapat ditemui jika pemain sudah melewati rentang encounter normalnya.
- Menyeimbangkan kembali statistik accessory agar pilihan satu-stat dan hybrid memiliki fungsi yang lebih jelas.
- Menambah jumlah variasi accessory menjadi 21, mencakup build ATK, DEF, HP, MP, dan hybrid dari common hingga epic.
- Menambahkan Bone Charm, Copper Ring, Warding Stone, dan Mana Bead ke Shop sebagai pilihan accessory awal.
- Memperluas reward quest dengan accessory sesuai tier, termasuk Guardian Seal, Sage Prism, Void Locket, dan Titan Emblem.
- Save lama otomatis memigrasikan statistik accessory ke balancing baru tanpa menghilangkan rarity atau level upgrade.
- Rest sekarang menampilkan recovery aktual dan memberi tahu pemain ketika HP serta MP sudah penuh sehingga tidak ada recovery yang diperoleh.

## 29 Juli 2026

- Menambahkan offline navigation cache melalui Service Worker.
- Menambahkan pemulihan UI melalui event `pageshow`, `visibilitychange`, dan `resume` pada lifecycle Chrome mobile.
- Menambahkan silent save ketika halaman masuk ke status hidden, frozen, atau pagehide.
- Memisahkan tombol battle menjadi `Use HP Potion` dan `Use MP Potion`.
- Menampilkan jumlah HP dan MP potion aktual pada panel status dan tombol battle.
- Menambahkan shortcut `P`/`3` untuk HP Potion dan `N`/`4` untuk MP Potion.
- Memberikan loadout awal berupa tiga item inventory nyata: dua Small HP Potion dan satu Small MP Potion.
- Quick-use potion sekarang mengambil consumable langsung dari inventory.
- Sistem otomatis memilih potion recovery berukuran paling sesuai dan menggunakan potion terbesar yang tersedia jika recovery belum mencukupi.
- Log penggunaan potion menampilkan jumlah HP atau MP yang benar-benar dipulihkan.
- Tombol potion otomatis disabled ketika resource sudah penuh atau jenis potion yang diperlukan tidak tersedia.
- Memperbaiki tab Chrome mobile yang terlihat tetapi seluruh tombolnya disabled setelah Chrome ditutup dari Recent Apps lalu dibuka kembali dalam airplane mode.
- Menghapus ketergantungan pada counter `player.potions` yang terpisah dari inventory.
- Mengabaikan counter basic potion dari save lama agar tidak menghasilkan potion inventory yang tidak pernah diperoleh.
- Memperbaiki kondisi ketika potion yang dibeli, diperoleh dari loot, atau diterima dari quest tidak dapat digunakan melalui tombol battle.
- Mencegah consumable tanpa efek yang valid terhapus dari inventory.
- Mencegah item digunakan melalui referensi inventory yang sudah tidak valid.

## 24 Juli 2026

- Merilis RPG turn-based single-player dalam satu file HTML.
- Menambahkan empat area, 28 monster biasa, 12 boss, dan lima jenis monster ability.
- Menambahkan equipment dengan rarity dinamis, dua slot accessory, Shop, dan Blacksmith hingga `+5`.
- Menambahkan Tavern dengan quest dinamis, tier quest, tiga tawaran persisten, dan cooldown satu jam.
- Menambahkan Origin Stats acak untuk karakter baru.
- Menambahkan title quest dan title boss dengan bonus stat permanen yang aktif secara akumulatif.
- Menambahkan World Reset level 100 dengan Primordial Aegis, bonus stat permanen, serta scaling monster, harga, dan biaya reset.
- Menambahkan autosave, manual save/load, migrasi save lama, Monster Codex, dan keyboard shortcut.
- Menambahkan dokumentasi proyek dan panduan menjalankan game secara lokal.
- Menambahkan panduan deployment untuk GitHub Pages dan Vercel.
- Menambahkan meta description untuk halaman game.
- Mengganti entry point dari `dragonrealm.html` menjadi `index.html` agar game dapat dibuka langsung dari root domain Vercel dan GitHub Pages.
- Memperbaiki halaman `404: NOT_FOUND` ketika deployment Vercel membuka root domain.
