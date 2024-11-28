import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { CloudIcon, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";

interface ProfileImageFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ value, onChange }: ProfileImageFieldProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    // Extract the file from the drop event
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const event = {
        target: { files: [file] },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(event);

      // Clear the drag data (optional, but good practice)
      e.dataTransfer.clearData();
    }
  };

  return (
    <FormItem className="mt-8 w-full grid grid-cols-[1fr_3fr] space-x-12 max-xl:grid-cols-1 max-xl:space-x-0 max-xl:space-y-4">
      <FormLabel>Photo de Profile</FormLabel>
      <div className="w-auto flex items-start gap-6 max-md:flex-col">
        {value && (
          <Avatar className="w-24 h-24">
            <AvatarImage src={value || ""} className="object-cover" />
            <AvatarFallback className="bg-orange-600">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={`w-full border ${
            dragging ? "border-orange-500" : "border-color"
          } transition-all rounded-md p-4 cursor-pointer flex flex-col items-center justify-center hover:border-orange-500`}
          onClick={() => document.getElementById("fileInput")?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-zinc-800" />
          <p className="text-sm text-gray-400 mt-2">
            <b>Click to upload</b> or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            SVG, PNG, JPG, GIF (max. 800x400px)
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <FormControl>
        <Input
          id="fileInput"
          type="file"
          placeholder="Upload a photo"
          accept="image/*"
          className="hidden w-full"
          onChange={onChange}
        />
      </FormControl>
    </FormItem>
  );
};

export default ProfileImage;
