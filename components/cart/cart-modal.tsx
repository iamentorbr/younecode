"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, X, Minus, Plus, Loader2 } from "lucide-react"
import { useCart } from "./cart-context"
import { formatPrice } from "@/lib/utils"

export function CartModal() {
  const { cart, isOpen, isPending, openCart, closeCart, updateItem } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  const lines = cart?.lines ?? []
  const quantity = cart?.totalQuantity ?? 0

  function checkout() {
    if (!cart?.checkoutUrl) return
    setCheckingOut(true)
    const url = new URL(cart.checkoutUrl)
    url.searchParams.set("channel", "online_store")
    if (window.self !== window.top) {
      window.open(url.toString(), "_blank")
      setCheckingOut(false)
    } else {
      window.location.href = url.toString()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openCart}
        className="relative flex items-center gap-2 text-sm tracking-wide transition-opacity hover:opacity-70"
        aria-label={`Abrir sacola, ${quantity} itens`}
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
        {quantity > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
            {quantity}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Fechar sacola"
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          <aside className="relative flex h-full w-full max-w-md flex-col bg-background shadow-xl">
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-serif text-lg tracking-wide">Sua Sacola</h2>
              <button type="button" onClick={closeCart} aria-label="Fechar">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Sua sacola está vazia.</p>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto px-6 py-4">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4 border-b border-border py-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-secondary">
                      {line.merchandise.product.featuredImage && (
                        <Image
                          src={line.merchandise.product.featuredImage.url || "/placeholder.svg"}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm leading-snug">{line.merchandise.product.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{line.merchandise.title}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-border px-2 py-1">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => updateItem(line.id, line.merchandise.id, line.quantity - 1)}
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs tabular-nums">{line.quantity}</span>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => updateItem(line.id, line.merchandise.id, line.quantity + 1)}
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm tabular-nums">
                          {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {lines.length > 0 && cart && (
              <footer className="border-t border-border px-6 py-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">
                    {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={checkout}
                  disabled={checkingOut}
                  className="flex w-full items-center justify-center gap-2 bg-foreground py-4 text-sm tracking-[0.15em] text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {checkingOut && <Loader2 className="h-4 w-4 animate-spin" />}
                  FINALIZAR COMPRA
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Frete e impostos calculados no checkout.
                </p>
              </footer>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
