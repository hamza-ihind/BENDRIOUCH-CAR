import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      firstName?: string;
      lastName?: string;
      phone?: string;
      image?: string;
      permis?: string;
      passport?: string;
      email?: string;
      birthday?: Date;
      city?: string;
      country?: string;
      isOnboarded?: boolean;
    };
  }

  interface User {
    id: string;
    role?: UserRole;
    firstName?: string;
    lastName?: string;
    phone?: string;
    image?: string;
    permis?: string;
    passport?: string;
    email?: string;
    birthday?: Date;
    city?: string;
    country?: string;
    isOnboarded?: boolean;
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
