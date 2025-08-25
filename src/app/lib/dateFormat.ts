/* eslint-disable @typescript-eslint/no-explicit-any */
const formatDate = (datetimeString: string, months: string[]): string => {
  const [datePart] = datetimeString.split(" ");
  const [year, month, day] = datePart.split("-");
  const monthName: string = months[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
};

export const processDate = (newDateValue: string | Date | undefined, existingDateValue: string | Date | undefined) => {
  if (!newDateValue) {
    return existingDateValue;
  }
  const newDate = new Date(newDateValue);
  const existingDate = existingDateValue ? new Date(existingDateValue) : null;
  if (isNaN(newDate.getTime())) {
    return existingDateValue;
  }
  if (!existingDate || newDate.getTime() !== existingDate.getTime()) {
    return newDate;
  }
  return existingDateValue;
};

export const formatDateWithTimezone = (dateValue: string | Date | undefined): Date | undefined => {
  if (!dateValue) {
    return undefined;
  }
  const localDate = new Date(dateValue);
  if (isNaN(localDate.getTime())) {
    return undefined;
  }
  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
};

export const addTimestamps = (data: any, timestamp: Date) => ({
  ...data,
  createdAt: timestamp,
  updatedAt: timestamp,
});

export function formatDateOrTime(dateString: string): string {
  const date = new Date(dateString);
  if (dateString.includes("T")) {
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default formatDate;

/**
 * Check if a value is a valid ISO date string (with or without time)
 */
export const isISODate = (value: any): boolean => {
  if (typeof value !== "string") {
    return false;
  }

  // Matches YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss(.sss)Z
  const isoRegex =
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|([+-]\d{2}:\d{2}))?)?$/;

  return isoRegex.test(value);
};

// Strict ISO date check (YYYY-MM-DD or YYYY-MM-DDTHH:mm)
export const isISODateStrict = (value: any): boolean => {
  return (
    typeof value === "string" &&
    (/^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value))
  );
};

// General ISO-compatible date check (uses Date.parse)
export const isISODateLoose = (value: any): boolean => {
  return typeof value === "string" && !isNaN(Date.parse(value));
};