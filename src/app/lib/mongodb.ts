import { MongoClient, Db } from "mongodb";

const uri = process.env.NEXT_MONGO_URI as string;
const dbName = process.env.NEXT_MONGO_DB as string;

if (!uri) {
  throw new Error("❌ Please add NEXT_MONGO_URI in .env");
}
if (!dbName) {
  throw new Error("❌ Please add NEXT_MONGO_DB in .env");
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (db && client) {
    return { client, db };
  }

  client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log("✅ MongoDB connected to:", dbName);

  return { client, db };
}

export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}
