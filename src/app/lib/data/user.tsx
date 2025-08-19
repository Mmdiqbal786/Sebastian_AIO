/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getCurrentUserFromHeader(req: any) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }
  const token = auth.slice(7);
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}