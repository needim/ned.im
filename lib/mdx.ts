import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { cache } from 'react';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';

export const compileMarkdown = cache(async (source: string): Promise<MDXRemoteSerializeResult> => {
  try {
    const { content, data } = matter(source);
    
    return await serialize(content, {
      mdxOptions: {
        format: 'mdx',
        // @ts-ignore: Plugin type compatibility
        remarkPlugins: [remarkGfm, remarkFrontmatter],
      },
      scope: data, // Pass frontmatter data as scope
    });
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
}); 