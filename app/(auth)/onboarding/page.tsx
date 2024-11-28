import OnboardingForm from "@/components/auth/OnboardingForm";
import React from "react";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  return (
    <main className="w-full flex justify-evenly items-center mb-20">
      <OnboardingForm />
    </main>
  );
};

export default page;
