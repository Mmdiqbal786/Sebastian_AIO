import { NextResponse } from "next/server";

export function validateFormData(
  formData: FormData,
  requiredFields: string[],
  requiredFiles: string[] = []
): { success: true; data: Record<string, FormDataEntryValue> } | { success: false; response: NextResponse } {
  const formDataEntries: Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries());
  for (const field of requiredFields) {
    if (!formDataEntries[field]) {
      return {
        success: false,
        response: NextResponse.json({ error: `${field} is required.` }, { status: 400 }),
      };
    }
  }
  for (const fileField of requiredFiles) {
    const file = formDataEntries[fileField];
    if (!(file instanceof File)) {
      return {
        success: false,
        response: NextResponse.json({ error: `${fileField} must be a file.` }, { status: 400 }),
      };
    }
  }

  return { success: true, data: formDataEntries };
}
