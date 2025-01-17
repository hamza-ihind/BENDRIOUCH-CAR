"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Le modèle de la voiture est requis",
  }),
});

const page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/cars", values);
      router.push(`/admin/cars/${response.data.id}`);
      toast.success("Voiture ajoutée avec succès");
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div className="w-full h-[100vh] justify-center items-center max-xl:items-start z-20 flex flex-col max-md:px-4">
      <div className="flex items-start flex-col">
        <h1 className="text-6xl font-bold dark:text-white text-black max-xl:text-5xl">
          Nommez votre voiture
        </h1>
        <p className="p-text max-xl:text-left">
          Comment souhaitez-vous nommer votre voiture ?
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[560px] max-xl:w-full space-y-8 mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modèle de la voiture</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Toyota Corolla'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Quel modèle de voiture souhaitez-vous ajouter ?
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
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continuer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
