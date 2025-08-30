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
import {
  CheckCircle,
  User as UserIcon,
  Car as CarIcon,
  MapPin,
  Calendar,
  Plane,
  Download,
  CreditCard,
  Clock
} from "lucide-react";

interface ConfirmationStepProps {
  selectedCar: Car | undefined;
  reservation: Reservation;
  handleSubmitReservation: () => void;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica"
  },

  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#f59e0b", // Yellow-orange
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f59e0b",
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },

  // Section styles
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#f59e0b",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Text styles
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },
  label: {
    fontSize: 9,
    color: "#6b7280",
    width: "35%",
    fontWeight: "bold",
  },
  value: {
    fontSize: 9,
    color: "#1f2937",
    width: "65%",
  },

  // Car section
  carSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  carImage: {
    width: 80,
    height: 55,
    borderRadius: 6,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 3,
  },
  carModel: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 5,
  },

  // Price section
  priceSection: {
    backgroundColor: "#fef3c7",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f59e0b",
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  priceLabel: {
    fontSize: 9,
    color: "#92400e",
  },
  priceValue: {
    fontSize: 9,
    color: "#92400e",
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f59e0b",
  },
  totalLabel: {
    fontSize: 11,
    color: "#92400e",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 12,
    color: "#92400e",
    fontWeight: "bold",
  },

  // Signature section
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 15,
  },
  signatureBox: {
    width: "45%",
    height: 40,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    position: "relative",
  },
  signatureLabel: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 3,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  copyright: {
    fontSize: 8,
    color: "#9ca3af",
    textAlign: "center",
  },

  // Date badge
  dateBadge: {
    backgroundColor: "#dbeafe",
    padding: 5,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 8,
    color: "#1e40af",
    fontWeight: "bold",
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
}: ReservationPDFProps) => {
  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header avec logo et titre */}
        <View style={styles.header}>
          <Text style={styles.logo}>BENDRIOUCHCAR</Text>
          <Text style={styles.mainTitle}>CONFIRMATION DE RÉSERVATION</Text>
        </View>

        {/* Date de génération */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>
            Généré le {new Date().toLocaleDateString('fr-FR')}
          </Text>
        </View>

        {/* Section Informations Client */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Client</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Nom complet :</Text>
            <Text style={styles.value}>
              {user?.firstName || "Non spécifié"} {user?.lastName || "Non spécifié"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{user?.email || "Non spécifié"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Téléphone :</Text>
            <Text style={styles.value}>{user?.phone || "Non spécifié"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Localisation :</Text>
            <Text style={styles.value}>
              {user?.city || "Non spécifié"}, {user?.country || "Non spécifié"}
            </Text>
          </View>
        </View>

        {/* Section Détails de la Réservation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails de la Réservation</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lieu de départ :</Text>
            <Text style={styles.value}>{reservation.startPlace || "Non spécifié"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lieu de retour :</Text>
            <Text style={styles.value}>{reservation.endPlace || "Non spécifié"}</Text>
          </View>

          {reservation.flightNumber && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Numéro de vol :</Text>
              <Text style={styles.value}>{reservation.flightNumber}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.label}>Date de début :</Text>
            <Text style={styles.value}>
              {startDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Date de fin :</Text>
            <Text style={styles.value}>
              {endDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Durée totale :</Text>
            <Text style={styles.value}>{totalDays} jour{totalDays > 1 ? 's' : ''}</Text>
          </View>
        </View>

        {/* Section Véhicule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du Véhicule</Text>

          <View style={styles.carSection}>
            <Img
              src={selectedCar?.imageUrl[0] || "/placeholder-car.png"}
              style={styles.carImage}
            />
            <View style={styles.carDetails}>
              <Text style={styles.carName}>{selectedCar.name || "Non spécifié"}</Text>
              <Text style={styles.carModel}>{selectedCar.model || "Non spécifié"}</Text>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Carburant :</Text>
                <Text style={styles.value}>{selectedCar.fuelType || "Non spécifié"}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Places :</Text>
                <Text style={styles.value}>{selectedCar.seats || "Non spécifié"}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Transmission :</Text>
                <Text style={styles.value}>{selectedCar.transmission || "Non spécifié"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section Prix */}
        <View style={styles.priceSection}>
          <Text style={styles.sectionTitle}>Résumé des Prix</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Prix par jour :</Text>
            <Text style={styles.priceValue}>{selectedCar.pricePerDay || 0} DH</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Nombre de jours :</Text>
            <Text style={styles.priceValue}>{totalDays}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Calcul :</Text>
            <Text style={styles.priceValue}>
              {totalDays} × {selectedCar.pricePerDay || 0} DH
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>PRIX TOTAL :</Text>
            <Text style={styles.totalValue}>{totalPrice} DH</Text>
          </View>
        </View>

        {/* Section Signatures */}
        <View style={styles.signatureSection}>
          <View style={{ width: "45%" }}>
            <View style={styles.signatureBox}></View>
            <Text style={styles.signatureLabel}>Signature du Propriétaire</Text>
          </View>

          <View style={{ width: "45%" }}>
            <View style={styles.signatureBox}></View>
            <Text style={styles.signatureLabel}>Signature du Client</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>
            © 2024 BendriouchCar - Location de voitures à Agadir. Tous droits réservés.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const ConfirmationStep = ({
  selectedCar,
  reservation,
  handleSubmitReservation,
}: ConfirmationStepProps) => {
  if (!selectedCar) {
    return (
      <div className="w-full space-y-6">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CarIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Aucune voiture sélectionnée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Veuillez retourner à l'étape précédente pour sélectionner une voiture.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const user = useCurrentUser();
  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = (selectedCar.pricePerDay || 0) * totalDays;

  return (
    <div className="w-full space-y-8">
      {/* Header de confirmation */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Confirmation de Réservation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Vérifiez tous les détails avant de confirmer votre réservation
          </p>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <UserIcon className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Vos Informations
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <UserIcon className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nom complet</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.firstName || "Non spécifié"} {user?.lastName || "Non spécifié"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.email || "Non spécifié"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Téléphone</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.phone || "Non spécifié"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Localisation</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.city || "Non spécifié"}, {user?.country || "Non spécifié"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Détails de la réservation */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Détails de la Réservation
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <MapPin className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lieu de départ</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {reservation.startPlace || "Non spécifié"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <MapPin className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lieu d'arrivée</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {reservation.endPlace || "Non spécifié"}
                  </p>
                </div>
              </div>
              {reservation.flightNumber && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Plane className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Numéro de vol</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {reservation.flightNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Calendar className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date de début</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {startDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Calendar className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date de fin</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {endDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Clock className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Durée totale</p>
                  <p className="font-bold text-blue-900 dark:text-blue-100">
                    {totalDays} jour{totalDays > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Détails de la voiture */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <CarIcon className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Votre Véhicule
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image de la voiture */}
            <div className="lg:w-1/3">
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                <Image
                  src={selectedCar.imageUrl[0] || "/placeholder-car.png"}
                  alt={selectedCar.name || "Car Image"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Détails de la voiture */}
            <div className="lg:w-2/3 space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedCar.name || "Non spécifié"}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {selectedCar.model || "Non spécifié"}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Carburant</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {selectedCar.fuelType || "Non spécifié"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Places</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {selectedCar.seats || "Non spécifié"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transmission</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {selectedCar.transmission || "Non spécifié"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé des prix */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Résumé des Prix
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Prix par jour</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedCar.pricePerDay || 0} DH
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">
                Nombre de jours ({totalDays})
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalDays} × {selectedCar.pricePerDay || 0} DH
              </span>
            </div>
            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl px-4 border border-yellow-200 dark:border-yellow-800">
              <span className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                Prix Total
              </span>
              <span className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {totalPrice} DH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSubmitReservation}
            className="flex-1 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
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
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger PDF
            </Button>
          </PDFDownloadLink>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                Prêt à confirmer ?
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                En confirmant, vous acceptez nos conditions de location. Vous recevrez un email de confirmation avec tous les détails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
