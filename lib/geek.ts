import { cache } from 'react';
import type { GeekPost, GeekMeta } from "@/types/geek";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const getAllGeekPosts = cache(async (): Promise<GeekPost[]> => {
  const response = await fetch(`${baseUrl}/api/geek`, {
    next: { revalidate: 0 }, // 禁用缓存，确保每次都获取最新数据
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
  
  if (!response.ok) throw new Error('Failed to fetch posts');
  const posts = await response.json();
  
  // API 已经排序，这里直接返回
  return posts;
});

export const getGeekPostBySlug = cache(async (slug: string): Promise<{ meta: GeekMeta; content: string } | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/geek/${slug}`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}); 