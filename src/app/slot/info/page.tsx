import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { ISlot } from "@/app/types/Slot";

export default function SlotPage() {
  return (
    <InfoLayout>
      <DetailsPage<ISlot>
        apiType="slots"
        title="Slot Info"
        fieldLabels={{ 
          name: "Name",
          time: "Time"
        }}
      />
    </InfoLayout>
  );
}
