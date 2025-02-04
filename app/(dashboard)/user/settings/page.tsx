"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Separator } from "@/components/ui/separator";
import PersonalInfoForm from "./_components/personal-info-form";
import SectionTitle from "./_components/section-title";
import PasswordForm from "./_components/password-form";
import { PassportForm } from "./_components/passport-form";
import { PermisForm } from "./_components/permis-form";

const page = () => {
  const user = useCurrentUser();

  const isUserOnboarded = user?.isOnboarded;

  return (
    <div className="w-full z-20 flex flex-col p-16 max-md:px-4 max-md:py-28">
      <DashboardPageTitle
        title="Mon Profil"
        description="Gérez et mettez à jour vos informations personnelles ici."
      />

      {/* Conditional Notice Section */}
      <div
        className={`mt-4 p-4 border rounded-md ${
          isUserOnboarded
            ? "bg-green-100 border-green-300 text-green-800"
            : "bg-yellow-100 border-yellow-300 text-yellow-800"
        }`}
      >
        <h3 className="font-semibold text-lg">
          {isUserOnboarded
            ? "Vous êtes onboardé et pouvez maintenant faire une réservation !"
            : "Complétez vos informations pour réserver une voiture"}
        </h3>
        <p>
          {isUserOnboarded
            ? "Toutes vos informations sont à jour. Vous êtes prêt à effectuer une réservation de voiture."
            : "Afin de pouvoir effectuer une réservation, vous devez mettre à jour votre photo, votre permis de conduire, votre passeport et votre mot de passe. Assurez-vous que toutes les informations sont à jour pour valider votre réservation."}
        </p>
      </div>

      <Separator />

      {/* Personal Information Section */}
      <div className="w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Informations personnelles"
          description="Mettez à jour votre photo et vos informations personnelles"
        />
        <PersonalInfoForm currentUser={user} />
      </div>

      <Separator />

      {/* Permis de conduire Section */}
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Permis de conduire"
          description="Mettez à jour votre permis de conduire"
        />
        <PermisForm currentUser={user} />
      </div>

      <Separator />

      {/* Passeport Section */}
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Passeport"
          description="Mettez à jour votre passeport"
        />
        <PassportForm currentUser={user} />
      </div>

      <Separator />

      {/* Mot de passe Section */}
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Mot de passe"
          description="Veuillez entrer votre mot de passe actuel pour changer votre mot de passe"
        />
        <PasswordForm user={user} />
      </div>
    </div>
  );
};

export default page;
