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
import { Input } from "@/components/ui/input";
import { Car } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

// Zod schema with validation for non-negative numbers
const formSchema = z.object({
  seats: z.coerce
    .number()
    .min(0, { message: "Le nombre de sièges ne peut pas être négatif" })
    .nonnegative({ message: "Le nombre de sièges ne peut pas être négatif" }),
});

interface SeatsFormProps {
  carId: string;
  initialData: Car;
}

export function SeatsForm({ carId, initialData }: SeatsFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seats: initialData?.seats || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/cars/${carId}`, values);
      toast.success("Le nombre de sièges de la voiture a été mis à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur est survenue !");
    }
  };

  return (
    <div className="w-[720px] max-md:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-4 items-end"
        >
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Sièges de la voiture</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="9"
                    min={0} // Ensure the input doesn't accept negative numbers
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      // Ensure the value is not negative
                      if (value >= 0) {
                        field.onChange(value);
                      }
                    }}
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
}
