import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const sessionFilePath = path.join(process.cwd(), '.session.json');

export async function GET() {
  try {
    if (fs.existsSync(sessionFilePath)) {
      const data = fs.readFileSync(sessionFilePath, 'utf-8');
      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0',
        },
      });
    }
    return NextResponse.json({ token: null, username: null });
  } catch (err) {
    return NextResponse.json({ token: null, username: null });
  }
}

export async function POST(request: Request) {
  try {
    const { token, username } = await request.json();
    if (token) {
      fs.writeFileSync(sessionFilePath, JSON.stringify({ token, username }));
    } else {
      if (fs.existsSync(sessionFilePath)) {
        fs.unlinkSync(sessionFilePath);
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}
