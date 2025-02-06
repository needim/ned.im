"use client";

import { useEffect } from "react";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { TextSelectionPopover } from "@/components/blocks/text-selection-popover";

export function ClientSideContent() {
  useEffect(() => {
    // 初始化客户端功能
    const init = async () => {
      try {
        // 添加你需要的客户端初始化代码
      } catch (error) {
        console.error('Failed to initialize client-side content:', error);
      }
    };

    init();
  }, []);

  return (
    <>
      <TableOfContents />
      <TextSelectionPopover />
    </>
  );
} 