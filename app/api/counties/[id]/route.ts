// app/api/county/[id]/route.ts

import { connectToDatabase } from "@/src/lib/mongodb";
import { County } from "@/src/models/County";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid county ID" },
        { status: 400 }
      );
    }

    const county = await County.findById(id);

    if (!county) {
      return NextResponse.json(
        { message: "County not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(county);
  } catch (error: any) {
    console.error("Error fetching county:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
