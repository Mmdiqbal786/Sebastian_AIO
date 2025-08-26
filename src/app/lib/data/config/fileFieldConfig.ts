/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDb } from "@/app/lib/mongodb";

/**
 * Option 1: Static config (easy, just edit here)
 */
export const staticFileFieldConfig: Record<string, string[]> = {
  users: ["profileImg"],
  associates: ["document"],
  contractors: ["document"],
  employees: ["document"],
  documents: ["filePath"],
};

/**
 * Option 2: Dynamic config stored in DB (collection: fileFieldMap)
 * Schema:
 * {
 *   collection: "users",
 *   fields: ["profileImg", "resume"]
 * }
 */
export async function getFileFieldConfig(): Promise<Record<string, string[]>> {
  const db = await getDb();
  try {
    const mappings = await db.collection("fileFieldMap").find({}).toArray();
    if (!mappings || mappings.length === 0) {
      return staticFileFieldConfig; // fallback
    }

    const map: Record<string, string[]> = {};
    mappings.forEach((m: any) => {
      map[m.collection] = m.fields;
    });

    return map;
  } catch (err:any) {
    console.error("⚠️ Failed to fetch fileFieldMap from DB. Using static config.", err);
    return staticFileFieldConfig;
  }
}
