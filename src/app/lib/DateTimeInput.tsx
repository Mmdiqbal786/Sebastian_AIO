import React, { useState, useEffect } from "react";

interface DateTimeInputProps {
  name: string;
  value?: string;
  required?: boolean;
  onChange?: (fieldName: string, value: string) => void;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ name, value, required, onChange }) => {
  const [localValue, setLocalValue] = useState(value ? new Date(value).toISOString().slice(0, 16) : "");
  useEffect(() => {
    if (value) {
      setLocalValue(new Date(value).toISOString().slice(0, 16));
    }
  }, [value]);

  const handleConfirm = () => {
    if (!localValue) {
      onChange?.(name, "");
      return;
    }
    const localDate = new Date(localValue);
    if (isNaN(localDate.getTime())) {
      console.error("Invalid date input:", localValue);
      return;
    }
    const utcISOString = localDate.toISOString();
    onChange?.(name, utcISOString);
  };

  return (
    <div className="relative">
      <input
        type="datetime-local"
        className="input input-bordered w-full p-1 text-sm py-2 pr-20"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        required={required}
      />
      <button
        type="button"
        onClick={handleConfirm}
        className="absolute inset-y-0 right-0 flex items-center px-3 bg-blue-500 text-white rounded-md text-sm"
      >
        Confirm
      </button>
    </div>
  );
};

export default DateTimeInput;
