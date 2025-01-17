"use client";

import React from "react";
import CarCard from "./car-card";
import { Car } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CarsListProps {
  cars: Car[];
}

const CarsList = ({ cars }: CarsListProps) => {
  const router = useRouter();
  // If no cars are passed, show an error message
  if (!cars || cars.length === 0) {
    return <p className="text-center">No cars available at the moment.</p>;
  }

  const handleReserveCar = async (car: Car) => {
    try {
      const response = await axios.post("/api/reservations", {
        carId: car.id,
      });
      const reservationId = response.data.id;
      router.push(`/user/reservations/${reservationId}`);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          name={car.name || "Unnamed Car"}
          model={car.model || "Unknown Model"}
          pricePerDay={car.pricePerDay || 0}
          seats={car.seats || 0}
          fuelType={car.fuelType || "N/A"}
          transmission={car.transmission || "N/A"}
          availability={car.availability}
          imageUrl={car.imageUrl || "/default-image.png"}
          onReserve={() => handleReserveCar(car)}
        />
      ))}
    </div>
  );
};

export default CarsList;
