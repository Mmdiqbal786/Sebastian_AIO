import DetailsPage from "@/app/components/DetailsPage";
import { IFoodCategory } from "@/app/types/FoodCategory";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function FoodCategoryPage() {
  return (
    <InfoLayout>
      <DetailsPage<IFoodCategory>
        apiType="foodCategories"
        title="Food Category Info"
        fieldLabels={{ name: "Name" }}
      />
    </InfoLayout>
  );
}
