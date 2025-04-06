// app/api/counties/route.ts
import { connectToDatabase } from '@/src/lib/mongodb';
import { County } from '@/src/models/County';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const counties = await County.find({});
  return NextResponse.json(counties, { status: 200 });
}

export async function POST(req: Request) {
    try {
      await connectToDatabase();
      const body = await req.json();
      const newCounty = await County.create(body);
      return NextResponse.json(newCounty, { status: 201 });
    } catch (error) {
      console.error("Error in POST /api/counties:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
  
