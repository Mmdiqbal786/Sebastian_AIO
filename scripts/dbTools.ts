// /* eslint-disable @typescript-eslint/no-explicit-any */
// import "dotenv/config";
// import { getDb, connectToDatabase } from "@/app/lib/mongodb";
// import { paths } from "@/app/lib/data/config/Path";
// import { roles } from "@/app/lib/data/config/Role";
// import { userTypes } from "@/app/lib/data/config/UserType";
// import { rolePermissions } from "@/app/lib/data/config/RolePermission";
// import bcrypt from "bcryptjs";

// // --- 🔹 Predefined Data ---
// const seedData = {
//   roles: roles.map((r) => ({
//     name: r.name,
//     isActive: r.isActive ?? true,
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
//     showInSidebar: p.showInSidebar ?? true,
//     isActive: p.isActive ?? true,
//   })),
// };

// export async function seedRolePermissions() {
//   const database = await getDb();

//   const roles = await database.collection("roles").find({}).toArray();
//   const paths = await database.collection("paths").find({}).toArray();

//   const rolePermissionDocs = [];

//   for (const rp of rolePermissions) {
//   const match = rp.name.match(/^([a-zA-Z]+)(Owner|Viewer|Editor)$/);

//   if (!match) {
//     console.warn(`⚠️ Could not parse rolePermission name: ${rp.name}`);
//     continue;
//   }

//   const [, pathName, roleNameSuffix] = match; // ✅ fixed

//   const pathDoc = paths.find(
//     (p) => p.name.toLowerCase() === pathName.toLowerCase()
//   );
//   if (!pathDoc) {
//     console.warn(`⚠️ Path not found for: ${rp.name}`);
//     continue;
//   }

//   const roleDoc = roles.find(
//     (r) => r.name.toLowerCase() === roleNameSuffix.toLowerCase()
//   );
//   if (!roleDoc) {
//     console.warn(`⚠️ Role not found for: ${rp.name}`);
//     continue;
//   }

//   rolePermissionDocs.push({
//     name: rp.name,
//     roleId: roleDoc._id,
//     pathId: pathDoc._id,
//     canView: rp.canView,
//     canCreate: rp.canCreate,
//     canEdit: rp.canUpdate,
//     canDelete: rp.canDelete,
//     isActive: rp.isActive ?? true,
//   });
// }

//   if (rolePermissionDocs.length > 0) {
//     await database.collection("role_permissions").insertMany(rolePermissionDocs);
//     console.log(`🌱 Seeded ${rolePermissionDocs.length} role_permissions`);
//   }
// }

// // --- 🔹 Create one collection (with seeding) ---
// export async function createCollection(collectionName: string) {
//   const database = await getDb();
//   const collections = await database
//     .listCollections({ name: collectionName })
//     .toArray();

//   if (collections.length > 0) {
//     console.log(`⚠️ Collection "${collectionName}" already exists`);
//     return;
//   }

//   await database.createCollection(collectionName);
//   console.log(`✅ Created collection: ${collectionName}`);

//   // Seed if predefined
//   if (seedData[collectionName as keyof typeof seedData]) {
//     await database
//       .collection(collectionName)
//       .insertMany(seedData[collectionName as keyof typeof seedData]);
//     console.log(`🌱 Seeded ${collectionName} with data`);
//   }
// }

// // --- 🔹 Create multiple collections (with seeding) ---
// export async function createCollections() {
//   const database = await getDb();

//   for (const col of Object.keys(seedData)) {
//     const collections = await database
//       .listCollections({ name: col })
//       .toArray();
//     if (collections.length === 0) {
//       await database.createCollection(col);
//       console.log(`✅ Created collection: ${col}`);

//       await database
//         .collection(col)
//         .insertMany(seedData[col as keyof typeof seedData]);
//       console.log(`🌱 Seeded ${col} with data`);
//     } else {
//       console.log(`⚠️ Collection "${col}" already exists`);
//     }
//   }

//   // ✅ Create admin user linked to Admin role
//   const createdRoles = await database.collection("roles").find({}).toArray();
//   const adminRole = createdRoles.find((r) => r.name === "Admin");

//   if (adminRole) {
//     const hashedPassword = await bcrypt.hash("admin123", 10);
//     const existingAdmin = await database
//       .collection("users")
//       .findOne({ email: "admin@example.com" });

//     if (!existingAdmin) {
//       const adminUser = await database.collection("users").insertOne({
//         userId: "admin",
//         name: "Admin User",
//         email: "admin@example.com",
//         phone: "1234567890",
//         profileImg: "",
//         password: hashedPassword,
//         roleId: adminRole._id,
//       });
//       console.log("✅ Admin user created with ID:", adminUser.insertedId);
//     } else {
//       console.log("⚠️ Admin user already exists");
//     }
//   }
// }

// // --- 🔹 Drop specific collection ---
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

// // --- 🔹 Drop all collections ---
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

// // --- 🔹 Drop entire database ---
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

//   if (arg === "dropCollections") {
//     await dropCollections();
//   } else if (arg === "dropDB") {
//     await dropDatabase();
//   } else if (arg === "createCollections") {
//     await createCollections();
//   } else if (arg === "createCollection") {
//     if (!target) {
//       console.log(
//         "❌ Please provide a collection name. Example: npm run db:createCollection users"
//       );
//       process.exit(1);
//     }
//     await createCollection(target);
//   } else if (arg === "dropCollection") {
//     if (!target) {
//       console.log(
//         "❌ Please provide a collection name. Example: npm run db:dropCollection users"
//       );
//       process.exit(1);
//     }
//     await dropCollection(target);
//   } else if (arg === "test") {
//     await testConnection();
//   } else {
//     console.log(`
// ❌ Unknown command.

// Usage:
//   npm run db:createCollection <name>
//   npm run db:createCollections
//   npm run db:dropCollection <name>
//   npm run db:dropCollections
//   npm run db:dropDB
//   npm run db:test
//     `);
//   }

//   process.exit(0);
// })();

/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import { getDb, connectToDatabase } from "@/app/lib/mongodb";
import { paths } from "@/app/lib/data/config/Path";
import { roles } from "@/app/lib/data/config/Role";
import { statuses } from "@/app/lib/data/config/Status";
import { userTypes } from "@/app/lib/data/config/UserType";
import { rolePermissions } from "@/app/lib/data/config/RolePermission";
import bcrypt from "bcryptjs";

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

// --- 🔹 Seed Role Permissions ---
export async function seedRolePermissions() {
  const database = await getDb();

  const roles = await database.collection("roles").find({}).toArray();
  const paths = await database.collection("paths").find({}).toArray();

  const rolePermissionDocs: any[] = [];

  for (const rp of rolePermissions) {
    const match = rp.name.match(/^([a-zA-Z]+)(Owner|Viewer|Editor)$/);

    if (!match) {
      console.warn(`⚠️ Could not parse rolePermission name: ${rp.name}`);
      continue;
    }

    const [, pathName, roleNameSuffix] = match;

    const pathDoc = paths.find(
      (p) => p.name.toLowerCase() === pathName.toLowerCase()
    );
    if (!pathDoc) {
      console.warn(`⚠️ Path not found for: ${rp.name}`);
      continue;
    }

    const roleDoc = roles.find(
      (r) => r.name.toLowerCase() === roleNameSuffix.toLowerCase()
    );
    if (!roleDoc) {
      console.warn(`⚠️ Role not found for: ${rp.name}`);
      continue;
    }

    rolePermissionDocs.push({
      name: rp.name,
      roleId: roleDoc._id,
      pathId: pathDoc._id,
      canView: rp.canView,
      canCreate: rp.canCreate,
      canEdit: rp.canUpdate,
      canDelete: rp.canDelete,
      isActive: rp.isActive ?? true,
    });
  }

  if (rolePermissionDocs.length > 0) {
    await database
      .collection("role_permissions")
      .insertMany(rolePermissionDocs);
    console.log(`🌱 Seeded ${rolePermissionDocs.length} role_permissions`);
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

  // ✅ After roles & paths, seed role_permissions
  await seedRolePermissions();

  // ✅ Create default Admin user
  const createdRoles = await database.collection("roles").find({}).toArray();
  const adminRole = createdRoles.find((r) => r.name === "Admin");

  if (adminRole) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const existingAdmin = await database
      .collection("users")
      .findOne({ email: "admin@example.com" });

    if (!existingAdmin) {
      const adminUser = await database.collection("users").insertOne({
        userId: "admin",
        name: "Admin User",
        email: "admin@example.com",
        phone: "1234567890",
        profileImg: "",
        password: hashedPassword,
        roleId: adminRole._id,
      });
      console.log("✅ Admin user created with ID:", adminUser.insertedId);
    } else {
      console.log("⚠️ Admin user already exists");
    }
  }
}

// --- 🔹 Drop Single Collection ---
export async function dropCollection(collectionName: string) {
  const database = await getDb();
  try {
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

// --- 🔹 Drop All Collections ---
export async function dropCollections() {
  const database = await getDb();
  const collections = await database.collections();

  for (const collection of collections) {
    await collection.drop().catch(() => {
      console.log(`⚠️ Skipped dropping ${collection.collectionName}`);
    });
    console.log(`🗑️ Dropped collection: ${collection.collectionName}`);
  }
  console.log("✅ All collections dropped");
}

// --- 🔹 Drop Entire Database ---
export async function dropDatabase() {
  const database = await getDb();
  await database.dropDatabase();
  console.log("🗑️ Database dropped");
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
