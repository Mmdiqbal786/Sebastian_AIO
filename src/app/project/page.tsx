"use client";

import DataManager from "@/app/components/DataManager";
import AddProject from "@/app/components/Project/AddProject";
import DashboardProject from "@/app/components/Project/DashboardProject";
import { IProject } from "@/app/types/Project";
import { useFetchData } from "../lib/fetchHelper";

export default function ProjectsPage() {
  const { formattedData: formattedStatuses } = useFetchData<{ _id: string; name: string }>("statuses");
  return (
    <DataManager<IProject>
      entityType="projects"
      apiEndpoint="/api/api?type=projects"
      breadcrumbText="Projects"
      breadcrumbLink="project"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "client", type: "text", label: "Client", required: true },
        { name: "owner", type: "text", label: "Owner", required: true },
        { name: "headCount", type: "text", label: "Head Count", required: true },
        {
          name: "statusId",
          type: "select",
          label: "Project Status",
          placeholder: "Select Project Status",
          required: true,
          options: formattedStatuses.length
            ? formattedStatuses
            : [{ label: "No Project Status available", value: "" }],
        },
        { name: "isActive", 
          type: "select",
          label: "Active",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
        },
      ]}
      AddComponent={AddProject}
      DashboardComponent={DashboardProject}
    />
  );
}
