"use client";

import { TableOfContents } from "@/components/blocks/table-of-contents";
import { TextSelectionPopover } from "@/components/blocks/text-selection-popover";

export function ClientSideContent() {
  return (
    <>
      <TableOfContents />
      <TextSelectionPopover />
    </>
  );
} 