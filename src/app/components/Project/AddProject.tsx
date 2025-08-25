/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddEntity from "@/app/components/AddEntity";
import { useFetchData } from "@/app/lib/fetchHelper";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddProjects = ({ onSuccess }: { onSuccess: (projects: any) => void }) => {
const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "client", type: "text", label: "Client", placeholder: "Enter Client Name", required: true },
    { name: "owner", type: "text", label: "Owner", placeholder: "Enter Owner Name", required: true },
    { name: "headCount", type: "text", label: "Head Count", placeholder: "Enter Head Count", required: true },
    { 
      name: "statusId",
      type: "select",
      label: "Project Status",
      placeholder: "Select Project Status",
      required: true,
      options: formattedStatuses.length ? formattedStatuses : [{ label: 'No Project Status available', value: '' }]
    },
    { name: "isActive", type: "hidden", required: false, value: true  },
  ];

  return (
    <AddEntity
      entityType="projects"
      apiEndpoint="/api/api"
      title="Add Project"
      buttonText="Add Project"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddProjects;
