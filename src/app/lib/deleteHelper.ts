/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export interface DeleteParams {
  apiEndpoint: string;
  id: number;
  type?: string;
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentDelete: React.Dispatch<React.SetStateAction<number | null>>;
  toast: any;
}

export const handleDelete = async ({
  apiEndpoint,
  id,
  type,
  setState,
  setCurrentDelete,
  toast,
}: DeleteParams) => {
  try {
    const url = type ? `${apiEndpoint}?id=${id}&type=${type}` : `${apiEndpoint}?id=${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success(response.data.message);
      setState((prev) => prev.filter((item) => item.id !== id));
    } else {
      toast.error(response.data.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
    toast.error(`Error: ${errorMessage}`);
  }
  setCurrentDelete(null);
};

export type DeleteItemFunction<T> = (itemId: number, setItem: React.Dispatch<React.SetStateAction<T | null>>) => void;

export const handleDeleteClick: DeleteItemFunction<any> = (itemId, setItem) => {
  setItem(itemId);
};

export type DeleteItemType = "user";

export const deleteItemHandler = async (
  itemId: number | null,
  itemType: DeleteItemType,
  apiEndpoint: string,
  setState: React.Dispatch<React.SetStateAction<any[]>>,
  setCurrentDelete: React.Dispatch<React.SetStateAction<number | null>>,
  toast: any
) => {
  if (!itemId) return;

  try {
    let finalApiEndpoint = apiEndpoint;
    if (itemType === "user" || "testimonial") {
      finalApiEndpoint = "/api/api";
    }

    const response = await axios.delete(`${finalApiEndpoint}?id=${itemId}&type=${itemType}`);
    
    if (response.status === 200) {
      toast.success(response.data.message);
      setState((prev) => {
        const updatedState = prev.filter((item) => item._id !== itemId);
        return updatedState;
      });
    } else {
      toast.error(response.data.message);
    }
  }  catch (error: any) {
    const errorMessage =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
    toast.error(`Error: ${errorMessage}`);
  }
  
  setCurrentDelete(null);
};

export interface DeleteModalProps {
  modalOpen: boolean;
  itemType: DeleteItemType;
  onClose: () => void;
  currentItemId: number | null;
  apiEndpoint: string;
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  toast: any;
}
