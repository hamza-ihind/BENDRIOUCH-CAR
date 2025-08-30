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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* Sidebar - Fixed on the left */}
        <div className="max-md:hidden md:flex h-screen w-80 flex-col fixed inset-y-0 left-0 z-50">
          <Sidebar />
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden h-[70px] fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>

        {/* Main Content - Offset by sidebar width */}
        <main className="md:ml-80 min-h-screen p-6 lg:p-8 max-md:mt-16">
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}
