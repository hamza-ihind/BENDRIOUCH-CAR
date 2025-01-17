"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Car, Reservation } from "@prisma/client";
import PersonalInfoStep from "./_components/personal-info-step";
import ConfirmationStep from "./_components/confirmation-step";
import NavigationButtons from "./_components/navigation-buttons";
import { Separator } from "@/components/ui/separator";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { ArrowLeft } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import CarSelectionStep from "./_components/car-selection-step";

const Page = ({ params }: { params: { reservationId: string } }) => {
  const [reservation, setReservation] = useState<Reservation>();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [currentStep, setCurrentStep] = useState(1);
  const user = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationResponse = await axios.get(
          `/api/reservations/user/${params.reservationId}`
        );
        setReservation(reservationResponse.data);

        const carsResponse = await axios.get("/api/cars");
        setCars(carsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.reservationId]);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car); // Set the selected car ID
  };

  const goToNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmitReservation = async () => {
    try {
      const response = await axios.patch(
        `/api/reservations/user/${params.reservationId}`,
        {
          ...reservation,
          carId: selectedCar?.id,
          isPublished: true,
        }
      );
      console.log("Reservation successful:", response.data);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const handleReserveCar = async (car: Car) => {
    try {
      const response = await axios.post("/api/reservations", {
        userId: user?.id,
        carId: car.id,
      });
      setReservation(response.data);
      setSelectedCar(car);
      setCurrentStep(1);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  if (!reservation || !cars.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full z-20 flex flex-col p-12 max-md:px-4 max-md:py-28">
      <Link
        href={`/user/reservations`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour à la liste des reservation
      </Link>
      <div className="flex items-start justify-between gap-y-6 max-2xl:flex-col">
        <DashboardPageTitle
          title="Configuration de la reservation"
          description={`Complétez tous les étapes: Étape ${currentStep} sur 3`}
        />
      </div>
      <Separator />

      <div className="flex gap-8 w-full justify-center items-center flex-col">
        <div className="w-full">
          {currentStep === 1 && (
            <CarSelectionStep
              cars={cars}
              selectedCar={selectedCar}
              reservation={reservation}
              reservationId={params.reservationId}
              handleCarSelect={handleCarSelect}
            />
          )}

          {currentStep === 2 && <PersonalInfoStep />}

          {currentStep === 3 && (
            <ConfirmationStep
              reservation={reservation}
              selectedCar={selectedCar}
              handleSubmitReservation={handleSubmitReservation}
            />
          )}

          {/* Navigation Buttons */}
          <NavigationButtons
            currentStep={currentStep}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            selectedCar={selectedCar}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
