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

  // Determine the correct dashboard link
  const dashboardLink =
    user?.role === "ADMIN" || user?.role === "TEACHER"
      ? "/teacher/home"
      : "/student/home";

  return (
    <header className="flex h-16 w-full shrink-0 items-center px-32 max-lg:px-8 z-50 backdrop-blur-[25px] fixed justify-between border-b border-solid border-zinc-800">
      <SidebarTrigger className="xl:hidden" />

      <div className="w-[150px] max-xl:hidden">
        <Link href="/">
          <Image
            src="/logo-dark.png"
            alt="logo"
            width={120}
            height={20}
            className="mr-8"
          />
        </Link>
      </div>
      <div className="flex w-full justify-start ml-8">
        <NavigationMenu className="max-xl:hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Académie</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Image
                          src="/logo-black.svg"
                          alt="logo"
                          width={82}
                          height={48}
                        />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          ALEPHNULL
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Apprendre sans limites. Evoluer sans frontières.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/#about" title="Présentation ALEPHNULL">
                    Découvrez ALEPHNULL et ses buts
                  </ListItem>
                  <ListItem href="/equipe" title="Notre Équipe">
                    Rencontrez notre équipe et découvrez leur expertise.
                  </ListItem>
                  <ListItem href="/pricing" title="Nos Tarifs">
                    Consultez les options de tarification et choisissez celle
                    qui vous convient.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Espace Pratique</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {pratique.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Microlearning</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {microLearning.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Alephblog" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Alephblog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Alephcom" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Communités
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href={dashboardLink}
                onClick={() => toast({ description: "Hello there" })}
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <NavigationMenu className="flex gap-4">
        {user ? (
          <div className="flex gap-4">
            <UserButton />
            <Button variant={"outline"} size="icon" onClick={() => logout()}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/sign-in" passHref>
              <Button variant={"ghost"}>Se connecter</Button>
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
