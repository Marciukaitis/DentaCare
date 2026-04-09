/** URL estable por producto (Picsum con seed = siempre la misma imagen y alta disponibilidad). */
export function productImageUrl(productId) {
  return `https://picsum.photos/seed/${encodeURIComponent(productId)}/600/600`
}
