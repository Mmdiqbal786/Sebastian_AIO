/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddUsers = ({ onSuccess }: { onSuccess: (users: any) => void }) => {
  const { formattedData: formattedTypes } = useFetchData<{ _id: string; name: string }>("userTypes");
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
    { name: "profileImg", label: "Profile Pic", type: "file", required: true },
    { 
      name: "userTypeId",
      type: "select",
      label: "User Type",
      placeholder: "Select User Type",
      required: true,
      options: formattedTypes.length ? formattedTypes : [{ label: 'No User Types available', value: '' }]
    },
    { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
    { name: "roleId", type: "hidden", required: false  },
  ];

  return (
    <AddEntity
      entityType="users"
      apiEndpoint="/api/api"
      title="Add User"
      buttonText="Add User"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddUsers;
