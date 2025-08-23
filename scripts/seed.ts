import "dotenv/config";
import { connectToDatabase } from "@/app/lib/mongodb"; 
import { paths } from "@/app/lib/data/config/Path";

async function seed() {
  const { db } = await connectToDatabase();

  console.log("🟢 Seeding database...");

  // ✅ Create paths
  const createdPaths = await db.collection("paths").insertMany(
    paths.map((p) => ({
      name: p.name,
      path: p.path,
      slash: p.slash,
      icon: p.icon,
      iconImport: p.iconImport,
      showInSidebar: p.showInSidebar ?? true,
      isActive: p.isActive ?? true,
    }))
  );

  console.log("✅ Paths created with IDs:", Object.values(createdPaths.insertedIds));

  // ✅ Example: create roles
  // const roles = [
  //   { name: "Admin" },
  //   { name: "Guest" },
  // ];
  // const createdRoles = await db.collection("roles").insertMany(roles);
  // console.log("✅ Roles created:", Object.values(createdRoles.insertedIds));

  // ✅ Example: create admin user
  // const hashedPassword = await bcrypt.hash("admin123", 10);
  // const adminRoleId = Object.values(createdRoles.insertedIds)[0];
  // const adminUser = await db.collection("users").insertOne({
  //   userId: "admin",
  //   name: "Admin User",
  //   email: "admin@example.com",
  //   phone: "1234567890",
  //   profileImg: "",
  //   password: hashedPassword,
  //   roleId: adminRoleId,
  // });
  // console.log("✅ Admin user created with ID:", adminUser.insertedId);

  console.log("🟢 Database seeding complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});