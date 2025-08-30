import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Antenna, Armchair, Fuel } from "lucide-react";
import { Car } from "@prisma/client";

interface CarProps {
  name: string;
  model: string;
  pricePerDay: number;
  imageUrl: string;
  fuelType: string;
  seats: number;
  transmission: string;
  selectedCar?: Car;
  onReserve: () => void;
}

const CarSelection = ({
  name,
  model,
  pricePerDay,
  fuelType,
  seats,
  transmission,
  imageUrl,
  selectedCar,
  onReserve,
}: CarProps) => {
  const isSelected = selectedCar?.name === name;

  return (
    <div className={`w-full h-fit border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isSelected
        ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg"
        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 hover:border-yellow-300 dark:hover:border-yellow-600"
    }`}>
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
        <Image
          alt={`${name} - ${model}`}
          src={imageUrl}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isSelected && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
            Sélectionnée
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header with name and price */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {model}
            </p>
          </div>
          <div className="text-right ml-3">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {pricePerDay} DH
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              par jour
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Fuel className="h-4 w-4 text-yellow-500 mb-1" />
            <span className="text-xs text-gray-700 dark:text-gray-300 text-center">
              {fuelType}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Armchair className="h-4 w-4 text-yellow-500 mb-1" />
            <span className="text-xs text-gray-700 dark:text-gray-300 text-center">
              {seats} places
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Antenna className="h-4 w-4 text-yellow-500 mb-1" />
            <span className="text-xs text-gray-700 dark:text-gray-300 text-center">
              {transmission}
            </span>
          </div>
        </div>

        {/* Selection Button */}
        <button
          onClick={onReserve}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            isSelected
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-300"
          }`}
        >
          {isSelected ? "✓ Sélectionnée" : "Sélectionner cette voiture"}
        </button>
      </div>
    </div>
  );
};

export default CarSelection;
