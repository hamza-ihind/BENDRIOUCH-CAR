"use client";

import { Car, Reservation } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDown,
  Pencil,
  MoreHorizontal,
  RefreshCcw,
  CheckCircle,
  XCircle,
  Trash,
  Eye,
  User,
  Car as CarIcon,
  MapPin,
  Calendar,
  Plane,
  Clock,
  CreditCard,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const columns: ColumnDef<Reservation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Clé de reservation
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { id } = row.original; // Access the actual fields
      return <div className="text-gray-500">{id}</div>;
    },
  },
  {
    accessorKey: "flightNumber",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Numéro de vol
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { flightNumber } = row.original; // Access the actual fields
      return <div className="text-gray-500">{flightNumber}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date de départ
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const startDate = String(row.getValue("startDate"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(startDate));

      return <div className="text-gray-500">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "startPlace",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lieu de retraite
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { startPlace } = row.original;
      return <div className="text-gray-500">{startPlace}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date de fin
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const endDate = String(row.getValue("endDate"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(endDate));

      return <div className="text-gray-500">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "endPlace",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lieu de retour
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { endPlace } = row.original;
      return <div className="text-gray-500">{endPlace}</div>;
    },
  },
  {
    accessorKey: "carId",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Voiture
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { carId } = row.original;
      return <div className="text-gray-500">{carId}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isStatus = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className={cn(
            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
            isStatus === "PENDING"
              ? "text-gray-500 bg-gray-500/20" // Pending color
              : isStatus === "CANCELLED"
              ? "text-red-600 bg-red-300/80" // Cancelled color (red)
              : "text-green-600 bg-green-400/80" // Confirmed color (green)
          )}
        >
          {isStatus === "PENDING"
            ? "En attente"
            : isStatus === "CANCELLED"
            ? "Annulée"
            : "Confirmée"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, status } = row.original;
      const router = useRouter();
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [reservationDetails, setReservationDetails] =
        useState<Reservation | null>(null);
      const [carDetails, setCarDetails] = useState<Car | null>(null);

      // Handle Confirm action
      const handleConfirm = async () => {
        try {
          await axios.patch(`/api/reservations/admin/${id}/confirm`);
          toast.success("Réservation confirmée");
          router.refresh();
        } catch (error) {
          toast.error("Erreur lors de la confirmation de la réservation.");
        }
      };

      // Handle Cancel action
      const handleCancel = async () => {
        try {
          await axios.patch(`/api/reservations/admin/${id}/cancel`);
          toast.success("Réservation annulée");
          router.refresh();
        } catch (error) {
          toast.error("Erreur lors de l'annulation de la réservation.");
        }
      };

      // Handle Undo Confirm to Pending
      const handlePending = async () => {
        try {
          await axios.patch(`/api/reservations/admin/${id}/pending`);
          toast.success("Statut de la réservation rétabli à PENDING");
          router.refresh();
        } catch (error) {
          toast.error("Erreur lors du rétablissement du statut.");
        }
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/reservations/admin/${id}/delete`);
          toast.success("Reservation supprimée");
          router.refresh();
        } catch (error) {
          toast.error("Erreur lors du Suppression du réservation.");
        }
      };

      const handleInspect = async () => {
        try {
          const response = await axios.get(
            `/api/reservations/admin/${id}/inspect`
          );
          setReservationDetails(response.data);

          if (response.data.carId) {
            const carResponse = await axios.get(
              `/api/cars/${response.data.carId}`
            );
            setCarDetails(carResponse.data);
          }

          setIsDialogOpen(true);
        } catch (error) {
          toast.error(
            "Erreur lors de la récupération des détails de la réservation."
          );
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleInspect}>
                <Eye className="mr-2" /> Inspecter
              </DropdownMenuItem>
              {/* If status is PENDING, show Confirm and Cancel options */}
              {status === "PENDING" ? (
                <>
                  <DropdownMenuItem onClick={handleConfirm}>
                    <CheckCircle className="mr-2" /> Confirmer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCancel}>
                    <XCircle className="mr-2" /> Annuler
                  </DropdownMenuItem>
                </>
              ) : status === "CANCELLED" ? (
                // If status is CANCELLED, allow Confirm, Delete, and Pending options
                <>
                  <DropdownMenuItem onClick={handleConfirm}>
                    <CheckCircle className="mr-2" /> Confirmer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash className="mr-2" /> Supprimer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePending}>
                    <RefreshCcw className="mr-2" /> Pas confirmer
                  </DropdownMenuItem>
                </>
              ) : status === "CONFIRMED" ? (
                // If status is CONFIRMED, allow Cancel and Pending options
                <>
                  <DropdownMenuItem onClick={handleCancel}>
                    <XCircle className="mr-2" /> Annuler
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePending}>
                    <RefreshCcw className="mr-2" /> Pas confirmer
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>

          {isDialogOpen && reservationDetails && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                {/* Header moderne */}
                <DialogHeader className="pb-6 border-b border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Inspection de Réservation
                      </DialogTitle>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Détails complets de la réservation #{reservationDetails.id.slice(-8)}
                      </p>
                    </div>
                  </div>

                  {/* Badge de statut */}
                  <div className="flex justify-end">
                    <Badge
                      className={cn(
                        "px-3 py-1 text-sm font-semibold",
                        reservationDetails.status === "CONFIRMED" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                        reservationDetails.status === "PENDING" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                        reservationDetails.status === "CANCELLED" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {reservationDetails.status === "CONFIRMED" && "✓ Confirmée"}
                      {reservationDetails.status === "PENDING" && "⏳ En attente"}
                      {reservationDetails.status === "CANCELLED" && "✕ Annulée"}
                    </Badge>
                  </div>
                </DialogHeader>

                <DialogDescription className="space-y-6 pt-6">
                  {/* Section Informations Client */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                        Informations Client
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">ID Réservation</p>
                          <p className="font-semibold text-blue-900 dark:text-blue-100 font-mono">
                            {reservationDetails.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">ID Utilisateur</p>
                          <p className="font-semibold text-blue-900 dark:text-blue-100 font-mono">
                            {reservationDetails.userId}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Détails de Voyage */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                        Détails du Voyage
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Lieu de départ</p>
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            {reservationDetails.startPlace || "Non spécifié"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Lieu de retour</p>
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            {reservationDetails.endPlace || "Non spécifié"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Date de début</p>
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            {new Date(reservationDetails.startDate).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <Calendar className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Date de fin</p>
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            {new Date(reservationDetails.endDate).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      {reservationDetails.flightNumber && (
                        <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg md:col-span-2">
                          <Plane className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Numéro de vol</p>
                            <p className="font-semibold text-green-900 dark:text-green-100">
                              {reservationDetails.flightNumber}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section Véhicule */}
                  {carDetails && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-3 mb-4">
                        <CarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                          Véhicule Sélectionné
                        </h3>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image de la voiture */}
                        <div className="lg:w-1/3">
                          <div className="relative w-full h-48 bg-white/50 dark:bg-neutral-800/50 rounded-xl overflow-hidden">
                            <Image
                              src={carDetails.imageUrl[0] || "/placeholder-car.png"}
                              alt={carDetails.name || "Voiture"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Détails de la voiture */}
                        <div className="lg:w-2/3 space-y-4">
                          <div>
                            <h4 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-1">
                              {carDetails.name || "Non spécifié"}
                            </h4>
                            <p className="text-purple-700 dark:text-purple-300 text-lg">
                              {carDetails.model || "Non spécifié"}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Carburant</p>
                                <p className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                                  {carDetails.fuelType || "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Places</p>
                                <p className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                                  {carDetails.seats || "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <div>
                                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Transmission</p>
                                <p className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                                  {carDetails.transmission || "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                              <CreditCard className="w-4 h-4 text-yellow-500" />
                              <div>
                                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Prix/jour</p>
                                <p className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                                  {carDetails.pricePerDay || 0} DH
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section Dates et Durée */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">
                        Informations Temporelles
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Créée le</p>
                          <p className="font-semibold text-orange-900 dark:text-orange-100">
                            {new Date(reservationDetails.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-neutral-800/50 rounded-lg">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Mise à jour</p>
                          <p className="font-semibold text-orange-900 dark:text-orange-100">
                            {new Date(reservationDetails.updatedAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">Durée totale</p>
                          <p className="font-bold text-orange-900 dark:text-orange-100">
                            {Math.ceil((new Date(reservationDetails.endDate).getTime() - new Date(reservationDetails.startDate).getTime()) / (1000 * 60 * 60 * 24))} jour(s)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogDescription>

                <DialogFooter className="pt-6 border-t border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Inspection effectuée le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <Button
                      onClick={() => setIsDialogOpen(false)}
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Fermer l'inspection
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    },
  },
];
