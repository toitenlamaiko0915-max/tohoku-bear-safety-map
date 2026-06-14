import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tohoku-bear-safety-map.vercel.app";
const lastModified = new Date("2026-06-14T00:00:00+09:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { route: "/", priority: 1 },
    { route: "/map", priority: 0.9 },
    { route: "/official-links", priority: 0.8 },
    { route: "/safety", priority: 0.8 },
    { route: "/updates", priority: 0.7 },
    { route: "/about", priority: 0.7 }
  ].map(({ route, priority }) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority
  }));
}
