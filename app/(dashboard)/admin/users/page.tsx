import { auth } from "@/auth";
import DashboardTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { IconBadge } from "@/components/shared/icon-badge";

import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight";
import { Users, UserCheck, UserX, Shield, Crown } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable as UsersTable } from "./_components/users-table/data-table";
import { columns as UsersColumns } from "./_components/users-table/columns";
import { db } from "@/lib/db";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/"); // Rediriger si l'utilisateur n'est pas connecté
  }

  const users = await db.user.findMany(); // Récupère tous les utilisateurs

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez vos utilisateurs et suivez leurs activités facilement
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{users.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Onboardés</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {users.filter(user => user.isOnboarded).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Admins</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {users.filter(user => user.role === 'ADMIN').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Non-onboardés</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {users.filter(user => !user.isOnboarded).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DataTable with Enhanced Card Background */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Liste des Utilisateurs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez tous les utilisateurs de la plateforme
          </p>
        </div>
        <div className="p-6">
          <UsersTable columns={UsersColumns} data={users} />
        </div>
      </div>
    </div>
  );
};

export default page;
