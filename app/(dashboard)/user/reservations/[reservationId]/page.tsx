import { db } from "@/lib/db";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { IconBadge } from "@/components/shared/icon-badge";
import {
  ArrowLeft,
  Car,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import DashboardSectionTitle from "@/app/(dashboard)/_components/dashboard-section-title";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Actions } from "./_components/actions";

const CarIdPage = async ({ params }: { params: { reservationId: string } }) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const reservation = await db.reservation.findUnique({
    where: {
      id: params.reservationId,
      userId: userId,
    },
  });

  if (!reservation) {
    return redirect("/");
  }

  const requiredFields = [
    reservation.startDate,
    reservation.endDate,
    reservation.flightNumber,
    reservation.carId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="w-full z-20 flex flex-col p-12 max-md:px-4 max-md:py-28">
        <Link
          href={`/user/reservations`}
          className="flex items-center text-sm hover:opacity-75 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des reservation
        </Link>
        <div className="flex items-start justify-between gap-y-4 max-2xl:flex-col">
          <DashboardPageTitle
            title="Configuration de la voiture"
            description={`Complétez tous les champs ${completionText}`}
          />
          <Actions
            disabled={!isComplete}
            reservationId={params.reservationId}
            isPublished={reservation.isPublished}
          />
        </div>
        <Separator />

        <div className="flex w-full justify-center">
          <div className="w-[720px] flex flex-col justify-center"></div>
        </div>
      </div>
    </>
  );
};

export default CarIdPage;
