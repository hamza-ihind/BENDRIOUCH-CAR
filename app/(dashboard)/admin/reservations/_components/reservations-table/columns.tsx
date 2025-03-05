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
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    Détails de la Réservation
                  </DialogTitle>
                  <DialogDescription>
                    <div className="mt-4 flex gap-32">
                      <div className="flex flex-col gap-2">
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">ID:</p>{" "}
                          {reservationDetails.id}
                        </p>
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">Numéro de vol:</p>{" "}
                          {reservationDetails.flightNumber}
                        </p>
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">Lieu de départ:</p>{" "}
                          {reservationDetails.startPlace}
                        </p>
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">Lieu de retour:</p>{" "}
                          {reservationDetails.endPlace}
                        </p>
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">Status:</p>{" "}
                          {reservationDetails.status}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-base text-black flex flex-col gap-2">
                          <p className="font-bold">La voiture:</p>
                          <Image
                            src={carDetails?.imageUrl[0] || ""}
                            alt="Marque"
                            width={400}
                            height={200}
                            className="rounded-md"
                          />
                        </p>
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">Marque:</p>{" "}
                          {carDetails?.name || "N/A"}
                        </p>
                        <p className="text-base text-black flex gap-2">
                          <p className="font-bold">Modèle:</p>{" "}
                          {carDetails?.model || "N/A"}
                        </p>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setIsDialogOpen(false)}>Fermer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    },
  },
];
