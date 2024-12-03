"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/dashboard" && href === "/dashboard") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-gray-800 text-sm font-[500] pl-3 mx-4 rounded-lg transition-all hover:text-gray-800 hover:bg-slate-600/20",
        isActive &&
          "text-black bg-gray-300/20 hover:bg-gray-200/20 hover:text-yellow-500"
      )}
    >
      <div className="flex items-center gap-x-3 py-3">
        <Icon
          size={22}
          className={cn(
            "text-gray-800",
            isActive && "text-black hover:text-yellow-500"
          )}
        />
        {label}
      </div>
    </button>
  );
};
