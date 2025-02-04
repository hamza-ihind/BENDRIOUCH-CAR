"use client";

import { Button } from "@/components/ui/button";
import { Car, Reservation } from "@prisma/client";
import { FlightNumberForm } from "./flight-number-form";
import { StartDateForm } from "./start-date-form";
import { EndDateForm } from "./end-date-form";
import { StartPlaceForm } from "./start-place-form";
import { EndPlaceForm } from "./end-place-form";
import { useEffect, useState } from "react";
import axios from "axios";
import CarSelection from "@/components/cars/car-selection";
import CarsFilter from "@/app/(root)/catalog/_components/cars-filter";

interface CarSelectionStepProps {
  cars: Car[];
  selectedCar?: Car;
  handleCarSelect: (car: any) => void;
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
  const [filteredCars, setFilteredCars] = useState(cars);

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

  const handleFilters = (criteria: {
    fuelType: string;
    transmission: string;
    minPrice: number;
    maxPrice: number;
    model: string;
  }) => {
    let filtered = cars;

    if (criteria.fuelType) {
      filtered = filtered.filter((car) => car.fuelType === criteria.fuelType);
    }
    if (criteria.transmission) {
      filtered = filtered.filter(
        (car) => car.transmission === criteria.transmission
      );
    }
    if (criteria.minPrice) {
      filtered = filtered.filter(
        (car) => (car.pricePerDay || 0) >= criteria.minPrice
      );
    }
    if (criteria.maxPrice) {
      filtered = filtered.filter(
        (car) => (car.pricePerDay || 0) <= criteria.maxPrice
      );
    }
    if (criteria.model) {
      filtered = filtered.filter((car) =>
        car.model?.toLowerCase().includes(criteria.model.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Section - Forms */}
      <div className="w-full">
        <div className="flex w-full gap-8">
          <FlightNumberForm
            initialData={reservation}
            reservationId={reservationId}
          />
          <StartDateForm
            initialData={reservation}
            reservationId={reservationId}
          />

          <EndDateForm
            initialData={reservation}
            reservationId={reservationId}
          />
          <StartPlaceForm
            initialData={reservation}
            reservationId={reservationId}
          />
          <EndPlaceForm
            initialData={reservation}
            reservationId={reservationId}
          />
        </div>
      </div>

      {/* Bottom Section - Cars and Filters */}
      <div className="flex gap-8">
        {/* Left - Car Filter */}
        <CarsFilter onFilter={handleFilters} hideAvailability={true} />

        {/* Right - Car Grid */}
        <div className="grid grid-cols-3 gap-8 flex-1">
          {filteredCars.map((car) => (
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
    </div>
  );
};

export default CarSelectionStep;
