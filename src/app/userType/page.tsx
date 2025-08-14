"use client";

import DataManager from "@/app/components/DataManager";
import AddUserType from "@/app/components/UserType/AddUserType";
import DashboardUserType from "@/app/components/UserType/DashboardUserType";
import { IUserType } from "@/app/types/UserType";

export default function UserTypesPage() {
  return (
    <DataManager<IUserType>
      entityType="userTypes"
      apiEndpoint="/api/api?type=userTypes"
      breadcrumbText="User Types"
      breadcrumbLink="userType"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
      ]}
      AddComponent={AddUserType}
      DashboardComponent={DashboardUserType}
    />
  );
}
