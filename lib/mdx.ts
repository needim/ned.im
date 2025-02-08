import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export async function compileMarkdown(source: string): Promise<MDXRemoteSerializeResult> {
  try {
    return await serialize(source, {
      mdxOptions: {
        format: 'mdx'
      }
    });
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
} 