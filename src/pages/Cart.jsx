import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ProductImage } from '../components/ProductImage'

export function Cart() {
  const { items, subtotal, setQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Tu carrito está vacío</h1>
        <p className="mt-3 text-slate-600">
          Explora el catálogo y guarda aquí lo que quieras comprar más adelante.
        </p>
        <Button as={Link} to="/productos" variant="primary" className="mt-8">
          Ver productos
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Carrito</h1>
      <p className="mt-2 text-slate-600">
        Ajusta cantidades o elimina líneas. El total se actualiza al instante.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity, lineTotal }) => (
            <li key={product.id}>
              <Card className="flex flex-col gap-4 p-4 transition hover:shadow-md sm:flex-row sm:items-center">
                <Link
                  to={`/productos/${product.id}`}
                  className="flex shrink-0 gap-4 sm:items-center"
                >
                  <div className="h-24 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-sky-50 ring-1 ring-sky-100/50">
                    <ProductImage
                      product={product}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-slate-900 hover:text-sky-700">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {formatPrice(product.price)} / ud.
                    </p>
                  </div>
                </Link>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-col sm:border-t-0 sm:pt-0 sm:pl-4 md:flex-row md:border-l md:pl-6">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Reducir cantidad"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar cantidad"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-slate-900 tabular-nums">
                      {formatPrice(lineTotal)}
                    </p>
                    <button
                      type="button"
                      className="text-sm font-medium text-red-600 transition hover:text-red-800"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-1">
          <Card className="sticky top-24 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Resumen</h2>
            <div className="mt-4 flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Gastos de envío e impuestos se calcularían en un checkout real.
            </p>
            <Button
              type="button"
              variant="primary"
              className="mt-6 w-full"
              disabled
              title="Demo: no hay pasarela de pago"
            >
              Finalizar compra (demo)
            </Button>
            <Link
              to="/productos"
              className="mt-4 block text-center text-sm font-medium text-sky-600 hover:text-sky-800"
            >
              Seguir comprando
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  )
}
