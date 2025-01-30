import { TimelineList } from "@/components/blocks/timeline-list";
import { Container } from "@/components/blocks/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "时间线",
  description: "在这里，你可以看到我生活中的主要更新和变化。",
};

export default function Timeline() {
  return (
    <Container>
      <div className="mt-16">
        <div className="space-y-2 mb-6">
          <h1 className="text-4xl font-bold tracking-tight">时间线</h1>
          <p className="text-muted-foreground">
            在这里，你可以看到我生活中的主要更新和变化。
          </p>
        </div>
        <TimelineList />
      </div>
    </Container>
  );
}
