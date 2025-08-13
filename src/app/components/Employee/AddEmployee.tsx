// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { FormField } from "@/app/types/FormFieldType";
// import AddEntity from "@/app/components/AddEntity";

// const AddEmployees = ({ onSuccess }: { onSuccess: (employees: any) => void }) => {
//   const formFields: FormField[] = [
//     { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
//     { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
//     { 
//       name: "phone", 
//       label: "Phone", 
//       type: "phone", 
//       placeholder: "Enter phone number", 
//       required: true
//     },
//     { name: "dob", label: "Date of Birth", type: "date" },
//     { name: "address", label: "Address", type: "textarea", placeholder: "Enter address", required: true },
//     { name: "profileImg", label: "Profile Pic", type: "file", required: true },
//     { name: "document", label: "Document", type: "file", required: true },
//     { name: "type", 
//       type: "select", 
//       label: "Employee Type", 
//       placeholder: "Select Type", 
//       required: true, 
//       options: [
//         { label: "Admin", value: "admin" },
//         { label: "Delivery", value: "delivery" },
//         { label: "IT", value: "it" },
//         { label: "TL", value: "tl" },
//         { label: "Manager", value: "manager" },
//         { label: "Picker", value: "picker" }
//       ] 
//     },
//     { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
//     { name: "roleId", type: "hidden", required: false  },
//   ];

//   return (
//     <AddEntity
//       entityType="employees"
//       apiEndpoint="/api/api"
//       title="Add Employee"
//       buttonText="Add Employee"
//       formFields={formFields}
//       onSuccess={onSuccess}
//     />
//   );
// };

// export default AddEmployees;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { FormField } from "@/app/types/FormFieldType";
import AddEntity from "@/app/components/AddEntity";
import { FormField } from "@/app/lib/form/ReactForm/types";

const AddEmployees = ({ onSuccess }: { onSuccess: (employees: any) => void }) => {
  const formFields: FormField[] = [
    { name: "name", type: "text", label: "Name", placeholder: "Enter Name", required: true },
    { name: "email", type: "email", label: "Email", placeholder: "Enter Email", required: true },
    { 
      name: "phone", 
      label: "Phone", 
      type: "phone", 
      placeholder: "Enter phone number", 
      required: true
    },
    { name: "dob", label: "Date of Birth", type: "datetime-local" },
    { name: "address", label: "Address", type: "textarea", placeholder: "Enter address", required: true },
    { name: "profileImg", label: "Profile Pic", type: "file", required: true },
    { name: "document", label: "Document", type: "file", required: true },
    { name: "type", 
      type: "select", 
      label: "Employee Type", 
      placeholder: "Select Type", 
      required: true, 
      options: [
        { label: "Admin", value: "admin" },
        { label: "Delivery", value: "delivery" },
        { label: "IT", value: "it" },
        { label: "TL", value: "tl" },
        { label: "Manager", value: "manager" },
        { label: "Picker", value: "picker" }
      ] 
    },
    { name: "password", type: "password", label: "Password", placeholder: "Enter Password", required: true },
    { name: "roleId", type: "hidden", required: false  },
  ];

  return (
    <AddEntity
      entityType="employees"
      apiEndpoint="/api/api"
      title="Add Employee"
      buttonText="Add Employee"
      formFields={formFields}
      onSuccess={onSuccess}
    />
  );
};

export default AddEmployees;
