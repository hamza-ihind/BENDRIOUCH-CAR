// components/DashboardRedirect.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashboardRedirect = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return "/";
  }

  const userRole = session.user.role;

  // Redirect based on role
  if (userRole === "ADMIN" || userRole === "TEACHER") {
    return "/admin-dashboard";
  } else if (userRole === "USER") {
    return "/student-dashboard";
  }
};

export default DashboardRedirect;
