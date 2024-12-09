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

export const PassportForm = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();
  const [passport, setPassport] = useState(currentUser.passport || "");
  const [isEditing, setIsEditing] = useState(!passport);

  const handleImageUpload = async (url: string) => {
    try {
      await axios.patch(`/api/users`, { passport: url });
      toast.success("Passeport mise à jour");
      setPassport(url);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.patch(`/api/users`, { passport: "" });
      toast.success("Passeport supprimée");
      setPassport("");
      setIsEditing(true);
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      {passport && !isEditing ? (
        <div>
          <div className="relative aspect-video mt-4">
            <Image
              alt="Car Image"
              fill
              className="object-cover rounded-md"
              src={passport}
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
            endpoint="passport"
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
