import { connectToDatabase } from "@/src/lib/mongodb";
import { Constituency } from "@/src/models/Constituency";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ countyId: string }> }
) {
  const countyId = (await context.params).countyId;

  try {
    // Connect to the database
    await connectToDatabase();

    // Validate the countyId
    if (!countyId || !mongoose.Types.ObjectId.isValid(countyId)) {
      return NextResponse.json(
        { message: "Invalid or missing countyId" },
        { status: 400 }
      );
    }

    // Fetch constituencies for the given countyId
    const constituencies = await Constituency.find({ countyId });

    // If no constituencies are found
    if (!constituencies.length) {
      return NextResponse.json(
        { message: "No constituencies found for this county" },
        { status: 404 }
      );
    }

    // Return the found constituencies
    return NextResponse.json(constituencies, { status: 200 });
  } catch (error) {
    console.error("Error fetching constituencies:", error);
    return NextResponse.json(
      { message: "Failed to fetch constituencies" },
      { status: 500 }
    );
  }
}
