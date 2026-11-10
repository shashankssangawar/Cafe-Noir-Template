import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import LeafSprig from "../values/LeafSprig";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";
import LeafRightOldLace from "@/components/svg/leaf-right-golden-pastel";
import Button from "@/components/ui/button";
import LeafLeftGrullo from "@/components/svg/leaf-left-grullo";

const ease = [0.22, 1, 0.36, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ADDRESS = ["123 Coffee Lane,", "New Delhi – 110011"];
const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=Cafe+Noir+123+Coffee+Lane+New+Delhi";

const INFO = [
  {
    title: "Our Location", lines: ["123 Coffee Lane,", "New Delhi – 110011"],
    icon: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>
  },
  {
    title: "Call Us", lines: ["+91 98765 43210"],
    icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  },
  {
    title: "Email Us", lines: ["hello@cafenoir.in"],
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>
  },
  {
    title: "Opening Hours", lines: ["Mon – Sun", "7 AM – 10 PM"],
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>
  },
];

const SOCIALS = [
  { name: "Instagram", href: "#", icon: (<><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></>) },
  { name: "Facebook", href: "#", icon: <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V9.7c0-.4.2-.7.5-.7z" /> },
  { name: "YouTube", href: "#", icon: (<><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.5 9.5v5l4-2.5z" fill="currentColor" /></>) },
];

const SUBJECTS = ["General enquiry", "Reservations", "Catering & events", "Feedback", "Careers"];

const inputCls =
  "w-full rounded-lg border bg-old-lace/60 px-4 py-2.5 text-[15px] outline-none transition-colors placeholder:text-coffee/70 focus:ring-2";
const ok = "border-line focus:border-ebony focus:ring-ebony/20";
const bad = "border-red-700/60 focus:ring-red-700/20";

const Svg = ({ children, size = 22, sw = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/* ---------- Placeholders (pass real photos via props) ---------- */
function HeroArt() {
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <radialGradient id="ct-bg" cx=".7" cy=".45" r=".8">
          <stop offset="0" stopColor="#9a6a3c" /><stop offset=".6" stopColor="#4a2f1a" /><stop offset="1" stopColor="#24160b" />
        </radialGradient>
      </defs>
      <rect width="600" height="340" fill="url(#ct-bg)" />
      <ellipse cx="430" cy="270" rx="180" ry="36" fill="#e9dfca" opacity=".9" />
      <path d="M330 170 h200 v40 a100 70 0 0 1 -200 0Z" fill="#efe6d4" />
      <ellipse cx="430" cy="172" rx="100" ry="26" fill="#c98a4b" />
      <path d="M430 196 C396 176 402 154 418 154 C426 154 430 160 430 164 C430 160 434 154 442 154 C458 154 464 176 430 196Z" fill="#fbf3e2" />
    </svg>
  );
}

function SideArt() {
  return (
    <svg viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden="true">
      <defs>
        <linearGradient id="ct-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9b48a" /><stop offset="1" stopColor="#6a4a2a" />
        </linearGradient>
      </defs>
      <rect width="400" height="440" fill="url(#ct-side)" />
      <rect y="320" width="400" height="120" fill="#7a5230" />
      <rect x="70" y="210" width="56" height="110" rx="12" fill="#fff" opacity=".5" />
      {[[98, 150], [74, 170], [122, 168], [86, 126], [112, 130], [98, 100], [60, 140], [136, 146]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="14" fill="#fbf8ef" /><circle cx={x} cy={y} r="4" fill="#e0b84f" /></g>
      ))}
      <path d="M98 214 L98 170 M96 214 L72 176 M100 214 L124 174" stroke="#5e7a45" strokeWidth="3" />
      <ellipse cx="270" cy="338" rx="90" ry="16" fill="#efe6d4" />
      <path d="M230 292 h80 v26 a40 26 0 0 1 -80 0Z" fill="#fbf7ec" />
      <ellipse cx="270" cy="293" rx="40" ry="9" fill="#c98a4b" />
    </svg>
  );
}

function MapArt() {
  return (
    <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden="true">
      <rect width="320" height="160" fill="#ece5cf" />
      <g fill="#dcd5b8"><rect x="10" y="12" width="70" height="40" rx="4" /><rect x="100" y="12" width="90" height="40" rx="4" /><rect x="220" y="14" width="86" height="36" rx="4" /><rect x="10" y="100" width="90" height="48" rx="4" /><rect x="230" y="104" width="80" height="44" rx="4" /></g>
      <rect x="120" y="96" width="90" height="52" rx="6" fill="#cfdcb4" />
      <g stroke="#fff" strokeWidth="9" strokeLinecap="round"><path d="M0 72 H320" /><path d="M92 0 V160" /><path d="M208 0 L226 160" /></g>
      <g stroke="#f5c76a" strokeWidth="4" strokeLinecap="round"><path d="M0 72 H320" /></g>
    </svg>
  );
}

export default function Contact({ heroImage, sideImage, mapEmbedSrc, onSubmit }) {
  const reduce = useReducedMotion();
  const empty = { name: "", email: "", subject: "", topic: "", message: "" };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };
  const inView = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.8, ease, delay },
  });

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!values.name.trim()) er.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email)) er.email = "Enter a valid email address.";
    if (values.message.trim().length < 10) er.message = "Tell us a little more (10+ characters).";
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    try {
      await onSubmit?.(values); // TODO: send to your API route / email service
      setStatus("done");
      setValues(empty);
    } catch {
      setStatus("idle");
      setErrors({ form: "Something went wrong. Please try again." });
    }
  };

  const err = (k) => errors[k] && <p id={`err-${k}`} className="mt-1 text-[13px] text-red-800">{errors[k]}</p>;

  return (
    <section id="contact-page">
      {/* ---------- Hero ---------- */}
      <div className="relative overflow-hidden bg-cafe-noir text-old-lace">
        <div className="absolute top-0 right-0">
          <img
            src={COMMON_IMAGES_LINKS.CONTACT.BACKGROUND}
            alt={COMMON_IMAGES_SEO.CONTACT.BACKGROUND}
            title={COMMON_IMAGES_SEO.CONTACT.BACKGROUND}
            className="md:w-[500px] w-[300px] object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cafe-noir/85 via-cafe-noir/40 to-transparent" />
        <LeafRightOldLace
          reduce={reduce}
          className="absolute left-0 top-4 hidden h-[85%] text-golden-pastel/60 md:block"
        />

        <motion.div
          initial="hidden" animate="show" transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative mx-auto max-w-[1400px] px-[6vw] py-20 md:py-28 md:pl-[12vw]"
        >
          <motion.p variants={rise} className="mb-4 flex items-center gap-3.5 text-[12px] font-medium uppercase tracking-[.2em]">
            Get in touch
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, delay: 0.4, ease } } }}
              className="block h-px w-9 origin-left bg-old-lace/60"
            />
          </motion.p>
          <motion.h1 variants={rise} className="text-[clamp(48px,7vw,84px)] leading-none">Contact Us</motion.h1>
          <motion.h1 variants={rise} className="mt-4 text-2xl italic text-old-lace/90">We’d love to hear from you.</motion.h1>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1200px] px-[6vw]">
        {/* ---------- Info strip ---------- */}
        <motion.ul
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4"
        >
          {INFO.map((i) => (
            <motion.li
              key={i.title} variants={rise}
              className="px-4 text-center md:border-l md:border-line md:first:border-l-0"
            >
              <motion.span
                whileHover={reduce ? undefined : { y: -3, rotate: -6 }}
                className="mb-2 inline-block text-cafe-noir"
              >
                <Svg>{i.icon}</Svg>
              </motion.span>
              <h3 className="mb-1 text-[15px] font-semibold">{i.title}</h3>
              {i.lines.map((l) => <p key={l} className="text-[14px] leading-snug text-coffee">{l}</p>)}
            </motion.li>
          ))}
        </motion.ul>

        {/* ---------- Image + form ---------- */}
        <div className="grid gap-6 md:grid-cols-[1fr_1.7fr]">
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease }}
            className="h-[280px] overflow-hidden rounded-3xl bg-cafe-noir md:h-auto md:min-h-[420px]"
          >
            <img
              src={COMMON_IMAGES_LINKS.CONTACT.LATTE}
              alt={COMMON_IMAGES_SEO.CONTACT.LATTE}
              title={COMMON_IMAGES_SEO.CONTACT.LATTE}
              className="block size-full object-cover"
            />
          </motion.div>

          <motion.div {...inView(0.1)} className="relative overflow-hidden rounded-3xl border border-line bg-golden-pastel/25 p-6 md:p-8">
            <LeafLeftGrullo className="absolute -bottom-2 -right-2 hidden h-[150px] md:block" />
            <h1 className="text-[clamp(28px,3vw,34px)] leading-tight">Send Us a Message</h1>
            <p className="mb-6 mt-1 text-[15px] text-coffee">Fill out the form below and we’ll get back to you soon.</p>

            <form onSubmit={submit} noValidate className="relative grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="sr-only">Your name</label>
                <input id="c-name" value={values.name} onChange={set("name")} placeholder="Your Name *" autoComplete="name"
                  aria-invalid={!!errors.name} aria-describedby="err-name" className={`${inputCls} ${errors.name ? bad : ok}`} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="c-email" className="sr-only">Your email</label>
                <input id="c-email" type="email" value={values.email} onChange={set("email")} placeholder="Your Email *" autoComplete="email"
                  aria-invalid={!!errors.email} aria-describedby="err-email" className={`${inputCls} ${errors.email ? bad : ok}`} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="c-subject" className="sr-only">Subject</label>
                <input id="c-subject" value={values.subject} onChange={set("subject")} placeholder="Subject" className={`${inputCls} ${ok}`} />
              </div>
              <div className="relative">
                <label htmlFor="c-topic" className="sr-only">Select a subject</label>
                <select id="c-topic" value={values.topic} onChange={set("topic")}
                  className={`${inputCls} ${ok} appearance-none pr-10 ${values.topic ? "" : "text-coffee/70"}`}>
                  <option value="">Select a subject</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-coffee"><Svg size={16} sw={2}><path d="M6 9l6 6 6-6" /></Svg></span>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="sr-only">Your message</label>
                <textarea id="c-message" rows={4} value={values.message} onChange={set("message")} placeholder="Your Message *"
                  aria-invalid={!!errors.message} aria-describedby="err-message" className={`${inputCls} resize-none ${errors.message ? bad : ok}`} />
                {err("message")}
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <motion.div
                  whileHover={status === "idle" ? { scale: 1.04 } : undefined}
                  whileTap={status === "idle" ? { scale: 0.96 } : undefined}
                  className="min-w-[170px] overflow-hidden px-7"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <Button
                      type="submit" disabled={status !== "idle"}
                    >
                      <motion.span
                        key={status}
                        initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {status === "idle" && <>Send Message <Svg size={16} sw={2}><path d="M5 12h14M13 6l6 6-6 6" /></Svg></>}
                        {status === "sending" && "Sending…"}
                        {status === "done" && <>Message sent <Svg size={16} sw={2.5}><path d="M5 13l4 4L19 7" /></Svg></>}
                      </motion.span>
                    </Button>
                  </AnimatePresence>
                </motion.div>

                <div role="status" aria-live="polite" className="text-[14px]">
                  {status === "done" && (
                    <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-ebony">
                      Thank you! We’ll reply within a day.
                    </motion.p>
                  )}
                  {errors.form && <p className="text-red-800">{errors.form}</p>}
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        {/* ---------- Find us / Follow us ---------- */}
        <motion.div
          {...inView()}
          className="my-8 grid items-center gap-6 rounded-3xl border border-line bg-golden-pastel/25 p-3 md:grid-cols-[1.4fr_1fr_.8fr] md:gap-8"
        >
          <div className="relative h-[160px] overflow-hidden rounded-2xl">
            {mapEmbedSrc ? (
              <iframe src={mapEmbedSrc} title="Map to Café Noir" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full border-0" />
            ) : (
              <>
                <MapArt />
                <motion.div
                  initial={{ y: reduce ? 0 : -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.5 }}
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center"
                >
                  <svg width="30" height="38" viewBox="0 0 24 30" aria-hidden="true">
                    <path d="M12 29S2 18.5 2 11a10 10 0 0 1 20 0c0 7.5-10 18-10 18z" fill="#c0392b" /><circle cx="12" cy="11" r="4" fill="#fff" />
                  </svg>
                  <span className="mt-0.5 rounded bg-white/90 px-1.5 text-[11px] font-medium shadow-sm">Café Noir</span>
                </motion.div>
              </>
            )}
          </div>

          <div className="px-2 md:border-r md:border-cafe-noir/25 md:pr-6">
            <h1 className="mb-2 text-2xl">Find Us</h1>
            <p className="mb-3 text-[15px] leading-snug">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
            <motion.a
              href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" whileHover="hover"
              className="inline-flex items-center gap-2 border-b border-current pb-0.5 text-[14px] font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ebony"
            >
              Get Directions
              <motion.span variants={{ hover: { x: 4 } }}><Svg size={14} sw={2}><path d="M5 12h14M13 6l6 6-6 6" /></Svg></motion.span>
            </motion.a>
          </div>

          <div className="px-2 pb-2 md:pb-0">
            <h1 className="mb-3 text-2xl">Follow Us</h1>
            <ul className="flex gap-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <motion.a
                    href={s.href} aria-label={s.name}
                    whileHover={reduce ? undefined : { y: -4, scale: 1.1 }} whileTap={{ scale: 0.92 }}
                    className="grid size-9 place-items-center rounded-full bg-cafe-noir text-old-lace transition-colors hover:bg-ebony focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
                  >
                    <Svg size={18} sw={1.8}>{s.icon}</Svg>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
