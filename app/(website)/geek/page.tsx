"use client";

import { Container } from "@/components/blocks/container";

export default function GeekPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl mt-16">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Geek</h1>
        <div className="prose dark:prose-invert">
          <p>这里是我的技术文章和学习笔记。</p>
          <div className="mt-8">
            {/* TODO: 这里后续可以添加文章列表 */}
          </div>
        </div>
      </div>
    </Container>
  );
} 