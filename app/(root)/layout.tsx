import { auth } from "@/auth";
import "../globals.css";

// PROVIDERS
import { ThemeProvider } from "@/utils/theme-provider";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/sidebar";

// COMPONENTS
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <Navbar />
        <main className="w-full z-20 flex flex-col px-48 max-xl:px-32 max-lg:px-16 max-md:px-8 py-28">
          {children}
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
