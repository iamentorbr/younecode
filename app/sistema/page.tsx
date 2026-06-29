import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "O Sistema",
  description:
    "A Engenharia do Vestir® da YOUNE CODE: design, ergonomia, psicologia e estratégia aplicados ao guarda-roupa.",
}

const pillars = [
  { n: "01", title: "Design", desc: "Modelagem e proporção pensadas para o corpo real e o movimento do dia." },
  { n: "02", title: "Ergonomia", desc: "Tecidos e construções que acompanham — nunca limitam." },
  { n: "03", title: "Psicologia", desc: "Vestir com intenção: menos decisões, mais clareza e presença." },
  { n: "04", title: "Estratégia", desc: "Módulos que se combinam entre sistemas, multiplicando composições." },
]

export default function SistemaPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
        <p className="text-xs tracking-[0.35em] text-accent">ENGENHARIA DO VESTIR®</p>
        <h1 className="mt-5 text-balance font-serif text-4xl leading-tight md:text-5xl">
          Não é uma marca de roupas. É um Sistema de Vestir.
        </h1>
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          A YOUNE CODE trata o guarda-roupa como um sistema operacional para a vida real. Cada peça é
          um módulo, projetado para reduzir decisões e amplificar a sua presença — da manhã aos
          momentos que marcam.
        </p>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-px px-6 py-px lg:grid-cols-4 lg:px-8">
          {pillars.map((p) => (
            <div key={p.n} className="bg-secondary p-8 lg:p-10">
              <p className="font-serif text-3xl text-accent">{p.n}</p>
              <h2 className="mt-4 text-lg tracking-wide">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <h2 className="mb-12 text-center font-serif text-3xl md:text-4xl">Os três sistemas</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { h: "essential", n: "Essential", s: "Sistema Manhã", d: "O conforto que organiza o dia." },
            { h: "signature", n: "Signature", s: "Sistema Presença", d: "A presença que abre portas." },
            { h: "essencia", n: "Essência", s: "Sistema Essência", d: "A elegância dos momentos que marcam." },
          ].map((c) => (
            <Link key={c.h} href={`/colecoes/${c.h}`} className="group border border-border p-8 transition-colors hover:bg-secondary">
              <p className="text-xs tracking-[0.25em] text-accent">{c.s.toUpperCase()}</p>
              <h3 className="mt-3 font-serif text-2xl">{c.n}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              <span className="mt-6 inline-block text-xs tracking-[0.2em] transition-transform group-hover:translate-x-1">
                EXPLORAR →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
