import NewPasswordForm from "@/components/auth/newPasswordForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="page-centered">
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
};

export default page;
