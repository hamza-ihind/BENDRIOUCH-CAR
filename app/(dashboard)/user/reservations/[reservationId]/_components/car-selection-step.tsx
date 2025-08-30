"use client";

import { Button } from "@/components/ui/button";
import { Car, Reservation } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plane, MapPin, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import CarSelection from "@/components/cars/car-selection";

// Schema de validation unifié - numéro de vol optionnel
const formSchema = z.object({
  flightNumber: z.string().optional(), // Numéro de vol optionnel
  startDate: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime()), {
    message: "La date de retraite est requise",
  }),
  endDate: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime()), {
    message: "La date de retour est requise",
  }),
  startPlace: z.string().min(1, { message: "Le lieu de retraite est requis" }),
  endPlace: z.string().min(1, { message: "Le lieu de retour est requis" }),
});

interface CarSelectionStepProps {
  cars: Car[];
  selectedCar?: Car;
  handleCarSelect: (car: any) => void;
  reservation: Reservation;
  reservationId: string;
}

const CarSelectionStep = ({
  cars,
  selectedCar,
  handleCarSelect,
  reservation,
  reservationId,
}: CarSelectionStepProps) => {
  const [citiesInMorocco, setCitiesInMorocco] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: reservation?.flightNumber || "",
      startDate: reservation?.startDate || new Date(),
      endDate: reservation?.endDate || new Date(),
      startPlace: reservation?.startPlace || "",
      endPlace: reservation?.endPlace || "",
    },
  });

  const { isSubmitting } = form.formState;

  // Surveiller les valeurs du formulaire pour activer le bouton
  const watchedValues = form.watch();

  // Vérifier si tous les champs obligatoires sont remplis (sauf flightNumber)
  const isFormValid = watchedValues.startDate &&
                     watchedValues.endDate &&
                     watchedValues.startPlace &&
                     watchedValues.endPlace;

  // Charger les villes du Maroc depuis l'API externe
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/refs/heads/master/countries.json"
      )
      .then((response) => {
        const countriesAndCities = response.data;
        const moroccoCities = countriesAndCities["Morocco"];
        setCitiesInMorocco(moroccoCities || []);
      })
      .catch((error) => {
        console.error("Error fetching country and city data:", error);
        // Fallback avec plus de villes en cas d'erreur
        setCitiesInMorocco([
          "Agadir", "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger",
          "Meknes", "Oujda", "Tetouan", "Essaouira", "Ouarzazate", "Al Hoceima",
          "Beni Mellal", "Kenitra", "Errachidia", "Ifrane", "Zagora", "Tan-Tan"
        ]);
      });
  }, []);

  const handleCarClick = (car: Car) => {
    if (selectedCar?.id === car.id) {
      handleCarSelect(undefined);
    } else {
      handleCarSelect(car);
    }
  };

  // Fonction pour sauvegarder tous les champs en une fois
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/reservations/user/${reservationId}`, values);
      toast.success("Informations de réservation mises à jour avec succès");
      router.refresh();
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error("Une erreur s'est produite lors de la mise à jour");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Formulaire unifié en haut */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Détails de votre réservation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Complétez toutes les informations nécessaires
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Numéro de vol */}
              <FormField
                control={form.control}
                name="flightNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                      Numéro de vol
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="ex: AB123"
                        className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Date de retraite
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-11 pl-3 text-left font-normal border-gray-300 dark:border-gray-600 hover:border-yellow-400",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Date de retour
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-11 pl-3 text-left font-normal border-gray-300 dark:border-gray-600 hover:border-yellow-400",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Lieux */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startPlace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Lieu de retraite
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400">
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {citiesInMorocco.map((city, index) => (
                            <SelectItem key={index} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endPlace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Lieu de retour
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400">
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {citiesInMorocco.map((city, index) => (
                            <SelectItem key={index} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bouton unique pour sauvegarder */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Enregistrement...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Enregistrer toutes les informations
                    </div>
                  )}
                </Button>
                {!isFormValid && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Veuillez remplir tous les champs obligatoires (le numéro de vol est optionnel)
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Liste des voitures en bas */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Choisissez votre véhicule
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Sélectionnez la voiture qui correspond à vos besoins
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarSelection
                  key={car.id}
                  name={car.name || "Non spécifié"}
                  model={car.model || "Non spécifié"}
                  pricePerDay={car.pricePerDay || 0}
                  fuelType={car.fuelType || "Non spécifié"}
                  seats={car.seats || 0}
                  transmission={car.transmission || "Non spécifié"}
                  imageUrl={car.imageUrl[0] || "/placeholder-car.png"}
                  selectedCar={selectedCar}
                  onReserve={() => handleCarClick(car)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Aucune voiture disponible
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Il n'y a pas de voitures disponibles pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarSelectionStep;
