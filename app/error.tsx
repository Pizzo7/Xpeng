"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-brand text-gold">Something went wrong</p>
      <h1 className="mt-3 font-display text-4xl text-mist">Please try again</h1>
      <p className="mt-3 max-w-md text-mist-dim">
        An unexpected error occurred while loading this page.
      </p>
      <Button type="button" variant="gold" className="mt-8" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
