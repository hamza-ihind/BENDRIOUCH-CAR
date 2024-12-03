import React, { useState } from "react";

interface FilterProps {
  onFilter: (filters: any) => void;
}

const CarsFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: "",
    model: "",
    pricePerDay: "",
    fuelType: "",
    seats: "",
    transmission: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      model: "",
      pricePerDay: "",
      fuelType: "",
      seats: "",
      transmission: "",
    });
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Filter */}
      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium text-gray-700">
          Car Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={filters.name}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Search by car name"
        />
      </div>

      {/* Model Filter */}
      <div className="flex flex-col">
        <label htmlFor="model" className="font-medium text-gray-700">
          Car Model
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={filters.model}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Search by model"
        />
      </div>

      {/* Price Filter */}
      <div className="flex flex-col">
        <label htmlFor="pricePerDay" className="font-medium text-gray-700">
          Price per day
        </label>
        <input
          type="number"
          id="pricePerDay"
          name="pricePerDay"
          value={filters.pricePerDay}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Enter price"
        />
      </div>

      {/* Fuel Type Filter */}
      <div className="flex flex-col">
        <label htmlFor="fuelType" className="font-medium text-gray-700">
          Fuel Type
        </label>
        <select
          id="fuelType"
          name="fuelType"
          value={filters.fuelType}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* Seats Filter */}
      <div className="flex flex-col">
        <label htmlFor="seats" className="font-medium text-gray-700">
          Seats
        </label>
        <input
          type="number"
          id="seats"
          name="seats"
          value={filters.seats}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Enter number of seats"
        />
      </div>

      {/* Transmission Filter */}
      <div className="flex flex-col">
        <label htmlFor="transmission" className="font-medium text-gray-700">
          Transmission
        </label>
        <select
          id="transmission"
          name="transmission"
          value={filters.transmission}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Filter Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-black py-2 px-4 rounded-md"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default CarsFilter;
