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
- Menambahkan 16 jenis material crafting yang dapat dijatuhkan monster.
- Monster biasa memiliki peluang 60% memperoleh material, sedangkan boss selalu menjatuhkannya.
- Jenis material mengikuti keluarga atau ability monster; monster level 50 ke atas dan boss menghasilkan jumlah lebih banyak.

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
