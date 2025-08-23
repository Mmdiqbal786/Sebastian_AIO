import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/lib/data/user";
import User from "@/app/types/User";
import { connectToMongoose } from "@/app/lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import Path from "@/app/types/Path";
import UserPermission from "@/app/types/UserPermission";
import RolePermission from "@/app/types/RolePermission";

interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

// ----- without permission ------ //

// export async function GET() {
//   try {
//     await connectToMongoose();
//     const decoded = (await getCurrentUser()) as DecodedUser | null;

//     if (!decoded?.id) {
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     const user = await User.findById(decoded.id).select(
//       "name email profileImg roleId"
//     );

//     if (!user) {
//       return NextResponse.json({ user: null }, { status: 200 });
//     }

//     return NextResponse.json({
//       user: {
//         id: user._id.toString(),
//         email: user.email,
//         name: user.name,
//         profileImg: user.profileImg,
//         role: user.roleId,
//       },
//     });
//   } catch (err) {
//     console.error("❌ Me route error:", err);
//     return NextResponse.json({ user: null }, { status: 500 });
//   }
// }

// ----- without permission ----- //

// ----- with permission ----- //

export async function GET() {
  try {
    await connectToMongoose();

    const decoded = (await getCurrentUser()) as DecodedUser | null;
    if (!decoded?.id) {
      return NextResponse.json({ user: null }, { status: 200 })
    };

    const user = await User.findById(decoded.id).select("name email profileImg roleId");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    };

    const paths = await Path.find();

    // Build permissions map
    const permissions: Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }> = {};

    for (const path of paths) {
      // 1️⃣ Check if user has specific permission
      const userPerm = await UserPermission.findOne({ userId: user._id, pathId: path._id });
      if (userPerm) {
        permissions[path.path] = {
          view: userPerm.canView,
          create: userPerm.canCreate,
          edit: userPerm.canEdit,
          delete: userPerm.canDelete,
        };
        continue;
      }

      // 2️⃣ Otherwise, fallback to role permission
      const rolePerm = await RolePermission.findOne({ roleId: user.roleId, pathId: path._id });
      if (rolePerm) {
        permissions[path.path] = {
          view: rolePerm.canView,
          create: rolePerm.canCreate,
          edit: rolePerm.canEdit,
          delete: rolePerm.canDelete,
        };
      } else {
        permissions[path.path] = { view: false, create: false, edit: false, delete: false };
      }
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
        role: user.roleId,
        permissions,
      },
    });
  } catch (err) {
    console.error("❌ Me route error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

// ----- with permission ----- //