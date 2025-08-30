"use client";

import React, { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { FormError } from "@/components/uicomps/form-error";
import { FormSuccess } from "@/components/uicomps/form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerTitle="Vérification"
      headerLabel="Vérification de votre e-mail de confirmation"
      backButtonHref="/sign-in"
      backButtonLabel="Se reconnecter"
    >
      {!success && !error && (
        <div className="w-full flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Vérification de votre email en cours...
          </p>
        </div>
      )}
      <FormSuccess message={success} />
      <FormError message={error} />
    </CardWrapper>
  );
};

export default NewVerificationForm;
