"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CarsFilterProps {
  onFilter: (criteria: {
    fuelType: string;
    transmission: string;
    minPrice: number;
    maxPrice: number;
    model: string;
  }) => void;
}

const CarsFilter: React.FC<CarsFilterProps> = ({ onFilter }) => {
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [model, setModel] = useState("");

  const handleFilterChange = (name: string, value: any) => {
    const newCriteria = {
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      model,
      [name]: value,
    };
    onFilter(newCriteria);
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

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Prix Par Jour</h3>
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinPrice(value);
                handleFilterChange("minPrice", value);
              }}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPrice(value);
                handleFilterChange("maxPrice", value);
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Model */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Modèle (Année)</h3>
          <Input
            type="text"
            placeholder="Rechercher par modèle"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              handleFilterChange("model", e.target.value);
            }}
            className="w-full"
          />
        </div>

        {/* Apply Filters Button */}
        <Button
          onClick={() =>
            onFilter({
              fuelType,
              transmission,
              minPrice,
              maxPrice,
              model,
            })
          }
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
        >
          Appliquer les Filtres
        </Button>
      </div>
    </div>
  );
};

export default CarsFilter;
