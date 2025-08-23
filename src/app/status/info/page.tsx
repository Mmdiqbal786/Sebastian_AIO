import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IStatus } from "@/app/types/Status";

export default function StatusPage() {
  return (
    <InfoLayout>
      <DetailsPage<IStatus>
        apiType="statuses"
        title="Status Info"
        fieldLabels={{ 
          name: "Name",
          isActive: "Active",
        }}
      />
    </InfoLayout>
  );
}
