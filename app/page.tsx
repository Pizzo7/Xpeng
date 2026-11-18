import { Hero } from "@/components/home/Hero";
import { ModelFinder } from "@/components/home/ModelFinder";
import { FeaturedModelShowcase } from "@/components/home/FeaturedModelShowcase";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { AssemblyStory } from "@/components/home/AssemblyStory";
import { TestDrivePreview } from "@/components/home/TestDrivePreview";

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
