# MissBella — ayollar kiyimi onlayn-do'koni (demo)

MissBella — ayollar kiyimi do'koni uchun demo onlayn-do'kon sayti. Faqat
frontend, backend yo'q. **«Sotib olish»** tugmasi Telegram linkiga olib boradi
(keyinchalik Telegram bot ulanadi).

## Texnologiyalar

- **Vite + React 19 + TypeScript**
- **React Router v7** — sahifalar orasidagi routing
- **Tailwind CSS v4** — barcha stillar (CSS-based config, `src/index.css`)
- **shadcn/ui** — bazaviy komponentlar (Button, Input, Textarea, Label)
- **Framer Motion** — faqat nozik fade/opacity o'tishlari
- **lucide-react** — ikonkalar
- **Google Fonts**: Playfair Display (sarlavhalar) + Inter (matn)

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # tsc + production build (dist/)
npm run preview    # build'ni ko'rish
npm run typecheck  # TypeScript tekshiruvi
```

## Sahifalar

| Yo'l              | Sahifa                              |
| ----------------- | ----------------------------------- |
| `/`               | Bosh sahifa (Hero, tanlanganlar, haqimizda, Telegram CTA) |
| `/catalog`        | Katalog (kategoriya filtri bilan)   |
| `/product/:id`    | Mahsulot sahifasi (o'lcham, narx, «Sotib olish», o'xshashlar) |
| `/about`          | Biz haqimizda                       |
| `/contact`        | Aloqa (forma → Telegram)            |

## Muhim fayllar

- `src/config.ts` — **`TELEGRAM_LINK`** va sayt sozlamalari. Telegram bot
  ulanganda faqat shu qiymatni almashtiring.
- `src/data/products.ts` — mahsulotlar statik ma'lumoti (keyinchalik backend
  bilan almashtiriladi). `Product` tiplari `src/types/product.ts` da.
- `src/components/ui/BuyButton.tsx` — «Sotib olish» tugmasi, doim
  `TELEGRAM_LINK` ga yo'naltiradi.
- `src/index.css` — rang sxemasi (`brand-50…brand-950`, `brand-white`),
  shriflar, radius sozlamalari.

## Dizayn qoidalari

- Rang: faqat oq (`#FFFFFF`) va qizil (`#DF2B22`) oilasi.
- `rounded-none` — tekis kesilgan tugmalar, standart rounded ishlatilmaydi.
- Hover: faqat rang/border/underline o'tishlari (`transition-colors
  duration-300`), transform taqiqlangan.
- Katta harf oraliqli (tracking-wide) sarlavhalar, ko'p bo'sh joy.
