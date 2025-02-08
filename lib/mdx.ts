import { serialize } from 'next-mdx-remote/serialize';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export async function compileMarkdown(source: string): Promise<MDXRemoteSerializeResult> {
  try {
    return await serialize(source, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'meta' }]
        ],
        rehypePlugins: [rehypeRaw],
        format: 'mdx'
      }
    });
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
} 