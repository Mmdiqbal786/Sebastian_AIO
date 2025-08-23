import "dotenv/config";
import { connectToDatabase } from "@/app/lib/mongodb";

async function test() {
  try {
    const { db } = await connectToDatabase();
    console.log("✅ Connected to DB:", db.databaseName);

    // Example: list collections
    const collections = await db.listCollections().toArray();
    console.log("📂 Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    process.exit(0);
  }
}

test();