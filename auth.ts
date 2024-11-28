import { getUserById } from "./data/user";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";

import { PrismaClient, UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign-in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Ensure role is properly typed as UserRole
      if (
        token.role &&
        Object.values(UserRole).includes(token.role as UserRole)
      ) {
        session.user.role = token.role as UserRole;
      } else {
        session.user.role = "USER"; // Replace "USER" with a default role if applicable
      }

      // Fetch user profile from Prisma
      const userProfile = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
          bio: true,
          image: true,
          phone: true,
          role: true,
          username: true,
          lastName: true,
          firstName: true,
        },
      });

      session.user = {
        ...session.user,
        bio: userProfile?.bio || undefined,
        phone: userProfile?.phone || undefined,
        role: userProfile?.role || "USER",
        username: userProfile?.username || undefined,
        firstName: userProfile?.firstName || undefined,
        lastName: userProfile?.lastName || undefined,
        image: userProfile?.image || undefined,
      };

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
