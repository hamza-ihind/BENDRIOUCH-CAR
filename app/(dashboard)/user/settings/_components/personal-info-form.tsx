"use client";

import { onboard } from "@/actions/onboarding";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, isBase64Image } from "@/lib/utils";
import { OnboardingSchema } from "@/schemas";
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

const PersonalInfoForm = ({ user }: { user: any }) => {
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

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      email: user?.email || "",
      image: user?.image || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      country: user?.country || "",
      city: user?.city || "",
      birthday: user?.birthday || Date.now(),
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

  // Update cities when country is selected
  useEffect(() => {
    if (selectedCountry && countriesAndCities[selectedCountry]) {
      setCities(countriesAndCities[selectedCountry]);
    } else {
      setCities([]);
    }
  }, [selectedCountry, countriesAndCities]);

  const onSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);
    // if (hasImageChanged) {
    //   const imgRes = await startUpload(files);
    //   if (imgRes && imgRes[0].fileUrl) {
    //     values.image = imgRes[0].fileUrl;
    //   }
    // }
    startTransition(() => {
      onboard(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => setError("something went wrong!"));
    });

    router.refresh();
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-6"
        >
          <div className="W-full space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <ProfileImage
                  value={field.value}
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Prénom</FormLabel>
                  <FormControl className="w-auto">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Votre prénom..."
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
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Nom</FormLabel>
                  <FormControl className="w-auto">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Votre nom..."
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
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Email</FormLabel>
                  <FormControl className="w-auto">
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl className="w-auto">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Votre numéro de téléphone..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Pays</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCountry(value); // Set selected country
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-auto">
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

            {/* City Dropdown */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Ville</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={cities.length === 0}
                  >
                    <FormControl className="w-auto">
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
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                  <FormLabel>Date de naissance</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-auto">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-left font-normal",
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
