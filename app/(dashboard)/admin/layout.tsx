import { isAdmin } from "@/lib/admin";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (isAdmin(session?.user.id)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
