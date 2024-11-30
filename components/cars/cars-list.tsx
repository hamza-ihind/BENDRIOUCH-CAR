"use client";

import React, { useEffect, useState } from "react";
import CarCard from "./car-card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CarsList = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/cars");
        const data = await response.json();
        setCars(data); // Update the state with fetched cars
      } catch (err) {
        setError("Failed to load cars.");
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p className="text-center">Loading cars...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (cars.length === 0) {
    return <p className="text-center">No cars available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cars.map((car: any) => (
        <CarCard
          key={car.id} // Ensure a unique key for each car card
          name={car.name || "Unnamed Car"}
          model={car.model || "Unknown Model"}
          pricePerDay={car.pricePerDay || "N/A"}
          seats={car.seats || 0}
          fuelType={car.fuelType || "N/A"}
          transmission={car.transmission || "N/A"}
          availability={car.availability}
          imageUrl={car.imageUrl || "/default-image.png"} // Provide a fallback image URL
        />
      ))}
    </div>
  );
};

export default CarsList;
