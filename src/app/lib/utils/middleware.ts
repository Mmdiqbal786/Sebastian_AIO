/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { checkPermission } from "@/app/lib/utils/PermissionCheck";

// export async function middleware(req: NextRequest) {
//   const userId = req.cookies.get("userId")?.value; // or get from JWT/session
//   const path = req.nextUrl.pathname;

//   if (!userId) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const allowed = await checkPermission(userId, path, "view");
//   if (!allowed) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }

// // Only apply middleware to protected paths
// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToMongoose } from "@/app/lib/prisma";
import User from "@/app/types/User";
import Path from "@/app/types/Path";
import UserPermission from "@/app/types/UserPermission";
import RolePermission from "@/app/types/RolePermission";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const PUBLIC_PATHS = ["/login", "/signup", "/public"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  await connectToMongoose();

  const user = await User.findById(decoded.id).select("roleId");
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch all paths at once
  const paths = await Path.find().lean();
  const pathMap: Record<string, string> = {}; // path string → pathId
  paths.forEach((p) => { pathMap[p.path] = p._id.toString(); });

  const pathId = pathMap[pathname];
  if (!pathId) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Fetch all role permissions for this role
  const rolePerms = await RolePermission.find({ roleId: user.roleId }).lean();
  const rolePermMap: Record<string, { canView: boolean }> = {};
  rolePerms.forEach((rp) => {
    rolePermMap[rp.pathId.toString()] = { canView: rp.canView };
  });

  // Fetch all user-specific permissions for this user
  const userPerms = await UserPermission.find({ userId: user._id }).lean();
  const userPermMap: Record<string, { canView: boolean }> = {};
  userPerms.forEach((up) => {
    userPermMap[up.pathId.toString()] = { canView: up.canView };
  });

  // Check permissions: user override > role permission
  const userPerm = userPermMap[pathId];
  if (userPerm?.canView) {
    return NextResponse.next();
  }

  const rolePerm = rolePermMap[pathId];
  if (rolePerm?.canView) {
    return NextResponse.next();
  }

  // No permission
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
