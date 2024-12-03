import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/utils/theme-provider";
import "../globals.css";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="max-md:hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <div className="md:hidden h-[70px] md:pl-72 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <main className="md:pl-72">{children}</main>
      </ThemeProvider>
    </div>
  );
}
