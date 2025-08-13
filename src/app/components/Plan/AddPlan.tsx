// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { FormField } from "@/app/types/FormFieldType";
// import AddEntity from "@/app/components/AddEntity";
// import { useFetchData } from "@/app/lib/fetchHelper";

// const AddPlans = ({ onSuccess }: { onSuccess: (plans: any) => void }) => {
//   const { formattedData: formattedFoods } = useFetchData<{ _id: string; name: string }>("foodCategories");

//   const formFields: FormField[] = [
//     {
//       name: "name",
//       type: "text",
//       label: "Name",
//       placeholder: "Enter Name",
//       required: true,
//     },
//     {
//       name: "price",
//       type: "number",
//       label: "Price",
//       placeholder: "Enter Price",
//       required: true,
//     },
//     {
//       name: "foodSelections",
//       type: "subtable",
//       label: "Food Selections",
//       required: true,
//       initialRows: 1,
//       subFields: [
//         {
//           name: "category",
//           type: "select",
//           label: "Food Category",
//           required: true,
//           options: formattedFoods.length ? formattedFoods : [{ label: 'No Categories available', value: '' }],
//         },
//         {
//           name: "selectionLimit",
//           type: "number",
//           label: "Selection Limit",
//           required: true,
//         },
//       ],
//     },
//   ];

//   return (
//     <AddEntity
//       entityType="plans"
//       apiEndpoint="/api/api"
//       title="Add Plan"
//       buttonText="Add Plan"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddPlans;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { FormField } from "@/app/types/FormFieldType";
import { FormField } from "@/app/lib/form/ReactForm/types";
import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";

const AddPlans = ({ onSuccess }: { onSuccess: (plans: any) => void }) => {
  const { formattedData: formattedFoods } = useFetchData<{ _id: string; name: string }>("foodCategories");

  const formFields: FormField[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Enter Price",
      required: true,
    },
    {
      name: "foodSelections",
      type: "subTable",
      label: "Food Selections",
      required: true,
      initialRows: 1,
      subFields: [
        {
          name: "category",
          type: "select",
          label: "Food Category",
          required: true,
          options: formattedFoods.length ? formattedFoods : [{ label: 'No Categories available', value: '' }],
        },
        {
          name: "selectionLimit",
          type: "number",
          label: "Selection Limit",
          initialRows: 1,
          required: true,
        },
      ]
    },
  ];

  return (
    <AddEntity
      entityType="plans"
      apiEndpoint="/api/api"
      title="Add Plan"
      buttonText="Add Plan"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddPlans;
