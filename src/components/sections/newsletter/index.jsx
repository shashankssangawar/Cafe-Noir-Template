import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Title from "@/components/ui/title";

const ease = [0.22, 1, 0.36, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Replace the hrefs with your real profiles
const SOCIALS = [
  {
    name: "Instagram", href: "#", icon: (<>
      <rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" fill="currentColor" />
    </>)
  },
  { name: "Facebook", href: "#", icon: <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V9.7c0-.4.2-.7.5-.7z" /> },
  { name: "X", href: "#", icon: <path d="M5 5l14 14M19 5L5 19" /> },
  {
    name: "YouTube", href: "#", icon: (<>
      <rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.5 9.5v5l4-2.5z" fill="currentColor" />
    </>)
  },
];

export default function Newsletter() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | done

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setStatus("error");
    // TODO: send `email` to your API / mailing provider here
    setStatus("done");
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section>
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-[6vw] pb-10 lg:grid-cols-[1.1fr_1.3fr_auto] lg:gap-12">
        <motion.div {...fade()}>
          <h1 className="text-[clamp(30px,3.4vw,40px)] leading-tight">Stay in the Loop</h1>
          <p className="mt-1 text-[15px] text-coffee">Get updates on new arrivals, special offers and more.</p>
        </motion.div>

        <motion.div {...fade(0.1)}>
          <form onSubmit={onSubmit} noValidate className="flex max-w-[540px] flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <motion.input
                id="newsletter-email"
                type="email"
                value={email}
                disabled={status === "done"}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                placeholder="Your email address"
                aria-invalid={status === "error"}
                aria-describedby="newsletter-error"
                animate={status === "error" && !reduce ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className={`h-12 w-full rounded-full border bg-grullo/10 px-6 text-base outline-none transition-colors placeholder:text-grullo focus:ring-2 disabled:opacity-60 ${status === "error"
                  ? "border-red-700/60 focus:ring-red-700/20"
                  : "border-coffee focus:border-coffee focus:ring-coffee focus:outline-coffee"
                  }`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "done"}
              whileHover={status === "done" ? undefined : { scale: 1.04 }}
              whileTap={status === "done" ? undefined : { scale: 0.96 }}
              className="relative h-12 min-w-[150px] overflow-hidden rounded-full bg-ebony px-7 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status === "done" ? "done" : "idle"}
                  initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center justify-center gap-2"
                >
                  {status === "done" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.15 }} />
                      </svg>
                      Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </form>

          <div id="newsletter-error" className="mt-2 min-h-5 pl-6 text-sm" role="status" aria-live="polite">
            <AnimatePresence mode="wait">
              {status === "error" && (
                <motion.p key="e" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-800">
                  Enter a valid email address, like name@example.com.
                </motion.p>
              )}
              {status === "done" && (
                <motion.p key="d" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-ebony">
                  You’re on the list. Check your inbox for a welcome note.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="lg:border-l lg:border-cafe-noir/30 lg:pl-12">
          <div className="mb-3 flex items-center gap-3">
            <h3 className="font-display text-xl">Follow Us</h3>
            <span className="h-px w-8 bg-grullo" />
          </div>
          <ul className="flex gap-3">
            {SOCIALS.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.5 + i * 0.08 }}
              >
                <motion.a
                  href={s.href}
                  aria-label={s.name}
                  whileHover={reduce ? undefined : { y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="grid size-9 place-items-center rounded-full bg-cafe-noir text-old-lace transition-colors hover:bg-ebony focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
