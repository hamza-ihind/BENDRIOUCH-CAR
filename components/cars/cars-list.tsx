import React from "react";
import CarCard from "./car-card";
import { Car } from "@prisma/client";
import { Car as CarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CarsListProps {
  cars: Car[];
}

const CarsList = ({ cars }: CarsListProps) => {
  const router = useRouter();

  if (cars === null) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Chargement des voitures...</p>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <CarIcon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucune voiture trouvée
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Essayez de modifier vos filtres pour voir plus de résultats.
          </p>
        </div>
      </div>
    );
  }

  const handleReserveCar = async (car: Car) => {
    try {
      const response = await axios.post("/api/reservations", {
        carId: car.id,
      });
      const reservationId = response.data.id;
      router.push(`/user/reservations/${reservationId}?selectedCar=${car.id}`);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {cars.map((car: Car) => (
          <CarCard
            key={car.id}
            id={car.id}
            name={car.name || "Unnamed Car"}
            model={car.model || "Unknown Model"}
            pricePerDay={car.pricePerDay || 0}
            seats={car.seats || 0}
            fuelType={car.fuelType || "N/A"}
            category={car.category || "N/A"}
            transmission={car.transmission || "N/A"}
            imageUrl={car.imageUrl || "/default-image.png"}
            description={car.description || "No description available"}
            onReserve={() => handleReserveCar(car)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarsList;
