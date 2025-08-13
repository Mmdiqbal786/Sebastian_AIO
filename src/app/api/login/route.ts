import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { verifyPassword } from "@/app/lib/passwordUtils";
import Employee from "@/app/types/Employee";

const SESSION_COOKIE_NAME = "employee-session";
const SESSION_COOKIE_MAIL_NAME = "employee-session-email";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const isPasswordValid = await verifyPassword(password, employee.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const sessionId = uuidv4();
    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json(
      { message: "Login successful", employee: employee.email },
      { status: 200 }
    );

    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    response.cookies.set(SESSION_COOKIE_MAIL_NAME, employee.email, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Error logging in." },
      { status: 500 }
    );
  }
}
