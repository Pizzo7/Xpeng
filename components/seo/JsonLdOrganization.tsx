import { site } from "@/lib/data";

export function JsonLdOrganization() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.companyName,
    description: site.distributorWording,
    url: site.siteUrl,
    email: site.email,
    telephone: site.phone,
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    sameAs: Object.values(site.socials).filter((u) => u && u !== "#"),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
