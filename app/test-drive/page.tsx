import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestDriveForm } from "@/components/forms/TestDriveForm";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book a Test Drive",
  description:
    "Book an XPENG test drive in Accra, Kumasi, and other major cities in Ghana.",
};

export default function TestDrivePage() {
  return (
    <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <SectionHeading
                title="Come drive XPENG"
                description="Choose a model interest, city, and time. Our team will confirm your drive shortly."
              />
              <div className="mt-6 space-y-2 text-sm text-mist-dim">
                <p>Phone: {site.phone}</p>
                <p>WhatsApp: {site.whatsapp}</p>
                <p>Email: {site.email}</p>
              </div>
            </div>
          </Reveal>
          <TestDriveForm />
        </div>
      </Container>
    </div>
  );
}
