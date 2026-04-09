/** Contenedor con sombra y bordes redondeados para bloques de contenido */
export function Card({ children, className = '', as, ...props }) {
  const Component = as ?? 'div'
  return (
    <Component
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/50 transition-shadow duration-300 hover:shadow-md hover:shadow-slate-200/80 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
