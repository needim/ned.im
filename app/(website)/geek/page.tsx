import { Container } from "@/components/blocks/container";
import { GeekCard } from "@/components/blocks/geek-card";
import { getAllGeekPosts } from "@/lib/geek";

export const revalidate = 60; // 启用 ISR，每60秒重新生成页面

export default async function GeekPage() {
  const posts = await getAllGeekPosts();

  return (
    <Container>
      <div className="mx-auto max-w-7xl mt-20 mb-16">
        <div className="flex flex-col gap-6 mb-16">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            Geek
          </h1>
          <p className="text-lg text-muted-foreground">
            这里是我的技术文章和学习笔记。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <GeekCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Container>
  );
} 