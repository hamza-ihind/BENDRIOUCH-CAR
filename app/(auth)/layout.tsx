import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/utils/theme-provider";
import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import Footer from "@/components/shared/Footer";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <div className="w-full flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
