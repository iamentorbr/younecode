import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Logo className="text-foreground" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Engenharia do Vestir®. Sistemas modulares que organizam o seu dia, da manhã à presença.
          </p>
          <Link
            href="https://www.instagram.com/younecode/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da YOUNE CODE"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>@younecode</span>
          </Link>
        </div>

        <div>
          <h3 className="mb-4 text-xs tracking-[0.2em] text-foreground">COLEÇÕES</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/colecoes/essential" className="hover:text-foreground">Essential</Link></li>
            <li><Link href="/colecoes/signature" className="hover:text-foreground">Signature</Link></li>
            <li><Link href="/colecoes/essencia" className="hover:text-foreground">Essência</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs tracking-[0.2em] text-foreground">A MARCA</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/sistema" className="hover:text-foreground">O Sistema</Link></li>
            <li><Link href="/" className="hover:text-foreground">Engenharia do Vestir</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs tracking-[0.2em] text-foreground">ATENDIMENTO</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Trocas e devoluções</li>
            <li>Envios para todo o Brasil</li>
            <li>Pagamento seguro</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} YOUNE CODE — Sistemas de Vestir.</p>
          <p>Feito com Engenharia do Vestir®.</p>
        </div>
      </div>
    </footer>
  )
}
