"use client";

import React from "react";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import AccountCard from "@/components/auth/account-card";
import { Home, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const sidebar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 flex flex-col overflow-y-auto shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
        <Link href={"/"} className="block">
          <Logo />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <SidebarRoutes />
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100 dark:border-neutral-800 space-y-3">
        {/* Home Button */}
        <Link href="/" className="block">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-gray-200 dark:border-neutral-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Button>
        </Link>

        {/* Theme Toggle Button */}
        <Button
          onClick={toggleTheme}
          variant="outline"
          className="w-full justify-start gap-3 border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-300"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-5 h-5" />
              Mode Clair
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              Mode Sombre
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default sidebar;
