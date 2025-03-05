"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/shared/file-upload";

export const PermisForm = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();
  const [permis, setPermis] = useState(currentUser.permis || "");
  const [isEditing, setIsEditing] = useState(!permis);

  const handleImageUpload = async (url: string) => {
    try {
      await axios.patch("/api/users", { permis: url });
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
      // Send PATCH request with empty permis value
      await axios.patch("/api/users", { permis: "" });

      // Optionally: If you have cloud storage (e.g., AWS S3), you can also delete it from there.

      toast.success("Permis de conduite supprimée");
      setPermis(""); // Update local state to remove the image from UI
      setIsEditing(true);
      router.refresh(); // Refresh to update UI
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
            endpoint="carImage"
            onChange={(fileData) => {
              if (fileData.length > 0) {
                const newImageUrl = fileData.map((file) => file.url);
                handleImageUpload(newImageUrl[0]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
