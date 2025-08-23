/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";

const AddStatuses = ({ onSuccess }: { onSuccess: (statuses: any) => void }) => {
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "isActive", type: "hidden", required: false, value: true  },
  ];

  return (
    <AddEntity
      entityType="statuses"
      apiEndpoint="/api/api"
      title="Add Status"
      buttonText="Add Status"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddStatuses;
