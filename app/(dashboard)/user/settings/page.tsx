"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Separator } from "@/components/ui/separator";
import PersonalInfoForm from "./_components/personal-info-form";
import SectionTitle from "./_components/section-title";
import PasswordForm from "./_components/password-form";
import { PassportForm } from "./_components/passport-form";
import { PermisForm } from "./_components/permis-form";
import { Settings, CheckCircle, AlertCircle } from "lucide-react";

const page = () => {
  const user = useCurrentUser();

  const isUserOnboarded = user?.isOnboarded;

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mon Profil
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez et mettez à jour vos informations personnelles ici.
            </p>
          </div>
        </div>

        {/* Status Notice */}
        <div
          className={`p-6 rounded-xl border-2 ${
            isUserOnboarded
              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800"
              : "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isUserOnboarded
                ? "bg-green-500"
                : "bg-yellow-500"
            }`}>
              {isUserOnboarded ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <AlertCircle className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg mb-2 ${
                isUserOnboarded
                  ? "text-green-800 dark:text-green-200"
                  : "text-yellow-800 dark:text-yellow-200"
              }`}>
                {isUserOnboarded
                  ? "Profil Complet ✨"
                  : "Complétez votre profil"}
              </h3>
              <p className={`leading-relaxed ${
                isUserOnboarded
                  ? "text-green-700 dark:text-green-300"
                  : "text-yellow-700 dark:text-yellow-300"
              }`}>
                {isUserOnboarded
                  ? "Excellent ! Toutes vos informations sont à jour. Vous êtes prêt à effectuer une réservation de voiture."
                  : "Pour pouvoir effectuer une réservation, veuillez compléter votre photo, permis de conduire, passeport et mot de passe."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Informations personnelles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Mettez à jour votre photo et vos informations personnelles
          </p>
        </div>
        <div className="p-6">
          <PersonalInfoForm currentUser={user} />
        </div>
      </div>

      {/* Permis de conduire Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Permis de conduire
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Mettez à jour votre permis de conduire
          </p>
        </div>
        <div className="p-6">
          <PermisForm currentUser={user} />
        </div>
      </div>

      {/* Passeport Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Passeport
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Mettez à jour votre passeport
          </p>
        </div>
        <div className="p-6">
          <PassportForm currentUser={user} />
        </div>
      </div>

      {/* Mot de passe Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Mot de passe
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Veuillez entrer votre mot de passe actuel pour changer votre mot de passe
          </p>
        </div>
        <div className="p-6">
          <PasswordForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default page;
