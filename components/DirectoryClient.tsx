"use client";

import { useState, useTransition } from "react";
import { Button, Card, Text } from "@once-ui-system/core";
import { cancelOrganizationInvite, inviteUserToOrganization, removeUserFromOrganization } from "@/app/(protected)/directory/actions";

type Member = { id: string; userId: string; name: string; email: string; imageUrl: string; role: string; lastActiveAt: number | null };
type Invite = { id: string; emailAddress: string; createdAt: number; status: string };

export function DirectoryClient({ members: initialMembers, invites: initialInvites }: { members: Member[]; invites: Invite[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [invites, setInvites] = useState(initialInvites);
  const [now] = useState(() => Date.now());
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const notify = (text: string) => { setMessage(text); window.setTimeout(() => setMessage(null), 3200); };
  const run = (work: () => Promise<{ ok: boolean; message: string }>, onSuccess: () => void) => startTransition(async () => { const result = await work(); if (result.ok) { onSuccess(); notify(result.message); } else notify(result.message); });
  const remove = (userId: string) => run(() => removeUserFromOrganization(userId), () => setMembers((value) => value.filter((member) => member.userId !== userId)));
  const invite = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); run(() => inviteUserToOrganization(email), () => { setEmail(""); }); };
  const cancel = (invitationId: string) => run(() => cancelOrganizationInvite(invitationId), () => setInvites((value) => value.filter((invite) => invite.id !== invitationId)));

  return <>
    {message && <div className="toast" role="status">{message}</div>}
    <Card className="invite-card" padding="m"><form className="invite-form" onSubmit={invite}><div><strong>Invite a new member</strong><Text>They will receive an email to join this organization.</Text></div><input aria-label="Email address" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" /><Button type="submit" disabled={isPending} variant="primary" size="s">Invite</Button></form></Card>
    <Card className="directory-card" padding={0}><div className="directory-header"><span>Person</span><span>Role</span><div>Last active</div><span>Manage</span></div>{members.map((member) => { const active = member.lastActiveAt ? now - member.lastActiveAt < 15 * 60 * 1000 : false; return <div className="directory-row" key={member.id}><div className="person-cell"><div className="avatar-wrap"><div className="mini-avatar" style={{ backgroundImage: `url(${member.imageUrl})` }}>{!member.imageUrl && member.name[0]}</div><span className={`presence-dot ${active ? "is-active" : ""}`} title={`Last Active: ${member.lastActiveAt ? new Date(member.lastActiveAt).toLocaleString() : "Never"}`} /></div><div><strong>{member.name}</strong><Text>{member.email}</Text></div></div><span className="role-pill">{member.role === "org:admin" ? "Admin" : "Member"}</span><p>{member.lastActiveAt ? new Date(member.lastActiveAt).toLocaleString() : "Never"}</p><Button type="button" disabled={isPending} onClick={() => remove(member.userId)} variant="tertiary" size="s">Remove</Button></div>; })}</Card>
    <section className="invites-section"><div className="table-title"><h2>Ongoing invites</h2><span className="count-pill">{invites.length} pending</span></div><Card className="directory-card" padding={0}>{invites.length === 0 ? <div className="table-empty">No pending invitations.</div> : invites.map((invite) => <div className="directory-row invite-row" key={invite.id}><div><strong>{invite.emailAddress}</strong></div><p>{new Date(invite.createdAt).toLocaleDateString()}</p><Button type="button" disabled={isPending} onClick={() => cancel(invite.id)} variant="tertiary" size="s">Cancel</Button></div>)}</Card></section>
  </>;
}
