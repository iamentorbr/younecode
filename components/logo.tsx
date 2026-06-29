import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)} aria-label="YOUNĒCODE — Sistemas de Vestir">
      <span className="flex items-center font-sans text-[1.05em] font-light tracking-[0.3em]">
        <span aria-hidden="true">YOUN</span>
        {/* Glifo "E" oficial: tr\u00eas barras horizontais */}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 14"
          className="mx-[0.12em] h-[0.78em] w-[0.56em]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0.5" width="10" height="1.6" fill="currentColor" />
          <rect x="0" y="6.2" width="10" height="1.6" fill="currentColor" />
          <rect x="0" y="11.9" width="10" height="1.6" fill="currentColor" />
        </svg>
        <span aria-hidden="true">CODE</span>
      </span>
      <span className="mt-1.5 font-sans text-[0.4em] tracking-[0.45em] text-muted-foreground">SISTEMAS DE VESTIR</span>
    </span>
  )
}
