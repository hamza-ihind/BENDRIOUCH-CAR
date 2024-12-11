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
        <main className="p-48 w-full">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
