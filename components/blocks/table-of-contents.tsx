"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";

interface Heading {
  id: string;
  text: string;
  level: number;
  subHeadings?: Heading[];
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const findParentHeading = useCallback((headings: Heading[], targetId: string): Heading | null => {
    for (const heading of headings) {
      if (heading.id === targetId) return heading;
      if (heading.subHeadings?.some(sub => sub.id === targetId)) {
        return heading;
      }
      if (heading.subHeadings) {
        const found = findParentHeading(heading.subHeadings, targetId);
        if (found) return heading;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const articleContent = document.querySelector('.prose');
    if (!articleContent) return;

    const elements = Array.from(articleContent.querySelectorAll("h2, h3, h4")).map((element, index) => {
      if (!element.id) {
        element.id = `heading-${index}`;
      }
      return element;
    });

    const buildHeadingTree = (headingElements: Element[]): Heading[] => {
      const headings: Heading[] = [];
      let currentH2: Heading | null = null;
      let currentH3: Heading | null = null;

      headingElements.forEach((element) => {
        const level = Number(element.tagName.charAt(1));
        const heading: Heading = {
          id: element.id,
          text: element.textContent || "",
          level,
          subHeadings: [],
        };

        if (level === 2) {
          headings.push(heading);
          currentH2 = heading;
          currentH3 = null;
        } else if (level === 3 && currentH2) {
          if (!currentH2.subHeadings) currentH2.subHeadings = [];
          currentH2.subHeadings.push(heading);
          currentH3 = heading;
        } else if (level === 4 && currentH3) {
          if (!currentH3.subHeadings) currentH3.subHeadings = [];
          currentH3.subHeadings.push(heading);
        }
      });

      return headings;
    };

    const headingTree = buildHeadingTree(elements);
    setHeadings(headingTree);

    const updateActiveHeading = (entries: IntersectionObserverEntry[]) => {
      const visibleHeadings = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target);

      if (visibleHeadings.length > 0) {
        const currentHeading = visibleHeadings[0];
        setActiveId(currentHeading.id);
        
        // 找到当前可见标题的父级标题
        const parentHeading = findParentHeading(headingTree, currentHeading.id);
        
        // 只展开当前可见标题的父级
        setExpandedSections(new Set(parentHeading ? [parentHeading.id] : []));
      }
    };

    const observer = new IntersectionObserver(updateActiveHeading, {
      rootMargin: "-20% 0% -35% 0%",
      threshold: 1.0,
    });

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [findParentHeading]);

  const toggleSection = (headingId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(headingId)) {
        next.delete(headingId);
      } else {
        // 关闭其他所有展开的部分
        next.clear();
        next.add(headingId);
      }
      return next;
    });
  };

  const renderHeading = (heading: Heading) => {
    const hasSubHeadings = heading.subHeadings && heading.subHeadings.length > 0;
    const isExpanded = expandedSections.has(heading.id);

    return (
      <li key={heading.id}>
        <div className="flex items-center gap-1">
          {/* 所有 h2 标题都显示箭头 */}
          {heading.level === 2 && (
            <button
              onClick={() => toggleSection(heading.id)}
              className="p-0.5 hover:bg-accent rounded-sm transition-colors"
            >
              <IconChevronRight
                className={cn(
                  "w-3 h-3 transition-transform",
                  isExpanded && "transform rotate-90"
                )}
              />
            </button>
          )}
          <a
            href={`#${heading.id}`}
            className={cn(
              "text-sm text-muted-foreground hover:text-foreground transition-colors line-clamp-1",
              activeId === heading.id && "font-medium text-foreground",
              heading.level === 3 && "ml-4",
              heading.level === 4 && "ml-8"
            )}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(heading.id);
              if (element) {
                const yOffset = -100;
                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
              if (heading.level === 2) {
                toggleSection(heading.id);
              }
            }}
          >
            {heading.text}
          </a>
        </div>
        {hasSubHeadings && isExpanded && (
          <ul className="mt-1 space-y-1">
            {heading.subHeadings?.map(renderHeading)}
          </ul>
        )}
      </li>
    );
  };

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block absolute right-[-20rem] top-0 w-64 h-full">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="p-6 bg-card rounded-xl border">
          <h4 className="text-sm font-medium mb-4">目录</h4>
          <ul className="space-y-2.5">
            {headings.map(renderHeading)}
          </ul>
        </div>
      </div>
    </div>
  );
} 