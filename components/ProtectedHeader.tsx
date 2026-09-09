"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk";

export function ProtectedHeader({ displayName, isAdmin }: { displayName: string; isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <header className="workspace-nav">
      <Link className="brand" href="/"><span className="brand-mark">M</span> manus</Link>
      <nav className="workspace-links" aria-label="Workspace navigation">
        <Link className={pathname === "/profile" ? "active" : undefined} href="/profile">My profile</Link>
        {isAdmin && <Link className={pathname.startsWith("/directory") ? "active" : undefined} href="/directory">Directory</Link>}
      </nav>
      <div className="account-chip">
        <OrganizationSwitcher appearance={clerkAppearance} hidePersonal />
        <span>{displayName}</span>
        <UserButton appearance={clerkAppearance} />
      </div>
    </header>
  );
}
