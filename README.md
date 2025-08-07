# Direktori dan Edukasi Komposting Bali

🌱 **Platform komprehensif yang menghubungkan warga Bali dengan layanan komposting lokal dan menyediakan sumber daya edukasi untuk pengelolaan sampah berkelanjutan.**

## 🎯 Tentang Proyek

Direktori dan Edukasi Komposting Bali adalah website berbasis Vue.js yang bertujuan untuk:

- Menghubungkan warga Bali dengan penyedia layanan komposting lokal
- Memberikan edukasi praktis tentang komposting di rumah
- Menyediakan direktori produk dan alat komposting
- Mendukung inisiatif keberlanjutan lingkungan di Bali

## ✨ Fitur Utama

### 🔍 Pencarian Layanan
- Pencarian berdasarkan lokasi (Kabupaten/Kecamatan)
- Filter lanjutan (harga, frekuensi pickup, jenis sampah)
- Status ketersediaan real-time (menerima, waitlist, penuh)

### 📚 Konten Edukasi
- Panduan komposting step-by-step (Biopore vs Komposter Bin)
- Kalkulator kompos interaktif dengan estimasi timeline
- Tips khusus iklim Bali (musim kering vs hujan)
- Marketplace produk komposting

### 📱 Responsive Design
- Mobile-first design untuk pengguna Indonesia
- Optimasi untuk koneksi internet lambat
- Interface dalam Bahasa Indonesia
- Integrasi WhatsApp dan Instagram

## 🛠️ Teknologi

- **Frontend**: Vue.js 3 (Composition API)
- **CSS Framework**: Bootstrap 5
- **Build Tool**: Vite
- **Data**: JSON-based (tanpa database)
- **Hosting**: Netlify
- **Analytics**: Google Analytics 4

## 🏗️ Struktur Proyek

```
bali-composter-directory/
├── data/                    # Data JSON
│   ├── regions.json         # Wilayah Bali
│   ├── companies.json       # Penyedia layanan
│   └── products.json        # Produk komposting
├── src/
│   ├── components/          # Komponen Vue
│   │   ├── common/          # Komponen umum
│   │   ├── search/          # Komponen pencarian
│   │   ├── forms/           # Form input
│   │   └── educational/     # Konten edukasi
│   ├── pages/               # Halaman utama
│   ├── utils/               # Utilitas & data loader
│   └── assets/              # Asset & CSS
├── .github/
│   ├── workflows/           # CI/CD GitHub Actions
│   └── copilot-instructions.md
└── public/                  # File static
```

## Deployment

This project is configured for deployment on **Netlify** with automated builds and form handling.

### Quick Deploy to Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/bd27d371-adb5-40e7-a517-9a8cf55e8fc8/deploy-status)](https://app.netlify.com/projects/bali-composter-directory/deploys)

### Manual Deployment

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to staging
   netlify deploy --dir=dist
   
   # Deploy to production
   netlify deploy --prod --dir=dist
   ```

4. **Automated Setup Script:**
   ```bash
   ./scripts/deploy-setup.sh
   ```

### Configuration

- **Build Command:** `npm run build`
- **Publish Directory:** `dist/`
- **Functions Directory:** `functions/`

See `DEPLOYMENT.md` for detailed configuration guide.

## 📊 Status Development

### ✅ Selesai (Phase 1 - MVP)
- [x] Setup proyek Vue.js 3 + Vite + Bootstrap 5
- [x] Sistem design dan theming
- [x] Struktur data JSON (regions, companies, products)
- [x] Homepage dengan search & filter
- [x] Halaman panduan dengan kalkulator kompos
- [x] Komponen kartu perusahaan dengan integrasi kontak
- [x] Form pendaftaran perusahaan
- [x] Marketplace produk komposting
- [x] Responsive design mobile-first
- [x] Netlify deployment setup

### 🚧 In Progress
- [ ] reCAPTCHA untuk form
- [ ] Google Analytics 4 setup

### 📋 Roadmap Selanjutnya
- [ ] System review untuk pendaftaran perusahaan
- [ ] SEO optimization & meta tags
- [ ] Testing suite (unit & e2e)
- [ ] Performance optimization
- [ ] PWA features

## 🎨 Design System

### Warna
- **Primary Green**: `#174735` - Warna utama brand
- **Background**: `#FAF9F5` - Latar belakang cream
- **Heading**: `#3D3D5E` - Teks judul abu-abu gelap

### Typography
- **Body**: Merriweather (serif) - untuk keterbacaan
- **Heading**: Alegreya Sans (sans-serif) - untuk UI & judul

## 📱 Mobile Optimization

Platform ini dioptimalkan khusus untuk pengguna mobile di Indonesia:

- Layout mobile-first responsive
- Touch-friendly interface
- Optimasi untuk koneksi lambat
- Lazy loading untuk gambar
- Bundle size minimal

## 🌍 Kontribusi

Proyek ini terbuka untuk kontribusi dari komunitas! 

### Cara Berkontribusi

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Areas yang Membutuhkan Kontribusi

- 📝 Konten edukasi komposting
- 🗂️ Data perusahaan komposting di Bali
- 🛠️ Produk dan alat komposting lokal
- 🌐 Terjemahan dan perbaikan bahasa
- 🎨 Improve UI/UX
- 🧪 Testing dan quality assurance

## 📄 License

Proyek ini menggunakan [MIT License](LICENSE) - open source untuk kepentingan lingkungan.

## 📞 Kontak

Untuk pertanyaan atau saran tentang proyek ini:

- 📧 Email: [info@balicomposting.com](mailto:info@balicomposting.com)
- 💬 Diskusi: GitHub Discussions
- 🐛 Bug reports: GitHub Issues

## 🙏 Acknowledgments

- Terinspirasi oleh gerakan zero waste di Bali
- Data wilayah administratif Bali dari berbagai sumber publik
- Komunitas open source Vue.js dan JavaScript
- Semua penyedia layanan komposting di Bali

---

**🌱 Mari bersama-sama menciptakan Bali yang lebih hijau dan berkelanjutan!**
