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

const page = () => {
  const user = useCurrentUser();

  return (
    <div className="w-full z-20 flex flex-col p-16 max-md:px-4 max-md:py-28">
      <DashboardPageTitle
        title="Mon Profil"
        description="Gérez et mettez à jour vos informations personnelles ici."
      />
      <Separator />
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Informations personnelles"
          description="Mettez à jour votre photo et vos informations personnelles"
        />
        <PersonalInfoForm currentUser={user} />
      </div>
      <Separator />
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Permis de conduire"
          description="Mettez à jour votre permis de conduire"
        />
        <PermisForm currentUser={user} />
      </div>
      <Separator />
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-24 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Passeport"
          description="Mettez à jour votre passeport"
        />
        <PassportForm currentUser={user} />
      </div>
      <Separator />
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
