"use client";

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Antenna, Armchair, Fuel } from "lucide-react";
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
    <div className="group bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-yellow-200 dark:hover:border-yellow-600">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          alt={`${name} ${model}`}
          src={imageUrl[0]}
          width={720}
          height={720}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="bg-white/90 dark:bg-neutral-800/90 text-gray-800 dark:text-gray-200 backdrop-blur-sm"
          >
            {category === "FOUR_BY_FOUR" ? "4x4" : category.charAt(0) + category.slice(1).toLowerCase()}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {model}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {String(pricePerDay)}€
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              /jour
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <div className="flex justify-between items-center mb-6 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <Fuel className="h-4 w-4 text-yellow-500" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <Armchair className="h-4 w-4 text-yellow-500" />
            <span>{seats} places</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <Antenna className="h-4 w-4 text-yellow-500" />
            <span>{transmission === "Automatic" ? "Auto" : "Manuel"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onReserve}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Réserver
          </button>
          <button
            onClick={openModal}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-300"
          >
            Détails
          </button>
        </div>
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
