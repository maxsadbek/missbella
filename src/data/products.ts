import type { Category, CategoryId, Product } from "@/types/product";

export const CATEGORIES: Category[] = [
  { id: "dresses", label: "Ko'ylaklar" },
  { id: "skirts", label: "Yubkalar" },
  { id: "blouses", label: "Bluzkalar" },
  { id: "suits", label: "Kostyumlar" },
];

const IMG = {
  hero: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop",
  store: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1400&auto=format&fit=crop",
  team1: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=800&auto=format&fit=crop",
  team2: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
  team3: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
};

const p = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1200&auto=format&fit=crop`;

export const HERO_IMAGE = IMG.hero;
export const STORE_IMAGE = IMG.store;
export const TEAM_IMAGES = [IMG.team1, IMG.team2, IMG.team3];

const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"];

export const PRODUCTS: Product[] = [
  {
    id: "qizil-kechki-ko'ylak",
    name: "Qizil kechki ko'ylak",
    category: "dresses",
    price: 890_000,
    description:
      "Kechki tadbirlar uchun mo'ljallangan, diqqatni tortuvchi qizil ko'ylak. Yumshoq mato va to'g'ri kesim har qanday figurani nafis ta'kidlaydi. Ziyofat, to'y va maxsus uchrashuvlar uchun ideal tanlov.",
    details: [
      "Yuqori sifatli saten mato",
      "To'g'ri (A-siluet) kesim",
      "Yashirin fermuar",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1581044777550-4cfa60707c03"),
    featured: true,
    isNew: true,
  },
  {
    id: "krem-saten-ko'ylak",
    name: "Krem rang saten ko'ylak",
    category: "dresses",
    price: 720_000,
    oldPrice: 820_000,
    description:
      "Yumshoq krem rangdagi saten ko'ylak — kundalikdan kechki uslubgacha mos keladigan universal model. Yengil mato harakatni cheklamaydi, kesim esa har qanday vaziyatda o'zini ko'rsatadi.",
    details: [
      "Yumshoq saten mato",
      "Yarim o'ralgan kesim",
      "Uzunlik: tizza ostida",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1496747611176-843222e1e57c"),
    featured: true,
  },
  {
    id: "oq-kokteyl-ko'ylak",
    name: "Oq kokteyl ko'ylak",
    category: "dresses",
    price: 650_000,
    description:
      "Kokteyl va rasmiy tadbirlar uchun klassik oq ko'ylak. Minimal dizayn, aniq chiziqlar va yorqin aksessuarlar bilan mukammal uyg'unlashadi.",
    details: [
      "Havodor kokteyl mato",
      "Klassik qalam kesim",
      "Yon cho'ntaklar",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1515372039744-b8f02a3ae446"),
  },
  {
    id: "qora-qalam-yubka",
    name: "Qora qalam yubka",
    category: "skirts",
    price: 340_000,
    description:
      "Ofis va biznes uslubning ajralmas qismi — qora qalam yubka. Elastik mato kun bo'yi qulaylikni, klassik kesim esa nafislikni ta'minlaydi.",
    details: [
      "Elastik kostyum mato",
      "Orqa tomonida yashirin fermuar",
      "Tizza ostidagi uzunlik",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1485968579580-b6d095142e6e"),
  },
  {
    id: "shifon-plisse-yubka",
    name: "Shifon plisse yubka",
    category: "skirts",
    price: 420_000,
    description:
      "Yengil shifon matodan tikilgan plisse yubka — bahor va yoz mavsumi uchun ideal. Harakatda chiroyli oqadi va ayollikni ta'kidlaydi.",
    details: [
      "Yengil shifon mato",
      "Plisse burmalar",
      "Ichki astar",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1469334031218-e382a71b716b"),
  },
  {
    id: "mini-teri-yubka",
    name: "Mini teri yubka",
    category: "skirts",
    price: 380_000,
    description:
      "Kundalik shahar uslubi uchun mini teri yubka. Ko'ylak va sviterlar bilan birlashib, har qanday obrazni to'ldiradi.",
    details: [
      "Yumshoq eko-teri",
      "Yuqori bel",
      "Qisqa uzunlik",
      "Nam latta bilan artish",
    ],
    sizes: STANDARD_SIZES,
    image: p("1524504388940-b1c1722653e1"),
    isNew: true,
  },
  {
    id: "oq-ipak-bluzka",
    name: "Oq ipak bluzka",
    category: "blouses",
    price: 450_000,
    description:
      "Tabiiy ipakdan tikilgan oq bluzka — garderobingizning asosiy elementi. Yumshoq mato va zamonaviy kesim ishda ham, dam olishda ham mos keladi.",
    details: [
      "Tabiiy ipak",
      "Oq rang — har qanday uslubga mos",
      "Yengil qo'shilib turadigan kesim",
      "Yuvish: qo'lda yoki kimyoviy tozalash",
    ],
    sizes: STANDARD_SIZES,
    image: p("1596755094514-f87e34085b2c"),
    featured: true,
  },
  {
    id: "qizil-atlas-bluzka",
    name: "Qizil atlas bluzka",
    category: "blouses",
    price: 470_000,
    description:
      "Yorqin qizil atlas bluzka — kechki uslubni yaratish uchun. Atlas yuzasi yorug'likda chiroyli yarqirab, tasviringizni unutilmas qiladi.",
    details: [
      "Atlas mato",
      "Yarqiroq yuzasi",
      "Manjetli yenglar",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1515886657613-9f3515b0c78f"),
  },
  {
    id: "krem-bluzka",
    name: "Krem rang bluzka",
    category: "blouses",
    price: 390_000,
    description:
      "Muloyim krem rangdagi bluzka — ofis va kundalik kiyim uchun. Yengil mato va nafis detallar har qanday garderobni to'ldiradi.",
    details: [
      "Yengil viskoza mato",
      "Yarim o'ralgan kesim",
      "Ochiq bo'yin chizig'i",
      "Yuvish: 30°C nozik rejim",
    ],
    sizes: STANDARD_SIZES,
    image: p("1539109136881-3be0616acf4b"),
  },
  {
    id: "ikki-qismli-qizil-kostyum",
    name: "Ikki qismli qizil kostyum",
    category: "suits",
    price: 1_250_000,
    oldPrice: 1_450_000,
    description:
      "Blazer va shimdan iborat ikki qismli kostyum — biznes uchrashuvlar va tadbirlar uchun. Yorqin rang o'zingizga bo'lgan ishonchni ta'kidlaydi.",
    details: [
      "Yuqori sifatli kostyum mato",
      "Blazer + shim to'plami",
      "Klassik kesim",
      "Kimyoviy tozalash tavsiya etiladi",
    ],
    sizes: STANDARD_SIZES,
    image: p("1519238263530-99bdd11df2ea"),
    featured: true,
  },
  {
    id: "krem-blazer",
    name: "Krem rang blazer",
    category: "suits",
    price: 890_000,
    description:
      "Krem rangdagi yengil blazer — kostyum va jinsi shimlar bilan bir xil darajada birlashadi. Ishdan tashqari kechki uslub uchun ham mos.",
    details: [
      "Yengil blazer mato",
      "Bir tugmali yopilish",
      "Ichki cho'ntaklar",
      "Kimyoviy tozalash tavsiya etiladi",
    ],
    sizes: STANDARD_SIZES,
    image: p("1509631179647-0177331693ae"),
  },
  {
    id: "klassik-biznes-kostyum",
    name: "Klassik biznes kostyum",
    category: "suits",
    price: 1_350_000,
    description:
      "O'lchamiga qarab moslashtirilgan klassik biznes kostyum. Yuqori sifatli mato va professional kesim — har kuni a'lo darajada ko'rinish.",
    details: [
      "Premium kostyum mato",
      "Pidjak + shim to'plami",
      "Yarim o'ralgan kesim",
      "Kimyoviy tozalash tavsiya etiladi",
    ],
    sizes: STANDARD_SIZES,
    image: p("1490481651871-ab68de25d43d"),
    isNew: true,
  },
];

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getProductById(id: string | undefined): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.featured);
}

/** O'xshash mahsulotlar: avval bir xil kategoriya, keyin qolganlari. */
export function getSimilarProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}
