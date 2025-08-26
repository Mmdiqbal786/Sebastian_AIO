"use server";

import fs from "fs/promises";
import path from "path";
import { getDocumentType } from "@/app/lib/utils";

/**
 * Delete a file safely.
 */
export async function deleteFile(fileName: string): Promise<void> {
  const baseDir = path.join(process.cwd(), "public");
  const filePath = path.join(baseDir, fileName);
  
  try {
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (exists) {
      await fs.unlink(filePath);
      console.log(`File deleted: ${filePath}`);
    } else {
      console.log(`File not found: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error deleting file: ${filePath}`, err);
    throw err;
  }
}

/**
 * Save Base64 file and return the file name.
 */
export async function saveBase64File(base64String: string, prefix: string, name: string): Promise<string> {
  const fileExt = getDocumentType(base64String);
  const fileName = `${prefix}_${name}.${fileExt}`;
  const filePath = path.join(process.cwd(), "public", fileName);

  const fileData = base64String.replace(/^data:[^;]+;base64,/, "");
  const fileBuffer = Buffer.from(fileData, "base64");

  await fs.writeFile(filePath, fileBuffer);
  return fileName;
}

type FileUpdateParams = {
  newFile: string | undefined;
  existingFile: string | undefined;
  fieldName: string;
  email: string;
  saveFile: (file: string, fieldName: string, email: string) => Promise<string>;
  deleteFile: (filePath: string) => void;
};

export const handleFileUpdate = async ({
  newFile,
  existingFile,
  fieldName,
  email,
  saveFile,
  deleteFile,
}: FileUpdateParams): Promise<string | undefined> => {
  if (newFile && newFile.startsWith("data:")) {
    if (existingFile) {
      await deleteFile(existingFile);
    }
    return await saveFile(newFile, fieldName, email);
  }
  return existingFile;
};

export async function isFilePath(value: string) {
  const fileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.docx', '.txt', '.ico', '.webp'];
  return fileExtensions.some(ext => value.toLowerCase().endsWith(ext));
}
