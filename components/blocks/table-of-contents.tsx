"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import { useHeadings } from '@/components/hooks/useHeadings';
import type { Heading } from '@/components/hooks/useHeadings';

export function TableOfContents() {
  const { headings, activeId, expandedSections } = useHeadings();
  const [isVisible, setIsVisible] = useState(false);
  const [localExpanded, setLocalExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // 合并自动展开和手动展开的状态
  const isExpanded = (id: string) => expandedSections.has(id) || localExpanded.has(id);

  const toggleExpand = (id: string) => {
    setLocalExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderHeading = (heading: Heading, isNested = false) => {
    const expanded = isExpanded(heading.id);
    const isActive = activeId === heading.id;
    const hasSubHeadings = Boolean(heading.subHeadings?.length);
    const isTopLevel = heading.level === 2;

    return (
      <div 
        key={heading.id} 
        className={cn(
          "toc-heading",
          isNested && "ml-4 border-l border-border/40 pl-3"
        )}
      >
        <div className="group flex items-center w-full text-left relative py-1">
          {/* 展开图标按钮 - 只在顶级标题显示 */}
          {isTopLevel && (
            <button
              type="button"
              className={cn(
                "absolute left-0 w-5 h-5 flex items-center justify-center",
                "hover:text-primary transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
              onClick={(e) => {
                e.preventDefault();
                toggleExpand(heading.id);
              }}
              aria-label={expanded ? "收起子目录" : "展开子目录"}
            >
              <IconChevronRight 
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  expanded && "transform rotate-90"
                )}
              />
            </button>
          )}
          
          {/* 标题链接 */}
          <a 
            href={`#${heading.id}`}
            className={cn(
              "text-sm flex-1 max-w-[200px] overflow-hidden",
              isTopLevel ? "pl-5 font-medium" : "pl-0 text-[13px]",
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
            )}
          >
            <span className="block truncate">{heading.text}</span>
          </a>
        </div>
        
        {/* 子标题容器 */}
        {isTopLevel && expanded && heading.subHeadings && heading.subHeadings.length > 0 && (
          <div className="mt-1 mb-2">
            {heading.subHeadings.map(subHeading => renderHeading(subHeading, true))}
          </div>
        )}
      </div>
    );
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav 
      className={cn(
        "toc p-4 rounded-lg bg-card/50 border shadow-lg transition-all duration-500 max-w-[280px]",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      )}
    >
      <div className="text-sm font-medium mb-2 text-muted-foreground">目录</div>
      <div className="space-y-1">
        {headings.map(heading => renderHeading(heading))}
      </div>
    </nav>
  );
} 