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
  availability: boolean;
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
  availability,
  fuelType,
  seats,
  transmission,
  imageUrl,
  selectedCar,
  onReserve,
}: CarProps) => {
  const availabilityText = availability
    ? "Disponible maintenant"
    : "Pas disponible";

  return (
    <div className="w-full border border-color p-4 rounded-xl">
      <div className="w-full flex items-start gap-4">
        <Badge className="bg-green-200 text-green-800 hover:bg-green-300 text-xs">
          {availabilityText}
        </Badge>
      </div>
      <div className="py-4">
        <Image
          alt="Car image"
          src={imageUrl}
          width={720}
          height={720}
          className="w-96 h-40 object-cover"
        />
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col items-start">
          <p className="text-black dark:text-white text-xl font-semibold">
            {name}
          </p>
          <p className="text-gray-400 dark:text-white text-sm font-normal">
            {model}
          </p>
        </div>
        <div className="flex items-end gap-1 text-gray-400 text-sm">
          <span className="text-black dark:text-white text-base font-semibold">
            {pricePerDay} DH
          </span>
          /jour
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between">
        <div className="flex gap-1 text-black dark:text-white text-sm items-center">
          <Fuel className="h-4 w-4 text-blue-600" />
          {fuelType}
        </div>
        <div className="flex gap-1 text-black dark:text-white text-sm items-center">
          <Armchair className="h-4 w-4 text-blue-600" />
          {seats}
        </div>
        <div className="flex gap-1 text-black dark:text-white text-sm items-center">
          <Antenna className="h-4 w-4 text-blue-600" />
          {transmission}
        </div>
      </div>
      <button
        onClick={onReserve}
        className={`w-full mt-3 px-4 py-2 rounded-lg ${
          selectedCar?.name === name
            ? "bg-yellow-500 text-black"
            : "bg-gray-300 text-black"
        }`}
      >
        {selectedCar?.name === name ? "Désélectionner" : "Sélectionner"}
      </button>
    </div>
  );
};

export default CarSelection;
