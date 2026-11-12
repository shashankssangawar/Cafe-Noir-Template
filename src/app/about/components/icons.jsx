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
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M4 18v-5c0-4 2-7 6-8l.7 1.6C8.8 7.4 8 9 8 11h3v7H4zm10 0v-5c0-4 2-7 6-8l.7 1.6C18.8 7.4 18 9 18 11h3v7h-7z" /></svg>
);

export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Expand = (p) => (
  <svg {...base} {...p}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
);

export const Pin = (p) => (
  <svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.500a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const Phone = (p) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
);
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Clock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const User = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" /></svg>
);
export const Tag = (p) => (
  <svg {...base} {...p}><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1" /></svg>
);
export const Pencil = (p) => (
  <svg {...base} {...p}><path d="M4 20l1-4L16 5l3 3L8 19l-4 1zM14 7l3 3" /></svg>
);
export const Send = (p) => (
  <svg {...base} {...p}><path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" /></svg>
);
export const Instagram = (p) => (
  <svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="16.8" cy="7.2" r=".6" fill="currentColor" /></svg>
);
export const Facebook = (p) => (
  <svg {...base} {...p}><path d="M14 8h2V4h-3a4 4 0 00-4 4v3H7v4h2v5h4v-5h3l1-4h-4V8.500c0-.3.2-.5.5-.5z" /></svg>
);
export const Pinterest = (p) => (
  <svg {...base} {...p}><path d="M9.5 20l2-8M8 11c-1-4 2-6.5 5-6 3 .5 4 3.5 3 6s-3.5 3.5-5 2.5" /></svg>
);
export const Youtube = (p) => (
  <svg {...base} {...p}><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10 9.500v5l4.5-2.5-4.5-2.500z" /></svg>
);
