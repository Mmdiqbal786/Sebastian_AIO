"use client";

import DataManager from "@/app/components/DataManager";
import AddUserPermission from "@/app/components/UserPermission/AddUserPermission";
import DashboardUserPermission from "@/app/components/UserPermission/DashboardUserPermission";
import { IUserPermission } from "@/app/types/UserPermission";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function UserPermissionsPage() {
  const { formattedData: formattedUsers } = useFetchData<{ _id: string; name: string }>("users");
  const { formattedData: formattedPaths } = useFetchData<{ _id: string; name: string }>("paths");
  return (
    <DataManager<IUserPermission>
      entityType="userPermissions"
      apiEndpoint="/api/api?type=userPermissions"
      breadcrumbText="User Permissions"
      breadcrumbLink="userPermission"
      fields={[
        { 
          name: "userId",
          type: "select",
          label: "User",
          placeholder: "Select User",
          required: true,
          options: formattedUsers.length ? formattedUsers : [{ label: 'No Users available', value: '' }]
        },
        { 
          name: "pathId",
          type: "select",
          label: "Path",
          placeholder: "Select Path",
          required: true,
          options: formattedPaths.length ? formattedPaths : [{ label: 'No Paths available', value: '' }]
        },
        { name: "canView", 
          type: "select",
          label: "View",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
        },
        { name: "canCreate", 
          type: "select",
          label: "Create",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
        },
        { name: "canEdit", 
          type: "select",
          label: "Edit",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
        },
        { name: "canDelete", 
          type: "select",
          label: "Delete",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
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
      AddComponent={AddUserPermission}
      DashboardComponent={DashboardUserPermission}
    />
  );
}
