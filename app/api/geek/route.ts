import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const geekDirectory = join(process.cwd(), 'content/geek');

// 添加缓存
let postsCache: GeekFrontMatter[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

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

function parseDate(dateStr: string): Date {
  // 移除引号并解析日期
  const cleanDate = dateStr.replace(/"/g, '').trim();
  return new Date(cleanDate);
}

async function fetchPosts() {
  const currentTime = Date.now();
  
  // 如果缓存有效，直接返回缓存
  if (postsCache.length > 0 && currentTime - lastFetchTime < CACHE_DURATION) {
    return postsCache;
  }

  try {
    const fileNames = await readdir(geekDirectory);
    
    const posts = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async fileName => {
          try {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = join(geekDirectory, fileName);
            const fileContents = await readFile(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            if (!validateFrontMatter(matterResult.data)) {
              console.warn(`Skipping ${fileName} due to invalid frontmatter`);
              return null;
            }

            return {
              slug,
              ...matterResult.data,
              date: matterResult.data.date.replace(/"/g, '').trim(),
            };
          } catch (error) {
            console.error(`Error processing ${fileName}:`, error);
            return null;
          }
        })
    );

    // 过滤掉无效的文章并排序
    const validPosts = posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        
        if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
          console.warn('Invalid date found:', { a: a.date, b: b.date });
          return 0;
        }
        
        return dateB.getTime() - dateA.getTime();
      });

    // 更新缓存
    postsCache = validPosts;
    lastFetchTime = currentTime;
    
    return validPosts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const headersList = headers();
    const posts = await fetchPosts();
    
    return new NextResponse(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300', // 5分钟的 CDN 缓存
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch posts' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 