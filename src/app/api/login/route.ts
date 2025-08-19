// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { verifyPassword } from "@/app/lib/passwordUtils";
// import Employee from "@/app/types/Employee";

// const SESSION_COOKIE_NAME = "employee-session";
// const SESSION_COOKIE_MAIL_NAME = "employee-session-email";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required." },
//         { status: 400 }
//       );
//     }

//     const employee = await Employee.findOne({ email });
//     if (!employee) {
//       return NextResponse.json(
//         { error: "User not found." },
//         { status: 404 }
//       );
//     }

//     const isPasswordValid = await verifyPassword(password, employee.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     const sessionId = uuidv4();
//     const isProduction = process.env.NODE_ENV === "production";

//     const response = NextResponse.json(
//       { message: "Login successful", employee: employee.email },
//       { status: 200 }
//     );

//     response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: "strict",
//       maxAge: 60 * 60,
//       path: "/",
//     });

//     response.cookies.set(SESSION_COOKIE_MAIL_NAME, employee.email, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: "strict",
//       maxAge: 60 * 60,
//       path: "/",
//     });
    
//     return response;
//   } catch (error) {
//     console.error("Login Error:", error);
//     return NextResponse.json(
//       { error: "Error logging in." },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/app/lib/passwordUtils";
import User from "@/app/types/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.roleId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          profileImg: user.profileImg,
          role: user.roleId,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Error logging in." }, { status: 500 });
  }
}
