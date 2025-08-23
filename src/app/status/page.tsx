"use client";

import DataManager from "@/app/components/DataManager";
import AddStatus from "@/app/components/Status/AddStatus";
import DashboardStatus from "@/app/components/Status/DashboardStatus";
import { IRole } from "@/app/types/Role";

export default function StatusesPage() {
  return (
    <DataManager<IRole>
      entityType="statuses"
      apiEndpoint="/api/api?type=statuses"
      breadcrumbText="Statuses"
      breadcrumbLink="status"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
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
      AddComponent={AddStatus}
      DashboardComponent={DashboardStatus}
    />
  );
}
