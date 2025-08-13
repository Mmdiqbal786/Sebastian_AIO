import fs from "fs";
import path from "path";
import sharp from "sharp";
import { NextResponse } from "next/server";

const envPath = path.join(process.cwd(), ".env");

function getEnvSettings() {
  if (!fs.existsSync(envPath)) return {};
  
  const envFile = fs.readFileSync(envPath, "utf8");
  const envVars: Record<string, string> = {};

  envFile.split("\n").forEach(line => {
    const [key, ...valueParts] = line.split("=");  
    let value = valueParts.join("=").trim();  
    value = value.replace(/^["']|["']$/g, "");  
    if (key && value !== undefined) {
      envVars[key.trim()] = value;
    }
  });

  return envVars;
}

export async function GET() {
  try {
    const settings = getEnvSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" + error }, { status: 500 });
  }
}

const uploadDir = path.join(process.cwd(), "public");
const logoPath = path.join(uploadDir, "logo");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const NEXT_MONGO_URI = formData.get("NEXT_MONGO_URI") as string;
    const NEXT_MONGO_DB = formData.get("NEXT_MONGO_DB") as string;
    const NEXT_PUBLIC_COMPANY_NAME = formData.get("NEXT_PUBLIC_COMPANY_NAME") as string;
    const file = formData.get("logo") as File | null;
    const envVars = getEnvSettings();
    envVars["NEXT_MONGO_URI"] = NEXT_MONGO_URI;
    envVars["NEXT_MONGO_DB"] = NEXT_MONGO_DB;
    envVars["NEXT_PUBLIC_COMPANY_NAME"] = NEXT_PUBLIC_COMPANY_NAME;
    if (file) {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileExt = file.name.split(".").pop() || "png";
      const newFilePath = `${logoPath}.${fileExt}`;
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(newFilePath, fileBuffer);
      const resizedBuffer = await sharp(fileBuffer)
        .resize(200, 159)
        .toFormat("png")
        .toBuffer();
      fs.writeFileSync(newFilePath, resizedBuffer);
      envVars["NEXT_PUBLIC_COMPANY_LOGO_PATH"] = `/logo.${fileExt}`;
    }
    const newEnvContent = Object.entries(envVars)
      .map(([key, value]) => `${key}="${value}"`)
      .join("\n");

    fs.writeFileSync(envPath, newEnvContent);

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings: " + error }, { status: 500 });
  }
}
