/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { FormField } from "@/app/types/FormFieldType";
// import AddEntity from "@/app/components/AddEntity";

// const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {

//   const formFields: FormField[] = [
//     { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
//     { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
//     { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
//   ];

//   return (
//     <AddEntity
//       entityType="users"
//       apiEndpoint="/api/api"
//       title="Add User"
//       buttonText="Add User"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddUsers;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { FormField } from "@/app/types/FormFieldType";
// import AddEntity from "@/app/components/AddEntity";
// import { useFetchData } from "@/app/lib/fetchHelper";
// import { useState, useEffect, useMemo } from "react";

// interface ExtendedOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
// }

// interface CategoryOption extends ExtendedOption {
//   plans: string[];
// }

// interface PlanOption extends ExtendedOption {
//   selectionLimit?: number;
//   foodSelections?: { category: string; selectionLimit: number }[];
// }

// interface FoodOption extends ExtendedOption {
//   categoryId: string;
// }

// const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {
//   const { formattedData: rawCategories } = useFetchData<{ _id: string; name: string; plans: string }>("categories");
//   const formattedCategories: CategoryOption[] = rawCategories.map((cat) => ({
//     label: cat.name,
//     value: cat._id.toString(),
//     _id: cat._id.toString(),
//     name: cat.name,
//     plans: cat.plans ? JSON.parse(cat.plans) : [],
//   }));

//   const { formattedData: rawPlans } = useFetchData<{ _id: string; name: string; selectionLimit?: number; foodSelections?: string }>("plans");
//   const formattedPlans: PlanOption[] = rawPlans.map((plan) => ({
//     label: plan.name,
//     value: plan._id.toString(),
//     _id: plan._id.toString(),
//     name: plan.name,
//     selectionLimit: plan.selectionLimit,
//     foodSelections:
//       plan.foodSelections && typeof plan.foodSelections === "string"
//         ? JSON.parse(plan.foodSelections)
//         : plan.foodSelections,
//   }));

//   const { formattedData: rawFoods } = useFetchData<{ _id: string; name: string; categoryId: string }>("foods");
//   const formattedFoodsData: FoodOption[] = rawFoods.map((food) => ({
//     label: food.name,
//     value: food._id.toString(),
//     _id: food._id.toString(),
//     name: food.name,
//     categoryId: food.categoryId.toString(),
//   }));

//   useEffect(() => {
//     console.log("formattedCategories", formattedCategories);
//     console.log("formattedPlans", formattedPlans);
//     console.log("formattedFoodsData", formattedFoodsData);
//     formattedFoodsData.forEach(food => {
//       console.log(`Food "${food.name}" has categoryId: "${food.categoryId}"`);
//     });
//   }, [formattedCategories, formattedPlans, formattedFoodsData]);

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedPlan, setSelectedPlan] = useState<string>("");
//   const [dynamicSelectionLimit, setDynamicSelectionLimit] = useState<number | undefined>(undefined);
//   const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

//   useEffect(() => {
//     if (!selectedCategory && formattedCategories.length > 0) {
//       const defaultCat = formattedCategories[0].value;
//       console.log("Auto-selecting default category:", defaultCat);
//       setSelectedCategory(defaultCat);
//     }
//   }, [formattedCategories, selectedCategory]);

//   useEffect(() => {
//     console.log("selectedCategory", selectedCategory);
//     const category = formattedCategories.find((cat) => cat.value === selectedCategory);
//     console.log("selectedCategory object", category);
//   }, [selectedCategory, formattedCategories]);

//   const filteredPlans = useMemo(() => {
//     if (!selectedCategory) return formattedPlans;
//     const category = formattedCategories.find((cat) => cat.value === selectedCategory);
//     if (category) {
//       const filtered = formattedPlans.filter((plan) => category.plans.includes(plan._id));
//       console.log("Filtered plans for category", selectedCategory, filtered);
//       return filtered;
//     }
//     return formattedPlans;
//   }, [selectedCategory, formattedCategories, formattedPlans]);

//   const filteredFoods = useMemo(() => {
//     if (!selectedPlan) return [];
//     const plan = formattedPlans.find((p) => p.value === selectedPlan);
//     if (plan && plan.foodSelections) {
//       const allowedFoodCategoryIds = plan.foodSelections.map((fs) => fs.category.toString());
//       console.log("Allowed food category IDs from plan:", allowedFoodCategoryIds);
//       const result = formattedFoodsData.filter((food) =>
//         allowedFoodCategoryIds.includes(food.categoryId)
//       );
//       console.log("Filtered foods", result);
//       return result;
//     }
//     return [];
//   }, [selectedPlan, formattedFoodsData, formattedPlans]);

//   const formFields: FormField[] = [
//     { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
//     { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
//     { name: "phone", type: "phone", label: "Phone", placeholder: "Enter phone number", required: true },
//     { name: "address", type: "textarea", label: "Address", placeholder: "Enter address", required: true },
//     { name: "profileImg", type: "file", label: "Profile Pic", required: false },
//     {
//       name: "categoryId",
//       type: "select",
//       label: "User Category",
//       placeholder: "Select Category",
//       required: true,
//       options:
//         formattedCategories.length > 0
//           ? formattedCategories
//           : [{ label: "No Categories available", value: "", _id: "", name: "", plans: [] }],
//       onChange: (_: string, value: string) => {
//         console.log("User Category selected:", value);
//         setSelectedCategory(value);
//         setSelectedPlan("");
//         setSelectedFoods([]);
//       },
//     },
//     {
//       name: "planId",
//       type: "select",
//       label: "Plan",
//       placeholder: "Select Plan",
//       required: true,
//       options:
//         filteredPlans.length > 0
//           ? filteredPlans
//           : [{ label: "No Plans available", value: "", _id: "", name: "" }],
//       onChange: (_: string, value: string) => {
//         console.log("Plan selected:", value);
//         setSelectedPlan(value);
//         const plan = formattedPlans.find((p) => p.value === value);
//         setDynamicSelectionLimit(plan?.selectionLimit);
//         setSelectedFoods([]);
//       },
//     },
//     {
//       name: "foodSelections",
//       type: "dynamic-multiselect",
//       key: `foodSelections-${selectedPlan}`,
//       label: "Food Selections",
//       required: false,
//       config: {
//         defaultOptions: filteredFoods,
//         queryParams: {
//           planId: selectedPlan,
//         },
//         selectionLimit: dynamicSelectionLimit,
//         defaultValue: selectedFoods,
//         onChange: (newFoods: string[]) => {
//           console.log("Foods selected:", newFoods);
//           setSelectedFoods(newFoods);
//         },
//       },
//     },
//     { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
//   ];

//   return (
//     <AddEntity
//       entityType="users"
//       apiEndpoint="/api/api"
//       title="Add User"
//       buttonText="Add User"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddUsers;

// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import AddEntity from "@/app/components/AddEntity";
// import { useFetchData } from "@/app/lib/fetchHelper";
// import { FormField } from "@/app/lib/form/ReactForm/types";

// // Define types for the formatted API data.
// interface CategoryOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
//   plans: string[]; // Array of plan IDs (as strings)
// }

// interface PlanOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
//   selectionLimit?: number;
//   foodSelections?: { category: string; selectionLimit: number }[];
// }

// interface FoodOption {
//   label: string;
//   value: string;
//   _id: string;
//   name: string;
//   categoryId: string;
// }

// const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {
//   // Fetch and format Categories.
//   const { formattedData: rawCategories } = useFetchData<{ _id: string; name: string; plans: string }>("categories");
//   const formattedCategories: CategoryOption[] = rawCategories.map((cat) => ({
//     label: cat.name,
//     value: cat._id.toString(),
//     _id: cat._id.toString(),
//     name: cat.name,
//     plans: cat.plans ? JSON.parse(cat.plans) : [],
//   }));

//   // Fetch and format Plans.
//   const { formattedData: rawPlans } = useFetchData<{ _id: string; name: string; selectionLimit?: number; foodSelections?: string }>("plans");
//   const formattedPlans: PlanOption[] = rawPlans.map((plan) => ({
//     label: plan.name,
//     value: plan._id.toString(),
//     _id: plan._id.toString(),
//     name: plan.name,
//     selectionLimit: plan.selectionLimit,
//     foodSelections:
//       plan.foodSelections && typeof plan.foodSelections === "string"
//         ? JSON.parse(plan.foodSelections)
//         : plan.foodSelections,
//   }));

//   // Fetch and format Foods.
//   const { formattedData: rawFoods } = useFetchData<{ _id: string; name: string; categoryId: string }>("foods");
//   const formattedFoods: FoodOption[] = rawFoods.map((food) => ({
//     label: food.name,
//     value: food._id.toString(),
//     _id: food._id.toString(),
//     name: food.name,
//     categoryId: food.categoryId.toString(),
//   }));

//   // Local state to store the currently selected Category and Plan.
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedPlan, setSelectedPlan] = useState<string>("");
//   const [dynamicSelectionLimit, setDynamicSelectionLimit] = useState<number | undefined>(undefined);

//   // Auto-select the first category (if you prefer manual selection, remove or comment this effect).
//   useEffect(() => {
//     if (!selectedCategory && formattedCategories.length > 0) {
//       const defaultCat = formattedCategories[0].value;
//       console.log("Auto-selecting default category:", defaultCat);
//       setSelectedCategory(defaultCat);
//       setSelectedPlan("");
//     }
//   }, [formattedCategories, selectedCategory]);

//   // Filter the plans based on the selected category.
//   const filteredPlans = useMemo(() => {
//     if (!selectedCategory) return [];
//     const category = formattedCategories.find((cat) => cat.value === selectedCategory);
//     if (category) {
//       console.log("Category plans:", category.plans);
//       const filtered = formattedPlans.filter((plan) => category.plans.includes(plan._id));
//       console.log("Filtered plans for category", selectedCategory, filtered);
//       return filtered;
//     }
//     return [];
//   }, [selectedCategory, formattedCategories, formattedPlans]);

//   // Filter the food options based on the selected plan.
//   const filteredFoods = useMemo(() => {
//     if (!selectedPlan) return [];
//     const plan = formattedPlans.find((p) => p.value === selectedPlan);
//     if (plan && plan.foodSelections) {
//       const allowedFoodCategoryIds = plan.foodSelections.map((fs) => fs.category.toString());
//       console.log("Allowed food category IDs from plan:", allowedFoodCategoryIds);
//       const result = formattedFoods.filter((food) =>
//         allowedFoodCategoryIds.includes(food.categoryId)
//       );
//       console.log("Filtered foods", result);
//       return result;
//     }
//     return [];
//   }, [selectedPlan, formattedFoods, formattedPlans]);
  
//   const formFields: FormField[] = [
//     {
//       name: "name",
//       type: "text",
//       label: "Name",
//       placeholder: "Enter Name",
//       required: true,
//     },
//     { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
//     { name: "phone", type: "phone", label: "Phone", placeholder: "Enter phone number", required: true },
//     { name: "address", type: "textarea", label: "Address", placeholder: "Enter address", required: true },
//     { name: "profileImg", type: "file", label: "Profile Pic", required: false },
//     {
//       name: "categoryId",
//       type: "control-select",
//       label: "Category",
//       placeholder: "Select Category",
//       required: true,
//       options: formattedCategories,
//       onChange: (_: string, value: string) => {
//         setSelectedCategory(value);
//         setSelectedPlan("");
//       },
//     },
//     {
//       name: "planId",
//       type: "control-select",
//       label: "Plan",
//       placeholder: "Select Plan",
//       required: true,
//       options:
//         filteredPlans.length > 0
//           ? filteredPlans
//           : [{ label: "No Plans available", value: "", _id: "", name: "" }],
//       onChange: (_: string, value: string) => {
//         setSelectedPlan(value);
//         const plan = formattedPlans.find((p) => p.value === value);
//         setDynamicSelectionLimit(plan?.selectionLimit);
//       },
//     },
//     {
//       name: "foodSelections",
//       type: "dynamic-multiselect",
//       label: "Food Selections",
//       required: false,
//       config: {
//         defaultOptions: filteredFoods,
//         queryParams: { planId: selectedPlan },
//         selectionLimit: dynamicSelectionLimit,
//       },
//       onChange: (_fieldName: string, newFoods: string[]) => {
//         console.log("Foods selected:", newFoods);
//       },
//     },
//     { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
//   ];

//   return (
//     <AddEntity
//       entityType="users"
//       apiEndpoint="/api/api"
//       title="Add User"
//       buttonText="Add User"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddUsers;

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import AddEntity from "@/app/components/AddEntity";
// import { useFetchData } from "@/app/lib/fetchHelper";
// import { FormField } from "@/app/lib/form/ReactForm/types";

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

// export interface DynamicMultiSelectConfig {
//   defaultOptions?: IOption[];
//   selectionLimit?: number;
//   groups?: {
//     groupName: string;           
//     groupLabel?: string;        
//     defaultOptions: IOption[];
//     selectionLimit: number;
//     emptyMessage?: string;
//   }[];
// }

// const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {
//   const { formattedData: rawCategories } = useFetchData<{ _id: string; name: string; plans: string }>("categories");
//   const formattedCategories: CategoryOption[] = rawCategories.map(cat => ({
//     label: cat.name,
//     value: cat._id.toString(),
//     _id: cat._id.toString(),
//     name: cat.name,
//     plans: cat.plans ? JSON.parse(cat.plans) : [],
//   }));

//   const { formattedData: rawPlans } = useFetchData<{ _id: string; name: string; selectionLimit?: number; foodSelections?: string }>("plans");
//   const formattedPlans: PlanOption[] = rawPlans.map(plan => ({
//     label: plan.name,
//     value: plan._id.toString(),
//     _id: plan._id.toString(),
//     name: plan.name,
//     selectionLimit: plan.selectionLimit,
//     totalFoodSelections: (plan as any).totalFoodSelections,
//     foodSelections:
//       plan.foodSelections && typeof plan.foodSelections === "string"
//         ? JSON.parse(plan.foodSelections)
//         : plan.foodSelections,
//   }));

//   const { formattedData: rawFoods } = useFetchData<{ _id: string; name: string; categoryId: string }>("foods");
//   const formattedFoods: FoodOption[] = rawFoods.map(food => ({
//     label: food.name,
//     value: food._id.toString(),
//     _id: food._id.toString(),
//     name: food.name,
//     categoryId: food.categoryId.toString(),
//   }));

//   const { formattedData: rawFoodCategories } = useFetchData<{ _id: string; name: string }>("foodCategories");
//   const foodCategories: FoodCategory[] = rawFoodCategories.map(fc => ({
//     _id: fc._id.toString(),
//     name: fc.name,
//   }));

//   const foodCategoryLookup = useMemo(() => {
//     return foodCategories.reduce((acc: Record<string, string>, fc) => {
//       acc[fc._id] = fc.name;
//       return acc;
//     }, {});
//   }, [foodCategories]);

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedPlan, setSelectedPlan] = useState<string>("");

//   useEffect(() => {
//     if (!selectedCategory && formattedCategories.length > 0) {
//       const defaultCat = formattedCategories[0].value;
//       setSelectedCategory(defaultCat);
//       setSelectedPlan("");
//     }
//   }, [formattedCategories, selectedCategory]);

//   const filteredPlans = useMemo(() => {
//     if (!selectedCategory) return [];
//     const category = formattedCategories.find(cat => cat.value === selectedCategory);
//     if (category) {
//       const filtered = formattedPlans.filter(plan => category.plans.includes(plan._id));
//       return filtered;
//     }
//     return [];
//   }, [selectedCategory, formattedCategories, formattedPlans]);

//   const handlePlanChange = (_: string, value: string) => {
//     setSelectedPlan(value);
//   };

//   const filteredFoods = useMemo(() => {
//     if (!selectedPlan) return [];
//     const plan = formattedPlans.find(p => p.value === selectedPlan);
//     if (plan && plan.foodSelections) {
//       const allowedFoodCategoryIds = plan.foodSelections.map(fs => fs.category.toString());
//       const result = formattedFoods.filter(food => allowedFoodCategoryIds.includes(food.categoryId));
//       return result;
//     }
//     return [];
//   }, [selectedPlan, formattedFoods, formattedPlans]);

//   const groups = useMemo(() => {
//     if (!selectedPlan) return [];
//     const plan = formattedPlans.find(p => p.value === selectedPlan);
//     if (!plan || !plan.foodSelections) return [];
//     const groupsMap = filteredFoods.reduce((acc: { [key: string]: IOption[] }, food) => {
//       if (!acc[food.categoryId]) {
//         acc[food.categoryId] = [];
//       }
//       acc[food.categoryId].push({ label: food.label, value: food.value });
//       return acc;
//     }, {});
//     return plan.foodSelections.map(fs => ({
//       groupName: fs.category.toString(),
//       groupLabel: foodCategoryLookup[fs.category.toString()] || fs.category.toString(),
//       defaultOptions: groupsMap[fs.category.toString()] || [],
//       selectionLimit: fs.selectionLimit,
//       placeholder: "Please select options",
//       emptyMessage: "No options available"
//     }));
//   }, [selectedPlan, filteredFoods, formattedPlans, foodCategoryLookup]);  

//   const formFields: FormField[] = [
//     {
//       name: "name",
//       type: "text",
//       label: "Name",
//       placeholder: "Enter Name",
//       required: true,
//     },
//     {
//       name: "email",
//       type: "email",
//       label: "Email",
//       placeholder: "Enter Email",
//       required: true,
//     },
//     {
//       name: "phone",
//       type: "phone",
//       label: "Phone",
//       placeholder: "Enter phone number",
//       required: true,
//     },
//     {
//       name: "address",
//       type: "textarea",
//       label: "Address",
//       placeholder: "Enter address",
//       required: true,
//     },
//     {
//       name: "profileImg",
//       type: "file",
//       label: "Profile Pic",
//       required: true,
//     },
//     {
//       name: "categoryId",
//       type: "control-select",
//       label: "Category",
//       placeholder: "Select Category",
//       required: true,
//       options: formattedCategories,
//       onChange: (_: string, value: string) => {
//         setSelectedCategory(value);
//         setSelectedPlan("");
//       },
//     },
//     {
//       name: "planId",
//       type: "control-select",
//       label: "Plan",
//       placeholder: "Select Plan",
//       required: true,
//       options:
//         filteredPlans.length > 0
//           ? filteredPlans
//           : [{ label: "No Plans available", value: "", _id: "", name: "" }],
//       onChange: handlePlanChange,
//     },
//     {
//       name: "foodSelections",
//       type: "dynamic-group-multiselect",
//       label: "Food Selections",
//       required: false,
//       config: {
//         groups,
//       },
//     },
//     {
//       name: "password",
//       type: "password",
//       label: "Password",
//       placeholder: "Enter Password",
//       required: true,
//     },
//   ];

//   return (
//     <AddEntity
//       entityType="users"
//       apiEndpoint="/api/api"
//       title="Add User"
//       buttonText="Add User"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddUsers;

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import AddEntity from "@/app/components/AddEntity";
// import { useFetchData } from "@/app/lib/fetchHelper";
// import { FormField } from "@/app/lib/form/ReactForm/types";

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

// export interface DynamicMultiSelectConfig {
//   defaultOptions?: IOption[];
//   selectionLimit?: number;
//   groups?: {
//     groupName: string;
//     groupLabel?: string;
//     defaultOptions: IOption[];
//     selectionLimit: number;
//     emptyMessage?: string;
//     placeholder?: string;
//   }[];
// }

// const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {
//   const { formattedData: formattedSlots } = useFetchData<{ _id: string; name: string }>("slots");

//   // Fetch and format categories
//   const { formattedData: rawCategories } = useFetchData<{ _id: string; name: string; plans: string }>("categories");
//   const formattedCategories: CategoryOption[] = rawCategories.map(cat => ({
//     label: cat.name,
//     value: cat._id.toString(),
//     _id: cat._id.toString(),
//     name: cat.name,
//     plans: cat.plans ? JSON.parse(cat.plans) : [],
//   }));

//   const { formattedData: rawPlans } = useFetchData<{ _id: string; name: string; price: number; selectionLimit?: number; foodSelections?: string }>("plans");
//   const formattedPlans: PlanOption[] = rawPlans.map(plan => ({
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
//   const formattedFoods: FoodOption[] = rawFoods.map(food => ({
//     label: food.name,
//     value: food._id.toString(),
//     _id: food._id.toString(),
//     name: food.name,
//     categoryId: food.categoryId.toString(),
//   }));

//   const { formattedData: rawFoodCategories } = useFetchData<{ _id: string; name: string }>("foodCategories");
//   const foodCategories: FoodCategory[] = rawFoodCategories.map(fc => ({
//     _id: fc._id.toString(),
//     name: fc.name,
//   }));

//   const foodCategoryLookup = useMemo(() => {
//     return foodCategories.reduce((acc: Record<string, string>, fc) => {
//       acc[fc._id] = fc.name;
//       return acc;
//     }, {} as Record<string, string>);
//   }, [foodCategories]);

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedPlan, setSelectedPlan] = useState<string>("");

//   // Default validFrom is set to today's date (YYYY-MM-DD) and validTill is empty
//   const [validFrom, setValidFrom] = useState<string>(new Date().toISOString().split("T")[0]);
//   const [validTill, setValidTill] = useState<string>("");
//   const [totalDays, setTotalDays] = useState<number>(0);
//   const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

//   useEffect(() => {
//     if (!selectedCategory && formattedCategories.length > 0) {
//       setSelectedCategory(formattedCategories[0].value);
//       setSelectedPlan("");
//     }
//   }, [formattedCategories, selectedCategory]);

//   const filteredPlans = useMemo(() => {
//     if (!selectedCategory) return [];
//     const category = formattedCategories.find(cat => cat.value === selectedCategory);
//     return category ? formattedPlans.filter(plan => category.plans.includes(plan._id)) : [];
//   }, [selectedCategory, formattedCategories, formattedPlans]);

//   const handlePlanChange = (_: string, value: string) => {
//     setSelectedPlan(value);
//   };

//   const filteredFoods = useMemo(() => {
//     if (!selectedPlan) return [];
//     const plan = formattedPlans.find(p => p.value === selectedPlan);
//     if (plan && plan.foodSelections) {
//       const allowedFoodCategoryIds = plan.foodSelections.map(fs => fs.category.toString());
//       return formattedFoods.filter(food => allowedFoodCategoryIds.includes(food.categoryId));
//     }
//     return [];
//   }, [selectedPlan, formattedFoods, formattedPlans]);

//   const groups = useMemo(() => {
//     if (!selectedPlan) return [];
//     const plan = formattedPlans.find(p => p.value === selectedPlan);
//     if (!plan || !plan.foodSelections) return [];
//     const groupsMap = filteredFoods.reduce((acc: Record<string, IOption[]>, food) => {
//       if (!acc[food.categoryId]) {
//         acc[food.categoryId] = [];
//       }
//       acc[food.categoryId].push({ label: food.label, value: food.value });
//       return acc;
//     }, {} as Record<string, IOption[]>);
//     return plan.foodSelections.map(fs => ({
//       groupName: fs.category.toString(),
//       groupLabel: foodCategoryLookup[fs.category.toString()] || fs.category.toString(),
//       defaultOptions: groupsMap[fs.category.toString()] || [],
//       selectionLimit: fs.selectionLimit,
//       placeholder: "Please select options",
//       emptyMessage: "No options available"
//     }));
//   }, [selectedPlan, filteredFoods, formattedPlans, foodCategoryLookup]);

//   // Optionally set default validTill if it's empty (example: validFrom + 1 day)
//   useEffect(() => {
//     if (validFrom && !validTill) {
//       const start = new Date(validFrom);
//       start.setDate(start.getDate() + 1);
//       setValidTill(start.toISOString().split("T")[0]);
//     }
//   }, [validFrom, validTill]);

//   // Calculate totalDays and price when validFrom, validTill, or selectedPlan changes
//   useEffect(() => {
//     if (validFrom && validTill && selectedPlan) {
//       const start = new Date(validFrom);
//       const end = new Date(validTill);
//       const diffTime = Math.abs(end.getTime() - start.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       console.log("Start:", start);
//       console.log("End:", end);
//       console.log("Calculated diffDays:", diffDays);
//       setTotalDays(diffDays);
  
//       const plan = formattedPlans.find(p => p.value === selectedPlan);
//       if (plan) {
//         const newPrice = plan.price * diffDays;
//         console.log("Selected Plan:", plan);
//         console.log("Calculated Price:", newPrice);
//         setCalculatedPrice(newPrice);
//       }
//     }
//   }, [validFrom, validTill, selectedPlan, formattedPlans]);  

//   const formFields: FormField[] = [
//     { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
//     { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
//     { name: "phone", type: "phone", label: "Phone", placeholder: "Enter phone number", required: true },
//     { name: "address", type: "textarea", label: "Address", placeholder: "Enter address", required: true },
//     { name: "profileImg", type: "file", label: "Profile Pic", required: true },
//     {
//       name: "validFrom",
//       type: "date",
//       label: "From Date & Time",
//       placeholder: "Select start date & time",
//       required: true,
//       value: validFrom,
//       onChange: (_name: string, value: string) => {
//         setValidFrom(value);
//       },
//     },
//     {
//       name: "validTill",
//       type: "date",
//       label: "To Date & Time",
//       placeholder: "Select end date & time",
//       required: true,
//       value: validTill,
//       onChange: (_name: string, value: string) => {
//         setValidTill(value);
//       },
//     },
//     { 
//       name: "timeSlot", 
//       type: "select",
//       label: "Time Slot", 
//       placeholder: "Select Time slot", 
//       required: true,
//       options: formattedSlots.length ? formattedSlots : [{ label: 'No Categories available', value: '' }]
//     },
//     {
//       name: "categoryId",
//       type: "control-select",
//       label: "Category",
//       placeholder: "Select Category",
//       required: true,
//       options: formattedCategories,
//       onChange: (_: string, value: string) => {
//         setSelectedCategory(value);
//         setSelectedPlan("");
//       },
//     },
//     {
//       name: "planId",
//       type: "control-select",
//       label: "Plan",
//       placeholder: "Select Plan",
//       required: true,
//       options:
//         filteredPlans.length > 0
//           ? filteredPlans
//           : [{ label: "No Plans available", value: "", _id: "", name: "" }],
//       onChange: handlePlanChange,
//     },
//     {
//       name: "foodSelections",
//       type: "dynamic-group-multiselect",
//       label: "Food Selections",
//       required: false,
//       config: {
//         groups,
//       },
//       onChange: (_fieldName: string, value: any) => {
//         console.log("Grouped food selections:", value);
//       },
//     },
//     {
//       name: "totalDays",
//       type: "hidden",
//       required: false,
//       value: totalDays,
//     },
//     {
//       name: "price",
//       type: "hidden",
//       required: false,
//       value: calculatedPrice,
//     },
//     {
//       name: "password",
//       type: "password",
//       label: "Password",
//       placeholder: "Enter Password",
//       required: true,
//     },
//   ];

//   return (
//     <AddEntity
//       entityType="users"
//       apiEndpoint="/api/api"
//       title="Add User"
//       buttonText="Add User"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddUsers;

"use client";

import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {
  const { formattedData: formattedTypes } = useFetchData<{ _id: string; name: string }>("userTypes");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
    { 
      name: "phone",
      label: "Phone",
      type: "phone",
      placeholder: "Enter phone number",
      required: true
    },
    { name: "profileImg", label: "Profile Pic", type: "file", required: true },
    { 
      name: "userTypeId",
      type: "select",
      label: "User Type",
      placeholder: "Select User Type",
      required: true,
      options: formattedTypes.length ? formattedTypes : [{ label: 'No User Types available', value: '' }]
    },
    { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
    { name: "roleId", type: "hidden", required: false  },
  ];

  return (
    <AddEntity
      entityType="users"
      apiEndpoint="/api/api"
      title="Add User"
      buttonText="Add User"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddUsers;
