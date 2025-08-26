"use client";

import DataManager from "@/app/components/DataManager";
import AddEmployee from "@/app/components/Employee/AddEmployee";
import DashboardEmployee from "@/app/components/Employee/DashboardEmployee";
import { IEmployee } from "@/app/types/Employee";
import { useFetchData } from "../lib/fetchHelper";

export default function UsersPage() {
  const { formattedData: formattedUsers } = useFetchData<{ _id: string; name: string }>("users");
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  return (
    <DataManager<IEmployee>
      entityType="employees"
      apiEndpoint="/api/api?type=employees"
      breadcrumbText="Employees"
      breadcrumbLink="employee"
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
          label: "Employee Status",
          required: true,
          options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Employee Status available', value: '' }]
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
      AddComponent={AddEmployee}
      DashboardComponent={DashboardEmployee}
    />
  );
}
