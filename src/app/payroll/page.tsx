"use client";

import DataManager from "@/app/components/DataManager";
import AddPayroll from "@/app/components/Payroll/AddPayroll";
import DashboardPayroll from "@/app/components/Payroll/DashboardPayroll";
import { IPayroll } from "@/app/types/Payroll";
import { useFetchData } from "../lib/fetchHelper";

export default function PayrollsPage() {
  const { formattedData: formattedProjects } = useFetchData<{ _id: string; name: string }>("projects");
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  return (
    <DataManager<IPayroll>
      entityType="payrolls"
      apiEndpoint="/api/api?type=payrolls"
      breadcrumbText="Payroll"
      breadcrumbLink="payroll"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "location", type: "text", label: "Location", required: true },
        { name: "month", type: "text", label: "Month", required: true },
        { name: "owner", type: "text", label: "Owner", required: true },
        { name: "payer", type: "text", label: "Payer", required: true },
        { name: "invoiceOrPayslip", type: "text", label: "Invoice/Payslip", required: true },
        { name: "payment", type: "number", label: "Payment", required: true },
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
        {
          name: "statusId",
          type: "select",
          label: "Payroll Status",
          placeholder: "Select Payroll Status",
          required: true,
          options: formattedStatuses.length
            ? formattedStatuses
            : [{ label: "No Payroll Status available", value: "" }],
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
      AddComponent={AddPayroll}
      DashboardComponent={DashboardPayroll}
    />
  );
}