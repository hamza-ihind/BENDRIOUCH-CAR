import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className="w-full text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {label}
      </p>
      <Button
        variant="outline"
        className="w-full border-gray-300 dark:border-gray-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300"
        asChild
      >
        <Link href={href} className="font-medium">
          {href.includes('sign-in') ? 'Se connecter' :
           href.includes('sign-up') ? "S'inscrire" :
           href.includes('reset') ? 'Réinitialiser' : 'Continuer'}
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
