import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/** Route-level skeleton while the next page segment loads */
export default function Loading() {
  return (
    <div className="pb-section-sm sm:pb-section" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>

      <section className="border-b border-silver/15 bg-ink-soft py-14 sm:py-20">
        <Container>
          <Skeleton className="mb-4 h-3 w-24" />
          <Skeleton className="h-10 w-2/3 max-w-md sm:h-12" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-3/4 max-w-lg" />
        </Container>
      </section>

      <Container className="mt-10 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-sm border border-silver/15 bg-ink-soft"
            >
              <Skeleton className="aspect-[16/10] w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
