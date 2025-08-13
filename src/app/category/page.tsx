"use client";

import DataManager from "@/app/components/DataManager";
import AddCategory from "@/app/components/Category/AddCategory";
import DashboardCategory from "@/app/components/Category/DashboardCategory";
import { ICategory } from "@/app/types/Category";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function CategoriesPage() {
  const { formattedData: formattedPlans } = useFetchData<{ _id: string; name: string }>("plans");
  return (
    <DataManager<ICategory>
      entityType="categories"
      apiEndpoint="/api/api?type=categories"
      breadcrumbText="Categories"
      breadcrumbLink="category"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { 
          name: "plans", 
          type: "multi-select", 
          label: "Plans", 
          required: true,
          options: formattedPlans.length ? formattedPlans : [{ label: 'No plans available', value: '' }]
        },
      ]}
      AddComponent={AddCategory}
      DashboardComponent={DashboardCategory}
    />
  );
}
