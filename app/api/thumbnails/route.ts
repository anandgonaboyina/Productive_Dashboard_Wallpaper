import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Provide a safe filename
    const ext = path.extname(file.name);
    const basename = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${basename}-${Date.now()}${ext}`;

    const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');
    if (!fs.existsSync(thumbnailsDir)) {
      fs.mkdirSync(thumbnailsDir, { recursive: true });
    }

    const filepath = path.join(thumbnailsDir, filename);
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({ success: true, url: `/thumbnails/${filename}` });
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    return NextResponse.json({ error: 'Failed to upload thumbnail' }, { status: 500 });
  }
}
