/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";

const AddRolePermissions = ({ onSuccess }: { onSuccess: (roles: any) => void }) => {
  const { formattedData: formattedRoles } = useFetchData<{ _id: string; name: string }>("roles");
  const { formattedData: formattedPaths } = useFetchData<{ _id: string; name: string }>("paths");
  const formFields: FormField[] = [
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
      type: "hidden",
      required: false,
      value: true
    },
  ];

  return (
    <AddEntity
      entityType="rolePermissions"
      apiEndpoint="/api/api"
      title="Add Role Permission"
      buttonText="Add Role Permission"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddRolePermissions;
