import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import productsData from '../data/products.json'
import { categoryLabel } from '../data/categories'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ProductImage } from '../components/ProductImage'

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const product = productsData.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Producto no encontrado</h1>
        <p className="mt-2 text-slate-600">El enlace puede estar incompleto o el artículo ya no está disponible.</p>
        <Button className="mt-8" as={Link} to="/productos" variant="primary">
          Volver al catálogo
        </Button>
      </div>
    )
  }

  function handleAdd() {
    addToCart(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-sky-600 transition hover:text-sky-800"
      >
        ← Volver
      </button>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Card className="overflow-hidden p-0 ring-1 ring-sky-100/60 shadow-xl shadow-sky-100/40">
          <div className="aspect-square bg-gradient-to-br from-slate-100 to-sky-50">
            <ProductImage
              product={product}
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
          </div>
        </Card>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-sky-600">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-sky-600">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-relaxed text-slate-600">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <span className="sr-only">Cantidad</span>
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </label>
            <Button type="button" variant="primary" onClick={handleAdd}>
              {added ? 'Añadido al carrito ✓' : 'Añadir al carrito'}
            </Button>
            <Button as={Link} to="/carrito" variant="secondary">
              Ir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
