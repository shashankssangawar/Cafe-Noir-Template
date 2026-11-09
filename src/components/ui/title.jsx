import { cn } from "@/lib/utils";

export default function Title({ text, className }) {
  return (
    <h1
      aria-label={text}
      aria-description={text}
      className={cn("md:text-[7rem] text-[50px] leading-none", className)}
    >
      {text}
    </h1>
  );
}
