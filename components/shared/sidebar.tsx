import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, children, ...props }) => {
  return (
    <li>
      <SidebarMenuSubItem>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </SidebarMenuSubItem>
    </li>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className="md:hidden border-gray-800 z-50 backdrop-blur-2xl bg-white">
      <SidebarContent className="py-4 px-2 border-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image height={130} width={130} alt="logo" src="/logoipsum.svg" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-8">
            <SidebarMenu>
              {/* Accueil */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex justify-between">
                  <ListItem title="Acceuil" href="/" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* A propos */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex justify-between">
                  <ListItem title="A propos" href="/#ABOUT" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/*  */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex justify-between">
                  <ListItem title="Catalogue" href="/catalogue" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
