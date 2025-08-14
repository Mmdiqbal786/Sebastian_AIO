/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { 
  convertFieldsToNumber,
  findOrCreateRole, 
  generateEmployeeId,
  getUserIdByEmail,
  processFoodSelections,
  processSubTableField,
  updateDaysAndPrice, 
} from "@/app/lib/serverUtils";
import { hashPassword, processPassword, verifyPassword } from "@/app/lib/passwordUtils";
import { checkRelations, client, connectToMongoose, database, db } from "@/app/lib/prisma";
import { EntityType, entityTypes, PostRequestParams } from "@/app/types/EntityType";
import { deleteFile, handleFileUpdate, saveBase64File } from "@/app/lib/serverFileUtils";
import { formatDateWithTimezone, processDate } from '@/app/lib/dateFormat';

export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Allow": "GET, POST, PUT, DELETE, OPTIONS"
    }
  });
}

const jsonResponse = (data: any, status: number = 200) => 
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

async function withDatabase<T>(callback: () => Promise<T>): Promise<T> {
  try {
    await client.connect();
    return await callback();
  } finally {
    await client.close();
  }
}

async function extractAndValidateData(formData: FormData, fields: string[]): Promise<{ data: Record<string, any>; error?: string }> {
  const missingFields = fields.filter(field => !formData.get(field));
  if (missingFields.length) {
    return { data: {}, error: `Missing fields: ${missingFields.join(", ")}` };
  }
  const data = Object.fromEntries(fields.map(field => [field, formData.get(field)]));
  return { data };
}

const getEntityConfig = (entityType: EntityType, method: "POST" | "PUT") => {
  const timestamp = new Date();
  const baseConfig: Record<EntityType, {
    fields: string[];
    process: (data: any, existingData?: any) => Promise<any>;
    subEntities?: Record<string, { fields: string[]; process: (data: any, existingData: any) => Promise<any> }>;
  }> = {
    employees: {
      fields: ["name", "email", "password", "profileImg", "document", "phone", "dob", "address", "type"],
      process: async (data, existingData) => {
        if (method === "PUT" && existingData) {
          data.password = await processPassword(data.password, existingData.password);
          data.dob = processDate(data.dob, existingData.dob);
          data.profileImg = await handleFileUpdate({
            newFile: data.profileImg,
            existingFile: existingData.profileImg,
            fieldName: "profileImg",
            email: data.email,
            saveFile: saveBase64File,
            deleteFile,
          });
          data.document = await handleFileUpdate({
            newFile: data.document,
            existingFile: existingData.document,
            fieldName: "document",
            email: data.email,
            saveFile: saveBase64File,
            deleteFile,
          });
        } else {
          await connectToMongoose();
          const role = await findOrCreateRole(data.role || "employee");
          data.dob = formatDateWithTimezone(data.dob);
          data.profileImg = await saveBase64File(data.profileImg, "profileImg", data.email);
          data.document = await saveBase64File(data.document, "document", data.email);
          data.employeeId = await generateEmployeeId();
          data.password = await hashPassword(data.password);
          data.roleId = role._id;
          data.createdAt = timestamp;
        }
        data.updatedAt = timestamp;
        return data;
      },
      subEntities: {
        password: {
          fields: ["password"],
          process: async (data, existingData) => ({
            password: await processPassword(data.password, existingData.password),
            updatedAt: timestamp,
          }),
        },
      },
    },
    roles: {
      fields: ["name"],
      process: async (data, existingData) => ({
        ...data,
        updatedAt: timestamp,
        ...(method === "POST" ? { createdAt: timestamp } : {}),
      }),
    },
    // users: {
    //   fields: ["name", "email", "password"],
    //   process: async (data, existingData) => {
    //     if (method === "PUT" && existingData) {
    //       data.password = await processPassword(data.password, existingData.password);
    //     } else {
    //       data.password = await hashPassword(data.password);
    //       const role = await findOrCreateRole(data.role || "user");
    //       data.roleId = role._id;
    //       data.createdAt = timestamp;
    //     }
    //     if (data.email || data.name) {
    //       data.email = data.email || existingData?.email;
    //       data.name = data.name || existingData?.name;
    //     }
    //     data.updatedAt = timestamp;
    //     return data;
    //   },
    users: {
      fields: ["name", "email", "password", "profileImg", "categoryId", "phone", "planId", "address", "foodSelections", "totalDays", "price", "validFrom", "validTill", "timeSlot" ],
      process: async (data, existingData) => {
        if (method === "PUT" && existingData) {
          data.password = await processPassword(data.password, existingData.password);
          data.profileImg = await handleFileUpdate({
            newFile: data.profileImg,
            existingFile: existingData.profileImg,
            fieldName: "profileImg",
            email: data.email,
            saveFile: saveBase64File,
            deleteFile,
          });
          await updateDaysAndPrice(data);
        } else {
          await connectToMongoose();
          const role = await findOrCreateRole(data.role || "user");
          data.profileImg = await saveBase64File(data.profileImg, "profileImg", data.email);
          data.password = await hashPassword(data.password);
          data.roleId = role._id;
          data.createdAt = timestamp;
          await updateDaysAndPrice(data);
        }
        data = processFoodSelections(data, "foodSelections");
        data.updatedAt = timestamp;
        return data;
      },
      subEntities: {
        password: {
          fields: ["password"],
          process: async (data, existingData) => ({
            password: await processPassword(data.password, existingData.password),
            updatedAt: timestamp,
          }),
        },
      },
    },
    foods: {
      fields: ["name", "categoryId", "image"],
      process: async (data, existingData) => {
        if (method === "PUT" && existingData) {
          data.image = await handleFileUpdate({
            newFile: data.image,
            existingFile: existingData.image,
            fieldName: "image",
            email: data.name,
            saveFile: saveBase64File,
            deleteFile,
          });
        } else {
          data.image = await saveBase64File(data.image, "image", data.name);
          data.createdAt = timestamp;
        }
        data.updatedAt = timestamp;
        return data;
      },
    },
    categories: {
      fields: ["name", "plans"],
      process: async (data, existingData) => ({
        ...data,
        updatedAt: timestamp,
        ...(method === "POST" ? { createdAt: timestamp } : {}),
      }),
    },
    foodCategories: {
      fields: ["name"],
      process: async (data, existingData) => ({
        ...data,
        updatedAt: timestamp,
        ...(method === "POST" ? { createdAt: timestamp } : {}),
      }),
    },
    userTypes: {
      fields: ["name"],
      process: async (data, existingData) => ({
        ...data,
        updatedAt: timestamp,
        ...(method === "POST" ? { createdAt: timestamp } : {}),
      }),
    },
    plans: {
      fields: ["name", "price", "foodSelections"],
      process: async (data, existingData) => {
        data = convertFieldsToNumber(data, ["price"]);
        data = processSubTableField(data, "foodSelections", "totalFoodSelections");
        return {
          ...(method === "PUT" ? existingData : {}),
          ...data,
          updatedAt: timestamp,
          ...(method === "POST" ? { createdAt: timestamp } : {}),
        };
      },
    },
    slots: {
      fields: ["name", "time"],
      process: async (data, existingData) => ({
        ...data,
        updatedAt: timestamp,
        ...(method === "POST" ? { createdAt: timestamp } : {}),
      }),
    }
  };
  return baseConfig[entityType] || { fields: [], process: async (data: any) => data };
};

async function handleEntityRequest({
  req,
  entityType,
  method,
}: {
  req: NextRequest;
  entityType: EntityType;
  method: "POST" | "PUT";
}) {
  return withDatabase(async () => {
    const formData = await req.formData();
    const config = getEntityConfig(entityType, method);
    let { fields, process } = config;
    if (method === "PUT") {
      const subEntity = req.nextUrl.searchParams.get("subEntity");
      if (subEntity && config.subEntities) {
        if (config.subEntities[subEntity]) {
          ({ fields, process } = config.subEntities[subEntity]);
        } else {
          return jsonResponse({ error: `Invalid subEntity for ${entityType}.` }, 400);
        }
      }
    }
    const { data, error } = await extractAndValidateData(formData, fields);
    if (error) {
      return jsonResponse({ error }, 400);
    }
    let existingData: any;
    if (method === "PUT") {
      const id = formData.get("_id") as string;
      if (!id) {
        return jsonResponse({ error: "Missing _id for update." }, 400);
      }
      const collection = database.collection(entityType);
      existingData = await collection.findOne({ _id: new ObjectId(id) });
      if (!existingData) {
        return jsonResponse({ error: `${entityType} not found.` }, 404);
      }
    }
    const processedData = await process(data, existingData);
    const collection = database.collection(entityType);
    if (method === "POST") {
      const result = await collection.insertOne(processedData);
      return result.insertedId
        ? jsonResponse({ message: `${entityType} saved successfully!`, id: result.insertedId, data: processedData }, 201)
        : jsonResponse({ error: `Failed to save ${entityType}.` }, 500);
    } else {
      const id = formData.get("_id") as string;
      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: processedData });
      if (result.modifiedCount === 0) {
        return jsonResponse({ error: `Failed to update ${entityType}.` }, 500);
      }
      const updatedRecord = await collection.findOne({ _id: new ObjectId(id) });
      return jsonResponse({ message: `${entityType} updated successfully!`, data: updatedRecord }, 202);
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const entityTypeParam = req.nextUrl.searchParams.get("type");
    const entityType = entityTypes.includes(entityTypeParam as EntityType)
      ? (entityTypeParam as EntityType)
      : null;
    if (!entityType) {
      return jsonResponse({ error: "Invalid or missing entity type" }, 400);
    }
    return await handleEntityRequest({ req, entityType, method: "POST" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return jsonResponse({ error: "Failed to process the request." }, 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const entityTypeParam = req.nextUrl.searchParams.get("type");
    const entityType = entityTypes.includes(entityTypeParam as EntityType)
      ? (entityTypeParam as EntityType)
      : null;
    if (!entityType) {
      return jsonResponse({ error: "Invalid or missing entity type" }, 400);
    }
    return await handleEntityRequest({ req, entityType, method: "PUT" });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return jsonResponse({ error: "Failed to process the request." }, 500);
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? undefined;
  const type = req.nextUrl.searchParams.get("type");
  if (!type) {
    return jsonResponse({ error: "Missing entity type" }, 400);
  }
  try {
    const collection = database.collection(type);
    const data = id
      ? await collection.findOne({ _id: new ObjectId(id) })
      : await collection.find({}).toArray();
    return data ? jsonResponse({ [type]: data }) : jsonResponse({ error: `${type} not found.` }, 404);
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "An unknown error occurred" }, 500);
  }
}

function isFilePath(value: string) {
  const fileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.docx', '.txt', '.ico', '.webp'];
  return fileExtensions.some(ext => value.toLowerCase().endsWith(ext));
}

class DeletionBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeletionBlockedError";
  }
}

async function deleteFromMongo(entity: EntityType, id: string) {
  try {
    return await withDatabase(async () => {
      const collection = database.collection(entity);
      const record = await collection.findOne({ _id: new ObjectId(id) });
      if (!record) {
        throw new Error(`${entity} not found.`);
      }
      const relationMessages = await checkRelations(entity, id);
      if (relationMessages.length > 0) {
        throw new DeletionBlockedError(relationMessages.join(" "));
      }
      for (const [key, value] of Object.entries(record)) {
        if (typeof value === "string" && isFilePath(value)) {
          const filePath = path.join(process.cwd(), "public", value);
          try {
            await fs.access(filePath);
            await fs.unlink(filePath);
          } catch (fileError) {
            console.error(`Error accessing or deleting file at ${filePath}:`, fileError);
          }
        }
      }
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        throw new Error(`Failed to delete ${entity}.`);
      }
      return record;
    });
  } catch (error: any) {
    console.error(`Error deleting ${entity}:`, error);
    throw error;
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const type = req.nextUrl.searchParams.get("type");
  if (!id || !type) {
    return jsonResponse({ error: "Missing ID or type" }, 400);
  }
  try {
    await deleteFromMongo(type as EntityType, id);
    return jsonResponse({ message: `${type} deleted successfully!` });
  } catch (error) {
    if (error instanceof DeletionBlockedError) {
      return jsonResponse({ error: error.message }, 400);
    }
    return jsonResponse({ error: error instanceof Error ? error.message : `Error deleting ${type}` }, 500);
  }
}
