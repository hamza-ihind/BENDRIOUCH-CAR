"use client";

import UserButton from "../../../components/auth/user-button";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "../../../components/shared/search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      <Link href="/teacher/courses">
        <Button size="sm" variant="ghost">
          Retour à la page principale
        </Button>
      </Link>
      <UserButton />
    </div>
  );
};
