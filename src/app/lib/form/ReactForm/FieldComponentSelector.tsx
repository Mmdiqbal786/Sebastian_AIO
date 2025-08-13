/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormField } from "./types";
import {
  InputField,
  SelectField,
  MultiSelectField,
  RichTextField,
  FileField,
  SubTableField,
  DynamicMultiSelectField,
  DateField,
  TimeField,
  DateTimeField, 
  ControlSelectField,
  DynamicGroupMultiSelectField
} from "./fields";

interface FieldComponentSelectorProps {
  field: FormField;
  register: any;
}

const FieldComponentSelector: React.FC<FieldComponentSelectorProps> = ({ 
  field,
  register
}) => {
  const Component = getFieldComponent(field.type);
  return <Component field={field} register={register} control={undefined} />;
};

const getFieldComponent = (type: string) => {
  switch (type.toLowerCase()) {
    case "text":
    case "number":
    case "email":
    case "tel":
    case "textarea":
      return InputField;
    case "date":
      return DateField;
    case "time":
      return TimeField;
    case "datetime":
    case "datetime-local":
      return DateTimeField;
    case "select":
    case "creatable-select":
      return SelectField;
    case "control-select":
      return ControlSelectField;
    case "multi-select":
      return MultiSelectField;
    case "richtext":
      return RichTextField;
    case "file":
      return FileField;
    case "subtable":
      return SubTableField;
    case "dynamic-multiselect":
      return DynamicMultiSelectField;
    case "dynamic-group-multiselect":
      return DynamicGroupMultiSelectField;
    default:
      return InputField;
  }
};

export default React.memo(FieldComponentSelector);
