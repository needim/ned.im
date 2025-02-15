import { cache } from 'react';
import type { GeekPost, GeekMeta } from "@/types/geek";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const geekDirectory = path.join(process.cwd(), 'content/geek');

export const getAllGeekPosts = cache(async (): Promise<GeekPost[]> => {
  const isVercelProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL;
  let metadataCacheFile: string | null = null;
  if (!isVercelProduction) {
    metadataCacheFile = path.join(process.cwd(), 'data', 'geek-metadata.json');
    try {
      const cached = await fs.readFile(metadataCacheFile, 'utf8');
      const posts: GeekPost[] = JSON.parse(cached);
      return posts;
    } catch (error) {
      console.warn("No cached metadata found, falling back to file system reading");
    }
  }

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
            fileName: file,
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            videoUrl: data.videoUrl as string,
            attachmentUrl: data.attachmentUrl as string | undefined,
          } as GeekPost;
        })
    );

    const sortedPosts = posts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

    if (!isVercelProduction && metadataCacheFile) {
      fs.writeFile(metadataCacheFile, JSON.stringify(sortedPosts), 'utf8')
        .catch(err => {
          console.error("Error writing metadata cache", err);
        });
    }
    
    return sortedPosts;
  } catch (error) {
    console.error('Failed to read from file system:', error);
    return [];
  }
});

export const getGeekPostBySlug = cache(async (slug: string): Promise<{ meta: GeekMeta; content: string } | null> => {
  try {
    // Retrieve cached posts and find the matching one by slug
    const posts = await getAllGeekPosts();
    const matchingPost = posts.find(post => post.slug.toLowerCase() === slug.toLowerCase());

    if (!matchingPost || !matchingPost.fileName) {
      console.error(`No matching file found for slug: ${slug}`);
      return null;
    }

    const filePath = path.join(geekDirectory, matchingPost.fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const meta: GeekMeta = {
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      videoUrl: data.videoUrl as string,
      biliVideoUrl: data.biliVideoUrl as string,
      attachmentUrl: data.attachmentUrl as string | undefined,
    };

    return { meta, content };
  } catch (error) {
    console.error('Failed to read from file system:', error);
    return null;
  }
}); 