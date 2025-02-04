"use client";

import { useState, useEffect } from "react";
import Title from "@/components/shared/Title";
import CarsList from "@/components/cars/cars-list";
import { Car as Voiture } from "lucide-react";
import CarsFilter from "./_components/cars-filter";
import { Car } from "@prisma/client";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

interface FilterCriteria {
  fuelType: string;
  transmission: string;
  availability?: boolean;
  minPrice: number;
  maxPrice: number;
  model: string;
}

const Page = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    fuelType: "",
    transmission: "",
    availability: true,
    minPrice: 0,
    maxPrice: 0,
    model: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await axios.get("/api/cars");
      setCars(carsData.data);
      setFilteredCars(carsData.data);
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      const filtered = cars.filter((car) => {
        const matchesFuelType = filterCriteria.fuelType
          ? car.fuelType === filterCriteria.fuelType
          : true;
        const matchesTransmission = filterCriteria.transmission
          ? car.transmission === filterCriteria.transmission
          : true;
        const matchesAvailability =
          car.availability === filterCriteria.availability;
        const matchesMinPrice =
          filterCriteria.minPrice !== 0
            ? car.pricePerDay &&
              car.pricePerDay >= Number(filterCriteria.minPrice)
            : true;
        const matchesMaxPrice =
          filterCriteria.maxPrice !== 0
            ? car.pricePerDay &&
              car.pricePerDay <= Number(filterCriteria.maxPrice)
            : true;
        const matchesModel = filterCriteria.model
          ? car.model && car.model.includes(filterCriteria.model)
          : true;

        return (
          matchesFuelType &&
          matchesTransmission &&
          matchesAvailability &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesModel
        );
      });
      setFilteredCars(filtered);
    };
    applyFilter();
  }, [filterCriteria, cars]);

  const handleFilter = (criteria: FilterCriteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <div>
      <Title
        title="Découvrez Notre Catalogue de Voitures"
        description="Explorez notre vaste sélection de voitures disponibles à la location. Que vous ayez besoin d'une voiture pour un voyage d'affaires, une escapade de week-end ou un déplacement quotidien, nous avons le véhicule parfait pour vous."
        icon={Voiture}
      />

      <div className="w-full flex gap-8 my-12">
        <CarsFilter onFilter={handleFilter} />
        <Separator orientation="vertical" />
        <CarsList cars={filteredCars} />
      </div>
    </div>
  );
};

export default Page;
