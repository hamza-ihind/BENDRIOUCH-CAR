import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Car, Reservation } from "@prisma/client";

interface ConfirmationStepProps {
  selectedCar: Car | undefined;
  reservation: Reservation;
  handleSubmitReservation: () => void;
}

const ConfirmationStep = ({
  selectedCar,
  reservation,
  handleSubmitReservation,
}: ConfirmationStepProps) => {
  if (!selectedCar) {
    return <div>Loading...</div>;
  }

  const user = useCurrentUser();

  return (
    <div className="w-full mt-8">
      <h3 className="text-4xl font-bold">Confirmation de la réservation</h3>

      {/* Car Details Section */}
      <div className="mt-8 border rounded-lg p-6">
        <h4 className="text-xl font-semibold mb-4">Voiture Sélectionnée</h4>
        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <img
              src={selectedCar.imageUrl || "/placeholder-car.png"}
              alt={selectedCar.name || "Car Image"}
              className="rounded-lg w-full"
            />
          </div>
          <div className="flex-1">
            <p>
              <strong>Nom:</strong> {selectedCar.name || "Non spécifié"}
            </p>
            <p>
              <strong>Modèle:</strong> {selectedCar.model || "Non spécifié"}
            </p>
            <p>
              <strong>Prix par jour:</strong> {selectedCar.pricePerDay || 0} DH
              / jour
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="border rounded-lg shadow-lg p-6 bg-white mb-8">
        <h4 className="text-xl font-semibold mb-4">
          Informations Personnelles
        </h4>
        <div>
          <p>
            <strong>Nom:</strong> {user?.firstName || "Non spécifié"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "Non spécifié"}
          </p>
          <p>
            <strong>Téléphone:</strong> {user?.phone || "Non spécifié"}
          </p>
        </div>
      </div>

      {/* Reservation Information Section */}
      <div className="border rounded-lg shadow-lg p-6 bg-white mb-8">
        <h4 className="text-xl font-semibold mb-4">
          Informations de Réservation
        </h4>
        <div>
          {/* <p>
            <strong>Date de début:</strong>{" "}
            {new Date(reservation.startDate).toLocaleDateString() ||
              "Non spécifié"}
          </p>
          <p>
            <strong>Date de fin:</strong>{" "}
            {new Date(reservation.endDate).toLocaleDateString() ||
              "Non spécifié"}
          </p> */}
          <p>
            <strong>Lieu de départ:</strong>{" "}
            {reservation.startPlace || "Non spécifié"}
          </p>
          <p>
            <strong>Lieu d'arrivée:</strong>{" "}
            {reservation.endPlace || "Non spécifié"}
          </p>
          <p>
            <strong>Numéro de vol:</strong>{" "}
            {reservation.flightNumber || "Non spécifié"}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmitReservation}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Confirmer la Réservation
      </Button>
    </div>
  );
};

export default ConfirmationStep;
