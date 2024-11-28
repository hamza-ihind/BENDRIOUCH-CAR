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
      username?: string;
      phone?: string;
      bio?: string;
      image?: string;
      email?: string;
    };
  }

  interface User {
    id: string;
    role?: UserRole;
    firstName?: string;
    lastName?: string;
    username?: string;
    phone?: string;
    bio?: string;
    image?: string;
    email?: string;
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
