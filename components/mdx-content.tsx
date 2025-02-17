"use client";

import * as React from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/blocks/copy-button";
import { IconX, IconEye } from "@tabler/icons-react";
import VideoEmbed from "@/components/blocks/video-embed";
import { ImageViewer } from "@/components/blocks/image-viewer";
import { LinkButton } from "@/components/blocks/link-button";
import { GitHubButton } from "@/components/blocks/github-button";
import { PreviousPost } from "@/components/blocks/previous-post";
import { DeployButton } from "@/components/blocks/deploy-button";

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
}

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

const MDXComponents = {
  VideoEmbed,
  LinkButton,
  GitHubButton,
  PreviousPost,
  DeployButton,
  h1: ({ className, ...props }: ComponentProps) => (
    <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className={cn("mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0", props.className)} />
  ),
  h3: ({ className, ...props }: ComponentProps) => (
    <h3 className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentProps) => (
    <h4 className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps) => (
    <blockquote 
      className={cn(
        "relative my-6",
        "px-6 py-4",
        "bg-gradient-to-br from-zinc-100/80 via-zinc-100/40 to-zinc-100/20",
        "dark:from-zinc-800/80 dark:via-zinc-800/40 dark:to-zinc-800/20",
        "backdrop-blur-sm",
        "border-l-4 border-zinc-300/80 dark:border-zinc-600/80",
        "rounded-r-xl",
        "text-zinc-700 dark:text-zinc-300",
        "shadow-sm",
        "not-italic",
        className
      )} 
      {...props} 
    />
  ),
  img: function Image({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    const imgRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [localImages, setLocalImages] = React.useState<string[]>([]);

    React.useEffect(() => {
      if (src && !localImages.includes(src)) {
        setLocalImages(prev => [...prev, src]);
      }
    }, [src, localImages]);

    const handleClick = () => {
      if (src) {
        const index = localImages.indexOf(src);
        if (index !== -1) {
          // Remove the onClick call since we handle the click in the button wrapper
        }
      }
    };

    return (
      <div 
        ref={imgRef}
        className="relative group contents"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={src} 
          alt={alt || "Article image"}
          className="rounded-lg select-none"
          style={{ maxWidth: '100%', height: 'auto' }}
          draggable={false}
        />
        {isHovered && (
          <button
            onClick={handleClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-zinc-800/50 text-white 
              hover:bg-zinc-700/50 transition-colors backdrop-blur-sm
              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="View larger image"
          >
            <IconEye className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  },
  pre: function MDXPre({ children, className, ...props }: ComponentProps) {
    const childArray = React.Children.toArray(children);
    
    // 直接从 pre 标签获取文本
    const rawText = React.isValidElement(children) 
      ? React.Children.toArray((children as React.ReactElement).props.children).join('')
      : '';

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
        <CopyButton text={rawText} />
      </div>
    );
  },
  code: function MDXCode({ className, children, ...props }: ComponentProps) {
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
  },
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => {
    const { className, ...rest } = props;
    return (
      <div className="my-6 w-full overflow-y-auto rounded-xl bg-white/5 backdrop-blur-sm">
        <table {...rest} className={cn("w-full border-separate border-spacing-0", className)}>
          {props.children}
        </table>
      </div>
    );
  },
  th: ({ className, ...props }: ComponentProps) => (
    <th className={cn(
      "bg-zinc-100/10 backdrop-blur-sm first:rounded-tl-xl last:rounded-tr-xl",
      "px-6 py-4 text-left font-semibold text-zinc-700 dark:text-zinc-300",
      "border-b border-zinc-200/10",
      className
    )} {...props} />
  ),
  td: ({ className, ...props }: ComponentProps) => (
    <td className={cn(
      "px-6 py-4 text-zinc-600 dark:text-zinc-400",
      "border-b border-zinc-200/10",
      "last-of-type:border-r-0",
      "transition-colors hover:bg-zinc-100/5",
      className
    )} {...props} />
  ),
};

export function MDXContent({ content }: MDXContentProps) {
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [images, setImages] = React.useState<string[]>([]);

  const handleImageClick = React.useCallback((src: string) => {
    const index = images.indexOf(src);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setViewerOpen(true);
    }
  }, [images]);

  const addImage = React.useCallback((src: string) => {
    setImages(prev => {
      if (!prev.includes(src)) {
        return [...prev, src];
      }
      return prev;
    });
  }, []);

  const ImageComponent = React.useCallback(({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    React.useEffect(() => {
      if (src) {
        addImage(src);
      }
    }, [src]);

    const imageDescription = alt || "Article image";
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        src && handleImageClick(src);
      }
    };
    
    return (
      <button
        type="button"
        onClick={() => src && handleImageClick(src)}
        onKeyDown={handleKeyDown}
        className="p-0 m-0 border-0 bg-transparent block"
        style={{ marginBottom: '0.5rem' }}
      >
        <img 
          src={src} 
          alt={imageDescription}
          className="rounded-lg select-none cursor-pointer"
          style={{ 
            maxWidth: '100%',
            height: 'auto',
            display: 'block'
          }}
          draggable={false}
        />
      </button>
    );
  }, [handleImageClick, addImage]);

  const components = React.useMemo(() => ({
    ...MDXComponents,
    img: ImageComponent
  }), [ImageComponent]);

  return (
    <>
      <MDXRemote {...content} components={components} />
      {viewerOpen && (
        <ImageViewer
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  );
} 