import { NextRequest, NextResponse } from "next/server";
import { checkPermission } from "@/app/lib/utils/PermissionCheck";

export async function POST(req: NextRequest) {
  const { userId, path, action } = await req.json();
  const allowed = await checkPermission(userId, path, action);
  return NextResponse.json({ allowed });
}