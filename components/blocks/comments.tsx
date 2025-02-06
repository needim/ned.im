'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CommentsProps {
  showHeader?: boolean;
  path?: string;
}

export function Comments({ showHeader = true, path }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "laogou717/ned.im");
    script.setAttribute("data-repo-id", "R_kgDOLPxQbw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOLPxQb84CdvXE");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");

    ref.current.appendChild(script);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="mt-16">
      {showHeader && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">评论</h2>
          <p className="mt-2 text-muted-foreground">
            使用 GitHub 账号参与讨论
          </p>
        </div>
      )}
      <div ref={ref} className="giscus qa-wrapper" />
    </div>
  );
} 
