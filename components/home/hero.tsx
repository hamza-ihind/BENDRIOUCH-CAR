"use client";

import React from "react";
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

export const HeroSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  flightNumber: z
    .string()
    .min(1, { message: "Veuillez saisir votre numéro de vol" }),
});

const Hero: React.FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof HeroSchema>>({
    resolver: zodResolver(HeroSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      flightNumber: "",
    },
  });

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
    <div className="bg-white dark:bg-gray-900 h-full flex items-center justify-between gap-24">
      <div className="flex flex-col gap-4 flex-1">
        <Badge variant={"secondary"} className="w-fit">
          Location des voitures chez becndriouch Cars
        </Badge>
        <h1 className="text-6xl font-bold">Cherchez votre voiture préféré</h1>
        <p className="text-gray-500 text-base w-[75%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
          commodi illum reprehenderit ratione sapiente exercitationem tenetur,
          saepe autem modi aperiam doloremque, magnam sit vitae rerum aut
          repellendus voluptate qui voluptatibus.
        </p>
      </div>

      <CardWrapper
        headerTitle="Reservation"
        headerLabel="Réserver votre voiture aujourd'hui"
        backButtonHref="/cars"
        backButtonLabel="Voir des voitures ?"
        className="flex-1 h-fit min-w-[550px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormLabel className="text-base">Date de retour</FormLabel>
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

            <Button type="submit" className="w-full self-end justify-self-end">
              Confirmer
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default Hero;
