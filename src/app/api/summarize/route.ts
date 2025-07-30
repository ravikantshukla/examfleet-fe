import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy endpoint that forwards uploaded PDFs to the ExamFleet backend for
 * summarisation.  The client sends a multipart/form-data POST request
 * containing a single `file` field.  This handler reads the file into a
 * Buffer, encodes it to base64 and calls the backend `/summarize` API
 * using the base URL defined in `NEXT_PUBLIC_API_BASE_URL`.  The response
 * from the backend is returned directly to the client.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as unknown as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // Read the file into a buffer
    const arrayBuffer = await file.arrayBuffer();
    // @ts-ignore: Buffer is available in the Node.js runtime
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBase) {
      return NextResponse.json({ error: 'API base URL not configured' }, { status: 500 });
    }
    // Forward the request to the backend summarise endpoint
    const res = await fetch(`${apiBase}/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileContent: base64 }),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Summarise proxy failed', err);
    return NextResponse.json({ error: 'Failed to summarise document' }, { status: 500 });
  }
}
