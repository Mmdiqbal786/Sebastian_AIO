/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import path from "path";
import { getFileFieldConfig } from "@/app/lib/data/config/fileFieldConfig";

export async function unlinkFilesFromCollection(database: any, collectionName: string) {
  const fileFieldMap = await getFileFieldConfig();
  const fileFields = fileFieldMap[collectionName];

  if (!fileFields || fileFields.length === 0) {
    return;
  }

  const docs = await database.collection(collectionName).find({}).toArray();

  for (const doc of docs) {
    for (const field of fileFields) {
      const filePath = doc[field];
      if (filePath && typeof filePath === "string") {
        try {
          const absolutePath = path.resolve(process.cwd(), "public", filePath);
          await fs.unlink(absolutePath);
          console.log(`🗑️ Deleted file: ${absolutePath}`);
        } catch (err: any) {
          if (err.code !== "ENOENT") {
            console.error(`⚠️ Failed to delete file ${filePath}:`, err);
          }
        }
      }
    }
  }
}
