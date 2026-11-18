import siteJson from "@/data/site.json";
import modelsJson from "@/data/models.json";
import discoverJson from "@/data/discover.json";
import g9lDetail from "@/data/models/g9l.json";
import l03Detail from "@/data/models/l03.json";
import x9Detail from "@/data/models/x9.json";
import p7PlusDetail from "@/data/models/p7-plus.json";
import g9Detail from "@/data/models/g9.json";
import g6Detail from "@/data/models/g6.json";
import p7Detail from "@/data/models/p7.json";
import type {
  DiscoverData,
  ModelDetail,
  ModelsData,
  SiteData,
} from "@/lib/types";

export const site: SiteData = siteJson as SiteData;
export const models: ModelsData = modelsJson as ModelsData;
export const discover: DiscoverData = discoverJson as DiscoverData;

const modelDetails: Record<string, ModelDetail> = {
  g9l: g9lDetail as ModelDetail,
  l03: l03Detail as ModelDetail,
  x9: x9Detail as ModelDetail,
  "p7-plus": p7PlusDetail as ModelDetail,
  g9: g9Detail as ModelDetail,
  g6: g6Detail as ModelDetail,
  p7: p7Detail as ModelDetail,
};

export function getModelSlugs(): string[] {
  return Object.keys(modelDetails);
}

export function getModelDetail(slug: string): ModelDetail | null {
  return modelDetails[slug] ?? null;
}

export function getFeaturedModel(): ModelDetail {
  const featured = models.models.find((m) => m.featured);
  const slug = featured?.id ?? "g9l";
  const detail = modelDetails[slug] ?? modelDetails.g9l;
  if (!detail) {
    throw new Error("Missing featured model detail data");
  }
  return detail;
}

/** Brand-level ownership copy (from featured / primary model until site-level copy exists) */
export function getOwnershipContent() {
  return getFeaturedModel().ownership;
}
