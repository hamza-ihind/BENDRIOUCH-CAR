"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { CardWrapper } from "../auth/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useCurrentUser } from "@/hooks/use-current-user";

// Schéma ajusté pour rendre le numéro de vol optionnel
export const HeroSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  startPlace: z.string(),
  endPlace: z.string(),
  flightNumber: z.string().optional(),
});

const Hero: React.FC = () => {
  const router = useRouter();
  const [citiesInMorocco, setCitiesInMorocco] = useState<string[]>([]);
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof HeroSchema>>({
    resolver: zodResolver(HeroSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      startPlace: "",
      endPlace: "",
      flightNumber: "",
    },
  });

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
        console.error(
          "Erreur lors de la récupération des données des pays et villes :",
          error
        );
      });
  }, []);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof HeroSchema>) => {
    try {
      if (!user) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        router.push(`/signin?redirect=/user/reservations`);
        return;
      }

      const response = await axios.post(`/api/reservations`, values);
      const reservationId = response.data.id;

      router.push(`/user/reservations/${reservationId}`);
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full flex flex-col py-10 lg:py-14">
        {/* Grid */}
        <div className="grid items-center md:grid-cols-2 gap-16 lg:gap-12">
          <div>
            <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-400 text-transparent dark:from-yellow-300 dark:to-orange-300">
              Bendriouchcar : Location de voitures à Agadir
            </p>

            {/* Title */}
            <div className="mt-4 md:mb-12 max-w-2xl">
              <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-neutral-200">
                Louez votre voiture en toute simplicité à Agadir
              </h1>
              <p className="text-gray-600 dark:text-neutral-300">
                Découvrez notre large sélection de véhicules et réservez
                directement en ligne. Avec Bendriouchcar, la location de voiture
                devient facile et rapide.
              </p>
            </div>
            {/* End Title */}

            {/* Blockquote */}
            <blockquote className="hidden md:block relative max-w-sm">
              <svg
                className="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-200 dark:text-neutral-800"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                  fill="currentColor"
                />
              </svg>

              <div className="relative z-10">
                <p className="text-xl italic text-gray-800 dark:text-white">
                  Un service rapide et fiable pour une location sans tracas.
                </p>
              </div>

              <footer className="mt-3">
                <div className="flex items-center gap-x-4">
                  <div className="shrink-0">
                    <img
                      className="size-8 rounded-full"
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Avatar"
                    />
                  </div>
                  <div className="grow">
                    <div className="font-semibold text-gray-800 dark:text-neutral-200">
                      Ali Bendriouch
                    </div>
                    <div className="text-xs text-gray-500 dark:text-neutral-500">
                      Fondateur | Bendriouchcar
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>

          <CardWrapper
            headerTitle="Réservez votre voiture facilement"
            headerLabel="Location de voiture à Agadir - Bendriouchcar"
            backButtonHref="/catalog"
            backButtonLabel="Voir les voitures disponibles"
            className="h-fit min-w-full"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col">
                        <FormLabel className="text-lg">
                          Date de départ
                        </FormLabel>
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
                                  <span>Sélectionnez une date</span>
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

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col">
                        <FormLabel className="text-lg">
                          Date de retour
                        </FormLabel>
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
                                  <span>Sélectionnez une date</span>
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
                </div>

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="startPlace"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg">
                          Ville de départ
                        </FormLabel>
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

                  <FormField
                    control={form.control}
                    name="endPlace"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg">
                          Ville d'arrivée
                        </FormLabel>
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
                </div>

                {/* <FormField
                      control={form.control}
                      name="flightNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-base">
                            Numéro de vol (facultatif)
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Numéro de vol"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> 
                  */}

                <Button
                  type="submit"
                  className="w-full self-end justify-self-end"
                  disabled={isSubmitting || !isValid}
                >
                  Confirmer
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
