"use client";

import DataManager from "@/app/components/DataManager";
import AddExpense from "@/app/components/Expense/AddExpense";
import DashboardExpense from "@/app/components/Expense/DashboardExpense";
import { IExpense } from "@/app/types/Expense";
import { useFetchData } from "../lib/fetchHelper";

export default function ExpensesPage() {
  const { formattedData: formattedProjects } = useFetchData<{ _id: string; name: string }>("projects");
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  return (
    <DataManager<IExpense>
      entityType="expenses"
      apiEndpoint="/api/api?type=expenses"
      breadcrumbText="Expense"
      breadcrumbLink="expense"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "description", type: "text", label: "Description", required: true },
        {
          name: "projectId",
          type: "select",
          label: "Project",
          placeholder: "Select Project",
          required: true,
          options: formattedProjects.length
            ? formattedProjects
            : [{ label: "No Project available", value: "" }],
        },
        { name: "entryDate", type: "datetime-local", label: "Entry Date"},
        { name: "cost", type: "number", label: "Cost", required: true },
        {
          name: "statusId",
          type: "select",
          label: "Expense Status",
          placeholder: "Select Expense Status",
          required: true,
          options: formattedStatuses.length
            ? formattedStatuses
            : [{ label: "No Expense Status available", value: "" }],
        },
        { name: "isActive", 
          type: "select",
          label: "Active",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
        },
      ]}
      AddComponent={AddExpense}
      DashboardComponent={DashboardExpense}
    />
  );
}