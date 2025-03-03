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

  if (!cars || cars.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center text-gray-500 text-lg">
          No cars available at the moment.
        </p>
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          name={car.name || "Unnamed Car"}
          model={car.model || "Unknown Model"}
          pricePerDay={car.pricePerDay || 0}
          seats={car.seats || 0}
          fuelType={car.fuelType || "N/A"}
          transmission={car.transmission || "N/A"}
          imageUrl={car.imageUrl || "/default-image.png"}
          description={car.description || "No description available"}
          onReserve={() => handleReserveCar(car)}
        />
      ))}
    </div>
  );
};

export default CarsList;
