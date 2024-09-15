// app/api/add-image/route.ts (or pages/api/add-image.ts if using the pages directory)
import { NextRequest, NextResponse } from "next/server";
import { insertArt } from "@/lib/data"; // Adjust the path as necessary

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON from the request

    const result = await insertArt(body); // Call the insertImage function from your data.ts

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error inserting image:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to insert image",
    });
  }
}
