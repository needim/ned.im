// @ts-nocheck
import { serialize } from 'next-mdx-remote/serialize';

export async function compileMarkdown(source: string) {
  try {
    return await serialize(source);
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
} 