import React, { Suspense } from "react";
import NewVerificationForm from "@/components/auth/NewVerificationForm";

const page = () => {
  return (
    <div className="page-centered">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default page;
