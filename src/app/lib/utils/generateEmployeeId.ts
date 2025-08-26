import Associate from "@/app/types/Associate";
import Contractor from "@/app/types/Contractor";
import Employee from "@/app/types/Employee";
// import User from "@/app/types/User";

export async function generateEmployeeId(): Promise<string> {
  const lastEmployee = await Employee.findOne().sort({ _id: -1 }).select("employeeId");
  if (!lastEmployee) {
    return "EMP000001"
  };

  const lastNumber = parseInt(lastEmployee.employeeId.replace("EMP", ""), 10);
  return `EMP${String(lastNumber + 1).padStart(6, "0")}`;
}

export async function generateContractorId(): Promise<string> {
  const lastContractor = await Contractor.findOne().sort({ _id: -1 }).select("contractorId");
  if (!lastContractor) {
    return "CON000001"
  };

  const lastNumber = parseInt(lastContractor.contractorId.replace("CON", ""), 10);
  return `CON${String(lastNumber + 1).padStart(6, "0")}`;
}

export async function generateAssociateId(): Promise<string> {
  const lastAssociate = await Associate.findOne().sort({ _id: -1 }).select("associateId");
  if (!lastAssociate) {
    return "ASS000001"
  };

  const lastNumber = parseInt(lastAssociate.associateId.replace("ASS", ""), 10);
  return `ASS${String(lastNumber + 1).padStart(6, "0")}`;
}

// export async function generateUserId(): Promise<string> {
//   const lastUser = await User.findOne().sort({ _id: -1 }).select("userId");
//   if (!lastUser) {
//     return "USE000001";
//   }

//   const lastNumber = parseInt(lastUser.userId.replace("USE", ""), 10);
//   return `USE${String(lastNumber + 1).padStart(6, "0")}`;
// }