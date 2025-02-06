"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { CopyButton } from "@/components/blocks/copy-button";

interface MDXContentProps {
  content: React.ReactNode;
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children?: string;
}

const components = {
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
};

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="mdx">
      {content}
    </div>
  );
} 