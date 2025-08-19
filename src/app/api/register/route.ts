// import { NextRequest } from "next/server";
// import { connectToMongoose } from "@/app/lib/prisma";
// import Employee from "@/app/types/Employee";
// import EmployeeRole from "@/app/types/Role";
// import bcrypt from "bcryptjs";

// export async function POST(req: NextRequest) {
//   try {
//     // Ensure Mongoose is connected
//     await connectToMongoose();

//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return new Response(
//         JSON.stringify({ error: "Name, email, and password are required." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Check if this is the first user
//     const employeeCount = await Employee.countDocuments();
//     const firstUser = employeeCount === 0;

//     // Assign role based on first user condition
//     const roleName = firstUser ? "admin" : "employee";

//     // Find or create the role
//     let role = await EmployeeRole.findOne({ name: roleName }).exec(); // Add `.exec()` for better async handling
//     if (!role) {
//       role = await EmployeeRole.create({ name: roleName });
//     }

//     console.log(`Assigned Role: ${roleName}`);

//     // Generate auto-increment employeeId and id
//     const lastEmployee = await Employee.findOne().sort({ _id: -1 }).select("_id employeeId");
//     let newEmployeeId = "ACE000001";

//     if (lastEmployee) {
//       const lastNumber = parseInt(lastEmployee.employeeId.replace("ACE", ""), 10);
//       newEmployeeId = `ACE${String(lastNumber + 1).padStart(6, "0")}`;
//     }

//     console.log("Generated Employee ID:", newEmployeeId);

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const timestamp = new Date();
//     // Create Employee
//     const employee = await Employee.create({
//       employeeId: newEmployeeId,
//       name,
//       email,
//       password: hashedPassword,
//       roleId: role._id,
//       createdAt: timestamp,
//       updatedAt: timestamp,
//     });

//     return new Response(
//       JSON.stringify({ message: "Employee registered successfully", id: employee._id }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );

//   } catch (error) {
//     console.error("Error saving Employee:", error);
//     return new Response(
//       JSON.stringify({ error: "Error saving Employee." }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// import { NextRequest } from "next/server";
// import { connectToMongoose } from "@/app/lib/prisma";
// import Employee from "@/app/types/Employee";
// import EmployeeRole from "@/app/types/Role";
// import bcrypt from "bcryptjs";
// import { saveBase64File } from "@/app/lib/serverFileUtils";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToMongoose();
//     const { name, email, password, phone, dob, address, document } = await req.json();
//     if (!name || !email || !password || !phone || !dob || !address || !document) {
//       return new Response(
//         JSON.stringify({ error: "Name, email, phone, dob, address, document and password are required." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }
//     const employeeCount = await Employee.countDocuments();
//     const firstUser = employeeCount === 0;
//     const roleName = firstUser ? "admin" : "employee";
//     let role = await EmployeeRole.findOne({ name: roleName }).exec();
//     if (!role) {
//       role = await EmployeeRole.create({ name: roleName });
//     }
//     const lastEmployee = await Employee.findOne().sort({ _id: -1 }).select("_id employeeId");
//     let newEmployeeId = "ACE000001";
//     if (lastEmployee) {
//       const lastNumber = parseInt(lastEmployee.employeeId.replace("ACE", ""), 10);
//       newEmployeeId = `ACE${String(lastNumber + 1).padStart(6, "0")}`;
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const timestamp = new Date();
//     const parsedDob = new Date(dob);
//     if (isNaN(parsedDob.getTime())) {
//       return new Response(
//         JSON.stringify({ error: "Invalid date format for dob." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }
//     const employee = await Employee.create({
//       employeeId: newEmployeeId,
//       name,
//       email,
//       phone,
//       dob :parsedDob,
//       address,
//       document:  await saveBase64File(document, "document", name),
//       password: hashedPassword,
//       roleId: role._id,
//       createdAt: timestamp,
//       updatedAt: timestamp,
//     });
//     return new Response(
//       JSON.stringify({ message: "Employee registered successfully", id: employee._id }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Error saving Employee:", error);
//     return new Response(
//       JSON.stringify({ error: "Error saving Employee." }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { connectToMongoose } from "@/app/lib/prisma";
// import Employee from "@/app/types/Employee";
// import EmployeeRole from "@/app/types/Role";
// import bcrypt from "bcryptjs";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToMongoose();

//     // ✅ Correctly parse form-data
//     const formData = await req.formData();
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const phone = formData.get("phone") as string;
//     const dob = formData.get("dob") as string;
//     const address = formData.get("address") as string;
//     const document = formData.get("document") as File | null;

//     if (!name || !email || !password || !phone || !dob || !address || !document) {
//       return NextResponse.json({ error: "All fields are required." }, { status: 400 });
//     }

//     // ✅ Handle employee count and role assignment
//     const employeeCount = await Employee.countDocuments();
//     const firstUser = employeeCount === 0;
//     const roleName = firstUser ? "admin" : "employee";
//     let role = await EmployeeRole.findOne({ name: roleName }).exec();
//     if (!role) {
//       role = await EmployeeRole.create({ name: roleName });
//     }

//     // ✅ Generate unique Employee ID
//     const lastEmployee = await Employee.findOne().sort({ _id: -1 }).select("_id employeeId");
//     let newEmployeeId = "ACE000001";
//     if (lastEmployee) {
//       const lastNumber = parseInt(lastEmployee.employeeId.replace("ACE", ""), 10);
//       newEmployeeId = `ACE${String(lastNumber + 1).padStart(6, "0")}`;
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // ✅ Validate date of birth
//     const parsedDob = new Date(dob);
//     if (isNaN(parsedDob.getTime())) {
//       return NextResponse.json({ error: "Invalid date format for dob." }, { status: 400 });
//     }

//     // ✅ Correct way to save the document file
//     const bytes = await document.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const filePath = path.join(process.cwd(), "public/", document.name);
//     await writeFile(filePath, buffer);
//     const documentSavedPath = `/${document.name}`; // Save relative path

//     // ✅ Create employee record in DB
//     const timestamp = new Date();
//     const employee = await Employee.create({
//       employeeId: newEmployeeId,
//       name,
//       email,
//       phone,
//       dob: parsedDob,
//       address,
//       document: documentSavedPath,
//       password: hashedPassword,
//       roleId: role._id,
//       createdAt: timestamp,
//       updatedAt: timestamp,
//     });

//     return NextResponse.json(
//       { message: "Employee registered successfully", id: employee._id },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error saving Employee:", error);
//     return NextResponse.json({ error: "Error saving Employee." }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { connectToMongoose } from "@/app/lib/prisma";
// import Employee from "@/app/types/Employee";
// import { saveToDatabase } from "@/app/lib/utils/saveToDatabase";
// import { generateEmployeeId } from "@/app/lib/utils/generateEmployeeId";
// import { assignRole } from "@/app/lib/utils/assignRole";
// import { assignType } from "@/app/lib/utils/assignType";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToMongoose();
//     const formData = await req.formData();

//     const employeeCount = await Employee.countDocuments();
//     const roleId = await assignRole(employeeCount === 0);
//     const userType = await assignType(employeeCount === 0);
//     const newEmployeeId = await generateEmployeeId();

//     const result = await saveToDatabase({
//       model: Employee,
//       data: formData,
//       requiredFields: ["name", "email", "password", "phone", "dob", "address"],
//       requiredFiles: ["document","profileImg"],
//       fileFields: ["document","profileImg"],
//       hashPasswordField: "password",
//       additionalFields: { employeeId: newEmployeeId, roleId, type: userType },
//     });

//     if (!result.success) {
//       return NextResponse.json({ error: result.error }, { status: 400 });
//     }

//     return NextResponse.json(
//       { message: "Employee registered successfully", id: result.id },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error saving Employee:", error);
//     return NextResponse.json({ error: "Error saving Employee." }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectToMongoose } from "@/app/lib/prisma";
import User from "@/app/types/User";
import { saveToDatabase } from "@/app/lib/utils/saveToDatabase";
import { generateEmployeeId } from "@/app/lib/utils/generateEmployeeId";
import { assignRole } from "@/app/lib/utils/assignRole";
import { assignType } from "@/app/lib/utils/assignType";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoose();
    const formData = await req.formData();

    const userCount = await User.countDocuments();
    const roleId = await assignRole(userCount === 0);
    const userTypeId = await assignType(userCount === 0);
    const newUserId = await generateEmployeeId();

    const result = await saveToDatabase({
      model: User,
      data: formData,
      requiredFields: ["name", "email", "password", "phone"],
      requiredFiles: ["profileImg"],
      fileFields: ["profileImg"],
      hashPasswordField: "password",
      additionalFields: { userId: newUserId, roleId, userTypeId },
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User registered successfully", id: result.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving User:", error);
    return NextResponse.json({ error: "Error saving User." }, { status: 500 });
  }
}
