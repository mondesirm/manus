import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-intro">
        <Link className="brand" href="/"><span className="brand-mark">M</span> manus</Link>
        <p className="eyebrow">Welcome back</p>
        <h1>Good to see you.</h1>
        <p>Pick up the important work, right where you left it.</p>
      </div>
      <SignIn appearance={clerkAppearance} routing="path" path="/login" signUpUrl="/register" />
    </main>
  );
}
