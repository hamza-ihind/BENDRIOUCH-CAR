"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { Car } from "@prisma/client";
import { Button } from "@/components/ui/button";
import CarsList from "@/components/cars/cars-list";

interface CarSelectModalProps {
  cars: Car[];
  onClose: () => void;
  onCarSelect: (carId: string) => void;
}

export const CarSelectModal: React.FC<CarSelectModalProps> = ({
  cars,
  onClose,
  onCarSelect,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Car Select</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Car</DialogTitle>
          <DialogDescription>
            Choose a car for your reservation.
          </DialogDescription>
        </DialogHeader>
        <div>
          {cars.map((car) => {
            return (
              <div className="w-fit">
                {car.name}
                <Button onClick={() => onCarSelect(car.id)}>select</Button>
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
