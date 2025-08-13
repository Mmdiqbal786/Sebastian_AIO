import { NextRequest } from "next/server";

export const passwordSupportedEntities = ["employees", "users"];

export const entityTypes = ["users", "employees", "roles", "foods", "categories", "foodCategories", "plans", "slots"] as const;

export type EntityType = typeof entityTypes[number];

export interface PostRequestParams {
  req: NextRequest;
  entityType: EntityType;
}

export const entityMapping: Record<string, string> = {
  users: "user",
  roles: "role",
  employees: "employee",
  foods: "food",
  categories: "category",
  foodCategories: "foodCategories",
  plans: "plan",
  slots: "slot"
};

type RelationCheck = {
  collection: string;
  field: string;
  message: string;
  isArray?: boolean;          
  convertToObjectId?: boolean;
  storedAsString?: boolean;
};

export const relationMap: Record<string, RelationCheck[]> = {
  roles: [
    { 
      collection: "users", 
      field: "roleId", 
      message: "Cannot delete role as it is assigned to a user.", 
      isArray: false, 
      convertToObjectId: true 
    },
    { 
      collection: "employees", 
      field: "roleId", 
      message: "Cannot delete role as it is assigned to a employee.", 
      isArray: false, convertToObjectId: true 
    }
  ],
  plans: [
    {
      collection: "categories",
      field: "plans",
      message: "Cannot delete plan as it is assigned to a category.",
      isArray: true,
      convertToObjectId: true,
      storedAsString: true
    }
  ],
  foodCategories: [
    { 
      collection: "foods", 
      field: "categoryId", 
      message: "Cannot delete category as it is assigned to a food.", 
      isArray: false, 
      convertToObjectId: true 
    },
    {
      collection: "foods",
      field: "foodCategories",
      message: "Cannot delete category as it is assigned to a food.",
      isArray: true,
      convertToObjectId: true,
      storedAsString: true
    }
  ]
};
