import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Noticify",
  description: "A Organization Notification System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 text-white">
          <SignedOut>{children}</SignedOut>
          <SignedIn>
            {children}
            <Toaster/>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
