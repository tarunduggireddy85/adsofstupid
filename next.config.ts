import type { NextConfig } from "next";

// Security headers applied to every response. These address the Lighthouse
// "Best Practices" trust-and-safety checks (HSTS, clickjacking, MIME sniffing,
// referrer, permissions) without a strict CSP (which would break GTM/Pixel).
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false;
    }

    return config;
  }
};

export default nextConfig;
