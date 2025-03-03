"use client";

import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // En supposant que Label est importé d'un chemin similaire

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
    <div className="h-fit w-[380px] max-xl:w-full flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold text-gray-800">Options de Filtrage</h2>
        <p className="text-sm text-gray-600">
          Affinez votre recherche de voiture et enregistrez vos préférences
        </p>
      </div>
      <div className="flex flex-col space-y-4 max-xl:flex-row max-xl:justify-between">
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Type de Carburant</h3>
          <RadioGroup
            defaultValue={fuelType}
            onValueChange={(value) => {
              setFuelType(value);
              handleFilterChange("fuelType", value);
            }}
            className="flex flex-col mt-2"
          >
            {["Diesel", "Essence"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`fuelType-${type}`} />
                <Label htmlFor={`fuelType-${type}`}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Transmission</h3>
          <RadioGroup
            defaultValue={transmission}
            onValueChange={(value) => {
              setTransmission(value);
              handleFilterChange("transmission", value);
            }}
            className="flex flex-col mt-2"
          >
            {["Automatic", "Manual"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`transmission-${type}`} />
                <Label htmlFor={`transmission-${type}`}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">Prix Par Jour</h3>
        <Input
          type="number"
          name="minPrice"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMinPrice(value);
            handleFilterChange("minPrice", value);
          }}
          className="border p-2 w-full mt-2"
        />
        <Input
          type="number"
          name="maxPrice"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMaxPrice(value);
            handleFilterChange("maxPrice", value);
          }}
          className="border p-2 w-full mt-2"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">Modèle (Année)</h3>
        <Input
          type="text"
          name="model"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            handleFilterChange("model", e.target.value);
          }}
          className="border p-2 w-full mt-2"
        />
      </div>
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
        className="mt-4 bg-yellow-400 text-black p-2 rounded font-light"
      >
        Enregistrer les Filtres
      </Button>
    </div>
  );
};

export default CarsFilter;
