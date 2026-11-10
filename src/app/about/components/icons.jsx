const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p) => (
  <svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const Bean = (p) => (
  <svg {...base} {...p}><ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(35 12 12)" /><path d="M8 7c4 1 4 9 8 10" /></svg>
);
export const Community = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15.5 14.3c3 0 5.5 2 5.5 5" /></svg>
);
export const Leaf = (p) => (
  <svg {...base} {...p}><path d="M5 19C5 10 10 4 20 4c0 9-5 15-13 15M5 19l8-8" /></svg>
);
export const Heart = (p) => (
  <svg {...base} {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" /></svg>
);
export const Quote = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M4 18v-5c0-4 2-7 6-8l.7 1.6C8.800 7.400 8 9 8 11h3v7H4zm10 0v-5c0-4 2-7 6-8l.7 1.6C18.800 7.400 18 9 18 11h3v7h-7z" /></svg>
);
