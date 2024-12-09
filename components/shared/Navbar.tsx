"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ThemeSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { LogOut, MenuIcon, MountainIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import UserButton from "../auth/user-button";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/hooks/use-toast";
import { SidebarTrigger } from "../ui/sidebar";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

const pratique: ComponentItem[] = [
  {
    title: "Espace Travaux dirigés",
    href: "/Pratique/TD",
    description: "La page contenant tous les exercices de tout les modules",
  },
  {
    title: "Espace Exemples d'Examens",
    href: "/Pratique/DS",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Espace Quizzes et Questionnaires",
    href: "/Pratique/Quiz",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

const microLearning: ComponentItem[] = [
  {
    title: "Cheat Sheets",
    href: "/cheats",
    description: "Fiches de révision rapides.",
  },
  {
    title: "Mind Maps",
    href: "/mindmaps",
    description: "Cartes mentales des concepts.",
  },
  {
    title: "Boite A Outils",
    href: "/astuces",
    description: "Astuces en maths et physique.",
  },
];

const ListItem: React.FC<ListItemProps> = ({ title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const Navbar: React.FC = () => {
  const user = useCurrentUser();
  const role = user?.role;

  const targetRoute = role === "ADMIN" ? "/admin/cars" : "/user/reservations";

  return (
    <header className="flex h-16 w-full shrink-0 items-center px-48 max-lg:px-8 z-50 backdrop-blur-[25px] fixed justify-between border-b border-solid border-gray-800 bg-gray-200">
      <SidebarTrigger className="xl:hidden" />

      <div className="w-[150px] max-xl:hidden">
        <Link href="/">
          <Image height={130} width={130} alt="logo" src="/logoipsum.svg" />
        </Link>
      </div>
      <div className="flex w-full justify-start ml-8">
        <NavigationMenu className="max-xl:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Accueil
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#ABOUT" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  A propos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/catalogue" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Catalogue
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={targetRoute} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Tableau de bord
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <NavigationMenu className="flex gap-4">
        {user ? (
          <>
            <UserButton />
            <Button variant={"outline"} size="icon" onClick={() => logout()}>
              <LogOut className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link href="/sign-in" passHref>
              <Button variant={"outline"}>Se connecter</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button variant={"default"}>S'inscrire</Button>
            </Link>
          </div>
        )}
        <ModeToggle />
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
