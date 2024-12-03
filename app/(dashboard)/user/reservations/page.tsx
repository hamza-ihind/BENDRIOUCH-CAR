import { auth } from "@/auth";

import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import React from "react";
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
        title="Gestion des reservations"
        description="Ravi de vous revoir! Gérez vos cours et suivez vos performances
          facilement."
      />
      <Separator />
    </div>
  );
};

export default page;
