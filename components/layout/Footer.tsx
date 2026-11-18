import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { site } from "@/lib/data";

const footerLinks = [
  { href: "/models", label: "Models" },
  { href: "/charging-points", label: "Charging points" },
  { href: "/news", label: "News" },
  { href: "/services", label: "Services" },
  { href: "/test-drive", label: "Test Drive" },
  { href: "/showrooms", label: "Showrooms" },
  { href: "/ownership", label: "Ownership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

function SocialIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    className: "h-4 w-4 shrink-0",
    fill: "currentColor",
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...common}>
        <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg {...common}>
        <path d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M17.6 3H20.4l-6.3 7.2L21.5 21h-5.6l-4.4-5.7L6.4 21H3.6l6.7-7.7L2.7 3h5.7l4 5.2L17.6 3zm-1 16.2h1.6L7.5 4.7H5.8l10.8 14.5z" />
    </svg>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group relative inline-block cursor-pointer py-0.5 text-sm text-mist-dim transition-colors duration-200 ease-out hover:text-mist";

  const underline = (
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gold transition-transform duration-200 ease-out group-hover:scale-x-100"
    />
  );

  if (external) {
    return (
      <a href={href} className={className}>
        {children}
        {underline}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      {underline}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-soft">
      <Container className="py-14 sm:py-16">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-4">
              <BrandLogo />
              <p className="text-sm text-mist-dim leading-relaxed">
                {site.distributorWording}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-brand text-silver mb-4">
                Explore
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-brand text-silver mb-4">
                Contact
              </p>
              <ul className="space-y-2.5">
                <li>
                  <FooterLink href={`tel:${site.phone}`} external>
                    {site.phone}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={`mailto:${site.email}`} external>
                    {site.email}
                  </FooterLink>
                </li>
                <li className="text-sm text-mist-dim">WhatsApp {site.whatsapp}</li>
              </ul>
              <div className="flex flex-wrap gap-x-5 gap-y-3 pt-2">
                {Object.entries(site.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex cursor-pointer items-center gap-1.5 py-0.5 text-sm capitalize text-mist-dim transition-colors duration-200 ease-out hover:text-gold"
                    aria-label={name}
                  >
                    <SocialIcon name={name} />
                    {name}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gold transition-transform duration-200 ease-out group-hover:scale-x-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-silver-dark">
              © {year} {site.companyName}. All rights reserved.
            </p>
            <ul className="flex gap-5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-block cursor-pointer py-0.5 text-xs text-silver-dark transition-colors duration-200 ease-out hover:text-mist"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gold transition-transform duration-200 ease-out group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
