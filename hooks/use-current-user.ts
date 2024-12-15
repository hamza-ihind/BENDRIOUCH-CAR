import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data: session } = useSession();

  if (!session) return null;

  return {
    id: session.user?.id,
    role: session.user?.role,
    firstName: session.user?.firstName,
    lastName: session.user?.lastName,
    phone: session.user?.phone,
    email: session.user?.email,
    image: session.user?.image,
    permis: session.user?.permis,
    passport: session.user?.passport,
    birthday: session.user?.birthday,
    country: session.user?.country,
    city: session.user?.city,
    isOnboarded: session.user?.isOnboarded,
  };
}
