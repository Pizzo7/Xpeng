import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the XPENG Ghana website.",
};

export default function TermsPage() {
  return (
    <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
      <Container narrow>
        <SectionHeading title={site.terms.headline} />
        <p className="mt-6 text-mist-dim leading-relaxed whitespace-pre-line">
          {site.terms.body}
        </p>
      </Container>
    </div>
  );
}
