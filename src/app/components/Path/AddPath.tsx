/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddPaths = ({ onSuccess }: { onSuccess: (paths: any) => void }) => {

  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "path", type: "text", label: "Path", placeholder: "Enter Path", required: true },
    { name: "slash", type: "text", label: "Slash", placeholder: "Enter Slash", required: true },
    { name: "icon", type: "text", label: "Icon", placeholder: "Enter Icon", required: true },
    { name: "iconImport", type: "text", label: "Icon Import", placeholder: "Enter Icon Import", required: true },
  ];

  return (
    <AddEntity
      entityType="paths"
      apiEndpoint="/api/api"
      title="Add Path"
      buttonText="Add path"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddPaths;
