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
import { useRouter, redirect } from "next/navigation";

const formSchema = z.object({
  transmission: z.enum(["Automatic", "Manual"], {
    required_error: "Please select a transmission type.",
  }),
});

interface TransmissionFieldProps {
  initialData: Car;
  carId: string;
}

export function TransmissionForm({
  carId,
  initialData,
}: TransmissionFieldProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transmission: initialData?.transmission || "Manual",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/cars/${carId}`, values);
      toast.success("Voiture mise à jour");
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
          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Type de transmission</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Automatic" />
                      </FormControl>
                      <FormLabel className="font-normal">Automatic</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Manual" />
                      </FormControl>
                      <FormLabel className="font-normal">Manual</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Enregistrer</Button>
        </form>
      </Form>
    </div>
  );
}
