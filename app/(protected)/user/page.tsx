import Image from "next/image";
import { Card, Heading, Text } from "@once-ui-system/core";
import { requireUser } from "@/lib/auth";

export default async function UserPage() {
  const { clerkUser, user } = await requireUser();
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Your profile";
  const initials = (user.firstName?.[0] || user.email[0]).toUpperCase();

  return (
    <main className="workspace-main">
      <div className="section-heading">
        <div><p className="eyebrow">Your space</p><Heading as="h1">Hello, {user.firstName || "there"}.</Heading><Text className="section-subtitle">This is how your profile appears inside Manus.</Text></div>
        <span className="role-pill">{user.role === "ADMIN" ? "Administrator" : "Member"}</span>
      </div>
      <section className="profile-grid">
        <Card className="profile-card" padding="l">
          {clerkUser.imageUrl ? <Image className="profile-avatar" src={clerkUser.imageUrl} alt="" width={88} height={88} /> : <div className="profile-avatar profile-initials">{initials}</div>}
          <Heading as="h2" size="m">{name}</Heading>
          <Text>{user.email}</Text>
        </Card>
        <div className="profile-details">
          <p className="detail-label">Profile details</p>
          <div className="detail-row"><span>First name</span><strong>{user.firstName || "Not set"}</strong></div>
          <div className="detail-row"><span>Last name</span><strong>{user.lastName || "Not set"}</strong></div>
          <div className="detail-row"><span>Account status</span><strong className="status-live">Active</strong></div>
        </div>
      </section>
    </main>
  );
}
