import { db } from "@/lib/db";

export const canAccessCoursesPage = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "ADMIN" || user?.role === "TEACHER";
};

export const canCreateCourse = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "ADMIN" || user?.role === "TEACHER";
};

export const isAdmin = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "ADMIN";
};
