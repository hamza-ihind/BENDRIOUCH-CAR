"use client";

import {
  BarChart,
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
    label: "Page d'accueil",
    href: "/home",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/student/search",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/student/settings",
  },
];

const teacherRoutes = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: Newspaper,
    label: "Blogs",
    href: "/teacher/blogs",
  },
  {
    icon: Radio,
    label: "Livestreams",
    href: "/teacher/meetings",
  },
];

const adminRoutes = [
  {
    icon: ChartNoAxesCombined,
    label: "Analytiques et Métriques",
    href: "/admin/analytics",
  },
  {
    icon: UserCog,
    label: "Utilisateurs",
    href: "/admin/users",
  },
  {
    icon: List,
    label: "Cours",
    href: "/admin/courses",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  let routes = studentRoutes;

  if (pathname?.startsWith("/teacher")) {
    routes = teacherRoutes;
  } else if (pathname?.startsWith("/admin")) {
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
