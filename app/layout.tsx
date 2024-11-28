import type { Metadata } from "next";
import { Gantari } from "next/font/google";
import { SessionProvider } from "next-auth/react";
// import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/utils/theme-provider";
import { auth } from "@/auth";

const gantari = Gantari({
  subsets: ["latin"],
  variable: "--gantari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alephnull",
  description: "My startup",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
          integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
          crossOrigin="anonymous"
        />

        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"
          integrity="sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd"
          crossOrigin="anonymous"
        ></script>

        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"
          integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`min-h-screen bg-background antialiased overflow-x-hidden ${gantari.className} ${gantari.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            {children}
            {/* <Analytics /> */}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
