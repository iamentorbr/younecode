"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"
import { formatPrice } from "@/lib/utils"

export function ProductPurchase({ product }: { product: Product }) {
  const sizeOption = product.options.find((o) => o.name.toLowerCase() === "tamanho") ?? product.options[0]
  const [selected, setSelected] = useState<string | null>(
    sizeOption?.values.length === 1 ? sizeOption.values[0] : null,
  )
  const { addItem, isPending } = useCart()

  function findVariant(value: string | null): ProductVariant | undefined {
    if (!sizeOption) return product.variants[0]
    if (!value) return undefined
    return product.variants.find((v) =>
      v.selectedOptions.some((o) => o.name === sizeOption.name && o.value === value),
    )
  }

  const variant = findVariant(selected)
  const price = variant?.price ?? product.priceRange.minVariantPrice
  const soldOut = variant ? !variant.availableForSale : false

  function handleAdd() {
    if (!variant) return
    addItem(variant.id, 1)
  }

  return (
    <div>
      <p className="text-xl tabular-nums">{formatPrice(price.amount, price.currencyCode)}</p>

      {sizeOption && sizeOption.values.length > 1 && (
        <div className="mt-8">
          <p className="mb-3 text-xs tracking-[0.2em] text-muted-foreground">TAMANHO</p>
          <div className="flex flex-wrap gap-2">
            {sizeOption.values.map((value) => {
              const v = findVariant(value)
              const disabled = v ? !v.availableForSale : true
              const active = selected === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelected(value)}
                  disabled={disabled}
                  className={[
                    "flex h-11 min-w-11 items-center justify-center border px-4 text-sm transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground",
                    disabled ? "cursor-not-allowed text-muted-foreground line-through opacity-50" : "",
                  ].join(" ")}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={!variant || soldOut || isPending}
        className="mt-8 flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {soldOut ? "ESGOTADO" : !selected && sizeOption?.values.length > 1 ? "SELECIONE UM TAMANHO" : "ADICIONAR À SACOLA"}
      </button>
    </div>
  )
}
