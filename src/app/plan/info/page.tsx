import DetailsPage from "@/app/components/DetailsPage";
import { IPlan } from "@/app/types/Plan";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function PlanPage() {
  return (
    <InfoLayout>
      <DetailsPage<IPlan>
        apiType="plans"
        title="Plan Info"
        fieldLabels={{ 
          name: "Name",
          price: "Price",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "foodCategories",
            label: "Food Category",
            fieldName: "foodSelections",
            subField: "category",
            tableFieldName: "name"
          },
          {
            apiEndpoint: "",
            label: "Selection Limit",
            fieldName: "foodSelections",
            subField: "selectionLimit"
          },
        ]}
      />
    </InfoLayout>
  );
}
