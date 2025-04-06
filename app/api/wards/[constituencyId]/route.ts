import { connectToDatabase } from "@/src/lib/mongodb";
import { Ward } from "@/src/models/Ward";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ constituencyId: string }> }
) {
  const constituencyId = (await context.params).constituencyId;

  try {
    // Connect to the database
    await connectToDatabase();

    // Validate the countyId
    if (!constituencyId || !mongoose.Types.ObjectId.isValid(constituencyId)) {
      return NextResponse.json(
        { message: "Invalid or missing constituency Id" },
        { status: 400 }
      );
    }

    // Fetch constituencies for the given countyId
    const wards = await Ward.find({ constituencyId });

    // If no constituencies are found
    if (!wards.length) {
      return NextResponse.json(
        { message: "No wards found for this constituency" },
        { status: 404 }
      );
    }

    // Return the found constituencies
    return NextResponse.json(wards, { status: 200 });
  } catch (error) {
    console.error("Error fetching wards:", error);
    return NextResponse.json(
      { message: "Failed to fetch wards" },
      { status: 500 }
    );
  }
}
