import type { Metadata } from "next";
import { Oswald, Work_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Navbar, TopNavbar } from "@/components/ui";
import { ErrorProvider } from "@/providers/ErrorProvider";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
            "font-oswald min-h-screen antialiased flex flex-col gap-8 pt-10 px-5 overflow-x-hidden pb-32 lg:pb-10",
            fontTitle.variable,
            "font-work",
            fontBody.variable
          )}
        >
          <ErrorProvider>
            {!!session && <TopNavbar session={session} />}
            {children}
            <Navbar />
          </ErrorProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
