"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the form schema for category
const formSchema = z.object({
  category: z.enum(["CITADINE", "BERLINE", "FOUR_BY_FOUR", "LUXE"], {
    required_error: "Veuillez sélectionner une catégorie.",
  }),
});

interface CategoryFormProps {
  carId: string;
  initialData: Car;
}

export function CategoryForm({ carId, initialData }: CategoryFormProps) {
  const router = useRouter();

  // Initialize the form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category as
        | "CITADINE"
        | "BERLINE"
        | "FOUR_BY_FOUR"
        | "LUXE"
        | undefined,
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/cars/${carId}`, values);
      toast.success("Catégorie mise à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-4 items-end justify-between"
        >
          {/* Category Radio Group */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Catégorie</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {/* CITADINE */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="CITADINE" />
                      </FormControl>
                      <FormLabel className="font-normal">Citadine</FormLabel>
                    </FormItem>

                    {/* BERLINE */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BERLINE" />
                      </FormControl>
                      <FormLabel className="font-normal">Berline</FormLabel>
                    </FormItem>

                    {/* FOUR_BY_FOUR */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="FOUR_BY_FOUR" />
                      </FormControl>
                      <FormLabel className="font-normal">4x4</FormLabel>
                    </FormItem>

                    {/* LUXE */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="LUXE" />
                      </FormControl>
                      <FormLabel className="font-normal">Luxe</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Enregistrer</Button>
        </form>
      </Form>
    </div>
  );
}
