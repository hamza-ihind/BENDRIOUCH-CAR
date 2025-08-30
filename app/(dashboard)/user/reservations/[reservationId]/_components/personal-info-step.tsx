"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, User, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Schema de validation pour les informations personnelles
const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(10, { message: "Le numéro de téléphone doit contenir au moins 10 chiffres" }),
  birthday: z.date({ required_error: "La date de naissance est requise" }),
  country: z.string().min(1, { message: "Le pays est requis" }),
  city: z.string().min(1, { message: "La ville est requise" }),
});

const PersonalInfoStep = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [countriesAndCities, setCountriesAndCities] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      birthday: user?.birthday || new Date(),
      country: user?.country || "",
      city: user?.city || "",
    },
  });

  const { isSubmitting } = form.formState;

  // Charger les pays et villes
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/refs/heads/master/countries.json"
    )
      .then((result) => result.json())
      .then((data) => {
        setCountriesAndCities(data);
        if (user?.country) {
          setSelectedCountry(user.country);
        }
      })
      .catch((err) => console.error(err));
  }, [user?.country]);

  // Vérifier si l'utilisateur est déjà onboardé
  const isUserOnboarded = user?.isOnboarded || isOnboardingComplete;

  // Vérifier si tous les champs requis sont remplis
  const isAllFieldsCompleted =
    user?.firstName &&
    user?.lastName &&
    user?.email &&
    user?.phone &&
    user?.city &&
    user?.country &&
    user?.birthday;

  // Fonction pour soumettre les informations personnelles
  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    try {
      // Mettre à jour les informations utilisateur via l'API existante
      await axios.patch("/api/users", {
        ...values,
        // L'API /api/users calcule automatiquement isOnboarded basé sur les champs remplis
        // mais nous pouvons aussi le forcer à true
      });

      toast.success("Profil complété avec succès ! Vous pouvez maintenant continuer.");
      setIsOnboardingComplete(true);
      router.refresh();
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast.error("Une erreur s'est produite lors de la mise à jour");
    }
  };

  // Si l'utilisateur est déjà onboardé, afficher le message de confirmation
  if (isUserOnboarded) {
    return (
      <div className="w-full space-y-6">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Informations Complètes !
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Vos informations personnelles sont complètes. Vous pouvez maintenant continuer votre réservation.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Profil vérifié et complet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas onboardé, afficher le formulaire
  return (
    <div className="w-full space-y-6">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Informations Personnelles
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Complétez vos informations pour continuer votre réservation
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Message d'information */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  Complétez votre profil
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Remplissez tous les champs requis pour valider votre compte et continuer votre réservation.
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Prénom *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Votre prénom"
                          className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Nom *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Votre nom"
                          className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email et Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="votre@email.com"
                          type="email"
                          className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Téléphone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="+212 6XX XXX XXX"
                          className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date de naissance */}
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                      Date de naissance *
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 pl-3 text-left font-normal border-gray-300 dark:border-gray-600 hover:border-yellow-400",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Sélectionner une date</span>
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
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pays et Ville */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Pays *
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCountry(value);
                          form.setValue("city", ""); // Reset city when country changes
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400">
                            <SelectValue placeholder="Sélectionnez un pays" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(countriesAndCities).map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                        Ville *
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 border-gray-300 dark:border-gray-600 focus:border-yellow-400">
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedCountry && countriesAndCities[selectedCountry] ? (
                            countriesAndCities[selectedCountry].map((city: string, index: number) => (
                              <SelectItem key={index} value={city}>
                                {city}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-country-selected" disabled>
                              Sélectionnez d'abord un pays
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bouton de soumission */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Enregistrement...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Valider et continuer
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
