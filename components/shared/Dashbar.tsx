import Image from "next/image";
import Link from "next/link";

import { Input } from "../ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Dashbar = () => {
  return (
    <div className="z-10 flex backdrop-blur-[12px] fixed w-full h-16 justify-between px-32 items-center shrink-0 border-b border-solid border-gray-100 mt-16">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/Dashboard/" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Overview
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Dashboard/Courses" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Courses
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Dashboard/Blogs" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Blogs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Dashboard/Announces" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Announces
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Dashboard/Progres" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Progres
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Dashboard/Badges" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Badges
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Input placeholder="Search..." className="w-fit" />
    </div>
  );
};

export default Dashbar;
