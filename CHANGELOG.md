# Changelog

Seluruh perubahan penting pada Dragon Realm Adventure dicatat dalam file ini.

Format changelog mengikuti prinsip [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Proyek belum menggunakan nomor versi resmi, sehingga perubahan terbaru ditempatkan di bagian **Unreleased**.

## Deployment Update - 2026-07-29

### Added

- Offline navigation cache melalui Service Worker.
- Pemulihan UI melalui event `pageshow`, `visibilitychange`, dan `resume` pada lifecycle Chrome mobile.
- Silent save ketika halaman masuk ke status hidden, frozen, atau pagehide.
- Tombol battle terpisah untuk `Use HP Potion` dan `Use MP Potion`.
- Jumlah HP dan MP potion aktual pada panel status dan tombol battle.
- Shortcut `P`/`3` untuk HP Potion dan `N`/`4` untuk MP Potion.
- Loadout awal berupa tiga item inventory nyata: dua Small HP Potion dan satu Small MP Potion.

### Changed

- Quick-use potion sekarang mengambil consumable langsung dari inventory.
- Sistem otomatis memilih potion recovery berukuran paling sesuai dan menggunakan potion terbesar yang tersedia jika recovery belum mencukupi.
- Log penggunaan potion menampilkan jumlah HP atau MP yang benar-benar dipulihkan.
- Tombol potion otomatis disabled ketika resource sudah penuh atau jenis potion yang diperlukan tidak tersedia.

### Fixed

- Memperbaiki tab Chrome mobile yang terlihat tetapi seluruh tombolnya disabled setelah Chrome ditutup dari Recent Apps lalu dibuka kembali dalam airplane mode.
- Menghapus ketergantungan pada counter `player.potions` yang terpisah dari inventory.
- Mengabaikan counter basic potion dari save lama agar tidak menghasilkan potion inventory yang tidak pernah diperoleh.
- Memperbaiki kondisi ketika potion yang dibeli, diperoleh dari loot, atau diterima dari quest tidak dapat digunakan melalui tombol battle.
- Mencegah consumable tanpa efek yang valid terhapus dari inventory.
- Mencegah item digunakan melalui referensi inventory yang sudah tidak valid.

## Deployment Update - 2026-07-24

### Added

- Dokumentasi proyek dan panduan menjalankan game secara lokal.
- Panduan deployment untuk GitHub Pages dan Vercel.
- Meta description untuk halaman game.

### Changed

- Mengganti entry point dari `dragonrealm.html` menjadi `index.html` agar game dapat dibuka langsung dari root domain Vercel dan GitHub Pages.

### Fixed

- Memperbaiki halaman `404: NOT_FOUND` ketika deployment Vercel membuka root domain.

## Initial Release - 2026-07-24

### Added

- RPG turn-based single-player dalam satu file HTML.
- Empat area, 28 monster biasa, 12 boss, dan lima jenis monster ability.
- Equipment dengan rarity dinamis, dua slot accessory, Shop, dan Blacksmith hingga `+5`.
- Tavern dengan quest dinamis, tier quest, tiga tawaran persisten, dan cooldown satu jam.
- Origin Stats acak untuk karakter baru.
- Title quest dan title boss dengan bonus stat permanen yang aktif secara akumulatif.
- World Reset level 100 dengan Primordial Aegis, bonus stat permanen, serta scaling monster, harga, dan biaya reset.
- Autosave, manual save/load, migrasi save lama, Monster Codex, dan keyboard shortcut.
