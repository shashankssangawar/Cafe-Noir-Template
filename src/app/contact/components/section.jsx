import ContactDetails from "./details";
import ContactForm from "./form";

export default function ContactSection({ onSubmit }) {
  return (
    <section className="bg-old-lace py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <ContactDetails />
        <ContactForm onSubmit={onSubmit} />
      </div>
    </section>
  );
}
