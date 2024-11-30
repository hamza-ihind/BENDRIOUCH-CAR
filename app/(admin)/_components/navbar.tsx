import React from "react";
import MobileSidebar from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

const Navbar = () => {
  return (
    <div className="p-4 border-b border-zinc-700 backdrop-blur-[25px] h-full flex items-center shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
