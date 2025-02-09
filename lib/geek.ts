import { cache } from 'react';
import type { GeekPost, GeekMeta } from "@/types/geek";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const geekDirectory = path.join(process.cwd(), 'content/geek');

export const getAllGeekPosts = cache(async (): Promise<GeekPost[]> => {
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

    // Sort by date
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
    // Get all files in the directory
    const files = await fs.readdir(geekDirectory);
    
    // Find the file that matches the slug case-insensitively
    const matchingFile = files.find(file => 
      file.toLowerCase().replace(/\.mdx$/, '') === slug.toLowerCase()
    );
    
    if (!matchingFile) {
      console.error('No matching file found for slug:', slug);
      return null;
    }

    const filePath = path.join(geekDirectory, matchingFile);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    console.log('MDX Frontmatter data:', data);
    
    const meta: GeekMeta = {
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      videoUrl: data.videoUrl as string,
      attachmentUrl: data.attachmentUrl as string | undefined,
    };
    
    console.log('Processed meta:', meta);

    return { meta, content };
  } catch (error) {
    console.error('Failed to read from file system:', error);
    return null;
  }
}); 