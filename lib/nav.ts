import { models } from "@/lib/data";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  id: string;
  label: string;
  children: NavLink[];
}

export type NavItem =
  | { type: "link"; link: NavLink }
  | { type: "group"; group: NavGroup };

export const discoverLinks: NavLink[] = [
  { href: "/charging-points", label: "Charging points" },
  { href: "/news", label: "News" },
  { href: "/services", label: "Services" },
];

export const modelLinks: NavLink[] = [
  ...models.models.map((model) => ({
    href: model.href,
    label: model.name,
  })),
  { href: "/models", label: "View all models" },
];

export const flatNavLinks: NavLink[] = [
  { href: "/showrooms", label: "Showrooms" },
  { href: "/ownership", label: "Ownership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Desktop / mobile primary navigation structure */
export const primaryNav: NavItem[] = [
  {
    type: "group",
    group: {
      id: "models",
      label: "Models",
      children: modelLinks,
    },
  },
  {
    type: "group",
    group: {
      id: "discover",
      label: "Discover",
      children: discoverLinks,
    },
  },
  ...flatNavLinks.map((link) => ({ type: "link" as const, link })),
];

/** @deprecated Prefer primaryNav — kept for any leftover imports */
export const mainNavLinks: NavLink[] = [
  { href: "/models", label: "Models" },
  ...flatNavLinks,
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/models") {
    return pathname === "/models" || pathname.startsWith("/models/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isModelsActive(pathname: string): boolean {
  return pathname === "/models" || pathname.startsWith("/models/");
}

export function isDiscoverActive(pathname: string): boolean {
  return discoverLinks.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
}

export function isGroupActive(pathname: string, groupId: string): boolean {
  if (groupId === "models") return isModelsActive(pathname);
  if (groupId === "discover") return isDiscoverActive(pathname);
  return false;
}
