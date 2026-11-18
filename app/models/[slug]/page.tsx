import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion";
import { ModelShowcase } from "@/components/vehicle/ModelShowcase";
import { SpecsTable } from "@/components/vehicle/SpecsTable";
import { FeatureHighlights } from "@/components/vehicle/FeatureHighlights";
import { getModelDetail, getModelSlugs } from "@/lib/data";
import { getModelSpinVideo } from "@/lib/modelMedia";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getModelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelDetail(slug);
  if (!model) return { title: "Model" };
  return {
    title: model.name,
    description: model.subheadline,
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = getModelDetail(slug);
  if (!model) notFound();

  const hasVisual =
    Boolean(getModelSpinVideo(model.id)) ||
    model.colors.length > 0 ||
    model.gallery.length > 0;

  return (
    <div className="pb-section-sm sm:pb-section">
      <section className="bg-ink-soft pt-8 pb-5 sm:pt-10 sm:pb-6">
        <Container>
          <Reveal>
            <SectionHeading
              title={model.name}
              description={model.subheadline}
            />
          </Reveal>
        </Container>
      </section>

      <Container className="mt-6 space-y-12 sm:mt-8 sm:space-y-14">
        {hasVisual ? (
          <Reveal>
            <ModelShowcase
              modelId={model.id}
              colors={model.colors}
              gallery={model.gallery}
              modelName={model.name}
              priceGhs={model.priceGhs}
              priceNote={model.priceNote}
            />
          </Reveal>
        ) : null}

        <div>
          <Reveal>
            <h2 className="mb-5 font-display text-2xl text-mist sm:text-3xl">
              Specifications
            </h2>
          </Reveal>
          <div className="border border-silver/15 bg-ink-soft px-4 sm:px-6 lg:px-8">
            <SpecsTable rows={model.specRows} />
          </div>
        </div>

        {model.features.length > 0 ? (
          <div>
            <Reveal>
              <h2 className="mb-5 font-display text-2xl text-mist sm:text-3xl">
                Features
              </h2>
            </Reveal>
            <FeatureHighlights features={model.features} />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
