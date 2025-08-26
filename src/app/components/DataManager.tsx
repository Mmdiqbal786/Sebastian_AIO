/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Dashboard/Layout";
import { toast } from "react-toastify";
import EditModal from "@/app/components/Modal/EditModal";
import { DeleteModal } from "@/app/components/Modal/DeleteModal";
import { convertToBase64, reloadWindow } from "@/app/lib/utils";
import { handleEditClick, handleHookEditBase64Submit, handleHookEditSubmit } from "@/app/lib/editHelper";
import { handleDeleteClick } from "@/app/lib/deleteHelper";
import { handleShowClick } from "@/app/lib/showHelper";
import { EntityType, passwordSupportedEntities } from "@/app/types/EntityType";
import { mongoose } from "@/app/lib/prisma";
import { fetchData } from "@/app/lib/fetchHelper";
import { FormField } from "../lib/form/ReactForm/types";

interface DataManagerProps<T> {
  entityType: EntityType;
  apiEndpoint: string;
  breadcrumbText: string;
  breadcrumbLink: string;
  fields: FormField[];
  AddComponent: React.ComponentType<{ onSuccess: (item: T) => void }>;
  DashboardComponent: React.ComponentType<{
    data: T[];
    onClickEdit: (_id: mongoose.Types.ObjectId) => void;
    onClickDelete: (_id: mongoose.Types.ObjectId) => void;
    onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
    onClickShow?: (_id: mongoose.Types.ObjectId) => void;
  }>;
}

export default function DataManager<T>({
  entityType,
  apiEndpoint,
  breadcrumbText,
  fields,
  AddComponent,
  DashboardComponent,
}: DataManagerProps<T>): React.JSX.Element {
  const [currentEditItem, setCurrentEditItem] = useState<T | null>(null);
  const [, setCurrentShowItem] = useState<T | null>(null);
  const [currentPasswordItem, setCurrentPasswordItem] = useState<T | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<number | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(apiEndpoint, setData, entityType);
  }, [apiEndpoint, entityType]);

  const onClickEdit = (_id: any) => {
    handleEditClick(_id, data, setCurrentEditItem);
  };

  const onClickShow = (_id: any) => handleShowClick(_id, data, setCurrentShowItem);

  const onClickEditPassword = (_id: any) => {
    if (passwordSupportedEntities.includes(entityType)) {
      // For password edit, we pass the current item as initialData.
      handleEditClick(_id, data, setCurrentPasswordItem);
    }
  };

  const onClickDelete = (_id: any) => handleDeleteClick(_id, setCurrentDeleteItem);

  const processFileFields = async (formData: any, fields: FormField[]): Promise<boolean> => {
    for (const field of fields) {
      if (field.type === "file") {
        const fileValue = formData[field.name];
        if (fileValue && fileValue instanceof File) {
          try {
            const base64 = await convertToBase64(fileValue);
            formData[field.name] = base64;
          } catch (error: any) {
            toast.error(`Error converting file for field ${field.name}`);
            return false;
          }
        }
      }
    }
    return true;
  };

  const onSubmitEditForm = async (formData: any) => {
    if (!formData._id && currentEditItem && (currentEditItem as any)._id) {
      formData._id = (currentEditItem as any)._id;
    }
    const success = await processFileFields(formData, fields);
    if (!success) {
      return;
    }
    const updatedData = { ...currentEditItem, ...formData };
    await handleHookEditBase64Submit({
      currentItem: updatedData,
      toast,
      setState: setData,
      setCurrentItem: setCurrentEditItem,
      setLoading,
      reloadWindow,
      apiEndpoint,
    });
  };

  const onSubmitPasswordChange = async (formData: any) => {
    if (!currentPasswordItem) {
      return;
    }
    const passwordEndpoint = `${apiEndpoint}&subEntity=password`;
    
    // If formData.password is empty or unchanged, you can choose to keep the old value
    const newPassword = formData.password;
    const finalData = {
      _id: (currentPasswordItem as any)._id,
      password: newPassword && newPassword.trim() !== ""
        ? newPassword
        : (currentPasswordItem as any).password,
    };
  
    handleHookEditSubmit({
      currentItem: currentPasswordItem,
      updatedData: finalData,
      toast,
      setCurrentItem: setCurrentPasswordItem,
      setState: setData,
      successCallback: (data: any) => {
        setData((prev) =>
          prev.map((user) =>
            (user as any)._id === data._id ? { ...user, ...data } : user
          )
        );
      },
      setLoading,
      apiEndpoint: passwordEndpoint,
    });
  };

  return (
    <Layout>
      <EditModal
        isOpen={currentEditItem != null}
        onClose={() => setCurrentEditItem(null)}
        title={`Edit ${entityType}`}
        fields={fields.map((field) => {
          if (field.type === "subtable") {
            return {
              ...field,
              value: (currentEditItem as any)?.[field.name] || [],
            };
          }
          if (field.type === "file") {
            return {
              ...field,
              value: "",
            };
          }
          if (field.type === "control-select") {
            return {
              ...field,
              value: (currentEditItem as any)?.[field.name] || "",
            };
          }
          if (field.type === "dynamic-group-multiselect") {
            const rawValue = (currentEditItem as any)?.[field.name];
            return {
              ...field,
              value: rawValue
                ? typeof rawValue === "string"
                  ? JSON.parse(rawValue)
                  : rawValue
                : {},
            };
          }
          if (field.type === "select") {
            return {
              ...field,
              value: (currentEditItem as any)?.[field.name] || "",
            };
          }
          return {
            ...field,
            value: (currentEditItem as any)?.[field.name],
          };
        }) as FormField[]}
        initialData={currentEditItem}
        onChange={(fieldName, value) =>
          console.log(`Field ${fieldName} changed to`, value)
        }
        onSubmit={onSubmitEditForm}
        loading={loading}
      />

      {passwordSupportedEntities.includes(entityType) && (
        <EditModal
        isOpen={currentPasswordItem != null}
        onClose={() => setCurrentPasswordItem(null)}
        title="Change Password"
        fields={[
          { 
            name: "password", 
            type: "password", 
            label: "New Password", 
            placeholder: "Enter New Password", 
            required: true 
          },
        ]}
        initialData={currentPasswordItem}  // initialData can include the current password for default value
        onChange={(fieldName, value) =>
          console.log(`Password field ${fieldName} changed to`, value)
        }
        onSubmit={onSubmitPasswordChange}
        loading={loading}
      />
      )}

      <DeleteModal
        modalOpen={currentDeleteItem !== null}
        itemType={entityType as any}
        onClose={() => setCurrentDeleteItem(null)}
        currentItemId={currentDeleteItem}
        apiEndpoint={apiEndpoint}
        setState={setData}
        toast={toast}
      />

      <main className="bg-gray-200 overflow-x-auto h-full px-4 py-16">
        <div className="flex justify-between w-full py-10">
          <div>
            <h1 className="flex text-center text-2xl font-bold sm:text-sm md:text-lg text-black">
              {breadcrumbText}
            </h1>
          </div>
          <div className="flex-none">
            <div className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200">
              <AddComponent onSuccess={(item) => setData((prev) => [...prev, item])} />
            </div>
          </div>
        </div>
        <DashboardComponent
          data={data}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          onClickShow={onClickShow}
          {...(entityType === "users" && { onClickEditPassword })}
        />
      </main>
    </Layout>
  );
}
