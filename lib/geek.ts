import { cache } from 'react';
import type { GeekPost, GeekMeta } from "@/types/geek";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const geekDirectory = path.join(process.cwd(), 'content/geek');

export const getAllGeekPosts = cache(async (): Promise<GeekPost[]> => {
  try {
    // 首先尝试通过 API 获取
    const response = await fetch(`${baseUrl}/api/geek`, {
      next: { revalidate: 0 },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
    
    if (response.ok) {
      const posts = await response.json();
      return posts;
    }
  } catch (error) {
    console.warn('API fetch failed, falling back to file system:', error);
  }

  // 如果 API 获取失败，直接从文件系统读取
  try {
    const files = await fs.readdir(geekDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = path.join(geekDirectory, file);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);
          
          return {
            slug,
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            videoUrl: data.videoUrl as string,
            attachmentUrl: data.attachmentUrl as string | undefined,
          } as GeekPost;
        })
    );

    // 按日期排序
    return posts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  } catch (error) {
    console.error('Failed to read from file system:', error);
    return [];
  }
});

export const getGeekPostBySlug = cache(async (slug: string): Promise<{ meta: GeekMeta; content: string } | null> => {
  try {
    // 首先尝试通过 API 获取
    const response = await fetch(`${baseUrl}/api/geek/${slug}`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.warn('API fetch failed, falling back to file system:', error);
  }

  // 如果 API 获取失败，直接从文件系统读取
  try {
    const filePath = path.join(geekDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const meta: GeekMeta = {
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      videoUrl: data.videoUrl as string,
      attachmentUrl: data.attachmentUrl as string | undefined,
    };

    return { meta, content };
  } catch (error) {
    console.error('Failed to read from file system:', error);
    return null;
  }
}); 