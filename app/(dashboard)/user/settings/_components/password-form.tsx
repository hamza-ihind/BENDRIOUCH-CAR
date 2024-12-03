import { changePassword } from "@/actions/change-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/uicomps/form-error";
import { FormSuccess } from "@/components/uicomps/form-success";
import { PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PasswordForm = ({ user }: { user: any }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
    startTransition(() => {
      changePassword(values)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => setError("something went wrong!"));
    });

    router.refresh();
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                <FormLabel>Current password</FormLabel>
                <FormControl className="w-auto">
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Current password..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                <FormLabel>New Password</FormLabel>
                <FormControl className="w-auto">
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="new password..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4 items-center">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl className="w-auto">
                  <Input
                    {...field}
                    placeholder="Confirm password..."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-fit self-end justify-self-end">
            Confirmer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;
