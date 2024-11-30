import React from "react";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import AccountCard from "@/components/auth/account-card";

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
      <div className="m-4">
        <AccountCard />
      </div>
    </div>
  );
};

export default sidebar;
