"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Reservation } from "@prisma/client";
import { useEffect, useState } from "react";

interface StartPlaceFormProps {
  initialData: Reservation;
  reservationId: string;
}

const formSchema = z.object({
  startPlace: z
    .string()
    .min(1, {
      message: "Le lieu de départ est requis",
    })
    .max(100, {
      message: "Le lieu de départ ne peut pas dépasser 100 caractères",
    }),
});

export const StartPlaceForm = ({
  initialData,
  reservationId,
}: StartPlaceFormProps) => {
  const [citiesInMorocco, setCitiesInMorocco] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startPlace: initialData?.startPlace || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/reservations/user/${reservationId}`, values);
      toast.success("Lieu de retraite mis à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/refs/heads/master/countries.json"
      )
      .then((response) => {
        const countriesAndCities = response.data;
        const moroccoCities = countriesAndCities["Morocco"]; // Get cities for Morocco
        setCitiesInMorocco(moroccoCities || []); // In case there are no cities listed for Morocco
      })
      .catch((error) => {
        console.error("Error fetching country and city data:", error);
      });
  }, []);

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-4 items-end"
        >
          <FormField
            control={form.control}
            name="startPlace"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Lieu de retraite</FormLabel>
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
          <div className="flex items-center">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
