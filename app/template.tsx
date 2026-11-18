"use client";

import { PageTransition } from "@/components/motion";

/** Soft page enter animation without turning root layout into a client component */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
