import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { formatPrice } from '../utils/format'
import { Card } from './Card'
import { ProductImage } from './ProductImage'

/** Tarjeta con ligera inclinación 3D al mover el cursor (parallax suave). */
export function ProductCard({ product }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 280,
    damping: 32,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 280,
    damping: 32,
  })

  function onPointerMove(e) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onPointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="h-full" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <Card className="h-full group overflow-hidden shadow-lg shadow-sky-100/60 ring-1 ring-sky-100/50 transition-shadow duration-300 hover:shadow-2xl hover:shadow-sky-200/40">
          <Link
            to={`/productos/${product.id}`}
            className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          >
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-sky-50">
              <ProductImage
                product={product}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-sky-500/10 opacity-60 transition duration-300 group-hover:opacity-80" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur">
                Ver ficha
              </span>
            </div>
            <div className="p-4 text-left">
              <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-sky-700 line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.shortDescription}</p>
              <p className="mt-3 text-lg font-bold text-sky-600">{formatPrice(product.price)}</p>
            </div>
          </Link>
        </Card>
      </motion.div>
    </div>
  )
}
