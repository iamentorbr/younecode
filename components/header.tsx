import Link from "next/link"
import { Logo } from "./logo"
import { CartModal } from "./cart/cart-modal"

const links = [
  { href: "/colecoes/essential", label: "Essential" },
  { href: "/colecoes/signature", label: "Signature" },
  { href: "/colecoes/essencia", label: "Essência" },
  { href: "/sistema", label: "O Sistema" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <nav className="hidden flex-1 items-center gap-8 md:flex" aria-label="Coleções">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex-1 text-center md:flex-none" aria-label="YOUNE CODE — Início">
          <Logo className="text-foreground" />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          <CartModal />
        </div>
      </div>
    </header>
  )
}
