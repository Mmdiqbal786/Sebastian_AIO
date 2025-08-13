"use client";

import DataManager from "@/app/components/DataManager";
import AddFood from "@/app/components/Food/AddFood";
import DashboardFood from "@/app/components/Food/DashboardFood";
import { IFood } from "@/app/types/Food";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function FoodsPage() {
    const { formattedData: formattedFoods } = useFetchData<{ _id: string; name: string }>("foodCategories");
  return (
    <DataManager<IFood>
      entityType="foods"
      apiEndpoint="/api/api?type=foods"
      breadcrumbText="Foods"
      breadcrumbLink="food"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        //   { name: "price", type: "number", label: "Price", required: true },
        //   { name: "stock", type: "number", label: "Stock", required: true },
        { 
          name: "categoryId", 
          type: "select",
          label: "Food Category", 
          required: true,
          options: formattedFoods.length ? formattedFoods : [{ label: 'No food Category available', value: '' }]
        },
        { name: "image", label: "Image", type: "file" },
      ]}
      AddComponent={AddFood}
      DashboardComponent={DashboardFood}
    />
  );
}
