/** Etiquetas para filtros y UI */
export const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'hygiene', label: 'Higiene' },
  { id: 'whitening', label: 'Blanqueamiento' },
  { id: 'tools', label: 'Instrumentos' },
]

export function categoryLabel(id) {
  return CATEGORY_FILTERS.find((c) => c.id === id)?.label ?? id
}
