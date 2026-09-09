import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manus | People, clearly managed",
  description: "A calm command center for the people who make your work possible.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider></body>
    </html>
  );
}
