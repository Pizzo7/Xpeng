import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowroomList } from "@/components/showrooms/ShowroomList";
import { ShowroomsHero } from "@/components/showrooms/ShowroomsHero";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Showrooms",
  description:
    "Visit XPENG Ghana showrooms in Accra, Kumasi, and other major cities.",
};

export default function ShowroomsPage() {
  return (
    <>
      <ShowroomsHero />

      <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        <Container>
          <Reveal direction="left">
            <SectionHeading
              title="Our showrooms"
              description="Visit a dealership near you for a walkthrough, test drive, or ownership support."
              className="mb-8"
            />
          </Reveal>
          <ShowroomList showrooms={site.showrooms} />
        </Container>
      </div>
    </>
  );
}
