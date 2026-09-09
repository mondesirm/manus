"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { requireOrganizationAdmin } from "@/lib/auth";

const directoryPath = "/directory";

export async function removeUserFromOrganization(userId: string) {
  try {
    const identity = await requireOrganizationAdmin();
    if (userId === identity.clerkUser.id) return { ok: false, message: "You cannot remove yourself from the organization." };
    const client = await clerkClient();
    await client.organizations.deleteOrganizationMembership({ organizationId: identity.orgId!, userId });
    revalidatePath(directoryPath);
    return { ok: true, message: "Member removed from the organization." };
  } catch {
    return { ok: false, message: "We could not remove that member." };
  }
}

export async function inviteUserToOrganization(emailAddress: string) {
  try {
    const identity = await requireOrganizationAdmin();
    const email = emailAddress.trim().toLowerCase();
    if (!email) return { ok: false, message: "Enter an email address." };

    const client = await clerkClient();
    const users = await client.users.getUserList({ emailAddress: [email] });
    const memberships = await Promise.all(users.data.map((user) => client.users.getOrganizationMembershipList({ userId: user.id })));
    if (memberships.some((membership) => membership.totalCount > 0)) {
      return { ok: false, message: "That user already belongs to an organization." };
    }

    const session = await auth();
    await client.organizations.createOrganizationInvitation({
      organizationId: identity.orgId!,
      emailAddress: email,
      role: "org:member",
      inviterUserId: session.userId ?? undefined,
    });
    revalidatePath(directoryPath);
    return { ok: true, message: `Invitation sent to ${email}.` };
  } catch {
    return { ok: false, message: "We could not send that invitation." };
  }
}

export async function cancelOrganizationInvite(invitationId: string) {
  try {
    const identity = await requireOrganizationAdmin();
    const client = await clerkClient();
    await client.organizations.revokeOrganizationInvitation({ organizationId: identity.orgId!, invitationId, requestingUserId: identity.clerkUser.id });
    revalidatePath(directoryPath);
    return { ok: true, message: "Invitation cancelled." };
  } catch {
    return { ok: false, message: "We could not cancel that invitation." };
  }
}
