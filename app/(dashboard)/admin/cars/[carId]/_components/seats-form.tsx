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

const formSchema = z.object({
  seats: z.number(),
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
    <div className="w-full">
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
}
