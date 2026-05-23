# AGENTS.md — Ensotek com.tr

## Canli Erisim Notu

Canli server `vps-Ensotek` SSH kisa yolundadir. Key ile sifresiz erisim: `ssh vps-Ensotek`.

## Aktif Is — FAZA 11 Pending Fixes (2026-05-23)

Tum yapilacaklar `docs/FRONTEND_CHECKLIST.md` icindeki **FAZA 11 — Pending Fixes** bolumunde checklist olarak listelendi. Codex bu listeyi referans alir, her madde tamamlandiginda kutucugu isaretler.

Ozet:

1. Footer'dan "Group Companies: MOE Kompozit" satirini kaldir (tr.json + en.json + Footer.tsx)
2. Ingilizce sayfalardaki Turkce noktali `I` (U+0130) karakterini ASCII `I` (U+0049) ile degistir
3. Header desktop nav'a "Iletisim / Contact" linkini ekle
4. Offer (Teklif) modulunu ensotek_de'den port et (backend + frontend; admin_panel zaten var)
5. Admin login `/admin/auth/login` URL'i + seed admin hesabi `orhanguzell@gmail.com / admin123`

### Koordinasyon Kurali

- Claude Code: mimari karar, kod review, plan dokumantasyonu
- Codex: implementasyon
- Ayni dosya uzerinde ayni anda iki arac calistirilmaz
- Her commit/PR sonrasi checklist guncellenir

### Onemli Kisitlar

- `ALTER TABLE` yasak. Schema degisiklikleri `src/db/seed/sql/0XX_*_schema.sql` icindeki `CREATE TABLE`'a eklenir; `bun run db:seed:*:fresh` ile DB sifirdan kurulur.
- Backend prefix: `ensotek_com_tr__` (tum yeni tablolar bu prefix ile)
- Backend port: 8088, frontend port: 3021, admin_panel port: bkz. ecosystem.config.cjs
