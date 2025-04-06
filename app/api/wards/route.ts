import { connectToDatabase } from "@/src/lib/mongodb";
import { Ward } from "@/src/models/Ward";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newWard = await Ward.create({
      name: body.name,
      description: body.description,
      constituencyId: body.constituencyId,
    });

    return NextResponse.json(newWard, { status: 201 });
  }  catch (error: any) {
    console.error("Error creating ward:", error.message, error.stack);
    return NextResponse.json(
      { message: "Failed to create ward", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const wards = await Ward.find({}).populate("constituencyId");
  return NextResponse.json(wards);
}
