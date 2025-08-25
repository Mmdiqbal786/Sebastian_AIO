"use client";

import DataManager from "@/app/components/DataManager";
import AddUser from "@/app/components/User/AddUser";
import DashboardUser from "@/app/components/User/DashboardUser";
import { IUser } from "@/app/types/User";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function UsersPage() {
  const { formattedData: formattedTypes } = useFetchData<{ _id: string; name: string }>("userTypes");
  return (
    <DataManager<IUser>
      entityType="users"
      apiEndpoint="/api/api?type=users"
      breadcrumbText="Users"
      breadcrumbLink="user"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "email", type: "email", label: "Email", required: true },
        { name: "phone", type: "phone", label: "Phone", required: true },
        { name: "profileImg", type: "file", label: "Profile Pic", required: false },
        {
          name: "userTypeId",
          type: "select",
          label: "User Type",
          placeholder: "Select User Type",
          required: true,
          options: formattedTypes.length
            ? formattedTypes
            : [{ label: "No User Types available", value: "" }],
        },
      ]}
      AddComponent={AddUser}
      DashboardComponent={DashboardUser}
    />
  );
}
