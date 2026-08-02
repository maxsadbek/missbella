export type CategoryId = "dresses" | "skirts" | "blouses" | "suits";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Product {
  /** Slug shaklidagi unikal identifikator, URL'da ishlatiladi. */
  id: string;
  name: string;
  category: CategoryId;
  /** Narx (so'mda). */
  price: number;
  /** Eski narx — chegirma ko'rsatish uchun. */
  oldPrice?: number;
  description: string;
  /** Mahsulot xususiyatlari ro'yxati. */
  details: string[];
  sizes: string[];
  image: string;
  /** Bosh sahifadagi «Tanlangan mahsulotlar» bo'limiga chiqariladi. */
  featured?: boolean;
  isNew?: boolean;
}
