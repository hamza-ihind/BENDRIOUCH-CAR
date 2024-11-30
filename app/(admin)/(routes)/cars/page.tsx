import React from "react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Separator } from "@/components/ui/separator";
import DashboardPageTitle from "../../_components/dashboard-page-title";

const CarsPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const cars = await db.car.findMany({});

  return (
    <div className="w-full z-20 flex flex-col p-12">
      <DashboardPageTitle
        title="Mes Voitures"
        description="Voici la liste de vos voitures"
      />
      <Separator />
      <DataTable columns={columns} data={cars} />
    </div>
  );
};

export default CarsPage;
