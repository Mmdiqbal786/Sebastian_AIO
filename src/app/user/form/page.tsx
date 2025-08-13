"use client";

import DataManager from "@/app/components/DataManager";
import AddUser from "@/app/components/User/AddUser";
import DashboardUser from "@/app/components/User/DashboardUser";
import { IUser } from "@/app/types/User";

export default function UsersPage() {
  return (
    <DataManager<IUser>
      entityType="users"
      apiEndpoint="/api/api?type=users"
      breadcrumbText="Users"
      breadcrumbLink="user"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "email", type: "email", label: "Email", required: true },
      ]}
      AddComponent={AddUser}
      DashboardComponent={DashboardUser}
    />
  );
}
