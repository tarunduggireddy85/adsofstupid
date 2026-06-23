import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free strategy call with Ads of Stupid. We'll audit your funnel and tell you exactly what we'd do to grow your D2C brand — no pitch, no pressure.",
  alternates: { canonical: "/contact" }
};

const METHODS = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@adsofstupid.com",
    href: "mailto:hello@adsofstupid.com"
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 85306 39877",
    href: "https://wa.me/918530639877"
  },
  {
    icon: MapPin,
    label: "Where we are",
    value: "Pune, Maharashtra, India",
    href: undefined
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-main">
      <SiteHeader />

      <main className="w-full">
        {/* the stepper form (includes its own heading + subline) */}
        <ContactForm />

        {/* direct contact methods */}
        <section className="max-w-3xl mx-auto px-4 pb-24 -mt-2">
          <p className="text-center text-[0.82rem] font-bold uppercase tracking-[0.18em] text-zinc-400 mb-6">
            Or reach us directly
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {METHODS.map((m) => {
              const Icon = m.icon;
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5c43fd]/8 text-[#5c43fd]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[0.78rem] font-semibold uppercase tracking-wide text-zinc-400 mt-4">
                    {m.label}
                  </span>
                  <span className="text-[0.98rem] font-semibold text-brand-strong mt-1 leading-snug">
                    {m.value}
                  </span>
                </>
              );
              const cls =
                "flex flex-col items-start rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-200";
              return m.href ? (
                <a
                  key={m.label}
                  href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel={m.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`${cls} no-underline hover:border-[#5c43fd]/30 hover:shadow-[0_14px_36px_rgba(92,67,253,0.08)] hover:-translate-y-0.5`}
                >
                  {inner}
                </a>
              ) : (
                <div key={m.label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
}
