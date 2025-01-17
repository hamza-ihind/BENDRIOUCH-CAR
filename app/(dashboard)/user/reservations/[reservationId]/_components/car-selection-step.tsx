"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Car, Reservation } from "@prisma/client";
import { FlightNumberForm } from "./flight-number-form";
import { StartDateForm } from "./start-date-form";
import { EndDateForm } from "./end-date-form";
import { StartPlaceForm } from "./start-place-form";
import { EndPlaceForm } from "./end-place-form";
import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "@/components/cars/car-card";
import CarSelection from "@/components/cars/car-selection";

interface CarSelectionStepProps {
  cars: Car[];
  selectedCar?: Car;
  handleCarSelect: (car: Car | undefined) => void;
  reservation: Reservation;
  reservationId: string;
}

const CarSelectionStep = ({
  cars,
  selectedCar,
  handleCarSelect,
  reservation,
  reservationId,
}: CarSelectionStepProps) => {
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`/api/reservations/${reservationId}`);
        const reservationData = response.data;

        if (reservationData.carId) {
          const car = cars.find((car) => car.id === reservationData.carId);
          if (car) {
            handleCarSelect(car);
            setIsNextButtonActive(true);
          }
        }
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchReservation();
  }, [reservationId, cars, handleCarSelect]);

  useEffect(() => {
    if (selectedCar) {
      setIsNextButtonActive(true);
    } else {
      setIsNextButtonActive(false);
    }
  }, [selectedCar]);

  const handleCarClick = (car: Car) => {
    if (selectedCar?.id === car.id) {
      handleCarSelect(undefined); // Deselect the car
      setIsNextButtonActive(false);
    } else {
      handleCarSelect(car); // Select the car
      setIsNextButtonActive(true);
    }
  };

  return (
    <div className="flex gap-8 w-full justify-between items-start flex-col md:flex-row">
      {/* Left Section - Forms */}
      <div className="flex flex-col gap-8 w-full">
        <FlightNumberForm
          initialData={reservation}
          reservationId={reservationId}
        />
        <StartDateForm
          initialData={reservation}
          reservationId={reservationId}
        />
        <EndDateForm initialData={reservation} reservationId={reservationId} />
        <StartPlaceForm
          initialData={reservation}
          reservationId={reservationId}
        />
        <EndPlaceForm initialData={reservation} reservationId={reservationId} />
      </div>

      {/* Right Section - Car Selection */}
      <div className="grid grid-cols-2 gap-8 w-full">
        {cars.map((car) => (
          <CarSelection
            key={car.id}
            name={car.name || "Non spécifié"}
            model={car.model || "Non spécifié"}
            pricePerDay={car.pricePerDay || 0}
            availability={car.availability}
            fuelType={car.fuelType || "Non spécifié"}
            seats={car.seats || 0}
            transmission={car.transmission || "Non spécifié"}
            imageUrl={car.imageUrl || "/placeholder-car.png"}
            selectedCar={selectedCar}
            onReserve={() => handleCarClick(car)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarSelectionStep;
