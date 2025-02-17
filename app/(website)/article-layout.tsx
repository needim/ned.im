"use client";

import { Container } from "@/components/blocks/container";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { TextSelectionQuote } from "@/components/blocks/text-selection-quote";

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