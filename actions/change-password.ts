"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import * as z from "zod";
import { PasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { hash, compare } from "bcryptjs";

export const changePassword = async (
  values: z.infer<typeof PasswordSchema>
) => {
  try {
    const session = await auth();
    const user = session?.user;
    console.log("HELLO");
    const validatedFields = PasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { confirmPassword, currentPassword, newPassword } =
      validatedFields.data;

    if (newPassword !== confirmPassword) {
      return { error: "New password and confirm password do not match!" };
    }

    const existingUser = await getUserByEmail(user?.email!);

    if (!existingUser) {
      return { error: "User Not Found!" };
    }

    const isPasswordValid = await compare(
      currentPassword,
      existingUser?.password!
    );
    if (!isPasswordValid) {
      return { error: "Current password is incorrect" };
    }

    const hashedPassword = await hash(newPassword, 10);
    await db.user.update({
      where: { email: user?.email! },
      data: { password: hashedPassword },
    });

    return { success: "Password updated successfully" };
  } catch (error) {
    return { error: "Failed to update password" };
  }
};
