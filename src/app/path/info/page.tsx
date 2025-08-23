import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IPath } from "@/app/types/Path";

export default function PathPage() {
  return (
    <InfoLayout>
      <DetailsPage<IPath>
        apiType="paths"
        title="Path Info"
        fieldLabels={{ 
          name: "Name",
          path: "Path",
          slash: "Slash",
          icon: "Icon",
          iconImport: "Icon Import",
          showInSidebar: "Show In Sidebar",
          isActive: "Active",
        }}
      />
    </InfoLayout>
  );
}
