/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";
// import useAuth from "@/app/hooks/useAuth";

const AddRoles = ({ onSuccess }: { onSuccess: (roles: any) => void }) => {
  // const user = useAuth();

  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "isActive", type: "hidden", required: false, value: true  },
    // { name: "createdBy", type: "hidden", required: true, value: user.user },
  ];

  return (
    <AddEntity
      entityType="roles"
      apiEndpoint="/api/api"
      title="Add Role"
      buttonText="Add Role"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddRoles;
