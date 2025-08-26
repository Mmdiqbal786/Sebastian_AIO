"use client";

import DataManager from "@/app/components/DataManager";
import AddContractor from "@/app/components/Contractor/AddContractor";
import DashboardContractor from "@/app/components/Contractor/DashboardContractor";
import { IContractor } from "@/app/types/Contractor";
import { useFetchData } from "../lib/fetchHelper";

export default function ContractorsPage() {
  const { formattedData: formattedUsers } = useFetchData<{ _id: string; name: string }>("users");
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  return (
    <DataManager<IContractor>
      entityType="contractors"
      apiEndpoint="/api/api?type=contractors"
      breadcrumbText="Contractors"
      breadcrumbLink="contractor"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "email", type: "email", label: "Email", required: true },
        { 
          name: "phone", 
          label: "Phone", 
          type: "phone",
          required: true
        },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "address", label: "Address", type: "textarea", required: true },
        { name: "document", label: "Document", type: "file"},
        {
          name: "userId",
          type: "select",
          label: "User",
          required: true,
          options: formattedUsers.length ? formattedUsers : [{ label: 'No Users available', value: '' }]
        },
        {
          name: "statusId",
          type: "select",
          label: "Contractor Status",
          required: true,
          options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Contractor Status available', value: '' }]
        },
        { 
          name: "isActive",
          type: "select",
          label: "Active",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
        },
      ]}
      AddComponent={AddContractor}
      DashboardComponent={DashboardContractor}
    />
  );
}
