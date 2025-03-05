"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import DashboardPageTitle from "../../_components/dashboard-page-title";
import CarsList from "@/components/cars/cars-list";
import { useEffect, useState } from "react";
import { Car } from "@prisma/client";
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
    <div className="w-full z-20 flex flex-col p-16">
      <DashboardPageTitle
        title="Voitures de Bendriouch CARS"
        description="Ravi de vous revoir! Gérez vos cours et suivez vos performances
          facilement."
      />
      <Separator />
      <div className="flex gap-8">
        <CarsFilter
          onFilter={(criteria) =>
            handleFilter({
              ...criteria,
            })
          }
        />
        <div className="flex-1">
          <CarsList cars={filteredCars} />
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
