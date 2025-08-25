/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddExpenses = ({ onSuccess }: { onSuccess: (expenses: any) => void }) => {
const { formattedData: formattedProjects } = useFetchData<{ _id: string; name: string }>("projects");
const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "description", type: "text", label: "Description", placeholder: "Enter Description", required: true },
    { 
      name: "projectId",
      type: "select",
      label: "project",
      placeholder: "Select Project",
      required: true,
      options: formattedProjects.length ? formattedProjects : [{ label: 'No Project available', value: '' }]
    },
    { name: "entryDate", label: "Entry Date", type: "datetime-local" },
    { name: "cost", type: "number", label: "cost", placeholder: "Enter Cost", required: true },
    { 
      name: "statusId",
      type: "select",
      label: "Expense Status",
      placeholder: "Select Expense Status",
      required: true,
      options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Expense Status available', value: '' }]
    },
    { name: "isActive", type: "hidden", required: false, value: true  },
  ];

  return (
    <AddEntity
      entityType="expenses"
      apiEndpoint="/api/api"
      title="Add Expense"
      buttonText="Add Expense"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddExpenses;
