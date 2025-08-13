/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export function authenticateUser(req: NextRequest, role: "user" | "employee") {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string; role: string };

    // Check role
    if (role && decoded.role !== role) {
      return NextResponse.json({ error: "Forbidden: Access Denied" }, { status: 403 });
    }

    return decoded;
  } catch (error:any) {
    return NextResponse.json({ error: "Invalid token"+ error }, { status: 403 });
  }
}
