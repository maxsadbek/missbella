/** Narxni «890 000 so'm» ko'rinishida formatlaydi. */
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}
