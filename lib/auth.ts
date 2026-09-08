import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db";

export async function requireUser() {
  const session = await auth();
  if (!session.userId) redirect("/login");

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/login");

  const email = clerkUser.primaryEmailAddress?.emailAddress;
  if (!email) throw new Error("Your Clerk account needs an email address.");

  const role = clerkUser.publicMetadata.role === "admin" ? "ADMIN" : "USER";
  const user = await db.user.upsert({
    where: { clerkId: clerkUser.id },
    update: { email, firstName: clerkUser.firstName, lastName: clerkUser.lastName, imageUrl: clerkUser.imageUrl, role },
    create: { clerkId: clerkUser.id, email, firstName: clerkUser.firstName, lastName: clerkUser.lastName, imageUrl: clerkUser.imageUrl, role },
  });

  return { clerkUser, user };
}

export async function requireAdmin() {
  const identity = await requireUser();
  if (identity.user.role !== "ADMIN") redirect("/user");
  return identity;
}
