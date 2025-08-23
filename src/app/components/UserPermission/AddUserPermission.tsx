/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";

const AddUserPermissions = ({ onSuccess }: { onSuccess: (userPermissions: any) => void }) => {
  const { formattedData: formattedUsers } = useFetchData<{ _id: string; name: string }>("users");
  const { formattedData: formattedPaths } = useFetchData<{ _id: string; name: string }>("paths");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
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
      type: "hidden",
      required: false,
      value: true
    },
  ];

  return (
    <AddEntity
      entityType="userPermissions"
      apiEndpoint="/api/api"
      title="Add User Permission"
      buttonText="Add User Permission"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddUserPermissions;
