/**
 * MissBella — markaziy konfiguratsiya.
 *
 * TELEGRAM_LINK — «Sotib olish» tugmasi yo'naltiriladigan havola.
 * Kelajakda Telegram bot ulanganda faqat shu qiymatni almashtirish kifoya.
 */
export const TELEGRAM_LINK = "https://t.me/missbella_shop";

export const SITE = {
  name: "MissBella",
  tagline: "Ayollar kiyimi onlayn-do'koni",
  description:
    "MissBella — har bir ayolning o'z uslubini topishi uchun tanlangan premium ayollar kiyimlari. Buyurtma Telegram orqali qabul qilinadi.",
  telegramLink: TELEGRAM_LINK,
  telegramHandle: "missbella_shop",
  phone: "+998 90 123 45 67",
  phoneHref: "tel:+998901234567",
  email: "info@missbella.uz",
  address: "Toshkent sh., Amir Temur ko'chasi, 15",
  workDays: "Du — Shan",
  workHours: "10:00 dan 20:00 gacha",
  instagramLink: "https://instagram.com/missbella_shop",
  foundedYear: 2019,
} as const;
