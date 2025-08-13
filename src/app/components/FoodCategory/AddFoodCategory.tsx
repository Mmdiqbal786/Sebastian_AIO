/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";

const AddFoodCategories = ({ onSuccess }: { onSuccess: (foods: any) => void }) => {
  // const user = useAuth();

  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
  ];

  return (
    <AddEntity
      entityType="foodCategories"
      apiEndpoint="/api/api"
      title="Add Food Categories"
      buttonText="Add Food Categories"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddFoodCategories;
