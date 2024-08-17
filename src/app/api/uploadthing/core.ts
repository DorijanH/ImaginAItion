import { UploadThingError } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { auth } from '@/auth';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      // TODO: Replace with next-auth later
      const session = await auth();

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;