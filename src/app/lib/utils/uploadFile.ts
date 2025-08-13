import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "public");

// Function to generate a unique string (10 characters)
function generateUniqueString(length = 10) {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Function to handle file upload, including name generation
export async function uploadFile(file: File, fileField: string): Promise<string> {
  try {
    if (!file || !(file instanceof File)) {
      throw new Error(`Invalid or missing file: ${fileField}`);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueString = generateUniqueString();
    const fileExt = path.extname(file.name) || ".bin";
    const uniqueFilename = `${uniqueString}_${Date.now()}_${fileField}${fileExt}`;
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);
    return uniqueFilename;
  } catch (error) {
    console.error(`Error uploading ${fileField}:`, error);
    throw error;
  }
}

// Function to delete a file
export async function deleteFile(filePath: string): Promise<void> {
  try {
    await unlink(path.join(uploadDir, filePath));
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
