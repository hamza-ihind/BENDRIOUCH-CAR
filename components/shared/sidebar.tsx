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
const pratique: ComponentItem[] = [
  {
    title: "Espace Travaux Dirigés",
    href: "/Pratique/TD",
    description: "Exercices pour chaque module.",
  },
  {
    title: "Espace Examens et Devoirs",
    href: "/Pratique/DS",
    description: "Exemples d'examens disponibles.",
  },
  {
    title: "Espace Quizzes et Questionnaires",
    href: "/Pratique/Quiz",
    description: "Suivi de progression des tâches.",
  },
];

const microLearning: ComponentItem[] = [
  {
    title: "Fiches Mémo",
    href: "/cheats",
    description: "Fiches de révision rapide et concise.",
  },
  {
    title: "Cartes Mentales",
    href: "/mindmaps",
    description: "Représentations graphiques des concepts clés.",
  },
  {
    title: "Boîte à Outils",
    href: "/astuces",
    description: "Conseils et astuces pratiques en mathématiques et physique.",
  },
];

const resources: ComponentItem[] = [
  {
    title: "Nos Cours",
    href: "/courses",
    description: "Cours complets pour mieux apprendre.",
  },
  {
    title: "Nos Articles",
    href: "/blogs",
    description: "Articles pour approfondir vos connaissances.",
  },
];

const academie: ComponentItem[] = [
  {
    title: "ALEPHNULL",
    href: "/",
    description: "Plateforme de formation et de ressources.",
  },
  {
    title: "Notre équipe",
    href: "/team",
    description: "Découvrez les membres de notre équipe.",
  },
  {
    title: "Nos tarifs",
    href: "/pricing",
    description: "Consultez nos plans et abonnements.",
  },
];

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
    <Sidebar className="md:hidden">
      <SidebarContent className="py-4 px-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image height={130} width={130} alt="logo" src="/logoipsum.svg" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-8">
            <SidebarMenu>
              {/* Académie */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <p className="text-base font-medium">Académie</p>
                      <ChevronDown />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {academie.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              {/* Ressources */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <p className="text-base font-medium">Nos Ressources</p>
                      <ChevronDown />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {resources.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              {/* ESPACE PRATIQUE */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <p className="text-base font-medium">Espace Pratique</p>
                      <ChevronDown />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {pratique.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              {/* MICROLEARNING */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <p className="text-base font-medium">Microlearning</p>
                      <ChevronDown />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {microLearning.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
