"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import DashboardTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Spotlight } from "@/components/ui/spotlight";
import PersonalInfoForm from "./_components/personal-info-form";
import SectionTitle from "./_components/section-title";
import { Separator } from "@/components/ui/separator";
import PasswordForm from "./_components/password-form";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";

const page = () => {
  const user = useCurrentUser();

  return (
    <div className="w-full z-20 flex flex-col p-12">
      <DashboardPageTitle
        title="Mon Profil"
        description="Gérez et mettez à jour vos informations personnelles ici."
      />
      <Separator />
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Personal Information"
          description="Update your photo and personal details"
        />
        <PersonalInfoForm user={user} />
      </div>
      <Separator />
      <div className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-2xl:grid-cols-1 max-2xl:space-x-0 max-2xl:space-y-4">
        <SectionTitle
          title="Password"
          description="Please enter your current password to change your password"
        />
        <PasswordForm user={user} />
      </div>
    </div>
  );
};

export default page;
