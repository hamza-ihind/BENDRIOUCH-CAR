import { auth } from "@/auth";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DataTable as ReservationTable } from "./_components/reservations-table/data-table";
import { columns as ReservationColumns } from "./_components/reservations-table/columns";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const reservations = await db.reservation.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <div className="w-full z-20 flex flex-col p-16 max-md:px-4 max-md:py-28">
      <DashboardPageTitle
        title="Gestion des réservations"
        description="Voici toutes les réservations effectuées. Vous pouvez gérer, modifier ou annuler selon vos besoins."
      />
      <Separator />
      <ReservationTable columns={ReservationColumns} data={reservations} />
    </div>
  );
};

export default page;
