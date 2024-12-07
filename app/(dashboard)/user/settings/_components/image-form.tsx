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

interface ImageFormProps {
  initialData: User;
}

export const ImageForm = ({ initialData }: ImageFormProps) => {
  const router = useRouter();
  const [image, setImage] = useState(initialData.image || "");
  const [isEditing, setIsEditing] = useState(!image);

  const handleImageUpload = async (url: string) => {
    try {
      await axios.patch(`/api/users`, { image: url });
      toast.success("Image de voiture mise à jour");
      setImage(url);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.patch(`/api/users`, { image: "" });
      toast.success("Image de voiture supprimée");
      setImage("");
      setIsEditing(true);
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      {image && !isEditing ? (
        <div>
          <div className="relative aspect-video mt-4">
            <Image
              alt="Car Image"
              fill
              className="object-cover rounded-md"
              src={image}
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
            endpoint="media"
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
