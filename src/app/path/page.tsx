"use client";

import DataManager from "@/app/components/DataManager";
import AddPath from "@/app/components/Path/AddPath";
import DashboardPath from "@/app/components/Path/DashboardPath";
import { IPath } from "@/app/types/Path";

export default function PathsPage() {
  return (
    <DataManager<IPath>
      entityType="paths"
      apiEndpoint="/api/api?type=paths"
      breadcrumbText="Paths"
      breadcrumbLink="path"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "path", type: "text", label: "Path", required: true },
        { name: "slash", type: "text", label: "Slash", placeholder: "Enter Slash", required: true },
        { name: "icon", type: "text", label: "Icon", placeholder: "Enter Icon", required: true },
        { name: "iconImport", type: "text", label: "Icon Import", placeholder: "Enter Icon Import", required: true },
        { name: "showInSidebar", 
          type: "select",
          label: "show In Sidebar",
          required: true, 
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ] 
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
      AddComponent={AddPath}
      DashboardComponent={DashboardPath}
    />
  );
}
