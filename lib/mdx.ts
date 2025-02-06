import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export async function compileMDX(source: string): Promise<MDXRemoteSerializeResult> {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // @ts-ignore: rehype plugins type mismatch
      rehypePlugins: [rehypeSlug, rehypePrism],
    },
    parseFrontmatter: true,
  });

  return mdxSource;
} 