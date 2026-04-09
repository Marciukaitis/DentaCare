import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
