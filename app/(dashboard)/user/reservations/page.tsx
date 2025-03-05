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
    <div className="w-full z-20 flex flex-col space-y-6">
      {/* Page Title and Description */}
      <DashboardPageTitle
        title="Gestion des réservations"
        description="Ravi de vous revoir ! Gérez vos réservations et suivez vos activités facilement."
      />

      {/* Separator */}
      <Separator className="bg-muted-foreground/20" />

      {/* DataTable with Card Background */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <DataTable columns={columns} data={reservations} />
      </div>
    </div>
  );
};

export default page;
