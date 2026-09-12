import type { MetadataRoute } from "next";
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://threadstudio.bd";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/products", "/dtf", "/pricing", "/process", "/quality", "/portfolio", "/contact", "/quote"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" || path === "/quote" ? 1 : 0.7,
  }));
}
