export type AppRole = {
  name: string;
  isActive?: boolean;
};

export const roles: AppRole[] = [
  { name: "admin", isActive: true },
  { name: "user", isActive: true },
  { name: "guest", isActive: true },
];
