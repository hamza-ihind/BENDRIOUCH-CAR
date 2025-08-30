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
import { ArrowLeft, Plane } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import CarSelectionStep from "./_components/car-selection-step";
import { useRouter, useSearchParams } from "next/navigation";

const Page = ({ params }: { params: { reservationId: string } }) => {
  const [reservation, setReservation] = useState<Reservation>();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
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

        const selectedCarId = searchParams.get("selectedCar");
        if (selectedCarId) {
          const selectedCar = carsResponse.data.find(
            (car: Car) => car.id === selectedCarId
          );
          setSelectedCar(selectedCar);
          setCurrentStep(2); // Move to the next step
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.reservationId, searchParams]);

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
      router.push(`/user/reservations`);
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
    <div className="w-full space-y-8">
      {/* Header avec navigation */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <Link
          href={`/user/reservations`}
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à mes réservations
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Configuration de la réservation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complétez toutes les étapes : Étape {currentStep} sur 3
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-6">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span className={currentStep >= 1 ? "text-yellow-600 dark:text-yellow-400 font-medium" : ""}>
            Détails
          </span>
          <span className={currentStep >= 2 ? "text-yellow-600 dark:text-yellow-400 font-medium" : ""}>
            Informations
          </span>
          <span className={currentStep >= 3 ? "text-yellow-600 dark:text-yellow-400 font-medium" : ""}>
            Confirmation
          </span>
        </div>
      </div>

      {/* Contenu des étapes */}
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
        <div className="mt-8">
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
