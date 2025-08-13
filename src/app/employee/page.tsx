"use client";

import DataManager from "@/app/components/DataManager";
import AddEmployee from "@/app/components/Employee/AddEmployee";
import DashboardEmployee from "@/app/components/Employee/DashboardEmployee";
import { IEmployee } from "@/app/types/Employee";

export default function UsersPage() {
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
        { name: "dob", label: "Date of Birth", type: "datetime-local" },
        { name: "address", label: "Address", type: "textarea", required: true },
        { name: "profileImg", label: "Profile Pic", type: "file" },
        { name: "document", label: "Document", type: "file"},
        { name: "type", 
          type: "select",
          label: "Type",
          required: true, 
          options: [
            { label: "Admin", value: "admin" },
            { label: "Delivery", value: "delivery" },
            { label: "IT", value: "it" },
            { label: "TL", value: "tl" },
            { label: "Manager", value: "manager" },
            { label: "Picker", value: "picker" }
          ] 
        },
      ]}
      AddComponent={AddEmployee}
      DashboardComponent={DashboardEmployee}
    />
  );
}
