import { notFound } from "next/navigation";
import { getGeekPostBySlug } from "@/lib/geek";
import { GeekPostContent } from "@/components/blocks/geek-post-content";
import type { Metadata } from "next";
import { compileMDX } from "@/lib/mdx";
import { MDXRemoteContent } from "@/components/mdx-remote-content";

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function GeekPostPage({
  params,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    notFound();
  }

  const result = await getGeekPostBySlug(resolvedParams.slug);

  if (!result) {
    notFound();
  }

  const { meta: post, content } = result;
  const compiledContent = await compileMDX(content);

  return (
    <GeekPostContent 
      post={post} 
      content={<MDXRemoteContent content={compiledContent} />} 
      slug={resolvedParams.slug} 
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
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