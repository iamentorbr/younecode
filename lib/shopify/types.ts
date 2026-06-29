export type Money = {
  amount: string
  currencyCode: string
}

export type Image = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  price: Money
}

export type ProductOption = {
  id: string
  name: string
  values: string[]
}

export type Product = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: Image | null
  images: Image[]
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  options: ProductOption[]
  variants: ProductVariant[]
  availableForSale: boolean
  tags: string[]
  productType: string
}

export type Collection = {
  id: string
  handle: string
  title: string
  description: string
  image: Image | null
}

export type CartLine = {
  id: string
  quantity: number
  cost: { totalAmount: Money }
  merchandise: {
    id: string
    title: string
    selectedOptions: { name: string; value: string }[]
    product: {
      id: string
      handle: string
      title: string
      featuredImage: Image | null
    }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalAmount: Money
    totalTaxAmount: Money | null
  }
  lines: CartLine[]
}
