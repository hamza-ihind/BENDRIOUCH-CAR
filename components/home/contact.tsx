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
    <section id="contact" className="page-config max-sm:px-8 md:px-12 lg:px-48 full-width-section bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-800">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-6">
            <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">Contactez-nous</span>
          </div>
          <h2 className="mb-6 font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Nous serions ravis de{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              vous aider
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Discutons de la façon dont nous pouvons répondre à vos besoins de location de voiture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Contact Form */}
          <div className="contact-form">
            <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Remplissez le formulaire
            </h3>

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

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Autres moyens de nous contacter
              </h3>
              <p className="text-gray-600 dark:text-neutral-300 mb-8">
                Préférez-vous nous contacter directement ? Voici nos coordonnées.
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoItem
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                details="contact@bendriouchcar.com"
                link="mailto:contact@bendriouchcar.com"
              />
              <ContactInfoItem
                icon={<Phone className="w-6 h-6" />}
                title="Téléphone"
                details="+212 528 12 34 56"
                link="tel:+212528123456"
              />
              <ContactInfoItem
                icon={<MapPin className="w-6 h-6" />}
                title="Adresse"
                details="Avenue Mohammed V, Agadir, Maroc"
                link="https://maps.google.com/?q=Avenue+Mohammed+V,+Agadir,+Maroc"
              />
            </div>
          </div>
        </div>
    </section>
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
