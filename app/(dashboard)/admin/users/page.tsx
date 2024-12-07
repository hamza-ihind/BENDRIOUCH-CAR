import { auth } from "@/auth";
import DashboardTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { IconBadge } from "@/components/shared/icon-badge";

import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable as UsersTable } from "./_components/users-table/data-table";
import { columns as UsersColumns } from "./_components/users-table/columns";
import { db } from "@/lib/db";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/"); // Rediriger si l'utilisateur n'est pas connecté
  }

  const users = await db.user.findMany(); // Récupère tous les utilisateurs

  return (
    <div className="w-full z-20 flex flex-col p-16 max-md:px-4 max-md:py-28">
      <DashboardPageTitle
        title="Gestion des utilisateurs"
        description="Bienvenue ! Gérez vos utilisateurs et suivez leurs performances facilement."
      />
      <Separator />
      <UsersTable columns={UsersColumns} data={users} />
    </div>
  );
};

export default page;
