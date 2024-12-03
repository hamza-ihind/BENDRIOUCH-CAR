import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return {
              id: user.id,
              role: user.role ?? "USER",
              email: user.email ?? "",
              country: user.country ?? undefined,
              city: user.city ?? undefined,
              birthday: user.birthday ?? undefined,
              phone: user.phone ?? undefined,
              firstName: user.firstName ?? undefined,
              lastName: user.lastName ?? undefined,
              emailVerified: user.emailVerified ?? undefined,
              isTwoFactorEnabled: user.isTwoFactorEnabled,
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
