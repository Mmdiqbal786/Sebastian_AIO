/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";

const AddCategories = ({ onSuccess }: { onSuccess: (categories: any) => void }) => {
  const { formattedData: formattedPlans } = useFetchData<{ _id: string; name: string }>("plans");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { 
      name: "plans", 
      type: "multi-select", 
      label: "Plans", 
      placeholder: "Select Plan", 
      required: true,
      options: formattedPlans.length ? formattedPlans : [{ label: 'No plans available', value: '' }]
    },
  ];

  return (
    <AddEntity
      entityType="categories"
      apiEndpoint="/api/api"
      title="Add Category"
      buttonText="Add Category"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddCategories;
