import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCart } from "@/lib/shopify"
import { cookies } from "next/headers"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "YOUNE CODE® — Sistemas de Vestir para a Vida Real",
    template: "%s — YOUNE CODE®",
  },
  description:
    "YOUNE CODE não é uma marca de roupas. É um Sistema de Vestir — design, ergonomia e estratégia aplicados à vida real.",
  keywords: ["YOUNE CODE", "sistemas de vestir", "moda", "vestuário", "Brasil"],
  openGraph: {
    title: "YOUNE CODE® — Sistemas de Vestir para a Vida Real",
    description:
      "Design, ergonomia, psicologia e estratégia aplicados ao guarda-roupa. Menos decisões. Mais presença.",
    type: "website",
    locale: "pt_BR",
  },
}

export const viewport = {
  themeColor: "#1a1a1a",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get("cartId")?.value
  const cart = cartId ? await getCart(cartId) : undefined

  return (
    <html lang="pt-BR" className={`${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider initialCart={cart ?? null}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
