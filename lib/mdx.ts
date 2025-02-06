import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function compileMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          [remarkGfm, { 
            singleTilde: false,
            tablePipeAlign: true,
            stringLength: () => 1
          }]
        ],
      },
    },
  });

  return content;
} 