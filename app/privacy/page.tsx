import type { Metadata } from "next";
import Link from "next/link";
import { EyebrowBadge } from "../../components/ui/EyebrowBadge";

export const metadata: Metadata = {
  title: "Privacy Policy | Ads of Stupid",
  description: "Read our simple, transparent, and easy-to-read Privacy Policy. Learn how we handle cookies, tracking pixels, and personal information."
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      num: 1,
      title: "Information We Collect",
      body: [
        "We collect two types of data:",
        "Input Data: Information you give us directly when you fill out a form (Name, Phone Number, Email Address).",
        "Technical Data: Information your browser sends us automatically (IP address, device type, and browsing behavior)."
      ]
    },
    {
      num: 2,
      title: "How We Use Your Data",
      body: [
        "We use this data for three logical reasons:",
        "To Talk to You: To reply to your inquiries and discuss your project.",
        "To Improve: We analyze how you use our site to make it faster and easier to navigate.",
        "To Market: We use data to show you relevant ads (Retargeting) based on your interests."
      ]
    },
    {
      num: 3,
      title: "Cookies & Tracking Tools",
      body: [
        "We use standard tracking technologies to understand site performance. We do not use these to spy on you, but to learn from you.",
        "Google Analytics: Helps us understand how many people visit the site.",
        "Microsoft Clarity: Helps us see heatmaps of where users click and scroll so we can fix UX issues.",
        "Ad Pixels (Google & Meta): We use these to show you ads for our services on other platforms.",
        "Note: You can opt-out of cookie tracking in your browser settings at any time."
      ]
    },
    {
      num: 4,
      title: "Sharing & Selling (The Promise)",
      body: [
        "We do not sell your data. We never trade, sell, or rent your personal information to third parties. Your data is shared only with the specific software tools mentioned above (Google, Microsoft) strictly for the purpose of running this website."
      ]
    },
    {
      num: 5,
      title: "Your Rights",
      body: [
        "It is your data. You have the right to:",
        "Ask for a copy of the data we hold.",
        "Ask us to delete your data permanently.",
        "Opt-out of future communications."
      ]
    },
    {
      num: 6,
      title: "Contact Us",
      body: [
        "If you have questions or want your data deleted, email us directly.",
        "Email: hello@adsofstupid.com",
        "Address: Laxmi Chowk, Hinjewadi, Pune - 411057, Maharashtra, India."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-surface-main">
      
      <header className="sticky top-0 z-50 w-full py-4 px-4 flex justify-center bg-surface-main/90 backdrop-blur-xl border-b border-zinc-200/60">
        <div className="w-full max-w-[900px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <svg className="w-6 h-6 text-[#5c43fd] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
            </svg>
            <span className="font-semibold text-zinc-900 tracking-tight text-[1.12rem]">Ads of Stupid</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/#formula", label: "Services" },
              { href: "/#proof", label: "Projects" },
              { href: "/#blog", label: "Blog" },
              { href: "/#contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[0.88rem] font-medium text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-[#5c43fd] text-white font-medium text-[0.88rem] px-5 py-2 rounded-full hover:bg-[#4a32e5] transition-colors shadow-[0_2px_8px_rgba(92,67,253,0.2)] no-underline"
          >
            Book a call
          </Link>
        </div>
      </header>

      <main className="w-full">
        
        <section className="w-full bg-gradient-to-b from-[#f4f0ff] to-transparent pt-16 pb-12 px-4">
          <div className="max-w-[760px] mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-[0.82rem] text-zinc-400 mb-6 select-none">
              <Link href="/" className="hover:text-[#5c43fd] transition-colors no-underline">Home</Link>
              <span>/</span>
              <span className="text-[#5c43fd] font-medium">Privacy Policy</span>
            </nav>

            <div className="flex justify-center mb-4">
              <EyebrowBadge>Privacy Policy</EyebrowBadge>
            </div>

            <h1 className="font-sans font-semibold text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.15] tracking-tight text-zinc-950 mb-4">
              We believe privacy policies <br className="hidden sm:inline" />
              should be easy to read.
            </h1>

            <p className="text-[1.12rem] font-medium leading-[1.6] text-[#5c43fd] max-w-[580px] mx-auto">
              We don't hide behind legal jargon.
            </p>
          </div>
        </section>

        {/* ── Privacy Policy Content ── */}
        <section className="max-w-[760px] mx-auto px-4 py-8">
          <div className="grid gap-12">
            {sections.map((section) => (
              <div key={section.num} className="scroll-mt-28 flex flex-col gap-3.5">
                <div className="flex items-start gap-3">
                  <span className="text-[1.1rem] font-black text-[#5c43fd]/25 leading-none mt-1 shrink-0">
                    {String(section.num).padStart(2, "0")}
                  </span>
                  <h2 className="font-sans text-[1.38rem] font-semibold text-zinc-950 tracking-tight leading-tight m-0">
                    {section.title}
                  </h2>
                </div>
                
                <div className="flex flex-col gap-3 ml-8">
                  {section.body.map((paragraph, index) => {
                    const isBullet = paragraph.includes(":") && !paragraph.startsWith("Note:") && !paragraph.startsWith("Email:") && !paragraph.startsWith("Address:");
                    
                    if (isBullet) {
                      const [label, desc] = paragraph.split(":");
                      return (
                        <p key={index} className="text-zinc-600 text-[0.98rem] leading-[1.75] m-0">
                          <strong className="text-zinc-900 font-bold">{label}:</strong>{desc}
                        </p>
                      );
                    }
                    
                    return (
                      <p key={index} className="text-zinc-500 text-[0.98rem] leading-[1.75] m-0">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative overflow-hidden pt-16 pb-6 text-left w-full mt-12"
        style={{
          background: `
            radial-gradient(circle at 50% 10%, #ffffff 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0) 70%),
            radial-gradient(at 0% 100%, #8566ff 0px, transparent 55%),
            radial-gradient(at 100% 100%, #9a7eff 0px, transparent 55%),
            radial-gradient(at 0% 50%, #fbcfe8 0px, transparent 40%),
            radial-gradient(at 100% 50%, #f5d0fe 0px, transparent 40%),
            #f8fafc
          `
        }}
      >
        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/Ads-of-Stupid-logo.png"
                alt="Ads of Stupid"
                className="h-9 w-auto object-contain"
              />
              <h2 className="font-sans text-[1.8rem] leading-none font-bold text-[#0f172a] m-0">Ads of Stupid</h2>
            </div>
            <p className="text-[0.95rem] text-zinc-600 leading-[1.7] mb-2 font-medium">Decoding the science behind the sale - one D2C brand at a time.</p>
            <p className="text-[0.95rem] text-zinc-400 font-bold">Pune, India</p>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Quick links</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/#formula", label: "What we do" },
                { href: "/#proof", label: "Projects" },
                { href: "/#blog", label: "Blog" },
                { href: "/#contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Services</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {[
                { href: "/performance-marketing-agency-pune", label: "Performance marketing" },
                { href: "/d2c-growth-strategy", label: "D2C growth strategy" },
                { href: "/meta-ads-management", label: "Meta and Google Ads" },
                { href: "/shopify-cro", label: "Shopify funnel optimization" },
                { href: "/whatsapp-marketing", label: "WhatsApp and Email marketing" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              <li><a href="mailto:hello@adsofstupid.com" className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">Email: hello@adsofstupid.com</a></li>
              <li><a href="https://wa.me/910000000000" className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">WhatsApp: +91 00000 00000</a></li>
              <li className="text-[0.92rem] text-zinc-400 font-semibold">Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="w-full text-center text-[clamp(2rem,14vw,11.5rem)] font-sans font-black text-[#5c43fd]/[0.07] pointer-events-none mt-16 mb-[-1.5rem] select-none relative z-10 leading-none whitespace-nowrap">
          Ads Of Stupid
        </div>

        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto mt-16 pt-6 border-t border-white/20 relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-2 text-white text-[0.82rem] leading-[1.7] px-4 md:px-8 text-center">
          <span>© 2025 Ads of Stupid. All Rights Reserved.</span>
          <span className="text-white/90">Performance marketing agency in Pune for early-stage D2C brands.</span>
          <span className="text-white/80 font-medium italic">No stupid marketing decisions were harmed in the making of this website.</span>
        </div>
      </footer>
    </div>
  );
}
