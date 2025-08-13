"use client";

import DataManager from "@/app/components/DataManager";
import AddRole from "@/app/components/Role/AddRole";
import DashboardRole from "@/app/components/Role/DashboardRole";
import { IRole } from "@/app/types/Role";

export default function UsersPage() {
  return (
    <DataManager<IRole>
      entityType="roles"
      apiEndpoint="/api/api?type=roles"
      breadcrumbText="Roles"
      breadcrumbLink="role"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
      ]}
      AddComponent={AddRole}
      DashboardComponent={DashboardRole}
    />
  );
}
