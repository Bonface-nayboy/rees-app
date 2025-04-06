import { connectToDatabase } from "@/src/lib/mongodb";
import { Constituency } from "@/src/models/Constituency";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newConstituency = await Constituency.create({
      name: body.name,
      description: body.description,
      countyId: body.countyId,
    });

    return NextResponse.json(newConstituency, { status: 201 });
  } catch (error) {
    console.error("Error creating constituency:", error);
    return NextResponse.json(
      { message: "Failed to create constituency" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const constituencies = await Constituency.find({}).populate("countyId");
  return NextResponse.json(constituencies);
}
