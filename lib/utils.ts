import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: string | number, _currencyCode?: string) {
  const value = typeof amount === "string" ? Number.parseFloat(amount) : amount
  // Os preços são cadastrados em Real. A moeda-base da loja Shopify (USD) é ignorada
  // propositalmente para exibir sempre em BRL na vitrine e no carrinho.
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
