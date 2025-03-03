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

// Adjusted schema to make flightNumber optional
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
        console.error("Error fetching country and city data:", error);
      });
  }, []);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof HeroSchema>) => {
    try {
      if (!user) {
        // Redirect to sign-in page if not authenticated
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
    <div className="w-full h-[720px] max-md:h-full flex flex-col items-center gap-6 justify-center">
      <div className="w-full flex flex-row items-center justify-between z-10 max-lg:flex-col max-lg:gap-16">
        <div className="flex flex-col items-start text-left">
          <Badge variant={"secondary"} className="w-fit mb-4">
            Location de voitures chez Bendriouch Cars
          </Badge>
          <h1 className="text-6xl font-bold text-black mb-4">
            Cherchez votre voiture préférée
          </h1>
          <p className="text-gray-700 text-base w-[75%]">
            Choisissez votre voiture préférée et réservez-la directement en
            ligne. Remplissez les informations ci-dessous pour commencer votre
            réservation.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full flex justify-end z-10">
          <CardWrapper
            headerTitle="Réservation"
            headerLabel="Réservez votre voiture aujourd'hui"
            backButtonHref="/catalog"
            backButtonLabel="Voir des voitures ?"
            className="h-fit min-w-[450px]"
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
                        <FormLabel className="text-base">
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
                        <FormLabel className="text-base">
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
                        <FormLabel className="text-xl">
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
                        <FormLabel className="text-xl">
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
                /> */}

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
