"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/uicomps/form-error";
import { FormSuccess } from "@/components/uicomps/form-success";
import { Textarea } from "../ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

// Define the validation schema using Zod
const ContactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  details: z.string().min(1, "Please provide some details"),
});

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  link?: string;
}

type ContactFormData = z.infer<typeof ContactSchema>;

const ContactForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      details: "",
    },
  });

  const onSubmit = (values: ContactFormData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // Simulate submitting the form (you can replace this with your actual submit logic)
      setTimeout(() => {
        if (values.firstName === "error") {
          setError("Something went wrong");
        } else {
          setSuccess("Your message has been sent!");
        }
        form.reset();
      }, 1000);
    });
  };

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Contactez-nous
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Nous serions ravis de discuter de la façon dont nous pouvons vous
            aider.
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-lg mx-auto">
        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 dark:border-neutral-700">
          <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
            Remplissez le formulaire
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Jean"
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
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Dupont"
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
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="jean.dupont@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="+123456789"
                          type="tel"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Détails</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Veuillez décrire votre demande"
                          rows={4}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Envoi en cours..." : "Envoyer la demande"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        <ContactInfoItem
          icon={<Mail className="w-5 h-5" />}
          title="Email"
          details="contact@example.com"
          link="mailto:contact@example.com"
        />
        <ContactInfoItem
          icon={<Phone className="w-5 h-5" />}
          title="Téléphone"
          details="+33 1 23 45 67 89"
          link="tel:+33123456789"
        />
        <ContactInfoItem
          icon={<MapPin className="w-5 h-5" />}
          title="Adresse"
          details="123 Avenue des Champs-Élysées, Paris"
          link="https://maps.google.com/?q=123+Avenue+des+Champs-Élysées,+Paris"
        />
      </div>
    </div>
  );
};

const ContactInfoItem = ({
  icon,
  title,
  details,
  link,
}: ContactInfoItemProps) => (
  <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover-scale">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="font-medium text-lg mb-2">{title}</h3>
    {link ? (
      <a
        href={link}
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        {details}
      </a>
    ) : (
      <p className="text-muted-foreground">{details}</p>
    )}
  </div>
);

export default ContactForm;
