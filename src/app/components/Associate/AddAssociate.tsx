/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddAssociates = ({ onSuccess }: { onSuccess: (associates: any) => void }) => {
  const { formattedData: formattedUsers } = useFetchData<{ _id: string; name: string }>("users");
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
    { 
      name: "phone", 
      label: "Phone", 
      type: "phone", 
      placeholder: "Enter phone number", 
      required: true
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "address", label: "Address", type: "textarea", placeholder: "Enter address", required: true },
    { name: "document", label: "Document", type: "file", required: true },
    {
      name: "userId",
      type: "select",
      label: "User",
      placeholder: "Select User",
      required: true,
      options: formattedUsers.length ? formattedUsers : [{ label: 'No Users available', value: '' }]
    },
    {
      name: "statusId",
      type: "select",
      label: "Associate Status",
      placeholder: "Select Associate Status",
      required: true,
      options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Associate Status available', value: '' }]
    },
    { name: "isActive", type: "hidden", required: false, value: true  },
  ];

  return (
    <AddEntity
      entityType="associates"
      apiEndpoint="/api/api"
      title="Add Associate"
      buttonText="Add Associate"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddAssociates;
