import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided', success: false },
        { status: 400 }
      );
    }

    // Validate it's an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Only image files are allowed', success: false },
        { status: 400 }
      );
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File must be smaller than 5 MB', success: false },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Unique filename: timestamp + original name (sanitised)
    const ext = file.name.split('.').pop() ?? 'jpg';
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_{2,}/g, '_');
    const filename = `${Date.now()}_${safeName}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    // Return the public URL path
    const publicPath = `/uploads/${filename}`;
    return NextResponse.json({ success: true, path: publicPath }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Upload failed', success: false },
      { status: 500 }
    );
  }
}
