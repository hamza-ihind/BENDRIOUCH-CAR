import React from "react";
import { Separator } from "@/components/ui/separator";
import DashboardPageTitle from "../../_components/dashboard-page-title";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CarsList from "@/components/cars/cars-list";
import { db } from "@/lib/db";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const cars = await db.car.findMany({});

  return (
    <div className="w-full z-20 flex flex-col p-12">
      <DashboardPageTitle
        title="Voitures de Bendriouch CARS"
        description="Ravi de vous revoir! Gérez vos cours et suivez vos performances
          facilement."
      />
      <Separator />
      <CarsList cars={cars} />
    </div>
  );
};

export default page;
