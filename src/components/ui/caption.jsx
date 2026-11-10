import { cn } from "@/lib/utils";

export default function Caption({ text, className, containerClass = '', lineColor = 'bg-cafe-noir' }) {
  return (
    <div className={cn("flex items-center gap-3", containerClass)}>
      <span className={cn("text-[12px] tracking-[0.2em] uppercase text-cafe-noir font-medium", className)}>
        {text}
      </span>
      <span className={cn("w-8 h-px", lineColor)} />
    </div>
  )
}
