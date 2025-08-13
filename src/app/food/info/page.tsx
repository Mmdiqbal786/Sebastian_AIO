import DetailsPage from "@/app/components/DetailsPage";
import { IFood } from "@/app/types/Food";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function FoodPage() {
  return (
    <InfoLayout>
      <DetailsPage<IFood>
        apiType="foods"
        title="Food Info"
        fieldLabels={{ 
          name: "Name",
        //   price: "Price", 
        //   stock: "Stock" 
          image: "Image",  
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "foodCategories",
            label: "Food Category",
            fieldName: "categoryId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
