import { auth } from "@/auth";
import DashboardPageTitle from "@/app/(dashboard)/_components/dashboard-page-title";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DataTable as ReservationTable } from "./_components/reservations-table/data-table";
import { columns as ReservationColumns } from "./_components/reservations-table/columns";
import { Calendar, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const reservations = await db.reservation.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gestion des Réservations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez toutes les réservations et suivez leur statut en temps réel
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{reservations.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Confirmées</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {reservations.filter(r => r.status === 'CONFIRMED').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">En attente</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {reservations.filter(r => r.status === 'PENDING').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">Annulées</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {reservations.filter(r => r.status === 'CANCELLED').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DataTable with Enhanced Card Background */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Toutes les Réservations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez, modifiez ou annulez les réservations selon vos besoins
          </p>
        </div>
        <div className="p-6">
          <ReservationTable columns={ReservationColumns} data={reservations} />
        </div>
      </div>
    </div>
  );
};

export default page;
