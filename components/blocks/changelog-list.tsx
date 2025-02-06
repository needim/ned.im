"use client";

import type React from 'react';
import { motion } from 'framer-motion';
import { IconBrandX } from '@tabler/icons-react';
import type { polaroidVariants } from '@/components/blocks/polaroid';
import PolaroidGallery from '@/components/blocks/polaroid-gallery';
import { formattedDateTimeline } from '@/lib/utils';
import { timelineItems } from '@/lib/timeline';
import { cn } from '@/lib/utils';

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
  photos: Array<TImage>;
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

export function ChangelogList(): React.ReactElement {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, top: -10 },
    show: { opacity: 1, top: 0 },
  };

  const handleShare = (timelineItem: TimelineItem) => {
    const text = `${timelineItem.event}: ${timelineItem.title}\n${timelineItem.description}`;
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
            className={cn(
              "relative flex gap-10 pb-10",
              index === timelineItems.length - 1 && "pb-0"
            )}
          >
            <div className="relative group/item">
              <div className="flex gap-x-3">
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-zinc-200/50 dark:after:bg-zinc-700/50">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div
                      className={cn(
                        "size-2 text-base rounded-full",
                        !timelineItem.icon && "bg-zinc-400 dark:bg-zinc-600"
                      )}
                    >
                      <div className="relative z-0 whitespace-nowrap w-11 text-center text-xl -top-2.5 -left-[18px]">
                        {timelineItem.icon}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "grow pt-0.5 pb-8",
                    index === timelineItems.length - 1 && "pb-0"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h2 className="font-sans text-md font-normal">
                          <span className="font-semibold">{timelineItem.event}</span>
                          {" — "}
                          {timelineItem.title}
                        </h2>
                        <button
                          onClick={() => handleShare(timelineItem)}
                          className="ml-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="分享到 X"
                        >
                          <IconBrandX className="w-4 h-4" />
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
                        className="w-full aspect-video rounded-lg"
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