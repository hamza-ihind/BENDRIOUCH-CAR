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
        <Navbar />
      </SidebarProvider>
      <div className="flex flex-col justify-between">
        {/* Main Content */}
        <main className="h-full">
          <HeroHighlight className="relative flex flex-col justify-center items-center w-full h-full pt-32 max-xl:pt-18 max-xl:px-8">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-neutral-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_25%,#0a0a0a)]"></div>
            <div className="absolute left-0 top-0 w-80 h-80 bg-orange-400 blur-[250px] opacity-50"></div>
            <div className="w-full z-20">{children}</div>
          </HeroHighlight>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
