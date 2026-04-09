import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
    isActive
      ? 'bg-sky-100 text-sky-800'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export function Navbar() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2 text-slate-900 transition-transform duration-200 hover:scale-[1.02]"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-lg font-bold text-sky-600 shadow-inner"
            aria-hidden
          >
            D
          </span>
          <span className="font-semibold tracking-tight">
            Denta<span className="text-sky-600">Care</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Principal">
          <NavLink to="/" className={navLinkClass} end>
            Inicio
          </NavLink>
          <NavLink to="/productos" className={navLinkClass}>
            Productos
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
            aria-label={`Carrito${itemCount ? `, ${itemCount} artículos` : ', vacío'}`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-500 px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav
        className="flex border-t border-slate-100 px-4 py-2 sm:hidden"
        aria-label="Móvil"
      >
        <NavLink to="/" className={(p) => `${navLinkClass(p)} flex-1 justify-center text-center`} end>
          Inicio
        </NavLink>
        <NavLink to="/productos" className={(p) => `${navLinkClass(p)} flex-1 justify-center text-center`}>
          Productos
        </NavLink>
      </nav>
    </header>
  )
}
