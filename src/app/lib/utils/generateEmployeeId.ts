// import Employee from "@/app/types/Employee";

// export async function generateEmployeeId(): Promise<string> {
//   const lastEmployee = await Employee.findOne().sort({ _id: -1 }).select("employeeId");
//   if (!lastEmployee) return "ACE000001";

//   const lastNumber = parseInt(lastEmployee.employeeId.replace("ACE", ""), 10);
//   return `ACE${String(lastNumber + 1).padStart(6, "0")}`;
// }

import User from "@/app/types/User";

export async function generateEmployeeId(): Promise<string> {
  const lastUser = await User.findOne().sort({ _id: -1 }).select("userId");
  if (!lastUser) {
    return "ACE000001";
  }

  const lastNumber = parseInt(lastUser.userId.replace("ACE", ""), 10);
  return `ACE${String(lastNumber + 1).padStart(6, "0")}`;
}
