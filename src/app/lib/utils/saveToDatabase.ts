/* eslint-disable @typescript-eslint/no-explicit-any */
import { hashPassword } from "@/app/lib/utils/hashPassword";
import { uploadFile, deleteFile } from "@/app/lib/utils/uploadFile";
import mongoose from "mongoose";

interface SaveOptions {
  model: mongoose.Model<any>;
  data: FormData;
  requiredFields: string[];
  requiredFiles?: string[];
  fileFields?: string[];
  hashPasswordField?: string;
  additionalFields?: Record<string, any>;
}

export async function saveToDatabase({
  model,
  data,
  requiredFields,
  requiredFiles = [],
  fileFields = [],
  hashPasswordField = "password",
  additionalFields = {},
}: SaveOptions) {
  const uploadedFiles: Record<string, string> = {};
  try {
    const entries = Object.fromEntries(data.entries());
    for (const field of requiredFields) {
      if (!entries[field]) {
        return { success: false, error: `${field} is required.` };
      }
    }
    for (const fileField of requiredFiles) {
      if (!(entries[fileField] instanceof File)) {
        return { success: false, error: `Invalid or missing file: ${fileField}.` };
      }
    }
    for (const fileField of fileFields) {
      const file = entries[fileField] as File;
      if (file) {
        uploadedFiles[fileField] = await uploadFile(file, fileField);
      }
    }
    const processedData: Record<string, any> = { ...additionalFields, ...uploadedFiles };
    for (const key in entries) {
      if (fileFields.includes(key) && entries[key] instanceof File) continue;
      processedData[key] = key === hashPasswordField ? await hashPassword(entries[key] as string) : entries[key];
    }
    const document = await model.create(processedData);
    return { success: true, id: document._id };
  } catch (error) {
    console.error("Error saving to database:", error);
    for (const filePath of Object.values(uploadedFiles)) {
      await deleteFile(filePath);
    }
    return { success: false, error: "Error saving to database." };
  }
}
