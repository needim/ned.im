"use client";

import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { components } from './mdx-content';

interface MDXRemoteContentProps {
  content: MDXRemoteSerializeResult;
}

export function MDXRemoteContent({ content }: MDXRemoteContentProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote {...content} components={components} />
    </article>
  );
} 