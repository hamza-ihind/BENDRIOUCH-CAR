import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/utils/theme-provider";
import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import Footer from "@/components/auth/Footer";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <div className="w-full flex flex-col justify-between h-[100vh]">
          <Navbar />
          <main className="h-full flex-col justify-between mb-20">
            <div className="w-full z-20 max-md:px-4 ">{children}</div>
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}
