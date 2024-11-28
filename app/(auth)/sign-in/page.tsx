import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const Signin = () => {
  return (
    <main className="w-full flex justify-evenly items-center max-xl:flex-col max-xl:gap-16 mb-20">
      <LoginForm />
    </main>
  );
};

export default Signin;
