import DetailsPage from "@/app/components/DetailsPage";
import { IUserType } from "@/app/types/UserType";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function UserTypePage() {
  return (
    <InfoLayout>
      <DetailsPage<IUserType>
        apiType="userTypes"
        title="User Type Info"
        fieldLabels={{ 
          name: "Name",
          isActive: "Active", 
        }}
      />
    </InfoLayout>
  );
}
