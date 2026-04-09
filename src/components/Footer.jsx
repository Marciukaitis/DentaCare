import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold text-slate-900">
              Denta<span className="text-sky-600">Care</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Productos de higiene y cuidado bucodental seleccionados para el día a día.
              Información clara, sin promesas mágicas: solo herramientas que funcionan
              cuando las usas bien.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="font-semibold text-slate-800">Compra</p>
              <ul className="mt-2 space-y-2 text-slate-600">
                <li>
                  <Link to="/productos" className="transition-colors hover:text-sky-600">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link to="/carrito" className="transition-colors hover:text-sky-600">
                    Carrito
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Aviso</p>
              <p className="mt-2 max-w-xs text-slate-500">
                Demo: no hay pago ni envíos reales. Los textos son orientativos;
                ante cualquier duda clínica, consulta a tu dentista.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DentaCare - Demo sin fines comerciales. Información orientativa, no sustituye consejo profesional.
        </p>
      </div>
    </footer>
  )
}
