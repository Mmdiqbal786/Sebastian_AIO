/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddSlots = ({ onSuccess }: { onSuccess: (slots: any) => void }) => {

  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Slot", required: true },
    { name: "time", type: "time", label: "Slot", placeholder: "Select time slot", required: true },
  ];

  return (
    <AddEntity
      entityType="slots"
      apiEndpoint="/api/api"
      title="Add Slot"
      buttonText="Add Slot"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddSlots;
