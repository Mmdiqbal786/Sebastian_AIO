import { promises as fs } from 'fs';
import path from 'path';

export interface FieldConfig {
  type: string;
  required?: boolean;
  hash?: boolean;
  uploadPath?: string;
}

export interface EntitySchema {
  fields: Record<string, FieldConfig>;
}

export async function loadEntitySchema(entityType: string): Promise<EntitySchema | null> {
  try {
    const schemaPath = path.join(process.cwd(), 'config', 'entitySchemas.json');
    const rawData = await fs.readFile(schemaPath, 'utf8');
    const schemas = JSON.parse(rawData);
    console.log("Loaded schemas:", schemas);
    return schemas[entityType] || null;
  } catch (error) {
    console.error("Error loading entity schema:", error);
    return null;
  }
}
