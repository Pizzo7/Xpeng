"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const STORAGE_KEY = "xpeng-ghana-cookie-ok";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-xl rounded-sm border border-silver/20 bg-ink-soft/95 p-4 shadow-2xl backdrop-blur-md sm:left-6 sm:right-auto"
    >
      <p className="text-sm text-mist-dim leading-relaxed">
        We use essential cookies to keep this site working. See our{" "}
        <Link href="/privacy" className="text-gold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex justify-end">
        <Button type="button" size="sm" variant="primary" onClick={accept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
