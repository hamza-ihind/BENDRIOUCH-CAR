import { isAdmin } from "@/lib/admin";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AdminLayout;
