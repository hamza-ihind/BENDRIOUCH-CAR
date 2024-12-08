import { auth } from "@/auth";

import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "@/lib/db";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { DataTable } from "./_components/reservations-table/data-table";
import { columns } from "./_components/reservations-table/columns";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const reservations = await db.reservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      car: true,
      user: true,
    },
  });

  return (
    <div className="w-full z-20 flex flex-col p-12">
      <DashboardPageTitle
        title="Gestion des reservations"
        description="Ravi de vous revoir! Gérez vos cours et suivez vos performances
          facilement."
      />
      <Separator />
      <DataTable columns={columns} data={reservations} />
    </div>
  );
};

export default page;
