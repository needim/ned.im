"use client";

import type React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { IconBrandX } from "@tabler/icons-react";
import type { polaroidVariants } from "@/components/blocks/polaroid";
import PolaroidGallery from "@/components/blocks/polaroid-gallery";
import { cn, formattedDateTimeline } from "@/lib/utils";
import { timelineItems } from "@/lib/timeline";

type TImage = {
  src: string;
  variant: keyof typeof polaroidVariants;
};

type TimelineItem = {
  date: string;
  event: string;
  title: string;
  description: string;
  icon: string;
  photos: Array<{
    src: string;
    variant: keyof typeof polaroidVariants;
  }>;
  link?: string;
  dateFormatOptions?: Intl.DateTimeFormatOptions;
  metadata?: {
    time?: string;
    location?: string;
    music?: {
      platform: string;
      id: string;
      url: string;
    };
    video?: string;
  };
};

export function TimelineList(): React.ReactElement {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, top: -10 },
    show: { opacity: 1, top: 0 },
  };

  const handleShare = (timelineItem: TimelineItem) => {
    const text = `${timelineItem.event}: ${timelineItem.title}\n${timelineItem.description}\n\n来源: https://www.laogou717.com/timeline`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-12"
    >
      {(timelineItems as unknown as TimelineItem[]).map((timelineItem, index) => {
        return (
          <motion.div
            key={timelineItem.date}
            variants={item}
            className={cn(
              "relative flex gap-10",
              index === timelineItems.length - 1 ? "" : "mb-8"
            )}
          >
            <div className="relative">
              <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:-bottom-[40px] after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-zinc-200 dark:after:bg-zinc-700">
                  <div className="relative z-10 flex size-7 items-center justify-center">
                    <div
                      className={cn(
                        "size-2 rounded-full",
                        !timelineItem.icon && "bg-zinc-300 dark:bg-zinc-600"
                      )}
                    >
                      <div className="relative -left-[18px] -top-2.5 w-11 whitespace-nowrap text-center text-xl">
                        {timelineItem.icon}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow pb-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h2 className="font-sans text-md font-normal">
                          <span className="font-semibold">{timelineItem.event}</span>
                          {" — "}
                          {timelineItem.title}
                        </h2>
                        <button
                          onClick={() => handleShare(timelineItem)}
                          className="ml-4 rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          title="分享到 X"
                        >
                          <IconBrandX className="h-4 w-4" />
                        </button>
                      </div>
                      <time
                        dateTime={timelineItem.date}
                        className="text-xs text-muted-foreground"
                      >
                        {formattedDateTimeline(timelineItem.date, timelineItem.dateFormatOptions)}
                      </time>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {timelineItem.description.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  {timelineItem.photos && (
                    <div className="mt-6">
                      <PolaroidGallery
                        images={timelineItem.photos}
                        event={timelineItem.event}
                        title={timelineItem.title}
                      />
                    </div>
                  )}
                  {timelineItem.metadata?.video && (
                    <div className="mt-6">
                      <iframe
                        src={timelineItem.metadata.video}
                        title={`${timelineItem.event} - ${timelineItem.title}`}
                        className="aspect-video w-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
