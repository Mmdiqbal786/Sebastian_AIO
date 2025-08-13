import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IUser } from "@/app/types/User";

export default function UserPage() {
  return (
    <InfoLayout>
      <DetailsPage<IUser>
        apiType="users"
        title="User Info"
        fieldLabels={{ name: "Name", email: "Email" }}
      />
    </InfoLayout>
  );
}
