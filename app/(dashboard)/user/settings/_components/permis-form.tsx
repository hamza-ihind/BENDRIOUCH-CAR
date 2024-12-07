"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { User } from "@prisma/client";
import { FileUpload } from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";

export const PermisForm = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();
  const [permis, setPermis] = useState(currentUser.permis || "");
  const [isEditing, setIsEditing] = useState(!permis);

  const handleImageUpload = async (url: string) => {
    try {
      await axios.patch(`/api/users`, { permis: url });
      toast.success("Permis de conduite mise à jour");
      setPermis(url);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.patch(`/api/users`, { permis: "" });
      toast.success("Permis de conduite supprimée");
      setPermis("");
      setIsEditing(true);
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      {permis && !isEditing ? (
        <div>
          <div className="relative aspect-video mt-4">
            <Image
              alt="Car Image"
              fill
              className="object-cover rounded-md"
              src={permis}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" /> Modifier
            </Button>
            <Button variant="destructive" onClick={handleDeleteImage}>
              <Trash2 className="h-4 w-4 mr-2" /> Supprimer
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-color h-60 rounded-md mt-4">
          <FileUpload
            endpoint="permis"
            onChange={(url) => {
              if (url) {
                handleImageUpload(url.url);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
