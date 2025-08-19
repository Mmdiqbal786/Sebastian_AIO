import { db, connectToMongoClient } from "../src/app/lib/prisma";
// Drop specific collection
export async function dropCollection(collectionName: string) {
  const database = await db();
  try {
    await database.collection(collectionName).drop();
    console.log(`🗑️ Dropped collection: ${collectionName}`);
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "codeName" in err && (err as { codeName?: string }).codeName === "NamespaceNotFound") {
      console.log(`⚠️ Collection "${collectionName}" does not exist`);
    } else {
      console.error("❌ Error dropping collection:", err);
    }
  }
}

// Drop all collections
export async function dropCollections() {
  const database = await db();
  const collections = await database.collections();

  for (const collection of collections) {
    await collection.drop().catch(() => {
      console.log(`⚠️ Skipped dropping ${collection.collectionName}`);
    });
    console.log(`🗑️ Dropped collection: ${collection.collectionName}`);
  }
  console.log("✅ All collections dropped");
}

// Drop database
export async function dropDatabase() {
  const database = await db();
  await database.dropDatabase();
  console.log("🗑️ Database dropped");
}

// Create collections (example seeding)
export async function createCollections() {
  const database = await db();
  await database.createCollection("users");
  await database.createCollection("products");
  console.log("✅ Collections created: users, products");

  await database.collection("users").insertOne({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  });
  console.log("🌱 Seeded initial user");
}

// CLI execution
(async () => {
  const arg = process.argv[2];
  const target = process.argv[3]; // 👈 for specific collection name
  await connectToMongoClient();

  if (arg === "dropCollections") {
    await dropCollections();
  } else if (arg === "dropDB") {
    await dropDatabase();
  } else if (arg === "createCollections") {
    await createCollections();
  } else if (arg === "dropCollection") {
    if (!target) {
      console.log("❌ Please provide a collection name. Example: npm run db:dropCollection users");
      process.exit(1);
    }
    await dropCollection(target);
  } else {
    console.log("❌ Unknown command. Use: dropCollections | dropCollection <name> | dropDB | createCollections");
  }

  process.exit(0);
})();
