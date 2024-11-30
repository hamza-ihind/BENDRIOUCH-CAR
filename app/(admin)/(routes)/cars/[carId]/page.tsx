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
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { PriceForm } from "./_components/price-form ";
import { Actions } from "./_components/actions";
import { Spotlight } from "@/components/ui/spotlight";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import DashboardSectionTitle from "@/app/(admin)/_components/dashboard-section-title";
import DashboardPageTitle from "@/app/(admin)/_components/dashboard-page-title";

const CarIdPage = async ({ params }: { params: { carId: string } }) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const car = await db.car.findUnique({
    where: {
      id: params.carId,
    },
  });

  if (!car) {
    return redirect("/");
  }

  const requiredFields = [
    car.name,
    car.description,
    car.imageUrl,
    car.availability,
    car.fuelType,
    car.model,
    car.seats,
    car.transmission,
    car.pricePerDay,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="w-full z-20 flex flex-col p-12">
        <Link
          href={`/admin/cars`}
          className="flex items-center text-sm hover:opacity-75 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des voitures
        </Link>
        <div className="flex items-start justify-between gap-y-4 max-2xl:flex-col">
          <DashboardPageTitle
            title="Configuration de la voiture"
            description={`Complétez tous les champs ${completionText}`}
          />
          <Actions
            disabled={!isComplete}
            carId={params.carId}
            isPublished={car.isPublished}
          />
        </div>
        <Separator />
        <DashboardSectionTitle
          icon={LayoutDashboard}
          title="Personnalisez votre voiture"
        />

        <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
          <TitleForm initialData={car} carId={car.id} />
        </div>

        <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
          <DescriptionForm initialData={car} carId={car.id} />
        </div>
        <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
          <ImageForm initialData={car} carId={car.id} />
        </div>

        <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
          <PriceForm initialData={car} carId={car.id} />
        </div>
      </div>
    </>
  );
};

export default CarIdPage;