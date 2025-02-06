import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formattedDateTimeline(date: string, options?: Intl.DateTimeFormatOptions & { locale?: string }) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const locale = options?.locale || "zh-CN";
  const { locale: _, ...dateTimeOptions } = { ...defaultOptions, ...options };

  return new Date(date).toLocaleDateString(locale, dateTimeOptions);
} 