import EmployeeRole from "@/app/types/Role";

export async function assignRole(isFirstUser: boolean): Promise<string> {
  const roleName = isFirstUser ? "admin" : "user";
  let role = await EmployeeRole.findOne({ name: roleName }).exec();

  if (!role) {
    role = await EmployeeRole.create({ name: roleName });
  }

  return role._id.toString();
}
