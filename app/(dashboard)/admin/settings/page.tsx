"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import DashboardTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Spotlight } from "@/components/ui/spotlight";
import PersonalInfoForm from "./_components/personal-info-form";
import SectionTitle from "./_components/section-title";
import { Separator } from "@/components/ui/separator";
import PasswordForm from "./_components/password-form";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { PassportForm } from "./_components/passport-form";
import { PermisForm } from "./_components/permis-form";
import { Settings, Shield, User, Lock } from "lucide-react";

const page = () => {
  const user = useCurrentUser();

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profil Administrateur
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez vos informations personnelles et paramètres de sécurité
            </p>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-purple-800 dark:text-purple-200 text-lg">
                Accès Administrateur
              </h3>
              <p className="text-purple-700 dark:text-purple-300">
                Vous avez des privilèges administrateur sur cette plateforme
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Informations personnelles
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Mettez à jour votre photo et vos informations personnelles
              </p>
            </div>
          </div>
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
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Sécurité du compte
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Modifiez votre mot de passe pour sécuriser votre compte administrateur
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <PasswordForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default page;
