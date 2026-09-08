"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function updateUserRole(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId"));
  const role = String(formData.get("role"));
  if (!userId || !["USER", "ADMIN"].includes(role)) return;

  await db.user.update({ where: { id: userId }, data: { role: role as "USER" | "ADMIN" } });
  revalidatePath("/admin");
}
