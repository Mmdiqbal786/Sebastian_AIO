/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicForm from "../components/DynamicForm";

const formSchema = {
  title: "User Form",
  fields: [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "avatar", label: "Avatar", type: "file", storage: "s3" },
    {
      name: "addresses",
      label: "Addresses",
      type: "subtable",
      fields: [
        { name: "street", label: "Street", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "zip", label: "ZIP", type: "number" }
      ]
    }
  ]
};

export default function FormPage() {
  const handleSubmit = async (data: any) => {
    console.log("Form Data:", data);
    await fetch("/api/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  };

  return <DynamicForm schema={formSchema} onSubmit={handleSubmit} />;
}
