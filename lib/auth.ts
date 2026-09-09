import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db";

export async function requireUser() {
  const session = await auth();
  if (!session.userId) redirect("/login");

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/login");

  const email = clerkUser.primaryEmailAddress?.emailAddress;
  if (!email) throw new Error("Your Clerk account needs an email address.");

  const role = clerkUser.publicMetadata?.role === "admin" ? "ADMIN" : "USER";
  const user = await db.user.upsert({
    where: { clerkId: clerkUser.id },
    update: { email, firstName: clerkUser.firstName, lastName: clerkUser.lastName, imageUrl: clerkUser.imageUrl, role },
    create: { clerkId: clerkUser.id, email, firstName: clerkUser.firstName, lastName: clerkUser.lastName, imageUrl: clerkUser.imageUrl, role },
  });

  const organization = session.orgId
    ? await (await clerkClient()).organizations.getOrganization({ organizationId: session.orgId })
    : null;

  return { clerkUser, user, organization, orgId: session.orgId, orgRole: session.orgRole };
}

export async function requireAdmin() {
  const identity = await requireUser();
  if (identity.user.role !== "ADMIN") redirect("/profile");
  return identity;
}

export async function requireOrganizationAdmin() {
  const identity = await requireUser();
  if (!identity.orgId || (identity.orgRole !== "org:admin" && identity.user.role !== "ADMIN")) {
    redirect("/profile");
  }
  return identity;
}
