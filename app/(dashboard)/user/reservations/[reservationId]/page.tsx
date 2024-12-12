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
import { FlightNumberForm } from "./_components/flight-number-form";
import { StartDateForm } from "./_components/start-date-form";
import { EndDateForm } from "./_components/end-date-form";
import { StartPlaceForm } from "./_components/start-place-form";
import { EndPlaceForm } from "./_components/end-place-form";
import { CarForm } from "./_components/car-form";

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
    reservation.startPlace,
    reservation.endPlace,
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
            title="Configuration de la reservation"
            description={`Complétez tous les champs ${completionText}`}
          />
        </div>
        <Separator />

        <div className="flex gap-8 w-full justify-center items-center flex-col">
          <FlightNumberForm
            initialData={reservation}
            reservationId={reservation.id}
          />
          <StartDateForm
            initialData={reservation}
            reservationId={reservation.id}
          />
          <EndDateForm
            initialData={reservation}
            reservationId={reservation.id}
          />
          <StartPlaceForm
            initialData={reservation}
            reservationId={reservation.id}
          />
          <EndPlaceForm
            initialData={reservation}
            reservationId={reservation.id}
          />
          <CarForm initialData={reservation} reservationId={reservation.id} />
        </div>
      </div>
    </>
  );
};

export default CarIdPage;
