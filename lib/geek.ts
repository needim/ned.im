import type { GeekPost, GeekMeta } from "@/types/geek";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const geekDirectory = path.join(process.cwd(), 'content/geek');

// 递归获取目录下所有的 .mdx 文件
async function getAllMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllMdxFiles(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith('.mdx')) {
        return [fullPath];
      }
      return [];
    })
  );
  return files.flat();
}

export async function getAllGeekPosts(): Promise<GeekPost[]> {
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
    const files = await getAllMdxFiles(geekDirectory);
    const posts = await Promise.all(
      files.map(async (filePath) => {
        try {
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);
          
          // 生成相对于 geekDirectory 的路径
          const relativePath = path.relative(geekDirectory, filePath);
          // 移除 .mdx 扩展名生成 slug
          const slug = relativePath.replace(/\.mdx$/, '');
          
          return {
            slug,
            fileName: relativePath,
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            videoUrl: data.videoUrl as string,
            attachmentUrl: data.attachmentUrl as string | undefined,
          } as GeekPost;
        } catch (error) {
          console.error(`Error processing file ${filePath}:`, error);
          return null;
        }
      })
    );

    const validPosts = posts.filter((post): post is GeekPost => post !== null);
    const sortedPosts = validPosts.sort((a, b) => {
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
}

export async function getGeekPostBySlug(slug: string): Promise<{ meta: GeekMeta; content: string } | null> {
  try {
    // 构建完整的文件路径，确保处理子目录
    const filePath = path.join(geekDirectory, `${slug}.mdx`);
    
    // 检查文件是否存在
    try {
      await fs.access(filePath);
    } catch (error) {
      // 如果文件不存在，尝试规范化路径（处理 Windows 风格的路径分隔符）
      const normalizedSlug = slug.split(/[\\/]/).join(path.sep);
      const normalizedPath = path.join(geekDirectory, `${normalizedSlug}.mdx`);
      
      try {
        await fs.access(normalizedPath);
        // 如果规范化路径存在，使用它
        const fileContents = await fs.readFile(normalizedPath, 'utf8');
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
      } catch {
        console.error(`File not found: ${filePath}`);
        return null;
      }
    }

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
    console.error(`Error reading post with slug "${slug}":`, error);
    return null;
  }
} 