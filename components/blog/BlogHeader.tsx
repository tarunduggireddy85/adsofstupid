import Link from "next/link";

const links = [
  { href: "/#formula", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full py-4 px-4 flex justify-center bg-surface-main/90 backdrop-blur-xl border-b border-zinc-200/60">
      <div className="w-full max-w-[1100px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Ads-of-Stupid-logo.png"
            alt="Ads of Stupid"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-semibold text-zinc-900 tracking-tight text-[1.12rem] hidden sm:inline">
            Ads of Stupid
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.88rem] font-medium text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-[#5c43fd] text-white font-medium text-[0.88rem] px-5 py-2 rounded-full hover:bg-[#4a32e5] transition-colors shadow-[0_2px_8px_rgba(92,67,253,0.2)] no-underline"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
