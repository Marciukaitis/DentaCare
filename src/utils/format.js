export function formatPrice(value) {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 0, // opcional (en pesos suele usarse sin decimales)
  }).format(value)
}