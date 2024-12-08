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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { db } from "@/lib/db";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Reservation } from "@prisma/client";

const formSchema = z.object({
  flightNumber: z.string().min(1, { message: "Le numéro de vol est requis" }),

  // Use z.date() to handle dates properly
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

  carId: z.string().min(1, { message: "Veuillez choisir une voiture" }),
});

const ReservationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const user = useCurrentUser();

  // Get carId from URL query parameters
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: reservation?.flightNumber || "",
      startDate: reservation?.startDate || new Date(),
      endDate: reservation?.endDate || new Date(),
      carId: selectedCar || reservation?.carId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/reservations`, values);
      toast.success("Informations mise à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  const handleSelectCar = () => {
    router.push("/user/create-reservation/select-car");
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

          {/* Car Selection Field */}
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

                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleSelectCar}
                    disabled={isSubmitting}
                    className="whitespace-nowrap"
                  >
                    Choisir une voiture
                  </Button>
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
