export function BlogImage({
  src,
  alt,
  className = ""
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} loading="lazy" className={`w-full h-full object-cover ${className}`} />
    );
  }

  // branded gradient placeholder for posts without a featured image
  return (
    <div
      aria-hidden
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f4f0ff] via-[#efe9ff] to-[#e7e0ff] ${className}`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8c76ff] to-[#5c43fd] shadow-[0_10px_24px_rgba(92,67,253,0.3)]">
        <svg className="h-7 w-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
        </svg>
      </span>
    </div>
  );
}
