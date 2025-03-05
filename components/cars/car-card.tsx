import React, { useState } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Antenna, Armchair, Fuel } from "lucide-react";
import { useRouter } from "next/navigation";
import CarModal from "./car-modal";

interface CarProps {
  id: string;
  name: string;
  model: string;
  pricePerDay: number;
  imageUrl: string[];
  fuelType: string;
  category: string;
  seats: number;
  transmission: string;
  onReserve: () => void;
  description: string;
}

const CarCard = ({
  id,
  name,
  model,
  pricePerDay,
  fuelType,
  seats,
  transmission,
  imageUrl,
  category,
  onReserve,
  description,
}: CarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-fit border border-color p-4 rounded-xl">
      <div className="py-4">
        <Image
          alt="image"
          src={imageUrl[0]}
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
            {String(pricePerDay)} €
          </span>
          /jour
        </div>
      </div>
      {/* Limit description to 3 lines */}
      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
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
      {/* Buttons for Reserve and Details */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onReserve}
          className="w-1/2 bg-yellow-400 text-black py-2 rounded-lg"
        >
          Réserver
        </button>
        <button
          onClick={openModal}
          className="w-1/2 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
        >
          Voir les détails
        </button>
      </div>

      {/* Modal for full details */}
      <CarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        car={{
          id,
          name,
          model,
          pricePerDay,
          imageUrl,
          fuelType,
          seats,
          transmission,
          description,
          category,
        }}
      />
    </div>
  );
};

export default CarCard;
