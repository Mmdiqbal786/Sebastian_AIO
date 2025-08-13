"use client";

import DataManager from "@/app/components/DataManager";
import AddPlan from "@/app/components/Plan/AddPlan";
import DashboardPlan from "@/app/components/Plan/DashboardPlan";
import { IPlan } from "@/app/types/Plan";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function PlansPage() {
    const { formattedData: formattedFoods } = useFetchData<{ _id: string; name: string }>("foodCategories");
    
  return (
    <DataManager<IPlan>
      entityType="plans"
      apiEndpoint="/api/api?type=plans"
      breadcrumbText="Plans"
      breadcrumbLink="plan"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "price", type: "number", label: "Price", required: true },
        {
          name: "foodSelections",
          type: "subtable",
          label: "Food Selections",
          subFields: [
            {
              name: "category",
              type: "select",
              label: "Food Category",
              required: true,
              options: formattedFoods.length ? formattedFoods : [{ label: 'No food Category available', value: '' }],
            },
            {
              name: "selectionLimit",
              type: "number",
              label: "Selection Limit",
              required: true,
            },
          ],
        },
      ]}
      AddComponent={AddPlan}
      DashboardComponent={DashboardPlan}
    />
  );
}
