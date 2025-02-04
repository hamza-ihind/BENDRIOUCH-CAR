import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Car, Reservation, User } from "@prisma/client";
import Image from "next/image";
import {
  PDFDownloadLink,
  Document,
  Page,
  Image as Img,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface ConfirmationStepProps {
  selectedCar: Car | undefined;
  reservation: Reservation;
  handleSubmitReservation: () => void;
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  text: { fontSize: 12, marginBottom: 8, color: "#555" },
  image: { width: 100, height: 100, borderRadius: 50, marginRight: 10 },
  carImage: { width: 150, height: 100, borderRadius: 5, marginRight: 10 },
  footer: { marginTop: 20, textAlign: "center", fontSize: 10, color: "#888" },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "40%",
    textAlign: "center",
    fontSize: 10,
    marginTop: 10,
  },
  copyright: {
    textAlign: "center",
    fontSize: 10,
    color: "#888",
    marginTop: 10,
  },
});

interface ReservationPDFProps {
  user: User;
  selectedCar: Car;
  reservation: Reservation;
  totalPrice: number;
}

const ReservationPDF = ({
  user,
  selectedCar,
  reservation,
  totalPrice,
}: ReservationPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Company Logo</Text>
        <Text style={styles.title}>Confirmation de la réservation</Text>
      </View>
      <View style={styles.section}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Img
            src={user?.image || "/placeholder-user.png"}
            style={styles.image}
          />
          <View>
            <Text style={styles.text}>
              Nom: {user?.firstName || "Non spécifié"}{" "}
              {user?.lastName || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Email: {user?.email || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Téléphone: {user?.phone || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Pays: {user?.country || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Ville: {user?.city || "Non spécifié"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Lieu de départ: {reservation.startPlace || "Non spécifié"}
        </Text>
        <Text style={styles.text}>
          Lieu d'arrivée: {reservation.endPlace || "Non spécifié"}
        </Text>
        <Text style={styles.text}>
          Numéro de vol: {reservation.flightNumber || "Non spécifié"}
        </Text>
        <Text style={styles.text}>
          Date de début: {new Date(reservation.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Date de fin: {new Date(reservation.endDate).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.section}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Img
            src={selectedCar?.imageUrl || "/placeholder-car.png"}
            style={styles.carImage}
          />
          <View>
            <Text style={styles.text}>
              Voiture: {selectedCar.name || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Modèle: {selectedCar.model || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Prix par jour: {selectedCar.pricePerDay || 0} DH / jour
            </Text>
            <Text style={styles.text}>
              Carburant: {selectedCar.fuelType || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Sièges: {selectedCar.seats || "Non spécifié"}
            </Text>
            <Text style={styles.text}>
              Transmission: {selectedCar.transmission || "Non spécifié"}
            </Text>
            <Text style={styles.text}>Prix total: {totalPrice} DH</Text>
          </View>
        </View>
      </View>
      <View style={styles.signatureSection}>
        <Text style={styles.signatureLine}>Signature du propriétaire</Text>
        <Text style={styles.signatureLine}>Signature du client</Text>
      </View>
      <Text style={styles.copyright}>
        © 2023 Your Company Name. All rights reserved.
      </Text>
    </Page>
  </Document>
);

const ConfirmationStep = ({
  selectedCar,
  reservation,
  handleSubmitReservation,
}: ConfirmationStepProps) => {
  if (!selectedCar) {
    return <div>Loading...</div>;
  }

  const user = useCurrentUser();
  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = (selectedCar.pricePerDay || 0) * totalDays;

  return (
    <div className="w-full mt-8 border rounded-lg shadow-lg p-6 bg-white">
      <h3 className="text-4xl font-bold mb-8">
        Confirmation de la réservation
      </h3>
      <div className="flex justify-between">
        <div className="border-b border-gray-300 mb-8 pb-4 w-1/2">
          <h4 className="text-2xl font-semibold mb-4">
            Informations Personnelles
          </h4>
          <div className="flex items-center mb-4">
            <Image
              src={user?.image || "/placeholder-user.png"}
              alt={user?.firstName || "User Image"}
              className="rounded-full"
              width={150}
              height={150}
            />
            <div className="ml-8">
              <p className="text-lg text-gray-700 mb-2">
                <strong>Nom:</strong> {user?.firstName || "Non spécifié"}{" "}
                {user?.lastName || "Non spécifié"}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Email:</strong> {user?.email || "Non spécifié"}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Téléphone:</strong> {user?.phone || "Non spécifié"}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Pays:</strong> {user?.country || "Non spécifié"}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Ville:</strong> {user?.city || "Non spécifié"}
              </p>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 mb-8 pb-4 w-1/2">
          <h4 className="text-2xl font-semibold mb-4">
            Détails de la Réservation
          </h4>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Lieu de départ:</strong>{" "}
            {reservation.startPlace || "Non spécifié"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Lieu d'arrivée:</strong>{" "}
            {reservation.endPlace || "Non spécifié"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Numéro de vol:</strong>{" "}
            {reservation.flightNumber || "Non spécifié"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Date de début:</strong>{" "}
            {new Date(reservation.startDate).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Date de fin:</strong>{" "}
            {new Date(reservation.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="border-b border-gray-300 mb-8 pb-4">
        <h4 className="text-2xl font-semibold mb-4">Détails de la Voiture</h4>
        <div className="flex items-center mb-4">
          <Image
            src={selectedCar.imageUrl || "/placeholder-car.png"}
            alt={selectedCar.name || "Car Image"}
            className="rounded-lg"
            width={150}
            height={100}
          />
          <div className="ml-4">
            <p className="text-lg text-gray-700">
              <strong>Voiture:</strong> {selectedCar.name || "Non spécifié"}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Modèle:</strong> {selectedCar.model || "Non spécifié"}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Prix par jour:</strong> {selectedCar.pricePerDay || 0} DH
              / jour
            </p>
            <p className="text-lg text-gray-700">
              <strong>Carburant:</strong>{" "}
              {selectedCar.fuelType || "Non spécifié"}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Sièges:</strong> {selectedCar.seats || "Non spécifié"}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Transmission:</strong>{" "}
              {selectedCar.transmission || "Non spécifié"}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Prix total:</strong> {totalPrice} DH
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          onClick={handleSubmitReservation}
          className="bg-yellow-400 text-black py-2 px-4 rounded-lg"
        >
          Confirmer la Réservation
        </Button>
        <PDFDownloadLink
          document={
            <ReservationPDF
              user={user as User}
              selectedCar={selectedCar}
              reservation={reservation}
              totalPrice={totalPrice}
            />
          }
          fileName="reservation-confirmation.pdf"
        >
          <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Télécharger PDF
          </Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ConfirmationStep;
