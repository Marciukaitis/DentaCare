import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import productsData from '../data/products.json'
import { Button } from '../components/Button'
import { ProductCard } from '../components/ProductCard'
import { AnimatedCounter } from '../components/AnimatedCounter'

const Hero3D = lazy(() =>
  import('../components/Hero3D.jsx').then((m) => ({ default: m.Hero3D }))
)

const featured = productsData.slice(0, 4)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Home() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="overflow-x-hidden">
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50">
        <div
          className="hero-blob hero-blob-1 pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-sky-300/50 to-cyan-200/30 blur-3xl"
          aria-hidden
        />
        <div
          className="hero-blob hero-blob-2 pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-indigo-200/40 to-sky-100/50 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
              Hoy es buen día para cuidarte
            </motion.p>

            <motion.h1
              className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.15rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Tu confianza empieza con una{' '}
              <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                sonrisa que te representa
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              Pequeños hábitos, grandes resultados: higiene clara, productos honestos y el impulso
              visual que necesitas para mantener la rutina. Sin promesas mágicas — solo constancia y
              buenas herramientas.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <Button as={Link} to="/productos" variant="primary" className="shadow-lg shadow-sky-500/30">
                Empezar ahora
              </Button>
              <Button as={Link} to="/productos#destacados" variant="secondary">
                Ver lo más vendido
              </Button>
            </motion.div>

            <motion.dl
              className="mt-12 grid grid-cols-3 gap-4 border-t border-sky-100/80 pt-10 sm:max-w-md"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Catálogo
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                  <AnimatedCounter value={productsData.length} suffix="+" />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Rutinas
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                  <AnimatedCounter value={3} suffix="" />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Clientes conformes
                </dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-sky-600">100%</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200 }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/60 via-transparent to-cyan-100/40 blur-2xl" />
            <Suspense
              fallback={
                <div className="flex h-[min(420px,52vh)] min-h-[260px] w-full items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100/80 to-white shadow-xl ring-1 ring-sky-100">
                  <span className="text-sm font-medium text-sky-600/80">Cargando escena 3D…</span>
                </div>
              }
            >
              <Hero3D />
            </Suspense>
            {/* <p className="mt-4 text-center text-xs text-slate-500">
              Vista 3D interactiva · movimiento suave para transmitir frescura y tecnología
            </p> */}
          </motion.div>
        </div>
      </section>

      <section id="destacados" className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.h2
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={0}
            >
              Lo que la gente está eligiendo
            </motion.h2>
            <motion.p
              className="mt-3 max-w-xl text-lg text-slate-600"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={1}
            >
              Productos con feedback real en la descripción: para que sepas qué esperar y te sientas
              seguro al comprar.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition hover:gap-3 hover:text-sky-800"
            >
              Explorar todo el catálogo
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              className="h-full"
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-sky-100/80 bg-gradient-to-br from-slate-50 via-white to-sky-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Tres pilares, una decisión fácil
            </h2>
            <p className="mt-3 text-slate-600">
              Diseñamos la experiencia para que te sientas acompañado: claridad, calma visual y pasos
              concretos.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Rapidez que se nota',
                body:
                  'Encuentra lo que buscas en segundos. Filtros claros y fichas que respetan tu tiempo.',
                icon: '⚡',
              },
              {
                title: 'Transparencia total',
                body:
                  'Ingredientes, uso recomendado y límites: información útil, no marketing vacío.',
                icon: '🛡️',
              },
              {
                title: 'Motivación sostenible',
                body:
                  'Te ayudamos a construir hábitos: recordatorios visuales y carrito que no pierde tu selección.',
                icon: '✨',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={reduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl border border-white/80 bg-white/90 p-7 shadow-lg shadow-sky-100/50 ring-1 ring-sky-100/60 backdrop-blur-sm"
              >
                <span className="text-3xl" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
