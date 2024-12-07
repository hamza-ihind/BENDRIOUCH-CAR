import CarCard from "./car-card";
import { Car } from "@prisma/client";

const CarsList = ({ cars }: { cars: Car[] }) => {
  // If no cars are passed, show an error message
  if (!cars || cars.length === 0) {
    return <p className="text-center">No cars available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          name={car.name || "Unnamed Car"}
          model={car.model || "Unknown Model"}
          pricePerDay={car.pricePerDay || 0}
          seats={car.seats || 0}
          fuelType={car.fuelType || "N/A"}
          transmission={car.transmission || "N/A"}
          availability={car.availability}
          imageUrl={car.imageUrl || "/default-image.png"}
        />
      ))}
    </div>
  );
};

export default CarsList;
