"use server"

import { cookies } from "next/headers"
import { createCart, addToCart, removeFromCart, updateCart, getCart } from "@/lib/shopify"
import type { Cart } from "@/lib/shopify/types"

export async function getCartAction(): Promise<Cart | null> {
  const cartId = (await cookies()).get("cartId")?.value
  if (!cartId) return null
  try {
    return (await getCart(cartId)) ?? null
  } catch {
    return null
  }
}

export async function addItemAction(merchandiseId: string, quantity = 1): Promise<Cart> {
  const cookieStore = await cookies()
  let cartId = cookieStore.get("cartId")?.value
  let cart: Cart

  if (!cartId) {
    cart = await createCart()
    cartId = cart.id
    cookieStore.set("cartId", cartId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  cart = await addToCart(cartId, [{ merchandiseId, quantity }])
  return cart
}

export async function updateItemAction(lineId: string, merchandiseId: string, quantity: number): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value
  if (!cartId) throw new Error("No cart found")

  if (quantity === 0) {
    return await removeFromCart(cartId, [lineId])
  }

  return await updateCart(cartId, [{ id: lineId, merchandiseId, quantity }])
}

export async function removeItemAction(lineId: string): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value
  if (!cartId) throw new Error("No cart found")
  return await removeFromCart(cartId, [lineId])
}
