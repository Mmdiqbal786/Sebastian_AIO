import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Received data:", data);
    // Save to DB (MongoDB / Prisma / Supabase) here
    return res.status(200).json({ success: true, data });
  }
  res.status(405).json({ error: "Method not allowed" });
}
