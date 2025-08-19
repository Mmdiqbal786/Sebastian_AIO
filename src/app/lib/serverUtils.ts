/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import UserRole from "@/app/types/Role";
import Employee from "@/app/types/Employee";
import User from "@/app/types/User";
import Plan from "@/app/types/Plan";

/**
 * Find or create a user role in the database.
 */
export const findOrCreateRole = async (roleName: string) => {
  let role = await UserRole.findOne({ name: roleName }).exec();

  if (!role) {
    role = await UserRole.create({
      name: roleName
    });
  }

  return role;
};

/**
 * Get user ID by email.
 */
export async function getUserIdByEmail(email: string): Promise<mongoose.Types.ObjectId | null> {
  const user = await Employee.findOne({ email }, { _id: 1 }).lean().exec() as { _id: mongoose.Types.ObjectId } | null;
  return user ? new mongoose.Types.ObjectId(user._id) : null;
}

/**
 * Find a record dynamically from any collection with custom filters and selected fields.
 */
export async function findRecord<T extends keyof mongoose.Model<any>>(
  collection: mongoose.Model<T>, 
  filters: Record<string, any>, 
  select?: Record<string, 1 | 0>
) {
  return await collection.findOne(filters, select ?? undefined).lean();
}

/**
 * Generate a unique employee ID based on the last user in the database.
 */
// export const generateEmployeeId = async (): Promise<string> => {
//   const lastUser = await Employee.findOne({}, { employeeId: 1 }).sort({ employeeId: -1 });
//   let newEmployeeId = "ACE000001";
//   if (lastUser?.employeeId) {
//     const lastNumber = parseInt(lastUser.employeeId.replace("ACE", ""), 10);
//     newEmployeeId = `ACE${String(lastNumber + 1).padStart(6, "0")}`;
//   }
//   return newEmployeeId;
// };

export const generateEmployeeId = async (): Promise<string> => {
  const lastUser = await User.findOne({}, { userId: 1 }).sort({ userId: -1 });
  let newUserId = "ACE000001";
  if (lastUser?.userId) {
    const lastNumber = parseInt(lastUser.userId.replace("ACE", ""), 10);
    newUserId = `ACE${String(lastNumber + 1).padStart(6, "0")}`;
  }
  return newUserId;
};

/**
 * Process a dynamic subtable field.
 * If the given field is present, this function will try to parse it as JSON (if it's a string),
 * ensure that it is an array, and set the count on a specified field.
 *
 * @param data - The data object containing the subtable field.
 * @param fieldName - The name of the subtable field to process (e.g. "foodSelections").
 * @param countFieldName - Optional custom field name to store the count. Defaults to `${fieldName}Count`.
 * @returns The updated data object.
 */
export function processSubTableField(
  data: any,
  fieldName: string,
  countFieldName?: string
): any {
  const targetCountField = countFieldName || `${fieldName}Count`;
  const fieldValue = data[fieldName];

  if (fieldValue) {
    if (typeof fieldValue === "string") {
      try {
        data[fieldName] = JSON.parse(fieldValue);
      } catch (error:any) {
        console.log(error);
      }
    }
    data[targetCountField] = Array.isArray(data[fieldName])
      ? data[fieldName].length
      : 0;
  } else {
    data[fieldName] = [];
    data[targetCountField] = 0;
  }

  return data;
}

/**
 * Process the foodSelections field.
 * If the given field is present, this function will try to parse it as JSON (if it's a string),
 * then if it's an object (and not an array), it converts it into an array of objects.
 *
 * @param data - The data object containing the foodSelections field.
 * @param fieldName - The name of the field to process. Defaults to "foodSelections".
 * @returns The updated data object.
 */
export function processFoodSelections(
  data: any,
  fieldName: string = "foodSelections"
): any {
  console.log("Before processing, foodSelections:", data[fieldName]);
  const fieldValue = data[fieldName];

  if (fieldValue) {
    if (typeof fieldValue === "string") {
      try {
        const parsed = JSON.parse(fieldValue);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          data[fieldName] = Object.keys(parsed).map((key) => ({
            category: key,
            selectedFoods: parsed[key],
          }));
        } else if (Array.isArray(parsed)) {
          data[fieldName] = parsed;
        }
      } catch (error) {
        console.error("Error parsing foodSelections:", error);
      }
    } else if (typeof fieldValue === "object" && !Array.isArray(fieldValue)) {
      data[fieldName] = Object.keys(fieldValue).map((key) => ({
        category: key,
        selectedFoods: fieldValue[key],
      }));
    }
  } else {
    data[fieldName] = [];
  }
  console.log("After processing, foodSelections:", data[fieldName]);
  return data;
}

/**
 * Converts specified fields in an object to numbers.
 * If a field is not a valid number, it remains unchanged.
 *
 * @param data - The data object containing the fields.
 * @param fields - An array of field names to convert to numbers.
 * @returns The updated data object with converted numeric values.
 */
export function convertFieldsToNumber(data: any, fields: string[]): any {
  fields.forEach((field) => {
    if (data[field] !== undefined && data[field] !== null) {
      const convertedValue = Number(data[field]);
      if (!isNaN(convertedValue)) {
        data[field] = convertedValue;
      }
    }
  });
  return data;
}

export async function updateDaysAndPrice(data: {
  validFrom?: string;
  validTill?: string;
  planId?: string;
  totalDays?: number;
  price?: number;
}): Promise<void> {
  console.log("updateDaysAndPrice input:", data.validFrom, data.validTill, data.planId);
  if (data.validFrom && data.validTill && data.planId) {
    const start = new Date(data.validFrom);
    const end = new Date(data.validTill);
    const diffTime = end.getTime() - start.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      diffDays = 1;
    }
    console.log("Calculated diffDays:", diffDays);
    data.totalDays = diffDays;
    const plan = await Plan.findById(data.planId);
    if (plan && plan.price) {
      data.price = plan.price * diffDays;
    } else {
      console.log("No valid plan found or plan.price is 0");
    }
  } else {
    console.log("Insufficient data for calculation");
  }
}

export function transformDynamicGroupValue(rawValue: any): Record<string, string[]> {
  let transformedValue: Record<string, string[]> = {};

  if (!rawValue) {
    return transformedValue;
  }

  // If the value is a string, parse it first
  const parsedValue = typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;

  // If it's an array, transform it to the object shape
  if (Array.isArray(parsedValue)) {
    parsedValue.forEach((item: any) => {
      // Check for the expected properties
      if (item.category && item.selectedFoods) {
        transformedValue[item.category] = Array.isArray(item.selectedFoods)
          ? item.selectedFoods
          : [];
      }
    });
  } else if (typeof parsedValue === "object") {
    // If it's already an object, assume it is in the correct format
    transformedValue = parsedValue;
  }

  return transformedValue;
}
