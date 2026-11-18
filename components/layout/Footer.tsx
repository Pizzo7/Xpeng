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
              <div className="flex gap-5 pt-2">
                {Object.entries(site.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block cursor-pointer py-0.5 text-sm capitalize text-mist-dim transition-colors duration-200 ease-out hover:text-gold"
                    aria-label={name}
                  >
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
