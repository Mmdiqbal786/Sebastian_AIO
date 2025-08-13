/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormField {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  value?: any;
  onChange?: (fieldName: string, value: any) => void;
  options?: Array<{
    label: string;
    value: any;
    dependency?: string;
    [key: string]: any;
  }>;
  dependsOn?: string;
  fetchUrl?: string;
  subFields?: FormField[];
  initialRows?: number;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
  config?: DynamicMultiSelectConfig;
  minDate?: string;
  maxDate?: string;
  minTime?: string;
  maxTime?: string;
  step?: number;
  transformValue?: (value: any) => any;
  defaultValue?: any;
}

export interface DynamicMultiSelectConfig {
  apiEndpoint?: string;
  queryParams?: Record<string, string>;
  selectionLimit?: number;
  defaultOptions?: Array<{ value: string; label: string }>;
  groups?: {
    groupName: string; 
    groupLabel?: string;
    defaultOptions: { label: string; value: string }[];
    selectionLimit: number;
    emptyMessage?: string;
  }[];
}

export interface DynamicFormProps {
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: any) => void;
  loading?: boolean;
  onChange?: (fieldName: string, value: any) => void;
}
