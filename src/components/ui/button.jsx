import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Button({ className, children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn("cursor-pointer inline-flex items-center justify-center gap-2 bg-ebony text-white px-5 py-3 rounded-full hover:bg-coffee transition-colors", className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}
