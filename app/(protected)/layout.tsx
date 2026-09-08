import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { requireUser } from "@/lib/auth";

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = await requireUser();
  const displayName = user.firstName || user.email.split("@")[0];

  return (
    <div className="workspace-shell">
      <header className="workspace-nav">
        <Link className="brand" href="/"><span className="brand-mark">M</span> manus</Link>
        <nav className="workspace-links" aria-label="Workspace navigation">
          <Link href="/user">My profile</Link>
          {user.role === "ADMIN" && <Link href="/admin">Directory</Link>}
        </nav>
        <div className="account-chip"><span>{displayName}</span><UserButton /></div>
      </header>
      {children}
    </div>
  );
}
