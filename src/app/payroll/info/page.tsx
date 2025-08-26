import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IPayroll } from "@/app/types/Payroll";

export default function PayrollPage() {
  return (
    <InfoLayout>
      <DetailsPage<IPayroll>
        apiType="payrolls"
        title="Payroll Info"
        fieldLabels={{ 
          name: "Name",
          location: "Location",
          month: "Month",
          owner: "Owner",
          payer: "Payer",
          invoiceOrPayslip: "Invoice/Payslip",
          payment: "Payment",
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
            label: "Payroll status",
            fieldName: "statusId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
