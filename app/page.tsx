import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { ModelFinder } from "@/components/home/ModelFinder";

const FeaturedModelShowcase = dynamic(
  () =>
    import("@/components/home/FeaturedModelShowcase").then(
      (m) => m.FeaturedModelShowcase,
    ),
  { ssr: true },
);

const LifestyleSection = dynamic(
  () =>
    import("@/components/home/LifestyleSection").then((m) => m.LifestyleSection),
  { ssr: true },
);

const AssemblyStory = dynamic(
  () =>
    import("@/components/home/AssemblyStory").then((m) => m.AssemblyStory),
  { ssr: true },
);

const TestDrivePreview = dynamic(
  () =>
    import("@/components/home/TestDrivePreview").then(
      (m) => m.TestDrivePreview,
    ),
  { ssr: true },
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModelFinder />
      <FeaturedModelShowcase />
      <LifestyleSection />
      <AssemblyStory />
      <TestDrivePreview />
    </>
  );
}
