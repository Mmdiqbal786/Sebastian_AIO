"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import AddModal from "@/app/components/Modal/AddModal";
// import DynamicForm, { FormField } from "@/app/lib/form/DynamicForm";
import DynamicForm from "@/app/lib/form/ReactForm/OptimizedDynamicForm";
import {FormField }from "@/app/lib/form/ReactForm/types";
import { HookHandleFormSubmit } from "@/app/lib/addHelper";
// import useAuth from "@/app/hooks/useAuth";
// import { FormField } from "@/app/types/FormFieldType";

interface AddEntityProps {
  entityType: string;
  apiEndpoint: string;
  title: string;
  buttonText: string;
  formFields: FormField[];
  onSuccess: (data: string | number | boolean | object) => void;
}

const AddEntity: React.FC<AddEntityProps> = ({ entityType, apiEndpoint, title, buttonText, formFields, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const user = useAuth();

  const handleFormSubmit = async (data: string | number | boolean | object) => {
    await HookHandleFormSubmit({
      entityType,
      apiEndpoint,
      data,
      // user,
      successCallback: (newData) => {
        onSuccess(newData);
      },
      resetData: () => setIsOpen(false),
      setModalOpen: setIsOpen,
      setLoading,
      toast,
    });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>{buttonText}</button>

      <AddModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} loading={loading}>
        {/* <DynamicForm fields={formFields} onSubmit={handleFormSubmit} loading={loading} /> */}
        <DynamicForm fields={formFields} onSubmit={handleFormSubmit} loading={loading} />
      </AddModal>
    </div>
  );
};

export default AddEntity;
