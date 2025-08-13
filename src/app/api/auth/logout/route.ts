import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully." }, { status: 200 });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("❌ Logout Error:", error);
    return NextResponse.json({ error: "Error logging out." }, { status: 500 });
  }
}
