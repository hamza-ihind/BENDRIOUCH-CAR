import React from "react";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import AccountCard from "@/components/auth/account-card";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sidebar = () => {
  return (
    <div className="h-full border-r border-color flex flex-col overflow-y-auto shadow-sm justify-between">
      <div>
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
      </div>
      <Link href={"/"}>
        <div className="flex gap-2 items-center p-6 hover:underline cursor-pointer text-sm">
          <ArrowLeft className="h-4 w-4" />
          Retour à la page principale
        </div>
      </Link>
    </div>
  );
};

export default sidebar;
