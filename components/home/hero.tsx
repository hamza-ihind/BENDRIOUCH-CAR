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
import { CalendarIcon, Car, CircleUser, Phone, Smile } from "lucide-react";
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
    <section className="page-config max-sm:px-8 md:px-12 lg:px-48 bg-gradient-to-br from-white via-orange-50 to-yellow-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
        <div className="grid items-center md:grid-cols-2 gap-16 lg:gap-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent dark:from-yellow-400 dark:to-orange-400 px-4 py-2 bg-white/50 dark:bg-neutral-800/50 rounded-full backdrop-blur-sm">
                Bendriouchcar : Location de voitures à Agadir
              </p>

              {/* Title */}
              <div className="space-y-6">
                <h1 className="font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl dark:text-white leading-tight">
                  Louez votre voiture en toute{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    simplicité
                  </span>{" "}
                  à Agadir
                </h1>
                <p className="text-lg text-gray-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                  Découvrez notre large sélection de véhicules et réservez
                  directement en ligne. Avec Bendriouchcar, la location de voiture
                  devient facile et rapide.
                </p>
              </div>
              {/* End Title */}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="cta-button">
                  <Car className="w-5 h-5" />
                  Réserver maintenant
                </button>
                <button className="inline-flex items-center gap-x-2 py-3 px-6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 font-semibold text-sm text-gray-800 dark:text-neutral-200 rounded-full hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                  <Phone className="w-5 h-5" />
                  Nous contacter
                </button>
              </div>
            </div>

            {/* Testimonial */}
            <div className="hidden md:block bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-neutral-700/50 max-w-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CircleUser className="w-12 h-12 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-neutral-300 italic mb-2">
                    "Service exceptionnel et voitures impeccables. Je recommande vivement!"
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800 dark:text-neutral-200">
                      Mr. T. Bendriouch
                    </div>
                    <div className="text-gray-500 dark:text-neutral-500">
                      Fondateur | Bendriouchcar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Testimonial */}
          </div>

          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl transform rotate-3"></div>

            <CardWrapper
              headerTitle="Réservez votre voiture facilement"
              headerLabel="Location de voiture à Agadir - Bendriouchcar"
              backButtonHref="/catalog"
              backButtonLabel="Voir les voitures disponibles"
              className="h-fit min-w-full relative z-10 shadow-2xl"
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
    </section>
  );
};

export default Hero;
