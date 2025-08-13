import Employee from "@/app/types/Employee";

export async function generateEmployeeId(): Promise<string> {
  const lastEmployee = await Employee.findOne().sort({ _id: -1 }).select("employeeId");
  if (!lastEmployee) return "ACE000001";

  const lastNumber = parseInt(lastEmployee.employeeId.replace("ACE", ""), 10);
  return `ACE${String(lastNumber + 1).padStart(6, "0")}`;
}
