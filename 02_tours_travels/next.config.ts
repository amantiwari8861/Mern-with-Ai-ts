import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Only takes effect over HTTPS; harmless on localhost.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace root — several lockfiles exist up the tree, so Turbopack
  // would otherwise guess and warn.
  turbopack: { root: __dirname },

  // Keep Mongoose server-side only — it uses Node built-ins (async_hooks, fs,
  // net, tls, dns) that don't exist in the browser/Edge bundle.
  serverExternalPackages: ["mongoose"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sukhholidays.com", pathname: "/**" },
      // User avatars (fallback initials avatar generated in AuthContextWrapper)
      { protocol: "https", hostname: "ui-avatars.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
