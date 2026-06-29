import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)} aria-label="YOUNE CODE">
      <span className="font-sans font-light tracking-[0.35em] text-[1.05em]">
        YOUN<span className="font-normal">E</span>CODE
      </span>
      <span className="mt-1 font-sans text-[0.4em] tracking-[0.45em] text-muted-foreground">SISTEMAS DE VESTIR</span>
    </span>
  )
}
