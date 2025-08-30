import React from "react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Separator } from "@/components/ui/separator";
import DashboardPageTitle from "../../_components/dashboard-page-title";
import { Car, Plus, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";

const CarsPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const cars = await db.car.findMany({});

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gestion des Voitures
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez votre flotte de véhicules et ajoutez de nouvelles voitures
              </p>
            </div>
          </div>
          <Link href="/admin/create-car">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5" />
              Ajouter une voiture
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cars.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Disponibles</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Luxe</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {cars.filter(car => car.category === 'LUXE').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">Indisponibles</p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DataTable with Enhanced Card Background */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Liste des Voitures
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez toutes les voitures de votre flotte
          </p>
        </div>
        <div className="p-6">
          <DataTable columns={columns} data={cars} />
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
