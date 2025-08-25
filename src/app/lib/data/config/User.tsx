/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import { getDb } from "@/app/lib/mongodb";
import { userAllowedPaths, guestAllowedPaths } from "@/app/lib/data/config/Path";

export type SeedUser = {
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  password: string;
  roleId: any;
  userTypeId: any;
  isActive: boolean;
};

// Main seeding function
export async function seedUsers(createdRoles: any[], createdPaths: any[], createdUserTypes: any[]) {
  const db = await getDb();

  const adminRole = createdRoles.find(r => r.name === "admin");
  const userRole = createdRoles.find(r => r.name === "user");
  const guestRole = createdRoles.find(r => r.name === "guest");
  const systemUserType = createdUserTypes.find(u => u.name === "system");

  if (!systemUserType) {
    return;
  }

  const rolePermCol = db.collection("rolePermissions");

  // --- Helper: Create user if not exists ---
  const createUserIfNotExists = async (user: SeedUser) => {
    const existing = await db.collection("users").findOne({ email: user.email });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const result = await db.collection("users").insertOne({ ...user, password: hashedPassword });
      return result.insertedId;
    }
    return existing._id;
  };

  // --- Helper: Assign permissions ---
  const assignPermissions = async (role: any, allowedPaths: string[], canCreate = true, canEdit = true, canDelete = false) => {
    for (const path of createdPaths) {
      if (allowedPaths.includes(path.name)) {
        const existing = await rolePermCol.findOne({ roleId: role._id, pathId: path._id });
        if (!existing) {
          await rolePermCol.insertOne({
            roleId: role._id,
            pathId: path._id,
            canView: true,
            canCreate,
            canEdit,
            canDelete,
            isActive: true,
          });
        }
      }
    }
  };

  // --- Admin ---
  if (adminRole) {
    const adminId = await createUserIfNotExists({
      name: "iqbal",
      email: "iqbal@aceolution.com",
      phone: "1234567890",
      password: "Aceolution_2024",
      roleId: adminRole._id,
      userTypeId: systemUserType._id,
      isActive: true,
    });

    // Admin gets full permissions on all paths
    for (const path of createdPaths) {
      const existing = await rolePermCol.findOne({ roleId: adminRole._id, pathId: path._id });
      if (!existing) {
        await rolePermCol.insertOne({
          roleId: adminRole._id,
          pathId: path._id,
          canView: true,
          canCreate: true,
          canEdit: true,
          canDelete: true,
          isActive: true,
        });
      }
    }
    console.log("✅ Admin user and permissions seeded", adminId);
  }

  // --- User ---
  if (userRole) {
    await createUserIfNotExists({
      name: "deepak",
      email: "deepak@aceolution.com",
      phone: "1234567890",
      password: "Aceolution_2024",
      roleId: userRole._id,
      userTypeId: systemUserType._id,
      isActive: true,
    });
    await assignPermissions(userRole, userAllowedPaths);
    console.log("✅ User role and permissions seeded");
  }

  // --- Guest ---
  if (guestRole) {
    await createUserIfNotExists({
      name: "aswini",
      email: "aswini@aceolution.com",
      phone: "1234567890",
      password: "Aceolution_2024",
      roleId: guestRole._id,
      userTypeId: systemUserType._id,
      isActive: true,
    });
    await assignPermissions(guestRole, guestAllowedPaths, false, false, false);
    console.log("✅ Guest role and permissions seeded");
  }
}
