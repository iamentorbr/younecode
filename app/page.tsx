import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/shopify"
import { ProductCard } from "@/components/product-card"

const systems = [
  {
    handle: "essential",
    name: "Essential",
    system: "Sistema Manhã",
    desc: "Conforto que organiza o seu dia — da casa ao home office.",
  },
  {
    handle: "signature",
    name: "Signature",
    system: "Sistema Presença",
    desc: "A presença que abre portas — de reuniões a viagens.",
  },
  {
    handle: "essencia",
    name: "Essência",
    system: "Sistema Essência",
    desc: "Para os momentos que marcam — a sua melhor versão.",
  },
]

export default async function HomePage() {
  const featured = await getProducts({ first: 8 })

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
          <Image src="/hero.png" alt="Campanha YOUNE CODE" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/10 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="max-w-xl text-background">
                <p className="mb-4 text-xs tracking-[0.35em]">SISTEMAS DE VESTIR</p>
                <h1 className="text-balance font-serif text-4xl leading-tight md:text-6xl">
                  Menos decisões. Mais presença.
                </h1>
                <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-background/90 md:text-base">
                  YOUNE CODE não é uma marca de roupas. É um sistema modular, projetado com a Engenharia
                  do Vestir® para cada momento do seu dia.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/colecoes/essential"
                    className="bg-background px-8 py-4 text-xs tracking-[0.2em] text-foreground transition-opacity hover:opacity-90"
                  >
                    EXPLORAR COLEÇÕES
                  </Link>
                  <Link
                    href="/sistema"
                    className="border border-background/60 px-8 py-4 text-xs tracking-[0.2em] text-background transition-colors hover:bg-background/10"
                  >
                    O SISTEMA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground">TRÊS SISTEMAS</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Um guarda-roupa que funciona</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {systems.map((s) => (
            <Link
              key={s.handle}
              href={`/colecoes/${s.handle}`}
              className="group flex flex-col border border-border p-8 transition-colors hover:bg-secondary"
            >
              <p className="text-xs tracking-[0.25em] text-accent">{s.system.toUpperCase()}</p>
              <h3 className="mt-3 font-serif text-2xl">{s.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="mt-6 text-xs tracking-[0.2em] text-foreground transition-transform group-hover:translate-x-1">
                VER COLEÇÃO →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-2xl md:text-3xl">Destaques</h2>
          <Link href="/colecoes/essential" className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground">
            VER TUDO →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
