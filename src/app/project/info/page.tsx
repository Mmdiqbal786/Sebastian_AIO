import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IProject } from "@/app/types/Project";

export default function ProjectPage() {
  return (
    <InfoLayout>
      <DetailsPage<IProject>
        apiType="projects"
        title="Project Info"
        fieldLabels={{ 
          name: "Name",
          client: "Client",
          owner: "Owner",
          headCount: "Head Count",
          isActive: "Active",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "statuses",
            label: "Project status",
            fieldName: "statusId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
