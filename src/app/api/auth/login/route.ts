// import { NextRequest, NextResponse } from "next/server";
// import { verifyPassword } from "@/app/lib/passwordUtils";
// import jwt from "jsonwebtoken";
// import Employee from "@/app/types/Employee";
// import { connectToMongoose } from "@/app/lib/prisma";

// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToMongoose(); // Ensure DB is connected before querying

//     const { email, password } = await req.json();
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
//     }

//     const employee = await Employee.findOne({ email });
//     if (!employee) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     const isPasswordValid = await verifyPassword(password, employee.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
//     }

//     const token = jwt.sign({ id: employee._id, email: employee.email }, SECRET_KEY, {
//       expiresIn: "7d",
//     });

//     return NextResponse.json(
//       { message: "Login successful", token, employee: employee.email },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     return NextResponse.json({ error: "Error logging in." }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { verifyPassword } from "@/app/lib/passwordUtils";
// import jwt from "jsonwebtoken";
// import Employee from "@/app/types/Employee";
// import { connectToMongoose } from "@/app/lib/prisma";

// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToMongoose(); // Ensure DB is connected before querying

//     const { email, password } = await req.json();
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
//     }

//     const employee = await Employee.findOne({ email });
//     if (!employee) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     const isPasswordValid = await verifyPassword(password, employee.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
//     }

//     const token = jwt.sign(
//       { id: employee._id, email: employee.email, role: employee.role },
//       SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     return NextResponse.json(
//       { message: "Login successful", token, employee: { email: employee.email, role: employee.role } },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     return NextResponse.json({ error: "Error logging in." }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { verifyPassword } from "@/app/lib/passwordUtils";
// import jwt from "jsonwebtoken";
// import User from "@/app/types/User";
// import { connectToMongoose } from "@/app/lib/prisma";

// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToMongoose();

//     const { email, password } = await req.json();
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }

//     const isPasswordValid = await verifyPassword(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     return NextResponse.json(
//       { message: "Login successful", token, user: { email: user.email, role: user.role } },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     return NextResponse.json({ error: "Error logging in." }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/app/lib/passwordUtils";
import jwt from "jsonwebtoken";
import User from "@/app/types/User";
import { connectToMongoose } from "@/app/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoose();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // ✅ Sign JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // ✅ Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        token, // for mobile
        user: { email: user.email, role: user.role },
      },
      { status: 200 }
    );

    // ✅ Set cookie (for web)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ Login Error:", error);
    return NextResponse.json({ error: "Error logging in." }, { status: 500 });
  }
}
