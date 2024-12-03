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
    return redirect("/");
  }

  const users = await db.user.findMany();

  return (
    <div className="w-full z-20 flex flex-col p-12">
      <DashboardPageTitle
        title="Gestion des utilisateurs"
        description="Ravi de vous revoir! Gérez vos cours et suivez vos performances
          facilement."
      />
      <Separator />
      <div className="flex items-center gap-x-4 mb-8">
        <IconBadge icon={GraduationCap} />
        <h2 className="big-text">Gestion des étudiants</h2>
      </div>
      <UsersTable columns={UsersColumns} data={users} />
    </div>
  );
};

export default page;
