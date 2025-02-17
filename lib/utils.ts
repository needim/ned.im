import { IconWorld } from "@tabler/icons-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions & { locale?: string }): string {
  if (!date) return '';
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const locale = options?.locale || "zh-CN";
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (Number.isNaN(dateObj.getTime())) {
      console.warn("Invalid date:", date);
      return String(date);
    }
    const { locale: _ignored, ...otherOptions } = { ...defaultOptions, ...options };
    return dateObj.toLocaleDateString(locale, otherOptions);
  } catch (error) {
    console.warn("Error formatting date:", error);
    return String(date);
  }
}

// Re-export timeline data from the new data/timeline.ts file
export { timelineItems, changelog } from '@/data/timeline';

// Backward compatibility alias for formattedDate
export const formattedDate = formatDate;

// Backward compatibility alias for formattedDateTimeline
export const formattedDateTimeline = formatDate;

// Backward compatibility export for TableOfContents
import { TableOfContents } from '@/components/blocks/table-of-contents';
export { TableOfContents };


