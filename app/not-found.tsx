import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-brand text-gold">404</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl text-mist">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-mist-dim">
        The page you are looking for is not available. Head home or book a test
        drive instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex cursor-pointer items-center justify-center rounded border border-silver/40 px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-mist hover:bg-surface-hover"
        >
          Home
        </Link>
        <Link
          href="/test-drive"
          className="inline-flex cursor-pointer items-center justify-center rounded bg-gold px-6 py-3 text-sm font-medium text-on-gold transition-colors hover:bg-gold-soft"
        >
          Book a Test Drive
        </Link>
      </div>
    </div>
  );
}
