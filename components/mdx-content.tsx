"use client";

import * as React from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/blocks/copy-button";
import { IconX } from "@tabler/icons-react";

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
}

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const ImagePreview = React.memo(function ImagePreview({ 
  src, 
  alt, 
  onClose 
}: { 
  src: string; 
  alt?: string; 
  onClose: () => void; 
}) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <dialog 
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 p-2 text-white hover:text-zinc-300 transition-colors"
        onClick={onClose}
        aria-label="关闭预览"
      >
        <IconX className="w-6 h-6" />
      </button>
      <img
        src={src}
        alt={alt || "预览图片"}
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </dialog>
  );
});

const components = {
  table: React.memo(function Table({ className, children, ...props }: ComponentProps) {
    return (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn("w-full border-collapse border border-border bg-card text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    );
  }),
  thead: React.memo(function TableHead({ className, children, ...props }: ComponentProps) {
    return (
      <thead className={cn("bg-muted/50 border-b border-border", className)} {...props}>
        {children}
      </thead>
    );
  }),
  tbody: React.memo(function TableBody({ className, children, ...props }: ComponentProps) {
    return (
      <tbody className={cn("divide-y divide-border", className)} {...props}>
        {children}
      </tbody>
    );
  }),
  tr: React.memo(function TableRow({ className, children, ...props }: ComponentProps) {
    return (
      <tr className={cn("border-b border-border transition-colors hover:bg-muted/50", className)} {...props}>
        {children}
      </tr>
    );
  }),
  th: React.memo(function TableHeader({ className, children, ...props }: ComponentProps) {
    return (
      <th className={cn("h-10 px-4 text-left align-middle font-medium text-muted-foreground", className)} {...props}>
        {children}
      </th>
    );
  }),
  td: React.memo(function TableCell({ className, children, ...props }: ComponentProps) {
    return (
      <td className={cn("p-4 align-middle", className)} {...props}>
        {children}
      </td>
    );
  }),
  img: React.memo(function Image({ className, alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    const [showPreview, setShowPreview] = React.useState(false);
    
    if (!src) return null;
    
    return (
      <>
        <button
          className={cn("block w-full cursor-zoom-in", className)}
          onClick={() => setShowPreview(true)}
          type="button"
        >
          <img
            className="rounded-lg max-w-full h-auto"
            alt={alt || ""}
            src={src}
            {...props}
          />
        </button>
        {showPreview && (
          <ImagePreview src={src} alt={alt} onClose={() => setShowPreview(false)} />
        )}
      </>
    );
  }),
  pre: React.memo(function Pre({ children, className, ...props }: ComponentProps) {
    const childArray = React.Children.toArray(children);
    const code = childArray.find(
      (child) => React.isValidElement(child) && child.type === "code"
    ) as React.ReactElement;
    
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
  }),
  code: React.memo(function Code({ className, children, ...props }: ComponentProps) {
    const isInlineCode = !className;
    return (
      <code
        className={cn(
          "relative rounded font-mono text-sm",
          isInlineCode
            ? "bg-muted px-[0.3rem] py-[0.2rem] text-foreground"
            : "text-zinc-100",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  })
};

export const MDXContent = React.memo(function MDXContent({ content }: MDXContentProps) {
  return <MDXRemote {...content} components={components} />;
}); 