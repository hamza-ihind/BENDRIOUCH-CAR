"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { Car } from "@prisma/client";
import { FileUpload } from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";

interface ImageFormProps {
  initialData: Car;
  carId: string;
}

export const ImageForm = ({ initialData, carId }: ImageFormProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string[]>(
    initialData.imageUrl || []
  );
  const [isEditing, setIsEditing] = useState(imageUrl.length === 0);

  const handleImageUpload = async (url: string[]) => {
    try {
      const updatedImageUrl = [...imageUrl, ...url]; // Add the new image URLs to the array
      await axios.patch(`/api/cars/${carId}`, { imageUrl: updatedImageUrl });
      toast.success("Images de la voiture ajoutées");
      setImageUrl(updatedImageUrl);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleDeleteImage = async (url: string) => {
    try {
      const updatedImageUrl = imageUrl.filter((imageUrl) => imageUrl !== url); // Remove the image URL from the array
      await axios.patch(`/api/cars/${carId}`, { imageUrl: updatedImageUrl });
      toast.success("Image de la voiture supprimée");
      setImageUrl(updatedImageUrl);
      if (updatedImageUrl.length === 0) {
        setIsEditing(true); // Enable editing mode if no images are left
      }
    } catch {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <div className="w-[720px] max-xl:w-full">
      {imageUrl.length > 0 && !isEditing ? (
        <div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {imageUrl.map((url, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  alt={`Image de la voiture ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                  src={url}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteImage(url)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" /> Modifier
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
                handleImageUpload(newImageUrl);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
