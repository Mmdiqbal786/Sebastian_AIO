"use client";

import DataManager from "@/app/components/DataManager";
import AddAssociate from "@/app/components/Associate/AddAssociate";
import DashboardAssociate from "@/app/components/Associate/DashboardAssociate";
import { IAssociate } from "@/app/types/Associate";
import { useFetchData } from "../lib/fetchHelper";

export default function AssociatesPage() {
  const { formattedData: formattedUsers } = useFetchData<{ _id: string; name: string }>("users");
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  return (
    <DataManager<IAssociate>
      entityType="associates"
      apiEndpoint="/api/api?type=associates"
      breadcrumbText="Associates"
      breadcrumbLink="associate"
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
          label: "Associate Status",
          required: true,
          options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Associate Status available', value: '' }]
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
      AddComponent={AddAssociate}
      DashboardComponent={DashboardAssociate}
    />
  );
}
