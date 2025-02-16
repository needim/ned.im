"use client";

import { useState, useEffect, useCallback } from 'react';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

export function ImageViewer({ images, currentIndex, onClose }: ImageViewerProps) {
  const [index, setIndex] = useState(currentIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrevious = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setScale(prevScale => {
      const newScale = Math.min(Math.max(prevScale + delta, 1), 5);
      return newScale;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrevious, handleNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-modal="true"
    >
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            onKeyDown={(e) => e.key === 'Enter' && handlePrevious()}
            className="absolute left-4 z-10 p-2 rounded-full bg-zinc-800/50 text-white hover:bg-zinc-700/50 transition-colors"
            aria-label="上一张图片"
          >
            <IconChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={images[index]}
          alt={`图片 ${index + 1}/${images.length}`}
          className="max-w-[80vw] max-h-[80vh] object-contain select-none cursor-move"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onWheel={(e) => {
            e.stopPropagation();
            handleWheel(e);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e);
          }}
          onMouseMove={(e) => {
            e.stopPropagation();
            handleMouseMove(e);
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            handleMouseUp();
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            handleMouseUp();
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleDoubleClick();
          }}
          draggable={false}
          role="presentation"
          tabIndex={-1}
        />

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            className="absolute right-4 z-10 p-2 rounded-full bg-zinc-800/50 text-white hover:bg-zinc-700/50 transition-colors"
            aria-label="下一张图片"
          >
            <IconChevronRight className="w-6 h-6" />
          </button>
        )}

        <button
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/50 text-white hover:bg-zinc-700/50 transition-colors"
          aria-label="关闭预览"
        >
          <IconX className="w-6 h-6" />
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-zinc-800/50 text-white backdrop-blur-sm">
            {index + 1} / {images.length}
          </div>
        )}
    </div>
  );
}