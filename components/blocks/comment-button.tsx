"use client";

import { Button } from "@/components/ui/button";
import { IconMessageCircle2 } from "@tabler/icons-react";

export function CommentButton() {
  return (
    <div className="fixed bottom-8 left-8">
      <Button
        size="lg"
        variant="outline"
        className="rounded-full shadow-sm hover:bg-accent"
        onClick={() => {
          document.querySelector(".giscus-frame")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <IconMessageCircle2 className="w-5 h-5 mr-2" />
        <span>添加评论</span>
      </Button>
    </div>
  );
} 