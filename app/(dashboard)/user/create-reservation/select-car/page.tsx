"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";
import { getCars } from "@/actions/get-cars";
import CarCard from "@/components/cars/car-card";

const SelectCarPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get("/api/cars");
      setCars(data);
    };
    fetchCars();
  }, []);

  const handleSelectCar = (carId: string) => {
    router.push(`/user/create-reservation?carId=${carId}`);
  };

  return (
    <div className="p-12">
      <h1>Choisissez une voiture</h1>
      <div>
        {cars.map((car) => {
          return (
            <div key={car.id}>
              <CarCard
                name={car.name || ""}
                availability={car.availability || false}
                fuelType={car.fuelType || ""}
                imageUrl={car.imageUrl || ""}
                model={car.model || ""}
                pricePerDay={car.pricePerDay || 0}
                seats={car.seats || 0}
                transmission={car.transmission || ""}
              />
              <Button onClick={() => handleSelectCar(car.id)}>
                Sélectionner
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCarPage;
