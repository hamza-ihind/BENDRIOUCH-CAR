import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const Signup = () => {
  return (
    <main className="w-full flex justify-evenly items-center max-xl:flex-col max-xl:gap-16 mb-20">
      <RegisterForm />
    </main>
  );
};

export default Signup;
