import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IRole } from "@/app/types/Role";

export default function RolePage() {
  return (
    <InfoLayout>
      <DetailsPage<IRole>
        apiType="roles"
        title="Role Info"
        fieldLabels={{ name: "Name"}}
      />
    </InfoLayout>
  );
}
