// export async function assignType(isFirstUser: boolean): Promise<string> {
//   const typeName = isFirstUser ? "admin" : "default";
//   return typeName;
// }

import UserType from "@/app/types/UserType";

export async function assignType(isFirstUser: boolean): Promise<string> {
  const typeName = isFirstUser ? "system" : "user";
  let userType = await UserType.findOne({ name: typeName }).exec();

  if (!userType) {
    userType = await UserType.create({ name: typeName });
  }

  return userType._id.toString();
}
