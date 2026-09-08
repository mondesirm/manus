import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-intro">
        <Link className="brand" href="/"><span className="brand-mark">M</span> manus</Link>
        <p className="eyebrow">Make space</p>
        <h1>Start with clarity.</h1>
        <p>A quieter home for your team, from the very first day.</p>
      </div>
      <SignUp routing="path" path="/register" signInUrl="/login" />
    </main>
  );
}
