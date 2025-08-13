/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";

const AddFoods = ({ onSuccess }: { onSuccess: (foods: any) => void }) => {
  // const user = useAuth();
  const { formattedData: formattedFoods } = useFetchData<{ _id: string; name: string }>("foodCategories");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    // { name: "price", type: "number", label: "Price", placeholder: "Enter Price", required: true },
    // { name: "stock", type: "number", label: "Stock", placeholder: "Enter Stock", required: true },
    { 
      name: "categoryId", 
      type: "select",
      label: "Food Category", 
      placeholder: "Select Food Category", 
      required: true,
      options: formattedFoods.length ? formattedFoods : [{ label: 'No Categories available', value: '' }]
    },
    { name: "image", label: "Image", type: "file", required: true },
  ];

  return (
    <AddEntity
      entityType="foods"
      apiEndpoint="/api/api"
      title="Add Food"
      buttonText="Add Food"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddFoods;
