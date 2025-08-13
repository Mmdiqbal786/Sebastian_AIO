/* eslint-disable @typescript-eslint/no-explicit-any */

// this function used for file extension find in base64 string
export function getDocumentType(resume: string): string {
  if (typeof resume !== "string") {
    console.error("Input is not a string:", resume);
    return "";
  }

  if (resume.startsWith("data:application/pdf;base64,")) {
    return "pdf";
  } else if (resume.startsWith("data:application/msword;base64,")) {
    return "doc";
  } else if (
    resume.startsWith(
      "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"
    )
  ) {
    return "docx";
  } else if (resume.startsWith("data:image/jpeg;base64,")) {
    return "jpeg";
  } else if (resume.startsWith("data:image/png;base64,")) {
    return "png";
  } else if (resume.startsWith("data:image/gif;base64,")) {
    return "gif";
  } else if (resume.startsWith("data:image/bmp;base64,")) {
    return "bmp";
  } else if (resume.startsWith("data:image/svg+xml;base64,")) {
    return "svg";
  } else if (resume.startsWith("data:image/webp;base64,")) {
    return "webp";
  } else {
    return "";
  }
}

export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const reloadWindow = (): void => {
  window.location.reload();
};

export const handleChange =
  (setState: React.Dispatch<React.SetStateAction<any>>) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value, checked, files } = event.target as HTMLInputElement;
    if (type === "file" && files?.length) {
      const selectedFile = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setState((prev: any) => ({
          ...prev,
          [name]: {
            base64: base64String,
            path: URL.createObjectURL(selectedFile),
          },
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
    else {
      setState((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" || type === "radio" ? checked : value,
      }));
    }
    if (type === "hidden") {
      setState((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  export const handleRHFChange =
  (
    setValue: any,
    externalSetState?: React.Dispatch<React.SetStateAction<any>>,
    onChange?: (name: string, value: any) => void
  ) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value, checked, files } = event.target as HTMLInputElement;
    const updateNestedValue = (prev: any, path: string[], newValue: any): any => {
      if (path.length === 1) {
        return { ...prev, [path[0]]: newValue };
      }
      const [head, ...tail] = path;
      return {
        ...prev,
        [head]: updateNestedValue(prev[head] || {}, tail, newValue),
      };
    };
    const isNested = name.includes(".");
    if (type === "file" && files?.length) {
      const selectedFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue(name, { base64: base64String, path: URL.createObjectURL(selectedFile) }, { shouldValidate: true });
        if (externalSetState) {
          if (isNested) {
            const keys = name.split(".");
            externalSetState((prev: any) =>
              updateNestedValue(prev, keys, {
                base64: base64String,
                path: URL.createObjectURL(selectedFile),
              })
            );
          } else {
            externalSetState((prev: any) => ({
              ...prev,
              [name]: { base64: base64String, path: URL.createObjectURL(selectedFile) },
            }));
          }
        }
        if (onChange) {
          onChange(name, { base64: base64String, path: URL.createObjectURL(selectedFile) });
        }
      };
    } else {
      setValue(name, type === "checkbox" || type === "radio" ? checked : value, { shouldValidate: true });
      if (externalSetState) {
        if (isNested) {
          const keys = name.split(".");
          externalSetState((prev: any) =>
            updateNestedValue(prev, keys, type === "checkbox" || type === "radio" ? checked : value)
          );
        } else {
          externalSetState((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" || type === "radio" ? checked : value,
          }));
        }
      }
      if (onChange) {
        onChange(name, type === "checkbox" || type === "radio" ? checked : value);
      }
    }
    if (type === "hidden") {
      setValue(name, value, { shouldValidate: true });
      if (externalSetState) {
        if (isNested) {
          const keys = name.split(".");
          externalSetState((prev: any) => updateNestedValue(prev, keys, value));
        } else {
          externalSetState((prev: any) => ({ ...prev, [name]: value }));
        }
      }
      if (onChange) {
        onChange(name, value);
      }
    }
  }; 

  export interface FormData {
    [key: string]: any;
  }

type EditItemFunction<T> = (itemId: number, itemList: T[], setItem: React.Dispatch<React.SetStateAction<T | null>>) => void;

export const handleEditClick: EditItemFunction<any> = (itemId, itemList, setItem) => {
  const itemToEdit = itemList.find((e) => e.id === itemId);
  if (itemToEdit) {
    setItem(itemToEdit);
  }
};
