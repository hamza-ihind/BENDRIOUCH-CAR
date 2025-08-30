"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CarsFilterProps {
  onFilter: (criteria: {
    category: string;
    fuelType: string;
    transmission: string;
  }) => void;
}

const CarsFilter: React.FC<CarsFilterProps> = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");

  const handleFilterChange = (name: string, value: any) => {
    const newCriteria = {
      category,
      fuelType,
      transmission,
      [name]: value,
    };
    onFilter(newCriteria);
  };

  // Function to clear all filters
  const clearFilters = () => {
    setCategory("");
    setFuelType("");
    setTransmission("");
    onFilter({ category: "", fuelType: "", transmission: "" });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 sticky top-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Filtres
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Affinez votre recherche pour trouver la voiture parfaite
        </p>
      </div>

      <div className="space-y-8">
        {/* Category */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            Catégorie
          </h3>
          <RadioGroup
            defaultValue={category}
            onValueChange={(value) => {
              setCategory(value);
              handleFilterChange("category", value);
            }}
            className="flex flex-col"
          >
            {["CITADINE", "BERLINE", "FOUR_BY_FOUR", "LUXE"].map((type) => (
              <div key={type} className="flex items-center space-x-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                <RadioGroupItem
                  value={type}
                  id={`category-${type}`}
                  className="border-gray-300 dark:border-gray-600 text-yellow-400"
                />
                <Label
                  htmlFor={`category-${type}`}
                  className="text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                >
                  {type === "FOUR_BY_FOUR"
                    ? "4x4"
                    : type.charAt(0) + type.slice(1).toLowerCase()}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Fuel Type */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            Type de Carburant
          </h3>
          <RadioGroup
            defaultValue={fuelType}
            onValueChange={(value) => {
              setFuelType(value);
              handleFilterChange("fuelType", value);
            }}
            className="flex flex-col"
          >
            {["Diesel", "Essence"].map((type) => (
              <div key={type} className="flex items-center space-x-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                <RadioGroupItem
                  value={type}
                  id={`fuelType-${type}`}
                  className="border-gray-300 dark:border-gray-600 text-yellow-400"
                />
                <Label
                  htmlFor={`fuelType-${type}`}
                  className="text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                >
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Transmission */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            Transmission
          </h3>
          <RadioGroup
            defaultValue={transmission}
            onValueChange={(value) => {
              setTransmission(value);
              handleFilterChange("transmission", value);
            }}
            className="flex flex-col"
          >
            {["Automatic", "Manual"].map((type) => (
              <div key={type} className="flex items-center space-x-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                <RadioGroupItem
                  value={type}
                  id={`transmission-${type}`}
                  className="border-gray-300 dark:border-gray-600 text-yellow-400"
                />
                <Label
                  htmlFor={`transmission-${type}`}
                  className="text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                >
                  {type === "Automatic" ? "Automatique" : "Manuelle"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Clear Filters Button */}
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300"
        >
          Effacer les Filtres
        </Button>
      </div>
    </div>
  );
};

export default CarsFilter;
