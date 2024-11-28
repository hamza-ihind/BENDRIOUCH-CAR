import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorized");

  return { userId };
};

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  blogMedia: f(["image", "video", "audio"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
      return { url: file.url, name: file.name, size: file.size };
    }),

  blogContent: f(["text"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
      return { url: file.url, name: file.name, size: file.size };
    }),

  blogImage: f({
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  courseImage: f({
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  courseAttachment: f([
    "text",
    "image",
    "video",
    "audio",
    "pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ])
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
      return { url: file.url, name: file.name, size: file.size };
    }),

  chapterVideo: f({
    video: { maxFileCount: 1, maxFileSize: "512GB" },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
