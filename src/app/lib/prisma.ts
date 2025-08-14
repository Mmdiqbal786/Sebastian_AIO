/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import { EntityType, relationMap } from "@/app/types/EntityType";

const MONGO_URI =
  process.env.NEXT_MONGO_URI;

const client = new MongoClient(MONGO_URI);

/* ---------- Mongoose Connection ---------- */
const connectToMongoose = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Mongoose is already connected.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: process.env.NEXT_MONGO_DB,
      bufferCommands: false,
    });
    console.log("✅ MongoDB connected successfully via Mongoose.");
  } catch (error) {
    console.error("❌ Mongoose connection error:", error);
    throw new Error("Failed to connect to Mongoose.");
  }
};

/* ---------- MongoClient Connection (Only If Needed) ---------- */
let mongoClient: MongoClient | null = null;

const connectToMongoClient = async () => {
  if (mongoClient) {
    console.log("✅ MongoClient is already connected.");
    return mongoClient;
  }

  try {
    mongoClient = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    await mongoClient.connect();
    console.log("✅ MongoDB connected successfully via MongoClient.");
    return mongoClient;
  } catch (error) {
    console.error("❌ MongoClient connection error:", error);
    throw new Error("Failed to connect to MongoClient.");
  }
};

const db = async () => {
  if (!mongoClient) {
    await connectToMongoClient();
  }
  if (!mongoClient) {
    throw new Error("❌ MongoClient is not connected yet.");
  }
  const dbName = process.env.NEXT_MONGO_DB;
  return mongoClient.db(dbName);
};


/* ---------- Mongoose Models ---------- */
const models = mongoose.models as Record<string, mongoose.Model<any>>;

/* ---------- Relation Check Function ---------- */
async function checkRelations(entity: EntityType, id: string): Promise<string[]> {
  const messages: string[] = [];
  const relations = relationMap[entity];
  if (!relations) {
    return messages;
  }
  for (const relation of relations) {
    const relatedCollection = database.collection(relation.collection);
    let convertedId: any = id;
    if (relation.convertToObjectId) {
      try {
        convertedId = new ObjectId(id);
      } catch (e:any) {
        console.error("Invalid ObjectId conversion for id:", id);
      }
    }
    if (relation.storedAsString) {
      const docs = await relatedCollection.find({}).toArray();
      for (const doc of docs) {
        const fieldValue = doc[relation.field];
        let parsedArray: any[] = [];
        if (typeof fieldValue === "string") {
          try {
            parsedArray = JSON.parse(fieldValue);
          } catch (e) {
            console.error(`Error parsing JSON in field ${relation.field} for doc ${doc._id}:`, e);
          }
        } else if (Array.isArray(fieldValue)) {
          parsedArray = fieldValue;
        }
        if (parsedArray.map(String).includes(convertedId.toString())) {
          messages.push(relation.message);
          break;
        }
      }
    } else {
      let query;
      if (relation.isArray) {
        query = { [relation.field]: { $in: [convertedId] } };
      } else {
        query = { [relation.field]: convertedId };
      }
      const count = await relatedCollection.countDocuments(query);
      if (count > 0) {
        messages.push(relation.message);
      }
    }
  }
  return messages;
}

const database = await db();

/* ---------- Exports ---------- */
export {
  mongoose,
  MONGO_URI,
  models as mongooseModels,
  client,
  database,
  checkRelations,
  connectToMongoose,
  connectToMongoClient,
  db,
};
