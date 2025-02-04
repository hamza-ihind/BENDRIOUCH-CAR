import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Antenna, Armchair, Fuel } from "lucide-react";
import { useRouter } from "next/navigation";

interface CarProps {
  id: string;
  name: string;
  model: string;
  pricePerDay: number;
  imageUrl: string;
  availability: boolean;
  fuelType: string;
  seats: number;
  transmission: string;
  onReserve: () => void; // Add this prop
  description: string; // Add this prop
}

const CarCard = ({
  id,
  name,
  model,
  pricePerDay,
  availability,
  fuelType,
  seats,
  transmission,
  imageUrl,
  onReserve,
  description,
}: CarProps) => {
  const stringavailable = availability
    ? "Disponible maintenant"
    : "Pas disponible";

  const badgeColor = availability
    ? "bg-green-200 text-green-800 hover:bg-green-300"
    : "bg-red-200 text-red-800 hover:bg-red-300";

  return (
    <div className="w-full h-fit border border-color p-4 rounded-xl">
      <div className="w-full flex items-start gap-4">
        <Badge className={`${badgeColor} text-xs`}>{stringavailable}</Badge>
      </div>
      <div className="py-4">
        <Image
          alt="image"
          src={imageUrl}
          width={720}
          height={720}
          className="w-full h-40 object-cover"
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
            {String(pricePerDay)} DH
          </span>
          /jour
        </div>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm mb-4">
        {description}
      </p>
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
      {availability ? (
        <button
          onClick={onReserve}
          className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-lg"
        >
          Réserver
        </button>
      ) : (
        <button
          disabled
          className="mt-4 w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
        >
          Déjà réservé
        </button>
      )}
    </div>
  );
};

export default CarCard;
