import DetailsPage from "@/app/components/DetailsPage";
import { IAssociate } from "@/app/types/Associate";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function AssociatePage() {
  return (
    <InfoLayout>
      <DetailsPage<IAssociate>
        apiType="associates"
        title="Associate Info"
        fieldLabels={{ 
          name: "Name", 
          email: "Email", 
          associateId: "Associate Id",
          phone: "Phone",
          dob: "Date of Birth",
          address: "Address",
          document: "Document",
          isActive: "Active",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "statuses",
            label: "Associate status",
            fieldName: "statusId",
            tableFieldName: "name"
          },
          {
            apiEndpoint: "users",
            label: "User",
            fieldName: "userId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
