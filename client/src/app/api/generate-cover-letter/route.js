import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req) {
  const token = await getToken({ req, raw: true });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const res = await fetch('http://localhost:5001/api/generate-cover-letter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
