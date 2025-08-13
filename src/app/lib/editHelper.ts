/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { convertFileToBase64 } from "@/app/lib/utils";

export interface handleEditFormParams {
  apiEndpoint: string;
  updatedData: any;
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  currentItem: any;
  setCurrentItem: React.Dispatch<React.SetStateAction<any | null>>;
  successCallback: (data: any) => void;
  toast: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reloadWindow?: () => void;
}

export const handleEditSubmit = async ({
  apiEndpoint,
  updatedData,
  setState,
  currentItem,
  setCurrentItem,
  successCallback,
  toast,
  setLoading,
  reloadWindow,
}: handleEditFormParams) => {
  try {
    setLoading(true);

    const response = await axios.put(apiEndpoint, updatedData);

    if (response.status === 202) {
      toast.success(response.data.message);
      setState((prev) =>
        prev.map((item) =>
          item._id === currentItem._id ? { ...item, ...updatedData } : item
        )
      );
      setCurrentItem(null);
      successCallback(response.data);
      if (reloadWindow) {
        reloadWindow();
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

interface ApiResponse {
  [key: string]: any;
}

export type handleEditBase64SubmitParams = {
  currentItem: any;
  user: any;
  handleSubmit: any;
  toast: any;
  setState: any;
  setCurrentItem: any;
  setLoading: any;
  reloadWindow?: () => void;
  apiEndpoint: string;
  processBase64?: boolean;
  base64Fields?: string[];
}

export const handleEditBase64Submit = async ({
  currentItem,
  user,
  handleSubmit,
  toast,
  setState,
  setCurrentItem,
  setLoading,
  reloadWindow,
  apiEndpoint,
  processBase64 = false,
  base64Fields = ['image', 'logo'],
}: handleEditBase64SubmitParams) => {
  if (!currentItem) return;
  const updatedData = { ...currentItem, updatedBy: user.user };
  if (processBase64) {
    base64Fields.forEach((field) => {
      const fieldValue = currentItem[field] ? currentItem[field].base64 : '';
      if (fieldValue && fieldValue.startsWith('data:')) {
        updatedData[field] = fieldValue;
      }
    });
  }
  handleSubmit({
    apiEndpoint,
    updatedData,
    setState,
    currentItem,
    setCurrentItem,
    successCallback: (data: ApiResponse) => {
      toast.success(data.message);
    },
    toast,
    setLoading,
    reloadWindow,
  });
};

export type EditItemFunction<T> = (itemId: number, itemList: T[], setItem: React.Dispatch<React.SetStateAction<T | null>>) => void;

// export const handleEditClick: EditItemFunction<any> = (itemId, itemList, setItem) => {
//   const itemToEdit = itemList.find((e) => e._id === itemId);
//   if (itemToEdit) {
//     setItem(itemToEdit);
//   }
// };

export const handleEditClick: EditItemFunction<any> = (
  itemId,
  itemList,
  setItem,
  transformFn?: (item: any) => any
) => {
  const itemToEdit = itemList.find((e) => e._id === itemId);
  if (itemToEdit) {
    setItem(transformFn ? transformFn(itemToEdit) : itemToEdit);
  }
};

export interface HandleHookEditFormParams {
  apiEndpoint: string;
  updatedData: Record<string, any>;
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  currentItem: any;
  setCurrentItem: React.Dispatch<React.SetStateAction<any | null>>;
  successCallback: (data: any) => void;
  toast: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reloadWindow?: () => void;
}

export const handleHookEditSubmit = async ({
  apiEndpoint,
  updatedData,
  setState,
  currentItem,
  setCurrentItem,
  successCallback,
  toast,
  setLoading,
  reloadWindow,
}: HandleHookEditFormParams) => {
  try {
    setLoading(true);
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.put(apiEndpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 202) {
      toast.success(response.data.message);
      setState((prev) =>
        prev.map((item) =>
          item._id === currentItem._id ? { ...item, ...updatedData } : item
        )
      );
      setCurrentItem(null);
      successCallback(response.data);
      if (reloadWindow) {
        reloadWindow();
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

export interface HandleHookEditBase64SubmitParams {
  apiEndpoint: string;
  currentItem: any;
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentItem: React.Dispatch<React.SetStateAction<any | null>>;
  toast: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reloadWindow?: () => void;
  processBase64?: boolean;
  base64Fields?: string[];
}

export const handleHookEditBase64Submit = async ({
  apiEndpoint,
  currentItem,
  setState,
  setCurrentItem,
  toast,
  setLoading,
  reloadWindow,
  processBase64 = false,
  base64Fields = ["image", "logo"],
}: HandleHookEditBase64SubmitParams) => {
  if (!currentItem) return;
  
  try {
    setLoading(true);
    const formData = new FormData();

    for (const [key, value] of Object.entries(currentItem)) {
      if (value == null) continue;

      if (typeof value === "function") {
        formData.append(key, value());
      }
      else if (processBase64 && base64Fields.includes(key) && value instanceof File) {
        try {
          const base64String = await convertFileToBase64(value);
          formData.append(key, base64String as string);
        } catch (error) {
          console.error(`Error converting ${key} to Base64`, error);
          toast.error(`Error converting ${key} to Base64`);
        }
      }
      else if (typeof value === "object") {
        try {
          formData.append(key, JSON.stringify(value));
        } catch (error) {
          console.error(`Error stringifying ${key}:`, error);
        }
      }
      else {
        formData.append(key, String(value));
      }
    }

    const response = await axios.put(apiEndpoint, formData);

    if (response.status === 202) {
      console.log(apiEndpoint);
      toast.success(response.data.message);
      setState((prev) =>
        prev.map((item) =>
          item._id === currentItem._id ? { ...item, ...currentItem } : item
        )
      );
      setCurrentItem(null);

      if (reloadWindow) {
        reloadWindow();
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
