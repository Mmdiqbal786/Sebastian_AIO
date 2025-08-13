/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { convertToBase64 } from "@/app/lib/utils";

export interface SubmitFunctionParams {
  entityType?: string;
  apiEndpoint: string;
  data: any;
  user?: any;
  successCallback: (data: any) => void;
  resetData: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toast: any;
  reloadWindow?: () => void;
}

export const HookHandleFormSubmit = async ({
  entityType,
  apiEndpoint = "/api",
  data,
  user,
  successCallback,
  resetData,
  setModalOpen,
  setLoading,
  toast,
  reloadWindow,
}: SubmitFunctionParams) => {
  try {
    setLoading(true);
    const formData = new FormData();
    if (user) {
      formData.append("createdBy", user.user || "");
    }
    for (const [key, value] of Object.entries(data)) {
      if (value == null) {
        continue;
      }
      if (value instanceof File) {
        try {
          const base64String = await convertToBase64(value);
          formData.append(key, base64String);
        } catch (error) {
          console.error(`Error converting ${key} to base64:`, error);
          throw error;
        }
      }
      else if (value instanceof FileList && value.length > 0) {
        try {
          const base64String = await convertToBase64(value[0]);
          formData.append(key, base64String);
        } catch (error) {
          console.error(`Error converting ${key} to base64:`, error);
          throw error;
        }
      }
      else if (typeof value === "function") {
        formData.append(key, value());
      }
      else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      }
      else {
        formData.append(key, String(value));
      }
    }
    const finalApiEndpoint = `${apiEndpoint}?type=${entityType}`;
    if (!finalApiEndpoint) {
      throw new Error("API endpoint or entityType must be provided.");
    }
    const response = await axios.post(finalApiEndpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    if (response.status === 201) {
      toast.success(response.data.message);
      resetData();
      setModalOpen(false);
      const responseData = response.data.data || response.data;
      const updatedData = { ...data, ...responseData };
      successCallback(updatedData);
      if (reloadWindow) {
        reloadWindow();
      }
    } else {
      toast.error(response.data.message || 'An error occurred');
    }
  } catch (error: any) {
    console.error('Submission error:', error);
    toast.error(error.response?.data?.message || error.message || 'An error occurred');
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
};
