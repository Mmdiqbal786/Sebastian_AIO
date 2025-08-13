import DetailsPage from "@/app/components/DetailsPage";
import { ICategory } from "@/app/types/Category";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function CategoryPage() {
  return (
    <InfoLayout>
      <DetailsPage<ICategory>
        apiType="categories"
        title="Category Info"
        fieldLabels={{ name: "Name" }}
        additionalDataConfig={[
          {
            apiEndpoint: "plans",
            label: "Plans",
            fieldName: "plans",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
