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

  console.log("filteredCars", filteredCars);

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Chargement des voitures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-sm:px-8 md:px-12 lg:px-32 bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-6">
            <Voiture className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">Notre Catalogue</span>
          </div>
          <h1 className="mb-6 font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Découvrez Notre{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Catalogue
            </span>{" "}
            de Voitures
          </h1>
          <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Explorez notre vaste sélection de voitures disponibles à la location. Que vous ayez besoin d'une voiture pour un voyage d'affaires, une escapade de week-end ou un déplacement quotidien, nous avons le véhicule parfait pour vous.
          </p>
        </div>

        {/* Filter Toggle Button for Mobile */}
        <div className="lg:hidden mb-6 text-center">
          <button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Voiture className="w-5 h-5" />
            {isFilterVisible ? "Cacher les Filtres" : "Afficher les Filtres"}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex max-lg:flex-col gap-8">
          {/* Filters Section */}
          <div
            className={`${
              isFilterVisible ? "block" : "hidden"
            } lg:block lg:w-80 w-full`}
          >
            <CarsFilter onFilter={handleFilter} />
          </div>

          {/* Car List Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Résultats de recherche
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredCars.length} voiture{filteredCars.length !== 1 ? 's' : ''} trouvée{filteredCars.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Disponible maintenant
              </div>
            </div>

            <CarsList cars={filteredCars} />
          </div>
      </div>
    </div>
  );
};

export default Page;
