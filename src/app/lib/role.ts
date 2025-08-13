import { findOrCreateRole } from "@/app/lib/serverUtils";
import { hashPassword } from "@/app/lib/passwordUtils";

export const processEmployeeRole = async (roleName: string) => {
  const role = await findOrCreateRole(roleName || "employee");
  return role._id;
};

export const processUserRole = async (roleName: string) => {
  const role = await findOrCreateRole(roleName || "user");
  return role._id;
};

export const processPassword = async (password: string) => await hashPassword(password);