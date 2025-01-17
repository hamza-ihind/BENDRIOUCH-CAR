"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SectionTitle from "../../../settings/_components/section-title";
import PersonalInfoForm from "../../../settings/_components/personal-info-form";

const page = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = user !== null;
  const isOnboarded = user?.isOnboarded ?? false;

  const isAllFieldsCompleted =
    user?.firstName &&
    user?.lastName &&
    user?.phone &&
    user?.city &&
    user?.country &&
    user?.birthday;

  // If not authenticated, redirect to the sign-up page
  if (!isAuthenticated) {
    router.push("/signup");
    return null;
  }

  // If the user is authenticated but not onboarded
  if (isAuthenticated && !isOnboarded) {
    // Function to handle the onboarding process
    const handleOnboarding = async () => {
      setIsSubmitting(true);

      try {
        user.isOnboarded = true;

        setIsSubmitting(false);
      } catch (error) {
        console.error("Failed to update user profile:", error);
        setIsSubmitting(false);
      }
    };

    return (
      <div>
        {/* Conditional Message */}
        <div className="mt-4 p-4 border rounded-md bg-yellow-100 border-yellow-300 text-yellow-800">
          <h3 className="font-semibold text-lg">
            Complétez vos informations pour pouvoir continuer.
          </h3>
          <p>
            Vous devez remplir tous les champs requis avant de pouvoir continuer
            à la prochaine étape de votre réservation.
          </p>
        </div>

        <PersonalInfoForm currentUser={user} />

        {/* Continue Button */}
        <div className="mt-6">
          <button
            disabled={!isAllFieldsCompleted || isSubmitting}
            onClick={handleOnboarding}
            className={`btn ${
              isAllFieldsCompleted ? "btn-primary" : "btn-disabled"
            }`}
          >
            {isSubmitting ? "Enregistrement..." : "Continuer"}
          </button>
        </div>
      </div>
    );
  }

  // If the user is authenticated and already onboarded
  if (isAuthenticated && isOnboarded) {
    return (
      <div className="mt-8 p-4 border rounded-md bg-green-100 border-green-300 text-green-800">
        <h3 className="font-semibold text-lg">Vous êtes déjà onboardé !</h3>
        <p>
          Vous avez déjà complété toutes vos informations. Vous pouvez
          maintenant passer à la prochaine étape.
        </p>
        <div className="mt-6">
          <button className="btn btn-primary">Passer à l'étape suivante</button>
        </div>
      </div>
    );
  }

  return null;
};

export default page;
