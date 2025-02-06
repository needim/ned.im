import { notFound } from "next/navigation";
import { getGeekPostBySlug } from "@/lib/geek";
import { GeekPostContent } from "@/components/blocks/geek-post-content";
import type { Metadata, ResolvingMetadata } from "next";
import { compileMDXContent } from "@/lib/mdx";

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function GeekPostPage({ params }: Props) {
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
  { params }: Props,
  parent: ResolvingMetadata
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