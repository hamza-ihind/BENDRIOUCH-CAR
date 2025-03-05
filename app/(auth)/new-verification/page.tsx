import React, { Suspense } from "react";
import NewVerificationForm from "@/components/auth/NewVerificationForm";

const page = () => {
  return (
    <div className="h-full w-full flex justify-center items-end mt-32">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default page;
