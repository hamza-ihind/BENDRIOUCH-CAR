"use client";

import {
  BarChart,
  Car,
  ChartNoAxesCombined,
  Compass,
  Layout,
  List,
  Newspaper,
  Radio,
  Settings,
  UserCog,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

import { usePathname } from "next/navigation";

const studentRoutes = [
  {
    icon: Layout,
    label: "Reservations",
    href: "/user/reservations",
  },
  {
    icon: Car,
    label: "Voitures",
    href: "/user/cars",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/user/settings",
  },
];

const adminRoutes = [
  {
    icon: UserCog,
    label: "Utilisateurs",
    href: "/admin/users",
  },
  {
    icon: Car,
    label: "Voitures",
    href: "/admin/cars",
  },
  {
    icon: Newspaper,
    label: "Reservations",
    href: "/admin/reservations",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  let routes = studentRoutes;

  if (pathname?.startsWith("/admin")) {
    routes = adminRoutes;
  }

  return (
    <div className="flex flex-col w-full gap-1 text-black">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
