"use client";

import { useEffect } from "react";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { TextSelectionPopover } from "@/components/blocks/text-selection-popover";

export function ClientSideContent() {
  useEffect(() => {
    // 初始化客户端功能
    const init = async () => {
      // 添加你需要的客户端初始化代码
      // 如果暂时没有初始化代码，可以先注释掉或移除
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