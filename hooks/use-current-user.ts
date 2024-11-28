import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data: session } = useSession();

  if (!session) return null;

  return {
    id: session.user?.id,
    role: session.user?.role,
    username: session.user?.username,
    firstName: session.user?.firstName,
    lastName: session.user?.lastName,
    bio: session.user?.bio,
    phone: session.user?.phone,
    email: session.user?.email,
    image: session.user?.image,
  };
}
