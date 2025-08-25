/* eslint-disable @typescript-eslint/no-explicit-any */
export const decimalTransform = (fieldNames: string[]) => {
  return {
    transform: (_: any, ret: any) => {
      fieldNames.forEach((field) => {
        if (ret[field] !== undefined && ret[field] !== null) {
          ret[field] = ret[field].toString();
        }
      });
      return ret;
    },
  };
};

export const createTransform =
  (decimalFields: string[] = []) =>
  (_: any, ret: any) => {
    for (const field of decimalFields) {
      if (ret[field] !== undefined && ret[field] !== null) {
        ret[field] = ret[field].toString();
      }
    }
    return ret;
  };