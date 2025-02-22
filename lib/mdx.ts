import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';

// 使用 Map 作为简单的内存缓存
const mdxCache = new Map<string, MDXRemoteSerializeResult>();

export async function compileMarkdown(source: string): Promise<MDXRemoteSerializeResult> {
  try {
    // 使用源文本作为缓存键
    const cacheKey = source;
    
    // 检查缓存
    const cached = mdxCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    const { content, data } = matter(source);
    
    const compiled = await serialize(content, {
      mdxOptions: {
        format: 'mdx',
        // @ts-ignore: Plugin type compatibility
        remarkPlugins: [remarkGfm, remarkFrontmatter],
      },
      scope: data, // Pass frontmatter data as scope
    });
    
    // 存入缓存
    mdxCache.set(cacheKey, compiled);
    
    return compiled;
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
} 