export type AppUserType = {
  name: string;
  isActive?: boolean;
};

export const userTypes: AppUserType[] = [
  { name: "system", isActive: true },
  { name: "user", isActive: true },
  { name: "guest", isActive: true },
];
