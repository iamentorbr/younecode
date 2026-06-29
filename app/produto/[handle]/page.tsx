import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProduct } from "@/lib/shopify"
import { ProductPurchase } from "@/components/product-purchase"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description,
    openGraph: product.featuredImage
      ? { images: [{ url: product.featuredImage.url }] }
      : undefined,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()

  const images = product.images.length > 0 ? product.images : product.featuredImage ? [product.featuredImage] : []

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="grid gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-[3/4] overflow-hidden bg-secondary">
              <Image
                src={img.url || "/placeholder.svg"}
                alt={img.altText || product.title}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="md:sticky md:top-28 md:self-start">
          {product.tags?.[0] && (
            <p className="text-xs tracking-[0.25em] text-accent">{product.tags[0].toUpperCase()}</p>
          )}
          <h1 className="mt-3 font-serif text-3xl md:text-4xl">{product.title}</h1>

          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>

          {product.descriptionHtml && (
            <div
              className="prose-sm mt-10 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          <dl className="mt-8 space-y-3 border-t border-border pt-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <dt className="tracking-[0.15em] text-foreground">ENVIO</dt>
              <dd>Para todo o Brasil.</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="tracking-[0.15em] text-foreground">TROCAS</dt>
              <dd>Primeira troca gratuita em até 30 dias.</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
