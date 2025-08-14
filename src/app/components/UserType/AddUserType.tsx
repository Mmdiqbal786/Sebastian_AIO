/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";

const AddUserTypes = ({ onSuccess }: { onSuccess: (foods: any) => void }) => {
  // const user = useAuth();

  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
  ];

  return (
    <AddEntity
      entityType="userTypes"
      apiEndpoint="/api/api"
      title="Add User Types"
      buttonText="Add User Types"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddUserTypes;
