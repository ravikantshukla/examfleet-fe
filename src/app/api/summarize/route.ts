import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // dummy implementation
  return NextResponse.json({ summary: "This is a test summary." });
}
