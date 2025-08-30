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
import { Car, Plus, ArrowLeft } from "lucide-react";

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
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ajouter une Nouvelle Voiture
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Commencez par donner un nom à votre véhicule
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/admin/cars" className="hover:text-yellow-500 transition-colors">
            Gestion des voitures
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Nouvelle voiture</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Informations de base
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Donnez un nom à votre véhicule pour commencer
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-2xl space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-900 dark:text-white">
                      Nom du véhicule
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="ex: Toyota Corolla 2024"
                        className="h-12 text-lg border-gray-300 dark:border-gray-600 focus:border-yellow-400 dark:focus:border-yellow-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 dark:text-gray-400">
                      Choisissez un nom descriptif pour identifier facilement ce véhicule
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4 pt-6">
                <Link href="/admin/cars">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 px-6 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-800"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  {isSubmitting ? "Création..." : "Créer la voiture"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
              Prochaines étapes
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              Après avoir créé votre voiture, vous pourrez ajouter des détails comme les photos,
              le prix, les caractéristiques techniques et la disponibilité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
