"use client";

import type { TimelineItem as TimelineItemType } from "@/types/timeline";
import { formattedDateTimeline } from "@/lib/utils";
import { IconExternalLink, IconClock, IconMapPin, IconMusic } from "@tabler/icons-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: TimelineItemType;
}

export function TimelineItemComponent({ item }: TimelineItemProps) {
  return (
    <div className="group relative pl-8 pb-8">
      {/* 时间线 */}
      <div className="absolute left-0 top-0 h-full w-px bg-border">
        <div className="absolute left-0 top-6 h-2 w-2 -translate-x-[3px] rounded-full bg-border group-hover:scale-150 transition-transform" />
      </div>

      <div className="flex flex-col gap-2">
        {/* 日期和事件 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={item.date}>
            {item.date 
              ? formattedDateTimeline(item.date.toString(), item.dateFormatOptions) 
              : "现在"}
          </time>
          <span>·</span>
          <span>{item.event}</span>
        </div>

        {/* 标题和描述 */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </h3>
          <p className="text-muted-foreground">{item.description}</p>
        </div>

        {/* 元数据 */}
        {item.metadata && (
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
            {item.metadata.time && (
              <div className="flex items-center gap-1">
                <IconClock className="size-4" />
                <span>{item.metadata.time}</span>
              </div>
            )}
            {item.metadata.location && (
              <div className="flex items-center gap-1">
                <IconMapPin className="size-4" />
                <span>{item.metadata.location}</span>
              </div>
            )}
            {item.metadata.music && (
              <Link 
                href={item.metadata.music.url}
                target="_blank"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <IconMusic className="size-4" />
                <span>网易云音乐</span>
                <IconExternalLink className="size-3" />
              </Link>
            )}
          </div>
        )}

        {/* 外部链接 */}
        {item.link && (
          <Link 
            href={item.link}
            target="_blank"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <span>查看详情</span>
            <IconExternalLink className="size-3" />
          </Link>
        )}

        {/* 照片网格 */}
        {item.photos && item.photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {item.photos.map((photo, index) => (
              <div
                key={photo.src}
                className={cn(
                  "relative overflow-hidden rounded-lg border border-border/40",
                  {
                    "aspect-square": photo.variant === "1x1",
                    "aspect-[4/3]": photo.variant === "4x3",
                    "aspect-[4/5]": photo.variant === "4x5",
                  }
                )}
              >
                <img
                  src={photo.src}
                  alt={`${item.title} - 照片 ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 