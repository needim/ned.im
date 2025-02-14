"use client";

import { useEffect, useState, useCallback } from 'react';
import { IconMessageCircle } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

export function TextSelectionQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setIsVisible(false);
      return;
    }

    const text = selection.toString().trim();
    if (!text) {
      setIsVisible(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // 检查选中的文本是否在文章内容区域内
    const article = document.querySelector('article');
    if (!article?.contains(selection.anchorNode)) {
      setIsVisible(false);
      return;
    }

    setSelectedText(text);

    // 计算气泡位置，确保在视口内
    const bubbleHeight = 32; // 气泡的高度
    const bubbleWidth = 64; // 气泡的宽度
    const margin = 8; // 与边缘的最小距离
    
    // 将气泡放在选中文本的正上方
    const y = Math.max(
      Math.min(
        rect.top - bubbleHeight - 8, // 8px 的间距
        window.innerHeight - bubbleHeight - margin
      ),
      margin
    );

    // 水平居中，但不超出视口
    const x = Math.max(
      Math.min(
        rect.left + (rect.width / 2),
        window.innerWidth - bubbleWidth - margin
      ),
      margin + bubbleWidth / 2
    );

    setPosition({ x, y });
    setIsVisible(true);
  }, []);

  const handleQuoteClick = useCallback(async () => {
    try {
      // 复制文本到剪贴板，添加引用符号和额外的空格
      const quotedText = `> ${selectedText}  \n\n`;
      await navigator.clipboard.writeText(quotedText);
      
      // 隐藏引用按钮
      setIsVisible(false);
      
      // 显示提示信息
      setShowCopiedToast(true);

      // 滚动到页面底部
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });

      // 3秒后隐藏提示
      setTimeout(() => {
        setShowCopiedToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [selectedText]);

  useEffect(() => {
    let selectionTimeout: NodeJS.Timeout;

    const handleSelectionChange = () => {
      // 使用防抖来避免频繁更新
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(handleTextSelection, 200);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', (e) => {
      if (!(e.target as HTMLElement).closest('.quote-button')) {
        setIsVisible(false);
      }
    });

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      clearTimeout(selectionTimeout);
    };
  }, [handleTextSelection]);

  return (
    <>
      {/* 引用按钮 */}
      {isVisible && (
        <button
          onClick={handleQuoteClick}
          className={cn(
            "quote-button fixed z-50 flex items-center gap-1.5",
            "px-3 py-1.5 rounded-full",
            "bg-zinc-900/95 backdrop-blur-sm text-white text-sm",
            "shadow-lg hover:bg-zinc-800/95 active:bg-zinc-700/95",
            "transform hover:scale-105 active:scale-95",
            "transition-all duration-200",
            "animate-in fade-in zoom-in-95 duration-200",
            "focus:outline-none"
          )}
          style={{
            transform: 'translate(-50%, 0)',
            left: position.x,
            top: position.y
          }}
        >
          <IconMessageCircle className="w-4 h-4" />
          <span>评论</span>
        </button>
      )}

      {/* 复制成功提示 */}
      <div
        className={cn(
          "fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50",
          "bg-zinc-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg",
          "text-sm shadow-lg",
          "transition-all duration-300",
          showCopiedToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        已复制选中文字，可以粘贴进行引用评论
      </div>
    </>
  );
} 