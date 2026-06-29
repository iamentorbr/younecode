export const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`

export const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    productType
    featuredImage {
      ...image
    }
    images(first: 8) {
      edges {
        node {
          ...image
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
  ${imageFragment}
`

export const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`
