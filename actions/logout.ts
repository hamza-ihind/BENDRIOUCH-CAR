// "use server" import indicates server-side code in Next.js
import { signOut as NextAuthSignOut } from "next-auth/react";
import { signOut as AuthSignOut } from "@/auth"; // If needed for additional functionality

export const logout = async () => {
  await NextAuthSignOut({
    callbackUrl: "/",
  });
  await AuthSignOut();
};
