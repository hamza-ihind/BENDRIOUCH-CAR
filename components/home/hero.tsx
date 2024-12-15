"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { CardWrapper } from "../auth/CardWrapper";

import {
  Form,
  FormControl,
  FormDescription,
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
import Image from "next/image";

export const HeroSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  startPlace: z.string(),
  endPlace: z.string(),
  flightNumber: z
    .string()
    .min(1, { message: "Veuillez saisir votre numéro de vol" }),
});

const Hero: React.FC = () => {
  const router = useRouter();
  const [citiesInMorocco, setCitiesInMorocco] = useState<string[]>([]);

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
      const response = await axios.post(`/api/reservations`, values);
      const reservationId = response.data.id;
      toast.success("Informations mise à jour");
      router.push(`/user/reservations/${reservationId}`);
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-6">
      {/* <div className="-z-1 w-full">
        <Image
          src={"/hero.webp"}
          alt="hero"
          width={720}
          height={720}
          objectFit="cover"
          className="absolute left-0 brightness-30 contrast-75"
        />
      </div> */}

      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-4 items-start text-left">
          <Badge variant={"secondary"} className="w-fit">
            Location des voitures chez becndriouch Cars
          </Badge>
          <h1 className="text-6xl font-bold">
            Cherchez votre voiture préférée
          </h1>
          <p className="text-left text-gray-500 text-base w-[75%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            commodi illum reprehenderit ratione sapiente exercitationem tenetur,
            saepe autem modi aperiam doloremque, magnam sit vitae rerum aut
            repellendus voluptate qui voluptatibus.
          </p>
        </div>

        {/* Text Section */}

        {/* Form Section */}
        <div className="flex justify-end w-full">
          <CardWrapper
            headerTitle="Réservation"
            headerLabel="Réserver votre voiture aujourd'hui"
            backButtonHref="/cars"
            backButtonLabel="Voir des voitures ?"
            className="flex-1 h-fit min-w-[550px]"
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
                          Date de retraite
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

                  {/* End Place (City) Select */}
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

                <FormField
                  control={form.control}
                  name="flightNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">Numéro de vol</FormLabel>
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

                <Button
                  type="submit"
                  className="w-full self-end justify-self-end"
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
