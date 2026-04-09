import { useState } from 'react'
import { productImageUrl } from '../utils/imageUrl'

const PLACEHOLDER =
  'https://placehold.co/600x600/f1f5f9/0ea5e9/png?text=DentaCare'

/**
 * Imagen de producto: si la URL principal falla, usa un marcador fiable.
 */
export function ProductImage({ product, className = '', alt, loading = 'lazy', ...rest }) {
  const primary = product.image?.trim() || productImageUrl(product.id)
  const [src, setSrc] = useState(primary)

  return (
    <img
      {...rest}
      src={src}
      alt={alt ?? product.name}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => {
        if (src !== PLACEHOLDER) setSrc(PLACEHOLDER)
      }}
    />
  )
}
