"use client";

import { useState, useEffect } from "react";
import Title from "@/components/shared/Title";
import CarsList from "@/components/cars/cars-list";
import { Car as Voiture } from "lucide-react";
import CarsFilter from "./_components/cars-filter";
import { Car } from "@prisma/client";
import axios from "axios";

interface FilterCriteria {
  category: string;
  fuelType: string;
  transmission: string;
}

const Page = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    category: "",
    fuelType: "",
    transmission: "",
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const carsData = await axios.get("/api/cars");
        setCars(carsData.data);
        setFilteredCars(carsData.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars([]);
        setFilteredCars([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      if (!Array.isArray(cars)) return;
      const filtered = cars.filter((car) => {
        const matchesCategory = filterCriteria.category
          ? car.category === filterCriteria.category
          : true;
        const matchesFuelType = filterCriteria.fuelType
          ? car.fuelType === filterCriteria.fuelType
          : true;
        const matchesTransmission = filterCriteria.transmission
          ? car.transmission === filterCriteria.transmission
          : true;

        return matchesCategory && matchesFuelType && matchesTransmission;
      });
      setFilteredCars(filtered);
    };
    applyFilter();
  }, [filterCriteria, cars]);

  const handleFilter = (criteria: FilterCriteria) => {
    setFilterCriteria(criteria);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8">
      <Title
        title="Découvrez Notre Catalogue de Voitures"
        description="Explorez notre vaste sélection de voitures disponibles à la location. Que vous ayez besoin d'une voiture pour un voyage d'affaires, une escapade de week-end ou un déplacement quotidien, nous avons le véhicule parfait pour vous."
        icon={Voiture}
      />

      <div className="flex max-lg:flex-col gap-8 mt-12">
        {/* Filter Toggle Button for Mobile */}
        <button
          className="lg:hidden bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          {isFilterVisible ? "Cacher le Filtre" : "Afficher le Filtre"}
        </button>

        {/* Filters Section */}
        <div
          className={`${
            isFilterVisible ? "block" : "hidden"
          } lg:block lg:w-1/4 w-full flex gap-8 max-lg:flex-col`}
        >
          <CarsFilter onFilter={handleFilter} />
        </div>

        {/* Car List Section */}
        <div className="flex-1">
          <CarsList cars={filteredCars} />
        </div>
      </div>
    </div>
  );
};

export default Page;
