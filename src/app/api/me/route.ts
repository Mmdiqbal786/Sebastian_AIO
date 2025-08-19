import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/lib/data/user";
import User from "@/app/types/User";
import { connectToMongoose } from "@/app/lib/prisma";
import { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export async function GET() {
  try {
    await connectToMongoose();
    const decoded = (await getCurrentUser()) as DecodedUser | null;

    if (!decoded?.id) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await User.findById(decoded.id).select(
      "name email profileImg roleId"
    );

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
        role: user.roleId,
      },
    });
  } catch (err) {
    console.error("❌ Me route error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
