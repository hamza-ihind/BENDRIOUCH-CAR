// pages/select-car.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";

const SelectCarPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get("/api/cars"); // Fetch cars from your API
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchCars();
  }, []);

  const handleSelectCar = (carId: string) => {
    setSelectedCar(carId);
  };

  const handleSubmit = () => {
    if (selectedCar) {
      router.push(`/reservation?carId=${selectedCar}`); // Navigate to reservation page with selected car
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Sélectionner une voiture</h1>
      <div className="space-y-4">
        {cars.map((car) => (
          <div key={car.id} className="flex justify-between p-4 border-b">
            <div>{car.name}</div>
            <Button onClick={() => handleSelectCar(car.id)}>
              Sélectionner
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={!selectedCar}>
        Continuer avec cette voiture
      </Button>
    </div>
  );
};

export default SelectCarPage;
