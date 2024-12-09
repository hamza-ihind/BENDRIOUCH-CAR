"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { cn, isBase64Image } from "@/lib/utils";
import { PersonalInfoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { FormError } from "@/components/uicomps/form-error";
import { FormSuccess } from "@/components/uicomps/form-success";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfileImage from "@/components/auth/profile-image";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

import { useCurrentUser } from "@/hooks/use-current-user";

const PersonalInfoForm = ({ currentUser }: { currentUser: any }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { handleImage, files } = useImageUpload();
  const { startUpload } = useUploadThing("media");
  const [countriesAndCities, setCountriesAndCities] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      image: currentUser?.image || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      city: currentUser?.city || "",
      country: currentUser?.country || "",
      birthday: currentUser?.birthday || new Date(),
    },
  });

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/refs/heads/master/countries.json"
    )
      .then((result) => result.json())
      .then((data) => {
        setCountriesAndCities(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCountry && countriesAndCities[selectedCountry]) {
      setCities(countriesAndCities[selectedCountry]);
    } else {
      setCities([]);
    }
  }, [selectedCountry, countriesAndCities]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof PersonalInfoSchema>) => {
    try {
      await axios.patch(`/api/users`, values);
      toast.success("Informations mise à jour");
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Prénom</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Votre prénom..."
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
              <FormItem className="w-full">
                <FormLabel className="text-xl">Nom</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Votre nom..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Votre Email"
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
              <FormItem className="w-full">
                <FormLabel className="text-xl">Téléphone</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Votre téléphone..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel className="text-xl">Date de naissance</FormLabel>
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
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Pays</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCountry(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionnez un pays" />
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl">Ville</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={cities.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionnez une ville" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-fit self-end justify-self-end">
            Confirmer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
