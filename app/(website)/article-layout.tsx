"use client";

import dynamic from 'next/dynamic';
import { Container } from "@/components/blocks/container";

// 使用动态导入来优化性能
const TableOfContents = dynamic(
  () => import("@/components/blocks/table-of-contents").then(mod => mod.TableOfContents),
  { ssr: false }
);

const TextSelectionQuote = dynamic(
  () => import("@/components/blocks/text-selection-quote").then(mod => mod.TextSelectionQuote),
  { ssr: false }
);

interface ArticleLayoutProps {
  children: React.ReactNode;
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <Container>
      <div className="mx-auto max-w-4xl mt-16 relative">
        {/* Article content */}
        <article className="w-full min-w-0">
          {children}
        </article>
        {/* TableOfContents; sticky position on larger screens */}
        <div className="hidden lg:block">
          <div className="sticky top-24 w-64" style={{ 
            position: 'fixed', 
            right: 'max(calc((100vw - 64rem) / 2 + 8rem), 4rem)',
            transform: 'translateX(100%)',
            marginLeft: '2rem'
          }}>
            <TableOfContents />
          </div>
        </div>
        {/* Text selection quote functionality */}
        <TextSelectionQuote />
      </div>
    </Container>
  );
} 