import { requireUser } from "@/lib/auth";
import { ProtectedHeader } from "@/components/ProtectedHeader";

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = await requireUser();
  const displayName = user.firstName || user.email.split("@")[0];

  return (
    <div className="workspace-shell">
      <ProtectedHeader displayName={displayName} isAdmin={user.role === "ADMIN"} />
      {children}
    </div>
  );
}
