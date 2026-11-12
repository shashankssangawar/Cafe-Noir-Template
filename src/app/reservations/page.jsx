"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, ImageReveal, EASE } from "../about/components/motion";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";

const initial = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  location: "",
  notes: "",
};

const locations = [
  { city: "London", address: "12 Brew Lane, Camden, London, NW1 8TG" },
  { city: "Birmingham", address: "45 Roast Street, Digbeth, Birmingham, B5 6QL" },
  { city: "Manchester", address: "52 Espresso Ave, Northern, Manchester, M4 3HR" },
];

const contact = {
  phone: "+1 (123) 456-7890",
  email: "hello@cafenoir.com",
};

const today = new Date().toISOString().split("T")[0];

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!v.date) e.date = "Choose a date.";
  else if (v.date < today) e.date = "Date can’t be in the past.";
  if (!v.time) e.time = "Choose a time.";
  const g = Number(v.guests);
  if (!g || g < 1 || g > 20) e.guests = "Enter 1–20 guests.";
  if (!v.location) e.location = "Select a location.";
  return e;
}

const inputBase =
  "w-full rounded-xl border bg-card px-3.5 py-3 text-sm text-cafe-noir placeholder:text-grullo outline-none transition focus:border-coffee focus:ring-2 focus:ring-coffee/20";

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-coffee">
        {label}
      </label>
      {children}
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

/** onSubmit(values) may be async — wire it to your API / server action. */
export default function Reservation({ onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const props = (k) => ({
    id: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    className: `${inputBase} ${errors[k] ? "border-red-400" : "border-line"}`,
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

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section className="bg-old-lace pt-26 pb-4">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-golden-pastel/60 px-5 py-10 md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Form column */}
            <div>
              <Reveal>
                <h2 className="font-['DM_Serif_Display',serif] text-3xl italic text-cafe-noir md:text-4xl">
                  Reserve your spot!
                </h2>
                <p className="mt-4 max-w-sm text-base italic leading-relaxed text-coffee">
                  Walk-ins are always welcome, but we recommend reserving a table in
                  advance during peak hours.
                </p>
              </Reveal>

              <div className="mt-8 min-h-[26rem]">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "success" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="rounded-2xl border border-line bg-card p-8 text-center"
                      role="status"
                    >
                      <p className="font-['DM_Serif_Display',serif] text-2xl text-ebony">
                        Table requested — thank you, {values.name.split(" ")[0]}!
                      </p>
                      <p className="mt-3 text-coffee">
                        We’ve noted {values.guests} {Number(values.guests) === 1 ? "guest" : "guests"} on{" "}
                        {values.date} at {values.time} in {values.location}. We’ll confirm by phone shortly.
                      </p>
                      <button
                        onClick={reset}
                        className="mt-6 rounded-full border border-cafe-noir px-6 py-2.5 text-sm text-cafe-noir transition hover:bg-cafe-noir hover:text-old-lace focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-noir"
                      >
                        Make another reservation
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid gap-x-3.5 gap-y-5 sm:grid-cols-2"
                    >
                      <Field label="Name" id="name" error={errors.name}>
                        <input {...props("name")} type="text" autoComplete="name" placeholder="Jane Smith" />
                      </Field>
                      <Field label="Phone" id="phone" error={errors.phone}>
                        <input {...props("phone")} type="tel" autoComplete="tel" placeholder="(000) 00-00" />
                      </Field>
                      <Field label="Reservation Date" id="date" error={errors.date}>
                        <input {...props("date")} type="date" min={today} />
                      </Field>
                      <Field label="Reservation Time" id="time" error={errors.time}>
                        <input {...props("time")} type="time" />
                      </Field>
                      <Field label="Number of Guests" id="guests" error={errors.guests}>
                        <input {...props("guests")} type="number" inputMode="numeric" min={1} max={20} placeholder="Number" />
                      </Field>
                      <Field label="Location" id="location" error={errors.location}>
                        <select {...props("location")}>
                          <option value="">Select…</option>
                          {locations.map((l) => (
                            <option key={l.city} value={l.city}>{l.city}</option>
                          ))}
                        </select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Notes" id="notes">
                          <textarea
                            {...props("notes")}
                            rows={3}
                            placeholder="Any special request?"
                            className={`${inputBase} resize-y border-line`}
                          />
                        </Field>
                      </div>

                      <div className="sm:col-span-2">
                        {status === "error" && (
                          <p role="alert" className="mb-3 text-sm text-red-700">
                            Something went wrong. Please try again or call us.
                          </p>
                        )}
                        <motion.button
                          type="submit"
                          disabled={status === "submitting"}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full rounded-full bg-cafe-noir py-3.5 text-sm text-old-lace transition-colors hover:bg-coffee disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-noir"
                        >
                          {status === "submitting" ? "Reserving…" : "Reserve Now"}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Image column */}
            <ImageReveal
              from="right"
              className="relative min-h-[22rem] overflow-hidden rounded-2xl lg:min-h-0"
            >
              <Image
                src={COMMON_IMAGES_LINKS.RESERVATIONS.MAIN}
                alt={COMMON_IMAGES_SEO.RESERVATIONS.MAIN}
                title={COMMON_IMAGES_SEO.RESERVATIONS.MAIN}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
                  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="rounded-xl bg-card/95 px-3 py-3.5 text-center backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-noir"
                  >
                    <span className="block text-xs text-coffee">{c.label}</span>
                    <span className="mt-0.5 block break-words text-sm font-medium text-cafe-noir">{c.value}</span>
                  </a>
                ))}
              </div>
            </ImageReveal>
          </div>

          {/* Locations */}
          <div className="mt-12 border-t border-line pt-8">
            <ul className="grid gap-6 text-center md:grid-cols-3">
              {locations.map((l, i) => (
                <Reveal as="li" key={l.city} delay={i * 0.1}>
                  <p className="text-sm text-coffee">{l.city}</p>
                  <p className="mt-2 text-sm font-medium text-cafe-noir md:text-base">{l.address}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
