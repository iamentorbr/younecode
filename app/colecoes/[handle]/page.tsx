import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCollectionProducts } from "@/lib/shopify"
import { ProductCard } from "@/components/product-card"

const collections: Record<string, { name: string; system: string; desc: string }> = {
  essential: {
    name: "Essential",
    system: "Sistema Manhã",
    desc: "Conforto que organiza o seu dia — da casa ao home office, do mercado à caminhada.",
  },
  signature: {
    name: "Signature",
    system: "Sistema Presença",
    desc: "A presença que abre portas — de reuniões a viagens, com elegância funcional como base.",
  },
  essencia: {
    name: "Essência",
    system: "Sistema Essência",
    desc: "Para os momentos que marcam — a elegância que acompanha a sua melhor versão.",
  },
}

export function generateStaticParams() {
  return Object.keys(collections).map((handle) => ({ handle }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const info = collections[handle]
  if (!info) return {}
  return { title: info.name, description: info.desc }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const info = collections[handle]
  if (!info) notFound()

  const products = await getCollectionProducts(handle)

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs tracking-[0.3em] text-accent">{info.system.toUpperCase()}</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">{info.name}</h1>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{info.desc}</p>
      </header>

      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">Em breve, novos módulos para este sistema.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
