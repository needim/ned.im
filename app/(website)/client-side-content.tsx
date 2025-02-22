"use client";

import { TableOfContents } from "@/components/blocks/table-of-contents";
import { TextSelectionQuote } from "@/components/blocks/text-selection-quote";

export default function ClientSideContent() {
  return (
    <>
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
    </>
  );
} 