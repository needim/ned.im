import { TimelineList } from "@/components/blocks/timeline-list";
import { Container } from "@/components/blocks/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "时间线",
  description: "我的生活轨迹",
};

export default function Timeline() {
  return (
    <Container>
      <TimelineList />
    </Container>
  );
} 