# Movie App dengan Statistik

Aplikasi movie streaming dengan integrasi data statistik dari Google Drive JSON.

## Fitur

- 🎬 Daftar film dengan pencarian
- 📊 Dashboard statistik real-time
- 📱 Responsive design (mobile-first)
- 🌙 Dark mode support
- ⚡ Optimized untuk Vercel deployment

## Teknologi

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS dengan custom design system
- **Icons**: Material Icons
- **Deployment**: Vercel
- **Data**: JSON dari Google Drive

## Struktur Data Statistik

Aplikasi ini mengambil data statistik dari URL Google Drive:
```
https://drive.google.com/uc?export=download&id=1-5Q8zt1Fr-Uh4Mk4KoNQB27Zv2ty4ARy
```

Format data yang didukung:
```json
[
  {
    "id": "1",
    "title": "Total Movies",
    "value": 150,
    "description": "Total film dalam database",
    "category": "movies",
    "trend": "up",
    "percentage": 12
  }
]
```

## Getting Started

### Development
```bash
# Install dependencies
npm install

# Start JSON server (untuk development)
npm run server

# Start Next.js development server
npm run dev

# Atau jalankan keduanya sekaligus
npm run dev:all
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment ke Vercel

### 1. Persiapan
```bash
npm install
npm run build
```

### 2. Deploy ke Vercel
1. Push kode ke GitHub repository
2. Connect repository ke [Vercel](https://vercel.com/new)
3. Deploy otomatis akan berjalan

### 3. Konfigurasi
File `vercel.json` sudah dikonfigurasi dengan:
- Build command yang optimal
- Headers CORS untuk API
- Proxy untuk data movies (jika diperlukan)

## Fitur Statistik

### Caching
- Data statistik di-cache selama 5 menit
- Fallback ke data dummy jika fetch gagal
- Error handling yang robust

### Tampilan
- Grid responsive (1 kolom mobile, 3 kolom desktop)
- Loading skeleton saat fetch data
- Trend indicators (up/down/stable)
- Format angka yang user-friendly (K, M)

## Struktur Folder

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage dengan statistik
│   └── movie/[id]/     # Movie detail pages
├── components/         # React components
│   ├── MovieCard.tsx   # Movie card component
│   ├── SearchBar.tsx   # Search functionality
│   └── StatisticsCard.tsx # Statistics display
├── services/           # API services
│   └── statisticsService.ts # Statistics data fetching
└── types/              # TypeScript definitions
    ├── movie.ts        # Movie types
    └── statistics.ts   # Statistics types
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!