/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddPayrolls = ({ onSuccess }: { onSuccess: (payrolls: any) => void }) => {
const { formattedData: formattedProjects } = useFetchData<{ _id: string; name: string }>("projects");
const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "location", type: "text", label: "Location", placeholder: "Enter Location", required: true },
    { name: "month", type: "text", label: "Month", placeholder: "Enter Month", required: true },
    { name: "owner", type: "text", label: "Owner", placeholder: "Enter Owner", required: true },
    { name: "payer", type: "text", label: "Payer", placeholder: "Enter Payer", required: true },
    { name: "invoiceOrPayslip", type: "text", label: "Invoice/Payslip", placeholder: "Enter Invoice/Payslip", required: true },
    { name: "payment", type: "number", label: "Payment", placeholder: "Enter Payment", required: true },
    { 
      name: "projectId",
      type: "select",
      label: "project",
      placeholder: "Select Project",
      required: true,
      options: formattedProjects.length ? formattedProjects : [{ label: 'No Project available', value: '' }]
    },
    { 
      name: "statusId",
      type: "select",
      label: "Payroll Status",
      placeholder: "Select Payroll Status",
      required: true,
      options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Expense Status available', value: '' }]
    },
    { name: "isActive", type: "hidden", required: false, value: true  },
  ];

  return (
    <AddEntity
      entityType="payrolls"
      apiEndpoint="/api/api"
      title="Add Payroll"
      buttonText="Add Payroll"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddPayrolls;
