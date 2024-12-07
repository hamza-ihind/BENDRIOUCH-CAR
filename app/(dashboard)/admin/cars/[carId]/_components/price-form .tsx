"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";

interface PriceFormProps {
  initialData: Car;
  carId: string;
}

const formSchema = z.object({
  pricePerDay: z.coerce
    .number()
    .min(0, { message: "Le prix par jour est requis" }),
});

export const PriceForm = ({ initialData, carId }: PriceFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pricePerDay: initialData?.pricePerDay || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/cars/${carId}`, values);
      toast.success("Le prix de location de la voiture a été mis à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur est survenue !");
    }
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-4 items-end"
        >
          <FormField
            control={form.control}
            name="pricePerDay"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Prix de location</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    disabled={isSubmitting}
                    placeholder="Définir le prix par jour"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
};
