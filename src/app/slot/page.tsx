"use client";

import DataManager from "@/app/components/DataManager";
import AddSlot from "@/app/components/Slot/AddSlot";
import DashboardSlot from "@/app/components/Slot/DashboardSlot";
import { ISlot } from "@/app/types/Slot";

export default function SlotsPage() {
  return (
    <DataManager<ISlot>
      entityType="slots"
      apiEndpoint="/api/api?type=slots"
      breadcrumbText="Slots"
      breadcrumbLink="slot"
      fields={[
        { name: "name", type: "text", label: "Name", required: true },
        { name: "time", type: "time", label: "Slot", required: true },
      ]}
      AddComponent={AddSlot}
      DashboardComponent={DashboardSlot}
    />
  );
}
