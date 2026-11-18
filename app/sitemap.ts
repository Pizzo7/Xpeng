import type { MetadataRoute } from "next";
import { getModelSlugs, site } from "@/lib/data";

const staticRoutes = [
  "",
  "/models",
  "/charging-points",
  "/news",
  "/services",
  "/test-drive",
  "/showrooms",
  "/ownership",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const modelRoutes = getModelSlugs().map((slug) => `/models/${slug}`);
  return [...staticRoutes, ...modelRoutes].map((path) => ({
    url: `${site.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" || path === "/models" || path.startsWith("/models/")
        ? 1
        : 0.7,
  }));
}
