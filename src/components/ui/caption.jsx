import { cn } from "@/lib/utils";

export default function Caption({ text, className }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("text-[12px] tracking-[0.2em] uppercase text-cafe-noir font-medium", className)}>
        {text}
      </span>
      <span className="w-8 h-px bg-cafe-noir"></span>
    </div>
  )
}
