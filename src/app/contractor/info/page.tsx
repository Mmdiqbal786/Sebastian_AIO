import DetailsPage from "@/app/components/DetailsPage";
import { IContractor } from "@/app/types/Contractor";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function ContractorPage() {
  return (
    <InfoLayout>
      <DetailsPage<IContractor>
        apiType="contractors"
        title="Contractor Info"
        fieldLabels={{ 
          name: "Name", 
          email: "Email", 
          contractorId: "Contractor Id",
          phone: "Phone",
          dob: "Date of Birth",
          address: "Address",
          document: "Document",
          isActive: "Active",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "statuses",
            label: "Contractor status",
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
