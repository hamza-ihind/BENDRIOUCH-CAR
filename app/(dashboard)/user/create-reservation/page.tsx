"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { db } from "@/lib/db";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Car, Reservation } from "@prisma/client";
import { CarSelectModal } from "./_components/select-car-modal";

const formSchema = z.object({
  flightNumber: z.string().min(1, { message: "Le numéro de vol est requis" }),

  startDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "La date de début est requise",
    }),

  endDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "La date de fin est requise",
    }),

  startPlace: z.string(),
  endPlace: z.string(),

  carId: z.string().min(1, { message: "Veuillez choisir une voiture" }),
});

const ReservationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [citiesInMorocco, setCitiesInMorocco] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const user = useCurrentUser();

  const [isCarSelectModalOpen, setIsCarSelectModalOpen] = useState(false);

  const handleCarSelected = (carId: string) => {
    form.setValue("carId", carId);
    setSelectedCar(carId);
    setIsCarSelectModalOpen(false);
  };

  useEffect(() => {
    const carId = searchParams.get("carId");
    if (carId) {
      setSelectedCar(carId);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchReservation = async () => {
      const reservation = await db.reservation.findFirst({
        include: {
          user: true,
          car: true,
        },
      });
      setReservation(reservation);
    };

    fetchReservation();
  }, [user?.id]);

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get("/api/cars");
      setCars(data);
    };

    fetchCars();
  }, []);

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
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: reservation?.flightNumber || "",
      startDate: reservation?.startDate || new Date(),
      endDate: reservation?.endDate || new Date(),
      startPlace: reservation?.startPlace || "",
      endPlace: reservation?.endPlace || "",
      carId: selectedCar || reservation?.carId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/reservations/user`, values);
      toast.success("Informations mise à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div className="w-full h-[100vh] justify-center items-center max-xl:items-start z-20 flex flex-col">
      <h1 className="text-6xl font-bold dark:text-white text-black max-xl:text-5xl">
        Ajouter une réservation
      </h1>
      <p className="p-text max-xl:text-left">
        Pour quelle date voulez-vous votre voiture ?
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[560px] max-xl:w-full space-y-8 mt-8"
        >
          {/* Flight Number Field */}
          <FormField
            control={form.control}
            name="flightNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de vol</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'AB123'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Entrez votre numéro de vol.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date Field */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel className="text-xl">Date de début</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* End Date Field */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel className="text-xl">Date de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* Start Place (City) Select */}
          <FormField
            control={form.control}
            name="startPlace"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Ville de départ</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
              </FormItem>
            )}
          />

          {/* End Place (City) Select */}
          <FormField
            control={form.control}
            name="endPlace"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Ville d'arrivée</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
              </FormItem>
            )}
          />

          {/* Car Select Field */}
          <FormField
            control={form.control}
            name="carId"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Voiture sélectionnée</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl className="flex-1">
                    <Input
                      readOnly
                      {...field}
                      value={
                        selectedCar ||
                        field.value ||
                        "Aucune voiture sélectionnée"
                      }
                      placeholder="Cliquez pour choisir une voiture"
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <CarSelectModal
                    cars={cars}
                    onClose={() => setIsCarSelectModalOpen(false)}
                    onCarSelect={handleCarSelected}
                  />
                </div>
                <FormDescription>
                  Cliquez sur le bouton pour sélectionner une voiture.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <Link href="/">
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              Continuer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReservationPage;
