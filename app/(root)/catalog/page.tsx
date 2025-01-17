import { useRouter } from "next/router";
import Title from "@/components/shared/Title";
import CarsList from "@/components/cars/cars-list";
import { db } from "@/lib/db";
import axios from "axios";
import { Car } from "@prisma/client";
import { Car as Voiture } from "lucide-react";

const Page = async () => {
  const cars = await db.car.findMany({});

  return (
    <div>
      <Title
        title="Découvrez Notre Catalogue de Voitures"
        description="Explorez notre vaste sélection de voitures disponibles à la location. Que vous ayez besoin d'une voiture pour un voyage d'affaires, une escapade de week-end ou un déplacement quotidien, nous avons le véhicule parfait pour vous."
        icon={Voiture}
      />

      <CarsList cars={cars} />
    </div>
  );
};

export default Page;
