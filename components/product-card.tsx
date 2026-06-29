import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/shopify/types"
import { formatPrice } from "@/lib/utils"

export function ProductCard({ product }: { product: Product }) {
  const price = product.priceRange.minVariantPrice
  return (
    <Link href={`/produto/${product.handle}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url || "/placeholder.svg"}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Sem imagem</div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm leading-snug">{product.title}</h3>
          {product.tags?.[0] && (
            <p className="mt-1 text-xs tracking-wide text-muted-foreground">{product.tags[0]}</p>
          )}
        </div>
        <span className="whitespace-nowrap text-sm tabular-nums">
          {formatPrice(price.amount, price.currencyCode)}
        </span>
      </div>
    </Link>
  )
}
