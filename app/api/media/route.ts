import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function streamFile(filepath: string, options?: { start: number; end: number }): ReadableStream {
  const fileStream = fs.createReadStream(filepath, options);
  
  return new ReadableStream({
    start(controller) {
      fileStream.on('data', (chunk: any) => {
        try {
          controller.enqueue(new Uint8Array(chunk));
        } catch (e) {
          // Stream might have been closed by the client
          fileStream.destroy();
        }
      });
      fileStream.on('end', () => {
        try {
          controller.close();
        } catch (e) {
          // ignore already closed
        }
      });
      fileStream.on('error', (err) => {
        try {
          controller.error(err);
        } catch (e) {
          // ignore
        }
      });
    },
    cancel() {
      fileStream.destroy();
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const fileParam = req.nextUrl.searchParams.get('file');
    if (!fileParam) {
      return new NextResponse('No file provided', { status: 400 });
    }

    const safeFilename = path.basename(fileParam);
    const filepath = path.join(process.cwd(), 'public', 'wallpapers', safeFilename);

    if (!fs.existsSync(filepath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.get('range');

    const ext = path.extname(safeFilename).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.mp4') contentType = 'video/mp4';
    else if (ext === '.webm') contentType = 'video/webm';
    else if (ext === '.ogg') contentType = 'video/ogg';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      
      const webStream = streamFile(filepath, { start, end });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': contentType,
        },
      });
    } else {
      const webStream = streamFile(filepath);

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          'Content-Length': fileSize.toString(),
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
        },
      });
    }
  } catch (error) {
    console.error('Error serving media file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

