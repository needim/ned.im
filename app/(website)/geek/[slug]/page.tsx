import { notFound } from "next/navigation";
import { getGeekPostBySlug } from "@/lib/geek";
import { GeekPostContent } from "@/components/blocks/geek-post-content";
import type { Metadata } from "next";
import { compileMarkdown } from "@/lib/mdx";

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  params: Promise<Params>;
  searchParams: SearchParams;
}

export default async function GeekPostPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    notFound();
  }

  const result = await getGeekPostBySlug(resolvedParams.slug);

  if (!result) {
    notFound();
  }

  const { meta: post, content } = result;
  const compiledContent = await compileMarkdown(content);

  return (
    <GeekPostContent 
      post={post} 
      content={compiledContent} 
      slug={resolvedParams.slug} 
    />
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    return {
      title: "Not Found",
      description: "The page you're looking for does not exist.",
    };
  }

  const post = await getGeekPostBySlug(resolvedParams.slug);

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