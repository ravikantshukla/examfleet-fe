import { NextRequest, NextResponse } from 'next/server';

// Read the backend API base URL from the environment.  This must be set
// to the deployed API Gateway base URL for the proxy to function.  When
// undefined this route returns an error to signal misconfiguration.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Proxy handler for retrieving a user's aggregated quiz performance.
 * The client should send a JSON body containing the `userId`, and
 * optionally other parameters such as date ranges.  The request is
 * forwarded to the ExamFleet backend `/performance` endpoint.  The
 * response from the backend is returned as-is.
 */
export async function POST(request: NextRequest) {
  try {
    if (!API_BASE) {
      return NextResponse.json(
        { error: 'API base URL not configured' },
        { status: 500 },
      );
    }
    const body = await request.json();
    const res = await fetch(`${API_BASE}/performance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Performance proxy failed', err);
    return NextResponse.json(
      { error: 'Failed to fetch performance' },
      { status: 500 },
    );
  }
}