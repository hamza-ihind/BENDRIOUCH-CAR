import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import {
  Antenna,
  Armchair,
  Fuel,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: {
    id: string;
    name: string;
    model: string;
    pricePerDay: number;
    imageUrl: string[]; // Changed from imageUrl to imageUrl (array)
    fuelType: string;
    seats: number;
    transmission: string;
    description: string;
    category: string;
  };
}

const CarModal = ({ isOpen, onClose, car }: CarDetailsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image index

  // Map category to badge color
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "4x4":
        return "bg-violet-100 text-violet-600";
      case "LUXE":
        return "bg-orange-100 text-orange-600";
      case "CITADINE":
        return "bg-blue-100 text-blue-600";
      case "BERLINE":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Handle next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.imageUrl.length - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="space-y-4">
          {/* Carousel */}
          <div className="relative w-full aspect-video">
            <Image
              src={car.imageUrl[currentImageIndex]}
              alt={`${car.name} image ${currentImageIndex + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            {/* Previous Button */}
            {car.imageUrl.length > 1 && (
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {/* Next Button */}
            {car.imageUrl.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-2">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{car.name}</h2>
              <p className="text-xl font-semibold">{car.pricePerDay} €/jour</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-300">{car.model}</p>
              <Badge className={getCategoryBadgeColor(car.category)}>
                {car.category === "FOUR_BY_FOUR" ? "4x4" : car.category}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {car.description}
            </p>
          </div>

          {/* Additional Car Info */}
          <div className="flex justify-between">
            <div className="flex gap-1 text-black dark:text-white text-sm items-center">
              <Fuel className="h-4 w-4 text-blue-600" />
              {car.fuelType}
            </div>
            <div className="flex gap-1 text-black dark:text-white text-sm items-center">
              <Armchair className="h-4 w-4 text-blue-600" />
              {car.seats} sièges
            </div>
            <div className="flex gap-1 text-black dark:text-white text-sm items-center">
              <Antenna className="h-4 w-4 text-blue-600" />
              {car.transmission}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarModal;
