import { clerkClient } from "@clerk/nextjs/server";
import { Card, Heading, Text } from "@once-ui-system/core";
import { DirectoryClient } from "@/components/DirectoryClient";
import { requireOrganizationAdmin } from "@/lib/auth";

type MemberRow = { id: string; userId: string; name: string; email: string; imageUrl: string; role: string; lastActiveAt: number | null };

type InviteRow = { id: string; emailAddress: string; createdAt: number; status: string };

export default async function DirectoryPage() {
  const identity = await requireOrganizationAdmin();
  const client = await clerkClient();
  const [membersResponse, invitesResponse] = await Promise.all([
    client.organizations.getOrganizationMembershipList({ organizationId: identity.orgId!, limit: 100 }),
    client.organizations.getOrganizationInvitationList({ organizationId: identity.orgId!, status: ["pending"], limit: 100 }),
  ]);

  const members: MemberRow[] = await Promise.all(membersResponse.data.map(async (membership) => {
    const publicUser = membership.publicUserData;
    const user = publicUser?.userId ? await client.users.getUser(publicUser.userId) : null;
    return {
      id: membership.id,
      userId: publicUser?.userId ?? membership.id,
      name: [publicUser?.firstName, publicUser?.lastName].filter(Boolean).join(" ") || publicUser?.identifier || "Unnamed person",
      email: publicUser?.identifier ?? "No email",
      imageUrl: publicUser?.imageUrl ?? "",
      role: membership.role,
      lastActiveAt: user?.lastActiveAt ?? null,
    };
  }));

  members.sort((left, right) => {
    const roleOrder = (role: string) => role === "org:admin" ? 0 : 1;
    return roleOrder(left.role) - roleOrder(right.role) || left.name.localeCompare(right.name);
  });

  const invites: InviteRow[] = invitesResponse.data.map((invite) => ({
    id: invite.id,
    emailAddress: invite.emailAddress,
    createdAt: invite.createdAt,
    status: invite.status ?? "pending",
  }));

  return (
    <main className="workspace-main">
      <div className="section-heading">
        <div><p className="eyebrow">Organization directory</p><Heading as="h1">Members of {identity.organization?.name ?? "your organization"}</Heading><Text className="section-subtitle">Keep the right people close to the work that matters.</Text></div>
        <span className="count-pill">{members.length} {members.length === 1 ? "member" : "members"}</span>
      </div>
      {members.length === 0 && <Card className="empty-state" padding="xl"><span className="empty-mark">+</span><Heading as="h2" size="m">Your directory is waiting.</Heading><Text>Invite someone to give this organization its first member.</Text></Card>}
      <DirectoryClient members={members} invites={invites} />
    </main>
  );
}
