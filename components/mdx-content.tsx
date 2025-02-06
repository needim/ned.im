"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/blocks/copy-button";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { createPortal } from "react-dom";

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children?: string;
}

function ImagePreview({ src, alt, onClose }: { src: string; alt?: string; onClose: () => void }) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }
  };

  const content = (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 m-0" 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <button 
        className="absolute top-4 right-4 p-2 text-white hover:text-zinc-300 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            onClose();
          }
        }}
        aria-label="关闭预览"
      >
        <IconX className="w-6 h-6" />
      </button>
      <img
        src={src}
        alt={alt || "预览图片"}
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      />
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}

export const components = {
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "w-full border-collapse border-spacing-0 rounded-lg border border-border",
          className
        )}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn("bg-muted/50 border-b", className)}
      {...props}
    />
  ),
  tbody: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      className={cn("divide-y divide-border bg-card", className)}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground border-r last:border-r-0",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "p-4 align-middle border-r border-border last:border-r-0",
        className
      )}
      {...props}
    />
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-border pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) => {
    const childArray = React.Children.toArray(children);
    const code = childArray.find(
      (child) => React.isValidElement(child) && child.type === "code"
    ) as React.ReactElement<CodeBlockProps>;
    
    const text = code?.props?.children || "";

    return (
      <div className="group relative">
        <pre
          className={cn(
            "mb-4 mt-6 overflow-x-auto rounded-lg bg-zinc-950 p-4",
            className
          )}
          {...props}
        >
          {children}
        </pre>
        <CopyButton text={text} />
      </div>
    );
  },
  code: ({ className, ...props }: CodeBlockProps) => {
    const isInlineCode = !className;
    return (
      <code
        className={cn(
          "relative rounded font-mono text-sm",
          isInlineCode
            ? "bg-muted/30 dark:bg-muted/50 px-[0.4rem] py-[0.2rem] text-foreground/90 border border-border/40 font-medium"
            : "text-zinc-100",
          className
        )}
        {...props}
      />
    );
  },
  img: ({ className, alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const [showPreview, setShowPreview] = useState(false);

    return (
      <>
        <span className="not-prose relative my-4 first:mt-0 last:mb-0 inline-block">
          <button 
            className="group relative inline-block cursor-zoom-in" 
            onClick={() => setShowPreview(true)}
            onKeyDown={(e) => e.key === 'Enter' && setShowPreview(true)}
            aria-label={alt ? `查看${alt}大图` : "查看图片大图"}
          >
            <div className="absolute -inset-2 rounded-lg bg-zinc-50/50 opacity-0 transition dark:bg-zinc-800/50 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
              <img
                className={cn(
                  "max-w-[500px] w-auto",
                  "h-auto max-h-[300px]",
                  "object-contain",
                  "transition duration-300",
                  "group-hover:scale-[1.02]",
                  className
                )}
                src={src}
                alt={alt || "图片"}
                {...props}
              />
            </div>
          </button>
        </span>
        {showPreview && src && (
          <ImagePreview
            src={src}
            alt={alt}
            onClose={() => setShowPreview(false)}
          />
        )}
      </>
    );
  },
};

export function MDXContent({ content }: MDXContentProps) {
  const { compiledSource, frontmatter, scope } = content;
  
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote 
        compiledSource={compiledSource}
        frontmatter={frontmatter}
        scope={scope}
        components={components}
      />
    </article>
  );
} 