"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { IconMessageCircle2, IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

interface Position {
  x: number;
  y: number;
}

const MAX_QUOTE_LENGTH = 200;

export function TextSelectionPopover() {
  const [position, setPosition] = useState<Position | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setPosition(null);
        setSelectedText("");
        return;
      }

      const text = selection.toString().trim();
      if (!text) {
        setPosition(null);
        setSelectedText("");
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // 计算相对于视口的位置
      const viewportX = rect.left + rect.width / 2;
      const viewportY = rect.top;

      setPosition({
        x: viewportX,
        y: viewportY,
      });
      setSelectedText(text);
    };

    const handleScroll = () => {
      setPosition(null);
      setSelectedText("");
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleComment = async () => {
    const selection = window.getSelection();
    if (!selection) return;

    // 截断过长的引用文本
    const truncatedText = selectedText.length > MAX_QUOTE_LENGTH 
      ? `${selectedText.slice(0, MAX_QUOTE_LENGTH)}...`
      : selectedText;
    
    // 构建引用文本
    const quote = `> ${truncatedText}\n\n\n`;
    
    try {
      // 复制到剪贴板
      await navigator.clipboard.writeText(quote);
      toast.success("已复制引用文本到剪贴板");

      // 跳转到评论区
      const commentsSection = document.querySelector(".giscus-frame");
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      toast.error("复制文本失败");
    }

    // 清除选择
    selection.removeAllRanges();
    setPosition(null);
    setSelectedText("");
  };

  if (!position) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -130%)"
      }}
    >
      <Button
        size="sm"
        variant="outline"
        className="rounded-full shadow-sm hover:bg-accent"
        onClick={handleComment}
      >
        <IconCopy className="w-4 h-4 mr-1" />
        <span className="text-xs">引用</span>
      </Button>
    </div>
  );
} 