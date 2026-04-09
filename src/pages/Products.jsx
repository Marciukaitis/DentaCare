import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import productsData from '../data/products.json'
import { CATEGORY_FILTERS } from '../data/categories'
import { ProductCard } from '../components/ProductCard'

export function Products() {
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    if (category === 'all') return productsData
    return productsData.filter((p) => p.category === category)
  }, [category])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <motion.h1
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          Arma tu rutina perfecta
        </motion.h1>
        <motion.p
          className="mt-3 text-lg text-slate-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          Elige categoría, explora fichas con detalle real y lleva al carrito solo lo que te
          convence.
        </motion.p>
      </header>

      <motion.div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar por categoría"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.4 }}
      >
        {CATEGORY_FILTERS.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              category === cat.id
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50 hover:ring-sky-200'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      <p className="mt-6 text-sm font-medium text-slate-500">
        {filtered.length} producto{filtered.length !== 1 ? 's' : ''} listos para ti
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, index) => (
          <motion.div
            key={product.id}
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.04 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-slate-600">
          No hay productos en esta categoría.
        </p>
      )}
    </div>
  )
}
