import { notFound } from "next/navigation";
import { getGeekPostBySlug } from "@/lib/geek";
import { GeekPostContent } from "@/components/blocks/geek-post-content";
import type { Metadata } from "next";
import { compileMDXContent } from "@/lib/mdx";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function GeekPostPage({ params }: PageProps) {
  if (!params?.slug) {
    notFound();
  }

  const result = await getGeekPostBySlug(params.slug);

  if (!result) {
    notFound();
  }

  const { meta: post, content } = result;
  const compiledContent = await compileMDXContent(content);

  return <GeekPostContent post={post} content={compiledContent} slug={params.slug} />;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post = await getGeekPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you're looking for does not exist.",
    };
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
  };
} 