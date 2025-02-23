import { TimelineList } from "@/components/blocks/timeline-list";
import { Container } from "@/components/blocks/container";
import type { Metadata } from "next";
import { Suspense } from "react";
import { timelineItems } from "@/data/timeline";

export const metadata: Metadata = {
  title: "时间线",
  description: "在这里，你可以看到我生活中的主要更新和变化。",
};

// 使用 ISR 进行增量静态再生成
export const revalidate = 3600; // 1小时重新验证一次

// 预加载数据
async function getTimelineData() {
  // 这里可以添加数据获取逻辑，如果将来需要从 API 获取
  return {
    items: timelineItems
  };
}

export default async function Timeline() {
  const data = await getTimelineData();

  return (
    <Container>
      <div className="mt-16">
        <div className="space-y-2 mb-6">
          <h1 className="text-4xl font-bold tracking-tight">时间线</h1>
          <p className="text-muted-foreground">
            在这里，你可以看到我生活中的主要更新和变化。
          </p>
        </div>
        <Suspense fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-muted rounded-lg"></div>
            <div className="h-24 bg-muted rounded-lg"></div>
            <div className="h-24 bg-muted rounded-lg"></div>
          </div>
        }>
          <TimelineList initialData={data.items} />
        </Suspense>
      </div>
    </Container>
  );
}
