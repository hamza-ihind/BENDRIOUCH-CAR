"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  carId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, carId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/cars/${carId}/unpublish`);
        toast.success("Voiture non publiée");
      } else {
        await axios.patch(`/api/cars/${carId}/publish`);
        toast.success("Voiture publiée");
      }

      router.refresh();
    } catch (error) {
      toast.error("Une erreur s'est produite!");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/cars/${carId}`);
      toast.success("Voiture supprimée");
      router.refresh();
      router.push(`/cars`);
    } catch (error) {
      toast.error("Une erreur s'est produite!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Retirer de la publication" : "Publier"}{" "}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
