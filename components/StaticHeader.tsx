"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "#approach", label: "Approach" },
  { href: "#pricing", label: "Pricing" },
];

export function StaticHeader() {
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <Link className="brand" href="/"><span className="brand-mark">M</span> manus</Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => <Link className={pathname === link.href ? "active" : undefined} href={link.href} key={link.href}>{link.label}</Link>)}
        <Link className="nav-action shimmer-button" href="/login">Get started</Link>
      </nav>
    </header>
  );
}
