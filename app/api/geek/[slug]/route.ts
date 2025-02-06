import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

const geekDirectory = join(process.cwd(), 'content/geek');

interface GeekFrontMatter {
  title: string;
  description: string;
  date: string;
  videoUrl: string;
  attachmentUrl?: string;
}

function validateFrontMatter(data: unknown): data is GeekFrontMatter {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.title === 'string' &&
    typeof d.description === 'string' &&
    typeof d.date === 'string' &&
    typeof d.videoUrl === 'string' &&
    (d.attachmentUrl === undefined || typeof d.attachmentUrl === 'string')
  );
}

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const slug = params.slug;
  
  if (!slug) {
    return NextResponse.json(
      { error: 'Slug is required' },
      { status: 400 }
    );
  }

  try {
    const fullPath = join(geekDirectory, `${slug}.mdx`);
    const fileContents = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!validateFrontMatter(data)) {
      throw new Error(`Invalid frontmatter in ${slug}.mdx`);
    }

    return NextResponse.json({
      meta: data,
      content,
    });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 404 }
    );
  }
} 