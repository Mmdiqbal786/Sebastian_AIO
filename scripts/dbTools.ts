// /* eslint-disable @typescript-eslint/no-explicit-any */
// import "dotenv/config";
// import { getDb, connectToDatabase } from "@/app/lib/mongodb";
// import {  paths } from "@/app/lib/data/config/Path";
// import { roles } from "@/app/lib/data/config/Role";
// import { statuses } from "@/app/lib/data/config/Status";
// import { userTypes } from "@/app/lib/data/config/UserType";
// import { seedUsers } from "@/app/lib/data/config/User";

// // --- 🔹 Predefined Seed Data ---
// const seedData = {
//   roles: roles.map((r) => ({
//     name: r.name,
//     isActive: r.isActive ?? true,
//   })),
//   statuses: statuses.map((s) => ({
//     name: s.name,
//     isActive: s.isActive ?? true,
//   })),
//   userTypes: userTypes.map((uT) => ({
//     name: uT.name,
//     isActive: uT.isActive ?? true,
//   })),
//   paths: paths.map((p) => ({
//     name: p.name,
//     path: p.path,
//     slash: p.slash,
//     icon: p.icon,
//     iconImport: p.iconImport,
//     showInSidebar: p.showInSidebar ?? false,
//     isActive: p.isActive ?? true,
//   })),
// };

// // --- 🔹 Create a Single Collection with Seed ---
// export async function createCollection(collectionName: string) {
//   const database = await getDb();
//   const exists = await database
//     .listCollections({ name: collectionName })
//     .toArray();

//   if (exists.length > 0) {
//     console.log(`⚠️ Collection "${collectionName}" already exists`);
//     return;
//   }

//   await database.createCollection(collectionName);
//   console.log(`✅ Created collection: ${collectionName}`);

//   if (seedData[collectionName as keyof typeof seedData]) {
//     await database
//       .collection(collectionName)
//       .insertMany(seedData[collectionName as keyof typeof seedData]);
//     console.log(`🌱 Seeded ${collectionName} with initial data`);
//   }
// }

// // --- 🔹 Create All Collections ---
// export async function createCollections() {
//   const database = await getDb();

//   // --- Create collections and seed predefined data ---
//   for (const [col, data] of Object.entries(seedData)) {
//     const exists = await database.listCollections({ name: col }).toArray();
//     if (exists.length === 0) {
//       await database.createCollection(col);
//       console.log(`✅ Created collection: ${col}`);

//       if (data && Array.isArray(data) && data.length > 0) {
//         await database.collection(col).insertMany(data);
//         console.log(`🌱 Seeded ${col} with ${data.length} records`);
//       }
//     } else {
//       console.log(`⚠️ Collection "${col}" already exists`);
//     }
//   }

//   // --- Fetch created roles, paths, user types ---
//   const createdRoles = await database.collection("roles").find({}).toArray();
//   const createdPaths = await database.collection("paths").find({}).toArray();
//   const createdUserTypes = await database.collection("userTypes").find({}).toArray();

//   // --- Seed Users with Permissions ---
//   await seedUsers(createdRoles, createdPaths, createdUserTypes);

//   console.log("✅ All users and permissions seeded successfully");
// }

// // --- 🔹 Drop Single Collection ---
// export async function dropCollection(collectionName: string) {
//   const database = await getDb();
//   try {
//     await database.collection(collectionName).drop();
//     console.log(`🗑️ Dropped collection: ${collectionName}`);
//   } catch (err: any) {
//     if (err.codeName === "NamespaceNotFound") {
//       console.log(`⚠️ Collection "${collectionName}" does not exist`);
//     } else {
//       console.error("❌ Error dropping collection:", err);
//     }
//   }
// }

// // --- 🔹 Drop All Collections ---
// export async function dropCollections() {
//   const database = await getDb();
//   const collections = await database.collections();

//   for (const collection of collections) {
//     await collection.drop().catch(() => {
//       console.log(`⚠️ Skipped dropping ${collection.collectionName}`);
//     });
//     console.log(`🗑️ Dropped collection: ${collection.collectionName}`);
//   }
//   console.log("✅ All collections dropped");
// }

// // --- 🔹 Drop Entire Database ---
// export async function dropDatabase() {
//   const database = await getDb();
//   await database.dropDatabase();
//   console.log("🗑️ Database dropped");
// }

// // --- 🔹 Test DB Connection ---
// export async function testConnection() {
//   try {
//     const { db } = await connectToDatabase();
//     console.log("✅ Connected to DB:", db.databaseName);

//     const collections = await db.listCollections().toArray();
//     console.log("📂 Collections:", collections.map((c) => c.name));
//   } catch (err) {
//     console.error("❌ Error:", err);
//   }
// }

// // --- 🔹 CLI Runner ---
// (async () => {
//   const arg = process.argv[2];
//   const target = process.argv[3];
//   await connectToDatabase();

//   switch (arg) {
//     case "dropCollections":
//       await dropCollections();
//       break;
//     case "dropDB":
//       await dropDatabase();
//       break;
//     case "createCollections":
//       await createCollections();
//       break;
//     case "createCollection":
//       if (!target) {
//         console.log("❌ Please provide a collection name.");
//         process.exit(1);
//       }
//       await createCollection(target);
//       break;
//     case "dropCollection":
//       if (!target) {
//         console.log("❌ Please provide a collection name.");
//         process.exit(1);
//       }
//       await dropCollection(target);
//       break;
//     case "test":
//       await testConnection();
//       break;
//     default:
//       console.log(`
// ❌ Unknown command.

// Usage:
//   npm run db:createCollection <name>
//   npm run db:createCollections
//   npm run db:dropCollection <name>
//   npm run db:dropCollections
//   npm run db:dropDB
//   npm run db:test
//       `);
//   }

//   process.exit(0);
// })();

/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { getDb, connectToDatabase } from "@/app/lib/mongodb";
import { paths } from "@/app/lib/data/config/Path";
import { roles } from "@/app/lib/data/config/Role";
import { statuses } from "@/app/lib/data/config/Status";
import { userTypes } from "@/app/lib/data/config/UserType";
import { seedUsers } from "@/app/lib/data/config/User";

// --- 🔹 Predefined Seed Data ---
const seedData = {
  roles: roles.map((r) => ({
    name: r.name,
    isActive: r.isActive ?? true,
  })),
  statuses: statuses.map((s) => ({
    name: s.name,
    isActive: s.isActive ?? true,
  })),
  userTypes: userTypes.map((uT) => ({
    name: uT.name,
    isActive: uT.isActive ?? true,
  })),
  paths: paths.map((p) => ({
    name: p.name,
    path: p.path,
    slash: p.slash,
    icon: p.icon,
    iconImport: p.iconImport,
    showInSidebar: p.showInSidebar ?? false,
    isActive: p.isActive ?? true,
  })),
};

// --- 🔹 File Field Map (configure here which fields store file paths) ---
const fileFieldMap: Record<string, string[]> = {
  users: ["profileImg"], // in Users collection, files stored in `profileImg`
  paths: ["icon"],       // in Paths collection, files stored in `icon`
  documents: ["filePath"], // example
};

// --- 🔹 Utility: Unlink Files for a Collection ---
async function unlinkFilesFromCollection(database: any, collectionName: string) {
  const fileFields = fileFieldMap[collectionName];
  if (!fileFields || fileFields.length === 0) {
    return;
  }
  const docs = await database.collection(collectionName).find({}).toArray();
  for (const doc of docs) {
    for (const field of fileFields) {
      const filePath = doc[field];
      if (filePath && typeof filePath === "string") {
        try {
          // Assuming files are in /public relative to project root
          const absolutePath = path.resolve(process.cwd(), "public", filePath);
          await fs.unlink(absolutePath);
          console.log(`🗑️ Deleted file: ${absolutePath}`);
        } catch (err: any) {
          if (err.code !== "ENOENT") {
            console.error(`⚠️ Failed to delete file ${filePath}:`, err);
          }
        }
      }
    }
  }
}

// --- 🔹 Create a Single Collection with Seed ---
export async function createCollection(collectionName: string) {
  const database = await getDb();
  const exists = await database
    .listCollections({ name: collectionName })
    .toArray();

  if (exists.length > 0) {
    console.log(`⚠️ Collection "${collectionName}" already exists`);
    return;
  }

  await database.createCollection(collectionName);
  console.log(`✅ Created collection: ${collectionName}`);

  if (seedData[collectionName as keyof typeof seedData]) {
    await database
      .collection(collectionName)
      .insertMany(seedData[collectionName as keyof typeof seedData]);
    console.log(`🌱 Seeded ${collectionName} with initial data`);
  }
}

// --- 🔹 Create All Collections ---
export async function createCollections() {
  const database = await getDb();

  for (const [col, data] of Object.entries(seedData)) {
    const exists = await database.listCollections({ name: col }).toArray();
    if (exists.length === 0) {
      await database.createCollection(col);
      console.log(`✅ Created collection: ${col}`);

      if (data && Array.isArray(data) && data.length > 0) {
        await database.collection(col).insertMany(data);
        console.log(`🌱 Seeded ${col} with ${data.length} records`);
      }
    } else {
      console.log(`⚠️ Collection "${col}" already exists`);
    }
  }

  const createdRoles = await database.collection("roles").find({}).toArray();
  const createdPaths = await database.collection("paths").find({}).toArray();
  const createdUserTypes = await database.collection("userTypes").find({}).toArray();

  await seedUsers(createdRoles, createdPaths, createdUserTypes);
  console.log("✅ All users and permissions seeded successfully");
}

// --- 🔹 Drop Single Collection (with file unlink) ---
export async function dropCollection(collectionName: string) {
  const database = await getDb();
  try {
    await unlinkFilesFromCollection(database, collectionName);

    await database.collection(collectionName).drop();
    console.log(`🗑️ Dropped collection: ${collectionName}`);
  } catch (err: any) {
    if (err.codeName === "NamespaceNotFound") {
      console.log(`⚠️ Collection "${collectionName}" does not exist`);
    } else {
      console.error("❌ Error dropping collection:", err);
    }
  }
}

// --- 🔹 Drop All Collections (with file unlink) ---
export async function dropCollections() {
  const database = await getDb();
  const collections = await database.collections();

  for (const collection of collections) {
    await unlinkFilesFromCollection(database, collection.collectionName); // unlink each

    await collection.drop().catch(() => {
      console.log(`⚠️ Skipped dropping ${collection.collectionName}`);
    });
    console.log(`🗑️ Dropped collection: ${collection.collectionName}`);
  }

  console.log("✅ All collections dropped with related files");
}

// --- 🔹 Drop Entire Database (with file unlink) ---
export async function dropDatabase() {
  const database = await getDb();

  // first unlink files for every collection
  const collections = await database.collections();
  for (const collection of collections) {
    await unlinkFilesFromCollection(database, collection.collectionName);
  }

  // then drop the whole DB
  await database.dropDatabase();
  console.log("🗑️ Database dropped with all related files");
}

// --- 🔹 Test DB Connection ---
export async function testConnection() {
  try {
    const { db } = await connectToDatabase();
    console.log("✅ Connected to DB:", db.databaseName);

    const collections = await db.listCollections().toArray();
    console.log("📂 Collections:", collections.map((c) => c.name));
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

// --- 🔹 CLI Runner ---
(async () => {
  const arg = process.argv[2];
  const target = process.argv[3];
  await connectToDatabase();

  switch (arg) {
    case "dropCollections":
      await dropCollections();
      break;
    case "dropDB":
      await dropDatabase();
      break;
    case "createCollections":
      await createCollections();
      break;
    case "createCollection":
      if (!target) {
        console.log("❌ Please provide a collection name.");
        process.exit(1);
      }
      await createCollection(target);
      break;
    case "dropCollection":
      if (!target) {
        console.log("❌ Please provide a collection name.");
        process.exit(1);
      }
      await dropCollection(target);
      break;
    case "test":
      await testConnection();
      break;
    default:
      console.log(`
❌ Unknown command.

Usage:
  npm run db:createCollection <name>
  npm run db:createCollections
  npm run db:dropCollection <name>
  npm run db:dropCollections
  npm run db:dropDB
  npm run db:test
      `);
  }

  process.exit(0);
})();
