"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import Social from "@/components/auth/Social";
import BackButton from "@/components/auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  headerLabel: string;
  headerTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  className,
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>

      <Card className={`relative z-10 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden ${className}`}>
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 border-b border-gray-100 dark:border-neutral-800 p-8">
          <Header title={headerTitle} label={headerLabel} />
        </CardHeader>

        <CardContent className="p-8">
          {children}
        </CardContent>

        {showSocial && (
          <CardFooter className="px-8 pb-6">
            <Social />
          </CardFooter>
        )}

        <CardFooter className="bg-gray-50 dark:bg-neutral-800/50 border-t border-gray-100 dark:border-neutral-800 p-6">
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </Card>
    </div>
  );
};
