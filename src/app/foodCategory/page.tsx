"use client";

import DataManager from "@/app/components/DataManager";
import AddFoodCategory from "@/app/components/FoodCategory/AddFoodCategory";
import DashboardFoodCategory from "@/app/components/FoodCategory/DashboardFoodCategory";
import { IFoodCategory } from "@/app/types/FoodCategory";

export default function FoodCategoriesPage() {
  return (
    <DataManager<IFoodCategory>
      entityType="foodCategories"
      apiEndpoint="/api/api?type=foodCategories"
      breadcrumbText="Food Categories"
      breadcrumbLink="foodCategory"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
      ]}
      AddComponent={AddFoodCategory}
      DashboardComponent={DashboardFoodCategory}
    />
  );
}
