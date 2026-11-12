"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Tag, Pencil, Send } from "@/app/about/components/icons";
import { Reveal, EASE } from "@/app/about/components/motion";
import LeafSketch from "@/app/about/components/leaf-sketch";
import LeafRightOldLace from "@/components/svg/leaf-right-golden-pastel";

const initial = { name: "", email: "", subject: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email.";
  if (v.subject.trim().length < 3) e.subject = "Add a short subject.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

const inputCls =
  "w-full rounded-lg border bg-old-lace/60 py-3 pl-10 pr-3 text-sm text-cafe-noir placeholder:text-coffee/70 outline-none transition focus:border-coffee focus:ring-2 focus:ring-coffee/20";

function Field({ id, label, Icon, error, multiline, className = "", ...rest }) {
  const Tag_ = multiline ? "textarea" : "input";
  return (
    <div className={className}>
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute left-3 h-[18px] w-[18px] text-coffee ${multiline ? "top-3.5" : "top-1/2 -translate-y-1/2"}`}
        />
        <Tag_
          id={id}
          name={id}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputCls} ${error ? "border-red-400" : "border-line"} ${multiline ? "resize-y" : ""}`}
          {...(multiline ? { rows: 5 } : {})}
          {...rest}
        />
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 overflow-hidden text-xs text-red-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** onSubmit(values) may be async — wire to your API / server action. */
export default function ContactForm({ onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const bind = (k) => ({
    value: values[k],
    onChange: (e) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    },
    error: errors[k],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus("submitting");
    try {
      if (onSubmit) await onSubmit(values);
      else await new Promise((r) => setTimeout(r, 900)); // demo delay
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Reveal delay={0.1} className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 md:p-8">
      <LeafRightOldLace className="pointer-events-none absolute -right-3 -top-3 h-24 w-20 rotate-[25deg]! text-coffee/70" />

      <h1 className="text-3xl">Send a Message</h1>

      <div className="mt-6 min-h-[22rem]">
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="done"
              role="status"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid h-full place-items-center py-10 text-center"
            >
              <div>
                <p className="font-['DM_Serif_Display',serif] text-2xl text-ebony">
                  Thanks, {values.name.split(" ")[0]} — message sent!
                </p>
                <p className="mt-2 text-coffee">We’ll get back to you within one working day.</p>
                <button
                  onClick={() => { setValues(initial); setStatus("idle"); }}
                  className="mt-6 rounded-md border border-ebony px-5 py-2.5 text-sm text-ebony transition hover:bg-ebony hover:text-old-lace focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
                >
                  Send another
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Field id="name" label="Your name" Icon={User} type="text" autoComplete="name" placeholder="Your Name *" {...bind("name")} />
              <Field id="email" label="Your email" Icon={Mail} type="email" autoComplete="email" placeholder="Your Email *" {...bind("email")} />
              <Field id="subject" label="Subject" Icon={Tag} type="text" placeholder="Subject *" className="sm:col-span-2" {...bind("subject")} />
              <Field id="message" label="Your message" Icon={Pencil} multiline placeholder="Your Message *" className="sm:col-span-2" {...bind("message")} />

              <div className="sm:col-span-2">
                {status === "error" && (
                  <p role="alert" className="mb-3 text-sm text-red-700">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-md bg-ebony py-3.5 text-sm text-old-lace transition-colors hover:bg-ebony/90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
                >
                  <Send className="h-4 w-4" />
                  {status === "submitting" ? "Sending…" : "Send Message"}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
