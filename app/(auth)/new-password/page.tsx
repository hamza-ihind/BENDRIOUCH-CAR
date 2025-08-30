import NewPasswordForm from "@/components/auth/newPasswordForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
};

export default page;
