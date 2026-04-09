import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import productsData from '../data/products.json'

const STORAGE_KEY = 'dentacare-cart'

const CartContext = createContext(null)

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line) =>
        line &&
        typeof line.productId === 'string' &&
        typeof line.quantity === 'number' &&
        line.quantity > 0
    )
  } catch {
    return []
  }
}

function getProductById(id) {
  return productsData.find((p) => p.id === id)
}

function computeCart(lines) {
  return lines.reduce(
    (acc, line) => {
      const product = getProductById(line.productId)
      if (!product) return acc
      const lineTotal = product.price * line.quantity
      return {
        items: [...acc.items, { ...line, product, lineTotal }],
        subtotal: acc.subtotal + lineTotal,
        itemCount: acc.itemCount + line.quantity,
      }
    },
    { items: [], subtotal: 0, itemCount: 0 }
  )
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadInitialCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const addToCart = useCallback((productId, qty = 1) => {
    if (!getProductById(productId)) return
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId)
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + qty }
            : l
        )
      }
      return [...prev, { productId, quantity: qty }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const setQuantity = useCallback((productId, quantity) => {
    const q = Math.max(0, Math.floor(Number(quantity)) || 0)
    if (q === 0) {
      setLines((prev) => prev.filter((l) => l.productId !== productId))
      return
    }
    setLines((prev) => {
      const exists = prev.some((l) => l.productId === productId)
      if (!exists) return [...prev, { productId, quantity: q }]
      return prev.map((l) =>
        l.productId === productId ? { ...l, quantity: q } : l
      )
    })
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const { items, subtotal, itemCount } = computeCart(lines)
    return {
      items,
      lineCount: lines.length,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
    }
  }, [lines, addToCart, removeFromCart, setQuantity, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook ligado al provider
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
