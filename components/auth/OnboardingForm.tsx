"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, ChangeEvent, useTransition, useEffect } from "react";
import { CardWrapper } from "./CardWrapper";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { FormError } from "@/components/uicomps/form-error";
import { FormSuccess } from "@/components/uicomps/form-success";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { onboard } from "@/actions/onboarding";
import { useUploadThing } from "@/lib/uploadthing";
import { useForm } from "react-hook-form";
import { OnboardingSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { cn, isBase64Image } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Car } from "lucide-react";
import { Countries } from "@/components/database/countries.js";
import { MoroccanCities } from "@/components/database/cities.js";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import Link from "next/link";

const OnboardingForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [countriesAndCities, setCountriesAndCities] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();
  const user = useCurrentUser();

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

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      email: user?.email || "",
      image: user?.image || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      city: user?.city || "",
      country: user?.country || "",
      birthday: user?.birthday || new Date(),
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);
    startTransition(() => {
      onboard(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => setError("something went wrong!"));
    });
  };

  return (
    <div className="w-[720px] max-md:w-full !important border border-color p-6 rounded-xl">
      <DashboardPageTitle
        title="Onboarding Form"
        description="this is a description"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <div className="space-y-4">
            {/* Image Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="account-form_image-label">
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="profile photo"
                        width={96}
                        height={96}
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/assets/profile.svg"
                        alt="profile photo"
                        width={24}
                        height={24}
                        priority
                        className="object-contain"
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1 text-base1-semibold text-gray-200">
                    <Input
                      type="file"
                      placeholder="Upload a photo"
                      accept="image/*"
                      className="account-form_image-input"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Personal Details Fields */}
            <div className="w-full flex max-sm:flex-col gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-[50%] max-sm:w-full">
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
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
                  <FormItem className="w-[50%] max-sm:w-full">
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
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
            </div>

            {/* Additional Info */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Votre email..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex gap-4 max-sm:flex-col">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-[50%] max-sm:w-full">
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Votre téléphone..."
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
                  <FormItem className="w-[50%] max-sm:w-full flex flex-col justify-end">
                    <FormLabel>Date de naissance</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
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

            {/* New Fields for City, Country (Dropdowns) */}
            <div className="w-full flex gap-4 max-sm:flex-col">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-[50%] max-sm:w-full">
                    <FormLabel>Pays</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value); // Set selected country
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

              {/* City Dropdown */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-[50%] max-sm:w-full">
                    <FormLabel>Ville</FormLabel>
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
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="w-full flex gap-4 max-sm:flex-col">
              <Link href={"/"} className="w-full">
                <Button variant={"secondary"} className="w-full">
                  Aller à la page principale
                </Button>
              </Link>
              <Button type="submit" className="w-full">
                Confirmer
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingForm;
