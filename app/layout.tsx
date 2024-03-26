import type { Metadata } from "next";
import { Oswald, Work_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  AddAffiliateLink,
  Logo,
  LogoutButton,
  Navbar,
  TopNavbar,
} from "@/components/ui";
import { ErrorProvider } from "@/providers/ErrorProvider";
import Pricing from "@/components/Pricing";

const fontTitle = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  preload: true,
});
const fontBody = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
  preload: true,
});

export const metadata: Metadata = {
  title: "Coaché avec aisance",
  description: "Sois le coach de tes rêves",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={cn(
            "font-oswald min-h-screen antialiased flex flex-col gap-8 pt-10 px-5 overflow-x-hidden",
            fontTitle.variable,
            "font-work",
            fontBody.variable
          )}
        >
          <ErrorProvider>
            <div className="flex items-center gap-5">
              <Logo />
              {!!session && <TopNavbar session={session} />}
            </div>
            {session?.user.plan === "None" ? (
              <>
                <AddAffiliateLink userId={session.user.id} />
                <Pricing session={session} />
                <LogoutButton className="" />
              </>
            ) : (
              <>{children}</>
            )}
            {session?.user.plan !== "None" && <Navbar />}
          </ErrorProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
