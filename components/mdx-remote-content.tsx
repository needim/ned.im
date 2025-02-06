"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { components as mdxComponents } from "./mdx-content";

interface MDXRemoteContentProps {
  content: MDXRemoteSerializeResult;
}

export function MDXRemoteContent({ content }: MDXRemoteContentProps) {
  const { compiledSource, frontmatter, scope } = content;
  
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote 
        compiledSource={compiledSource}
        frontmatter={frontmatter}
        scope={scope}
        components={mdxComponents}
      />
    </article>
  );
} 