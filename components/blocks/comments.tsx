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
    // 清理旧的 script
    const oldScript = document.querySelector("#giscus-script");
    if (oldScript) {
      oldScript.remove();
    }

    // 创建新的 script
    const script = document.createElement("script");
    script.id = "giscus-script";
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO!);
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID!);
    script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY!);
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!);
    script.setAttribute("data-mapping", path ? "pathname" : "url");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme === "dark" ? "dark_dimmed" : "noborder_light");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const container = ref.current;
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    return () => {
      const oldScript = document.querySelector("#giscus-script");
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [theme, path]);

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
