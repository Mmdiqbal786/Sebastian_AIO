"use client";

import DataManager from "@/app/components/DataManager";
import AddRolePermission from "@/app/components/RolePermission/AddRolePermission";
import DashboardRolePermission from "@/app/components/RolePermission/DashboardRolePermission";
import { IRolePermission } from "@/app/types/RolePermission";
import { useFetchData } from "@/app/lib/fetchHelper";

export default function RolePermissionsPage() {
  const { formattedData: formattedRoles } = useFetchData<{ _id: string; name: string }>("roles");
  const { formattedData: formattedPaths } = useFetchData<{ _id: string; name: string }>("paths");
  return (
    <DataManager<IRolePermission>
      entityType="rolePermissions"
      apiEndpoint="/api/api?type=rolePermissions"
      breadcrumbText="Role Permissions"
      breadcrumbLink="rolePermission"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { 
          name: "roleId",
          type: "select",
          label: "Role",
          placeholder: "Select Role",
          required: true,
          options: formattedRoles.length ? formattedRoles : [{ label: 'No Roles available', value: '' }]
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
      AddComponent={AddRolePermission}
      DashboardComponent={DashboardRolePermission}
    />
  );
}
