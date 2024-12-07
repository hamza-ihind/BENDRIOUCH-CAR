"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { useState } from "react";

const formSchema = z.object({
  flightNumber: z.string().min(1, {
    message: "Le numéro de vol est requis",
  }),
  startDate: z.string().min(1, {
    message: "La date de début est requise",
  }),
  endDate: z.string().min(1, {
    message: "La date de fin est requise",
  }),
});

const ReservationPage = () => {
  const router = useRouter();

  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightNumber: "",
      startDate: "",
      endDate: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/reservations", values);
      toast.success("Réservation effectuée avec succès");
    } catch (error) {
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
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Choisissez la date de début de la location.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date Field */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Choisissez la date de fin de la location.
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
            <Button type="button" onClick={handleSelectCar}>
              Choisir une voiture
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continuer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReservationPage;
