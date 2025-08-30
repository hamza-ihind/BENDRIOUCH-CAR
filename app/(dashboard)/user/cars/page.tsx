"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import DashboardPageTitle from "../../_components/dashboard-page-title";
import CarsList from "@/components/cars/cars-list";
import { useEffect, useState } from "react";
import { Car } from "@prisma/client";
import { Car as CarIcon } from "lucide-react";
import axios from "axios";
import CarsFilter from "@/app/(root)/catalog/_components/cars-filter";

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/cars");
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleFilter = (criteria: {
    fuelType: string;
    transmission: string;
    category: string;
  }) => {
    const filtered = cars.filter((car) => {
      const fuelTypeMatch =
        !criteria.fuelType || car.fuelType === criteria.fuelType;
      const transmissionMatch =
        !criteria.transmission || car.transmission === criteria.transmission;
      const categoryMatch =
        !criteria.category || car.category === criteria.category;

      return fuelTypeMatch && transmissionMatch && categoryMatch;
    });

    setFilteredCars(filtered);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <CarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Catalogue de Voitures
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Découvrez notre flotte de véhicules disponibles à la location
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cars.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <CarIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Disponibles</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CarIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Luxe</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {cars.filter(car => car.category === 'LUXE').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <CarIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">4x4</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {cars.filter(car => car.category === 'FOUR_BY_FOUR').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <CarIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-80">
          <CarsFilter
            onFilter={(criteria) =>
              handleFilter({
                ...criteria,
              })
            }
          />
        </div>

        {/* Cars List */}
        <div className="flex-1">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Véhicules Disponibles
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {filteredCars.length} voiture{filteredCars.length !== 1 ? 's' : ''} trouvée{filteredCars.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Disponible maintenant
                </div>
              </div>
            </div>
            <div className="p-6">
              <CarsList cars={filteredCars} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
