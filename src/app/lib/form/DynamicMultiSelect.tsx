/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

export interface DynamicMultiSelectConfig {
  apiEndpoint?: string;
  queryParams?: Record<string, string>;
  selectionLimit?: number;
  defaultOptions?: Array<{ value: string; label: string }>;
}

interface DynamicMultiSelectProps {
  fieldName: string;
  setValue: any;
  getValues: any;
  onChange?: (fieldName: string, value: any) => void;
  config?: DynamicMultiSelectConfig;
}

const DynamicMultiSelect: React.FC<DynamicMultiSelectProps> = ({
  fieldName,
  setValue,
  getValues,
  onChange,
  config,
}) => {
  const effectiveConfig: DynamicMultiSelectConfig = useMemo(() => ({
    apiEndpoint: "",
    queryParams: {},
    selectionLimit: undefined,
    defaultOptions: [],
    ...config,
  }), [config]);

  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    async function fetchOptions() {
      if (!effectiveConfig.apiEndpoint) {
        setOptions(effectiveConfig.defaultOptions || []);
        return;
      }
      const queryParams = effectiveConfig.queryParams
        ? Object.entries(effectiveConfig.queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&")
        : "";
      try {
        const res = await fetch(`${effectiveConfig.apiEndpoint}?${queryParams}`);
        const data = await res.json();
        const opts = data.map((item: any) => ({
          value: item._id,
          label: item.name,
        }));
        setOptions(opts);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    }
    fetchOptions();
  }, [effectiveConfig]);

  return (
    <Select
      isMulti
      options={options}
      onChange={(selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
        if (effectiveConfig.selectionLimit && selectedValues.length > effectiveConfig.selectionLimit) {
          return;
        }
        setValue(fieldName, selectedValues, { shouldValidate: true });
        onChange?.(fieldName, selectedValues);
      }}
      defaultValue={
        getValues(fieldName)
          ? options.filter((opt: any) => getValues(fieldName).includes(opt.value))
          : []
      }
    />
  );
};

export default DynamicMultiSelect;
