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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Options de Filtrage
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Affinez votre recherche de voiture et enregistrez vos préférences
      </p>

      <div className="space-y-6">
        {/* Category */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Catégorie</h3>
          <RadioGroup
            defaultValue={category}
            onValueChange={(value) => {
              setCategory(value);
              handleFilterChange("category", value);
            }}
            className="flex flex-col space-y-2"
          >
            {["CITADINE", "BERLINE", "FOUR_BY_FOUR", "LUXE"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`category-${type}`} />
                <Label htmlFor={`category-${type}`}>
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
          <h3 className="font-semibold text-gray-700 mb-2">
            Type de Carburant
          </h3>
          <RadioGroup
            defaultValue={fuelType}
            onValueChange={(value) => {
              setFuelType(value);
              handleFilterChange("fuelType", value);
            }}
            className="flex flex-col space-y-2"
          >
            {["Diesel", "Essence"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`fuelType-${type}`} />
                <Label htmlFor={`fuelType-${type}`}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Transmission */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Transmission</h3>
          <RadioGroup
            defaultValue={transmission}
            onValueChange={(value) => {
              setTransmission(value);
              handleFilterChange("transmission", value);
            }}
            className="flex flex-col space-y-2"
          >
            {["Automatic", "Manual"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`transmission-${type}`} />
                <Label htmlFor={`transmission-${type}`}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Clear Filters Button */}
        <Button
          onClick={clearFilters}
          className="w-full bg-gray-200 text-black hover:bg-gray-300"
        >
          Effacer les Filtres
        </Button>
      </div>
    </div>
  );
};

export default CarsFilter;
