import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Vuelve arriba al cambiar de ruta (mejor UX en SPA). */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
