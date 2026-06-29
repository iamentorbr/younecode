import "server-only"
import { cartFragment, productFragment } from "./fragments"
import type { Cart, CartLine, Collection, Product } from "./types"

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, "")}`
  : ""
const endpoint = `${domain}/api/2025-04/graphql.json`
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

type GraphQLResponse<T> = {
  data: T
  errors?: { message: string }[]
}

async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}): Promise<T> {
  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": key,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags ? { next: { tags } } : {}),
  })

  const body = (await result.json()) as GraphQLResponse<T>

  if (body.errors) {
    console.log("[v0] Shopify error:", JSON.stringify(body.errors))
    throw new Error(body.errors[0]?.message || "Shopify request failed")
  }

  return body.data
}

/* ---------- reshape helpers ---------- */

type Edge<T> = { node: T }
type Connection<T> = { edges: Edge<T>[] }

function removeEdges<T>(connection: Connection<T>): T[] {
  return connection.edges.map((e) => e.node)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function reshapeProduct(node: any): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    availableForSale: node.availableForSale,
    tags: node.tags,
    productType: node.productType,
    featuredImage: node.featuredImage,
    images: node.images ? removeEdges(node.images) : [],
    priceRange: node.priceRange,
    options: node.options,
    variants: node.variants ? removeEdges(node.variants) : [],
  }
}

function reshapeCart(cart: any): Cart {
  const lines: CartLine[] = cart.lines ? removeEdges(cart.lines) : []
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: cart.cost,
    lines,
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ---------- products ---------- */

export async function getProducts(options?: {
  sortKey?: string
  reverse?: boolean
  query?: string
  first?: number
}): Promise<Product[]> {
  const data = await shopifyFetch<{ products: Connection<any> }>({
    query: /* GraphQL */ `
      query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $first: Int) {
        products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $first) {
          edges {
            node {
              ...product
            }
          }
        }
      }
      ${productFragment}
    `,
    variables: {
      sortKey: options?.sortKey,
      reverse: options?.reverse,
      query: options?.query,
      first: options?.first ?? 100,
    },
    tags: ["products"],
  })
  return removeEdges(data.products).map(reshapeProduct)
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const data = await shopifyFetch<{ product: any }>({
    query: /* GraphQL */ `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          ...product
        }
      }
      ${productFragment}
    `,
    variables: { handle },
    tags: ["products"],
  })
  if (!data.product) return undefined
  return reshapeProduct(data.product)
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  const data = await shopifyFetch<{ collection: { products: Connection<any> } | null }>({
    query: /* GraphQL */ `
      query getCollectionProducts($handle: String!) {
        collection(handle: $handle) {
          products(first: 100) {
            edges {
              node {
                ...product
              }
            }
          }
        }
      }
      ${productFragment}
    `,
    variables: { handle },
    tags: ["products", "collections"],
  })
  if (!data.collection) return []
  return removeEdges(data.collection.products).map(reshapeProduct)
}

export async function getCollections(): Promise<Collection[]> {
  const data = await shopifyFetch<{ collections: Connection<any> }>({
    query: /* GraphQL */ `
      query getCollections {
        collections(first: 50, sortKey: TITLE) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    `,
    tags: ["collections"],
  })
  return removeEdges(data.collections).filter(
    (c: Collection) => !c.handle.startsWith("frontpage"),
  )
}

/* ---------- cart ---------- */

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: any } }>({
    query: /* GraphQL */ `
      mutation cartCreate {
        cartCreate {
          cart {
            ...cart
          }
        }
      }
      ${cartFragment}
    `,
    cache: "no-store",
  })
  return reshapeCart(data.cartCreate.cart)
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const data = await shopifyFetch<{ cart: any }>({
    query: /* GraphQL */ `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          ...cart
        }
      }
      ${cartFragment}
    `,
    variables: { cartId },
    cache: "no-store",
  })
  if (!data.cart) return undefined
  return reshapeCart(data.cart)
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: any } }>({
    query: /* GraphQL */ `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...cart
          }
        }
      }
      ${cartFragment}
    `,
    variables: { cartId, lines },
    cache: "no-store",
  })
  return reshapeCart(data.cartLinesAdd.cart)
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any } }>({
    query: /* GraphQL */ `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...cart
          }
        }
      }
      ${cartFragment}
    `,
    variables: { cartId, lines },
    cache: "no-store",
  })
  return reshapeCart(data.cartLinesUpdate.cart)
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: any } }>({
    query: /* GraphQL */ `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...cart
          }
        }
      }
      ${cartFragment}
    `,
    variables: { cartId, lineIds },
    cache: "no-store",
  })
  return reshapeCart(data.cartLinesRemove.cart)
}
