import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IExpense } from "@/app/types/Expense";

export default function ExpensePage() {
  return (
    <InfoLayout>
      <DetailsPage<IExpense>
        apiType="expenses"
        title="Expense Info"
        fieldLabels={{ 
          name: "Name",
          description: "Description",
          entryDate: "Entry Date",
          cost: "Cost",
          isActive: "Active",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "projects",
            label: "project",
            fieldName: "projectId",
            tableFieldName: "name"
          },
          {
            apiEndpoint: "statuses",
            label: "Expense status",
            fieldName: "statusId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
