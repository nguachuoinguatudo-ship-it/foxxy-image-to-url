# FOXXY — Image to URL

Upload gambar, dapatkan URL langsung — `https://foxxy-free-imghosting.vercel.app/foxxy-kodeacak.png`.
Modern UI, full animasi, boot terminal, responsive mobile & desktop. Dibuat oleh **Wanz**.

## Fitur

- ⚡ Upload instan → URL siap bagikan (PNG / JPG / JPEG / GIF / WEBP / AVIF, maks 4.5 MB)
- 🖥️ Boot terminal cinematic di kunjungan pertama (bisa di-replay via tombol reboot)
- ✨ Full animasi: Framer Motion + Tailwind (aurora, twinkle stars, marquee, page transitions)
- 📚 Halaman Docs API + halaman About developer
- 🎯 URL langsung di domain sendiri: `foxxy-free-imghosting.vercel.app/foxxy-xxxx.png` (proxy via catch-all route)
- 📦 Storage: Vercel Blob (gratis 5 GB) + CDN cache 1 tahun

## Pages

| Route | Keterangan |
| --- | --- |
| `/` | Home — boot terminal, hero, uploader, fitur, cara pakai |
| `/docs` | Dokumentasi API & format URL |
| `/about` | Profil developer (Wanz) |
| `/:file.png` | Proxy gambar langsung (di luar halaman di atas) |

## Deploy ke Vercel

1. **Import project** → https://vercel.com/new (pilih repo ini, framework otomatis terdeteksi Next.js)
2. **Buat Blob Store** → dashboard Vercel → tab **Storage** → **Create Database** → pilih **Blob** → Create. Token `BLOB_READ_WRITE_TOKEN` otomatis ditambahkan ke environment variables project.
3. **Deploy** → selesai. Setelah build, langsung bisa dipakai:
   - Upload dari halaman utama → copy URL
   - Contoh hasil: `https://foxxy-free-imghosting.vercel.app/foxxy-kodeacak.png`

> Tanpa Blob Store, halaman upload akan menampilkan pesan error konfigurasi yang jelas.

### Cek token (opsional)

```
vercel link
vercel env pull .env.local   # berisi BLOB_READ_WRITE_TOKEN
```

## Local Development

```bash
npm install        # atau pnpm install
npm run dev        # http://localhost:3000
```

Buat `.env.local` berisi token Blob Store kamu (lihat `.env.example`).

## API

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| POST | `/api/upload` | Multipart form, field `file`. Balasan: `{ url, pathname, direct, size, type }` |
| GET | `/foxxy-xxx.png` | Serve gambar (auto content-type + cache immutable 1 tahun) |

## Struktur

```
app/
  page.tsx              # Home
  docs/  about/   # Pages
  api/upload/           # POST upload → blob storage
  [...slug]/route.ts    # Proxy gambar di domain sendiri
components/
  AppShell.tsx          # Boot overlay, navbar, footer, page transition
  BootTerminal.tsx      # Boot sequence cinematic
  Uploader.tsx          # Drag & drop + progress + hasil
  ToastProvider.tsx     # Notifikasi global
  GlobalBackground.tsx  # Aurora, grid, stars, scroll progress
```

## Catatan

- SVG diblokir demi keamanan (mencegah XSS via same-origin proxy)
- Limit upload 4.5 MB sesuai free tier Vercel Blob (bisa dinaikkan di `app/api/upload/route.ts`)
- Filename digenerate acak (`foxxy-<8 random char>.<ext>`), tidak bisa ditebak

---

© 2026 FOXXY — crafted by **Wanz** with ❤️
