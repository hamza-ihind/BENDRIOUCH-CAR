"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (fileData: { url: string; name: string; size: number }[]) => void; // Accepts an array of file data
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          // Map the response to an array of file data
          const fileData = res.map((file) => ({
            url: file.url,
            name: file.name,
            size: file.size,
          }));
          onChange(fileData); // Pass the array of file data to the parent component
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
