import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'attachments', ...params.path);
    const content = await fs.readFile(filePath);
    const fileName = params.path[params.path.length - 1];
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error reading attachment:', error);
    return new NextResponse('Attachment not found', { status: 404 });
  }
} 