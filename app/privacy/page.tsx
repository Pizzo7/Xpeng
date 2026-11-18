import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for XPENG Ghana customers and website visitors.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
      <Container narrow>
        <SectionHeading title={site.privacy.headline} />
        <p className="mt-6 text-mist-dim leading-relaxed whitespace-pre-line">
          {site.privacy.body}
        </p>
      </Container>
    </div>
  );
}
