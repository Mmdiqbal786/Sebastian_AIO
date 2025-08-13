import bcrypt from "bcryptjs";

/**
 * Hash a password using bcrypt.
 * @param password - The plain text password.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hashed password.
 * @param password - The plain text password entered by the user.
 * @param hashedPassword - The stored hashed password.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const isHashed = (password: string) => {
  return /^\$2[aby]\$[\d]+\$[./A-Za-z0-9]{53}$/.test(password);
};

export const processPassword = async (newPassword: string | undefined, existingHashedPassword: string) => {
  if (!newPassword) return existingHashedPassword;
  if (isHashed(newPassword)) {
    return existingHashedPassword;
  }
  const isSamePassword = await bcrypt.compare(newPassword, existingHashedPassword);
  return isSamePassword ? existingHashedPassword : await bcrypt.hash(newPassword, 10);
};
