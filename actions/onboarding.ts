"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { OnboardingSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const onboard = async (values: z.infer<typeof OnboardingSchema>) => {
  const validatedFields = OnboardingSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, image, firstName, lastName, username, phone, bio } =
    validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User Not Found!" };
  }

  await db.user.update({
    where: {
      id: existingUser?.id,
    },
    data: {
      username,
      firstName,
      lastName,
      image,
      phone,
      bio,
    },
  });

  return { success: "Informations updated!" };
};
