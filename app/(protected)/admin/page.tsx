import { Button, Card, Heading, Text } from "@once-ui-system/core";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateUserRole } from "./actions";

export default async function AdminPage() {
  await requireAdmin();
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="workspace-main">
      <div className="section-heading">
        <div><p className="eyebrow">Admin workspace</p><Heading as="h1">People directory</Heading><Text className="section-subtitle">A living view of everyone with a place in your workspace.</Text></div>
        <span className="count-pill">{users.length} {users.length === 1 ? "person" : "people"}</span>
      </div>
      {users.length === 0 ? <Card className="empty-state" padding="xl"><span className="empty-mark">+</span><Heading as="h2" size="m">Your directory is waiting.</Heading><Text>No people have joined the workspace yet. New members will appear here after they sign in.</Text></Card> : <Card className="directory-card" padding="none"><div className="directory-header"><span>Person</span><span>Role</span><span>Joined</span><span>Manage</span></div>{users.map((person) => <div className="directory-row" key={person.id}><div className="person-cell"><div className="mini-avatar">{(person.firstName?.[0] || person.email[0]).toUpperCase()}</div><div><strong>{[person.firstName, person.lastName].filter(Boolean).join(" ") || "Unnamed person"}</strong><Text>{person.email}</Text></div></div><span className="role-pill">{person.role === "ADMIN" ? "Admin" : "Member"}</span><Text>{person.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Text><form action={updateUserRole}><input type="hidden" name="userId" value={person.id} /><input type="hidden" name="role" value={person.role === "ADMIN" ? "USER" : "ADMIN"} /><Button type="submit" variant="tertiary" size="s">Make {person.role === "ADMIN" ? "member" : "admin"}</Button></form></div>)}</Card>}
    </main>
  );
}
