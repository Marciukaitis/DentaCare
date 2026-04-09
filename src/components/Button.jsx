/**
 * Botón primario o secundario con transiciones suaves.
 */
export function Button({
  children,
  variant = 'primary',
  className = '',
  as,
  ...props
}) {
  const Component = as ?? 'button'
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const styles = {
    primary:
      'bg-sky-500 text-white shadow-md shadow-sky-500/25 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30 active:scale-[0.98] focus-visible:outline-sky-500',
    secondary:
      'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800 active:scale-[0.98] focus-visible:outline-sky-400',
    ghost:
      'text-sky-700 hover:bg-sky-100/80 focus-visible:outline-sky-400',
  }
  return (
    <Component
      className={`${base} ${styles[variant] ?? styles.primary} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
