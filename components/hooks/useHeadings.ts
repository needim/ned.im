import { useState, useEffect, useCallback } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
  subHeadings?: Heading[];
}

export function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
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

  const findCurrentHeading = useCallback((headings: Heading[], targetId: string): Heading | null => {
    for (const heading of headings) {
      if (heading.id === targetId) return heading;
      if (heading.subHeadings) {
        const found = findCurrentHeading(heading.subHeadings, targetId);
        if (found) return found;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    const buildHeadingTree = (headingElements: Element[]): Heading[] => {
      const result: Heading[] = [];
      let currentH2: Heading | null = null;
      let currentH3: Heading | null = null;

      headingElements.forEach(el => {
        const level = Number(el.tagName.charAt(1));
        const text = el.textContent || "";
        
        // 跳过评论标题
        if (text.toLowerCase() === '评论') return;
        
        const heading: Heading = { id: el.id, text, level, subHeadings: [] };
        if (level === 2) {
          result.push(heading);
          currentH2 = heading;
          currentH3 = null;
        } else if (level === 3 && currentH2) {
          currentH2.subHeadings!.push(heading);
          currentH3 = heading;
        } else if (level === 4 && currentH3) {
          currentH3.subHeadings!.push(heading);
        }
      });
      return result;
    };

    const updateActiveHeading = (entries: IntersectionObserverEntry[], headingTree: Heading[]) => {
      const visible = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
      if (visible.length > 0) {
        const current = visible[0];
        const newActiveId = current.id;
        
        if (newActiveId !== activeId) {
          setActiveId(newActiveId);
          
          // 找到当前可见标题和它的父标题
          const currentHeading = findCurrentHeading(headingTree, newActiveId);
          const parent = findParentHeading(headingTree, newActiveId);
          
          // 更新展开的部分
          setExpandedSections(new Set([
            // 如果有父标题，包含父标题ID
            ...(parent ? [parent.id] : []),
            // 如果当前标题有子标题，包含当前标题ID
            ...(currentHeading?.subHeadings?.length ? [newActiveId] : [])
          ]));
        }
      }
    };

    function setUpHeadings(articleContent: Element) {
      if (observer) observer.disconnect();
      const elements = Array.from(articleContent.querySelectorAll('h2, h3, h4')).map((el, index) => {
        if (!el.id) el.id = `heading-${index}`;
        return el;
      });
      const headingTree = buildHeadingTree(elements);
      console.log('Detected headings:', headingTree);
      setHeadings(headingTree);
      observer = new IntersectionObserver((entries) => updateActiveHeading(entries, headingTree), {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.1
      });
      elements.forEach(el => observer!.observe(el));
    }

    function init() {
      const articleContent = document.querySelector('article');
      if (articleContent) {
        setUpHeadings(articleContent);
        mutationObserver = new MutationObserver(() => {
          setUpHeadings(articleContent);
        });
        mutationObserver.observe(articleContent, { childList: true, subtree: true });
      } else {
        retryTimeout = setTimeout(init, 500);
      }
    }
    init();

    return () => {
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [findParentHeading, findCurrentHeading, activeId]);

  return { headings, activeId, expandedSections };
} 