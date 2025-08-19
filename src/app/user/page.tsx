// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import DataManager from "@/app/components/DataManager";
// import AddUser from "@/app/components/User/AddUser";
// import DashboardUser from "@/app/components/User/DashboardUser";
// import { IUser } from "@/app/types/User";

// export default function UsersPage() {
//   return (
//     <DataManager<IUser>
//       entityType="users"
//       apiEndpoint="/api/api?type=users"
//       breadcrumbText="Users"
//       breadcrumbLink="user"
//       fields={[
//         { name: "name", type: "text", label: "Name", required: true },
//         { name: "email", type: "email", label: "Email", required: true },
//       ]}
//       AddComponent={AddUser}
//       DashboardComponent={DashboardUser}
//     />
//   );
// }

// "use client";

// import DataManager from "@/app/components/DataManager";
// import AddUser from "@/app/components/User/AddUser";
// import DashboardUser from "@/app/components/User/DashboardUser";
// import { IUser } from "@/app/types/User";
// import { useFetchData } from "@/app/lib/fetchHelper";
// import { useEffect, useMemo, useState } from "react";
// import { Types } from "mongoose";

// interface CategoryOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
//   plans: string[];
// }

// interface PlanOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
//   price: number;
//   selectionLimit?: number;
//   totalFoodSelections?: number;
//   foodSelections?: { category: string; selectionLimit: number }[];
// }

// interface FoodOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
//   categoryId: string;
// }

// interface FoodCategory {
//   _id: string;
//   name: string;
// }

// interface IOption {
//   label: string;
//   value: string;
// }

// export default function UsersPage() {
//   const { formattedData: formattedSlots } = useFetchData<{ _id: string; name: string }>("slots");
//   const { formattedData: rawCategories } = useFetchData<{ _id: string; name: string; plans: string }>("categories");
//   const formattedCategories: CategoryOption[] = rawCategories.map((cat) => ({
//     label: cat.name,
//     value: cat._id.toString(),
//     _id: cat._id.toString(),
//     name: cat.name,
//     plans: cat.plans ? JSON.parse(cat.plans) : [],
//   }));

//   const { formattedData: rawPlans } = useFetchData<{
//     _id: string;
//     name: string;
//     price: number;
//     selectionLimit?: number;
//     foodSelections?: string;
//   }>("plans");
//   const formattedPlans: PlanOption[] = rawPlans.map((plan) => ({
//     label: plan.name,
//     value: plan._id.toString(),
//     _id: plan._id.toString(),
//     name: plan.name,
//     price: plan.price,
//     selectionLimit: plan.selectionLimit,
//     totalFoodSelections: (plan as any).totalFoodSelections,
//     foodSelections:
//       plan.foodSelections && typeof plan.foodSelections === "string"
//         ? JSON.parse(plan.foodSelections)
//         : plan.foodSelections,
//   }));

//   const { formattedData: rawFoods } = useFetchData<{ _id: string; name: string; categoryId: string }>("foods");
//   const formattedFoods: FoodOption[] = rawFoods.map((food) => ({
//     label: food.name,
//     value: food._id.toString(),
//     _id: food._id.toString(),
//     name: food.name,
//     categoryId: food.categoryId.toString(),
//   }));

//   const { formattedData: rawFoodCategories } = useFetchData<{ _id: string; name: string }>("foodCategories");
//   const foodCategories: FoodCategory[] = rawFoodCategories.map((fc) => ({
//     _id: fc._id.toString(),
//     name: fc.name,
//   }));

//   // Build a lookup object for food category names
//   const foodCategoryLookup = useMemo(() => {
//     return foodCategories.reduce((acc: Record<string, string>, fc) => {
//       acc[fc._id] = fc.name;
//       return acc;
//     }, {} as Record<string, string>);
//   }, [foodCategories]);

//   // Local state to track selected values and computed dates/prices
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedPlan, setSelectedPlan] = useState<string>("");
//   const [localValidFrom, setLocalValidFrom] = useState<string>("");
//   const [localValidTill, setLocalValidTill] = useState<string>("");
//   const [totalDays, setTotalDays] = useState<number>(0);
//   const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

//   // Initialize the selected category if none is chosen
//   useEffect(() => {
//     if (!selectedCategory && formattedCategories.length > 0) {
//       setSelectedCategory(formattedCategories[0].value);
//       setSelectedPlan("");
//     }
//   }, [formattedCategories, selectedCategory]);

//   // Compute available plans based on the selected category
//   const filteredPlans = useMemo(() => {
//     if (!selectedCategory) {
//       return [];
//     }
//     const category = formattedCategories.find((cat) => cat.value === selectedCategory);
//     return category ? formattedPlans.filter((plan) => category.plans.includes(plan._id)) : [];
//   }, [selectedCategory, formattedCategories, formattedPlans]);

//   // Update selectedPlan when a plan is chosen (convert ObjectId if needed)
//   const handlePlanChange = (_: string, value: string | Types.ObjectId) => {
//     const planId = typeof value === "string" ? value : value.toString();
//     setSelectedPlan(planId);
//   };

//   // Compute available foods based on the selected plan
//   const filteredFoods = useMemo(() => {
//     if (!selectedPlan) {
//       return [];
//     }
//     const plan = formattedPlans.find((p) => p.value === selectedPlan);
//     if (plan && plan.foodSelections) {
//       const allowedFoodCategoryIds = plan.foodSelections.map((fs) => fs.category.toString());
//       return formattedFoods.filter((food) => allowedFoodCategoryIds.includes(food.categoryId));
//     }
//     return [];
//   }, [selectedPlan, formattedFoods, formattedPlans]);

//   // Compute dynamic groups for the food selections multi-select field
//   const groups = useMemo(() => {
//     if (!selectedPlan) {
//       return [];
//     }
//     const plan = formattedPlans.find((p) => p.value === selectedPlan);
//     if (!plan || !plan.foodSelections) {
//       return [];
//     }
//     const groupsMap = filteredFoods.reduce((acc: Record<string, IOption[]>, food) => {
//       if (!acc[food.categoryId]) {
//         acc[food.categoryId] = [];
//       }
//       acc[food.categoryId].push({ label: food.label, value: food.value });
//       return acc;
//     }, {} as Record<string, IOption[]>);
//     return plan.foodSelections.map((fs) => ({
//       groupName: fs.category.toString(),
//       groupLabel: foodCategoryLookup[fs.category.toString()] || fs.category.toString(),
//       defaultOptions: groupsMap[fs.category.toString()] || [],
//       selectionLimit: fs.selectionLimit,
//       placeholder: "Please select options",
//       emptyMessage: "No options available",
//     }));
//   }, [selectedPlan, filteredFoods, formattedPlans, foodCategoryLookup]);

//   // Auto-calculate validTill if validFrom is set and validTill is not yet defined
//   useEffect(() => {
//     if (localValidFrom && !localValidTill) {
//       const start = new Date(localValidFrom);
//       start.setDate(start.getDate() + 1);
//       setLocalValidTill(start.toISOString().split("T")[0]);
//     }
//   }, [localValidFrom, localValidTill]);

//   // Calculate total days and price based on validFrom, validTill, and the selected plan
//   useEffect(() => {
//     if (localValidFrom && localValidTill && selectedPlan) {
//       const start = new Date(localValidFrom);
//       const end = new Date(localValidTill);
//       const diffTime = Math.abs(end.getTime() - start.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       setTotalDays(diffDays);
//       const plan = formattedPlans.find((p) => p.value === selectedPlan);
//       if (plan) {
//         setCalculatedPrice(plan.price * diffDays);
//       }
//     }
//   }, [localValidFrom, localValidTill, selectedPlan, formattedPlans]);

//   return (
//     <DataManager<IUser>
//       entityType="users"
//       apiEndpoint="/api/api?type=users"
//       breadcrumbText="Users"
//       breadcrumbLink="user"
//       fields={[
//         { name: "name", type: "text", label: "Name", required: true },
//         { name: "email", type: "email", label: "Email", required: true },
//         { name: "phone", type: "phone", label: "Phone", required: true },
//         { name: "address", type: "textarea", label: "Address", required: true },
//         { name: "profileImg", type: "file", label: "Profile Pic", required: false },
//         {
//           name: "validFrom",
//           type: "date",
//           label: "From Date & Time",
//           placeholder: "Select start date",
//           required: true,
//           onChange: (_name: string, value: string) => {
//             setLocalValidFrom(value);
//           },
//         },
//         {
//           name: "validTill",
//           type: "date",
//           label: "To Date & Time",
//           placeholder: "Select end date",
//           required: true,
//           onChange: (_name: string, value: string) => {
//             setLocalValidTill(value);
//           },
//         },
//         {
//           name: "timeSlot",
//           type: "select",
//           label: "Time Slot",
//           placeholder: "Select Time slot",
//           required: true,
//           options: formattedSlots.length
//             ? formattedSlots
//             : [{ label: "No Categories available", value: "" }],
//         },
//         {
//           name: "categoryId",
//           type: "control-select",
//           label: "Category",
//           placeholder: "Select Category",
//           required: true,
//           options: formattedCategories,
//           onChange: (_: string, value: string | Types.ObjectId) => {
//             const catId = typeof value === "string" ? value : value.toString();
//             setSelectedCategory(catId);
//             setSelectedPlan("");
//           },
//         },
//         {
//           name: "planId",
//           type: "control-select",
//           label: "Plan",
//           placeholder: "Select Plan",
//           required: true,
//           options:
//             filteredPlans.length > 0
//               ? filteredPlans
//               : [{ label: "No Plans available", value: "", _id: "", name: "" }],
//           onChange: handlePlanChange,
//         },
//         {
//           name: "foodSelections",
//           type: "dynamic-group-multiselect",
//           label: "Food Selections",
//           required: false,
//           config: {
//             groups: groups,
//           },
//           transformValue: (value: any) =>
//             typeof value === "string" ? JSON.parse(value) : value,
//           onChange: (_fieldName: string, value: any) => {
//             console.log("Grouped food selections:", value);
//           },
//         },
//         {
//           name: "totalDays",
//           type: "hidden",
//           required: false,
//           value: totalDays,
//         },
//         {
//           name: "price",
//           type: "hidden",
//           required: false,
//           value: calculatedPrice,
//         },
//       ]}
//       AddComponent={AddUser}
//       DashboardComponent={DashboardUser}
//     />
//   );
// }

"use client";

import DataManager from "@/app/components/DataManager";
import AddUser from "@/app/components/User/AddUser";
import DashboardUser from "@/app/components/User/DashboardUser";
import { IUser } from "@/app/types/User";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function UsersPage() {
  const { formattedData: formattedTypes } = useFetchData<{ _id: string; name: string }>("userTypes");
  return (
    <DataManager<IUser>
      entityType="users"
      apiEndpoint="/api/api?type=users"
      breadcrumbText="Users"
      breadcrumbLink="user"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "email", type: "email", label: "Email", required: true },
        { name: "phone", type: "phone", label: "Phone", required: true },
        { name: "profileImg", type: "file", label: "Profile Pic", required: false },
        {
          name: "userTypeId",
          type: "select",
          label: "User Type",
          placeholder: "Select User Type",
          required: true,
          options: formattedTypes.length
            ? formattedTypes
            : [{ label: "No User Types available", value: "" }],
        },
      ]}
      AddComponent={AddUser}
      DashboardComponent={DashboardUser}
    />
  );
}
