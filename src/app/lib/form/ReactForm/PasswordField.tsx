// PasswordField.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface PasswordFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ name, placeholder, className }) => {
  const { setValue, watch } = useFormContext();
  const formValue = watch(name);
  const [localPassword, setLocalPassword] = useState<string>(formValue || "");

  useEffect(() => {
    setLocalPassword(formValue || "");
  }, [formValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalPassword(newValue);
    setValue(name, newValue, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="">
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        value={localPassword}
        onChange={handleChange}
        className={className || "input input-bordered p-2 w-full"}
      />
    </div>
  );
};

export default PasswordField;
