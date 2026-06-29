"use client"

import { createContext, useContext, useState, useTransition, useCallback, type ReactNode } from "react"
import type { Cart } from "@/lib/shopify/types"
import { addItemAction, updateItemAction, removeItemAction } from "@/lib/shopify/actions"

type CartContextType = {
  cart: Cart | null
  isOpen: boolean
  isPending: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (merchandiseId: string, quantity?: number) => void
  updateItem: (lineId: string, merchandiseId: string, quantity: number) => void
  removeItem: (lineId: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children, initialCart }: { children: ReactNode; initialCart: Cart | null }) {
  const [cart, setCart] = useState<Cart | null>(initialCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((merchandiseId: string, quantity = 1) => {
    setIsOpen(true)
    startTransition(async () => {
      const updated = await addItemAction(merchandiseId, quantity)
      setCart(updated)
    })
  }, [])

  const updateItem = useCallback((lineId: string, merchandiseId: string, quantity: number) => {
    startTransition(async () => {
      const updated = await updateItemAction(lineId, merchandiseId, quantity)
      setCart(updated)
    })
  }, [])

  const removeItem = useCallback((lineId: string) => {
    startTransition(async () => {
      const updated = await removeItemAction(lineId)
      setCart(updated)
    })
  }, [])

  return (
    <CartContext.Provider
      value={{ cart, isOpen, isPending, openCart, closeCart, addItem, updateItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
