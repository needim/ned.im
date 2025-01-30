import { Container } from "@/components/blocks/container";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Comments } from "@/components/blocks/comments";

interface NotePageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function NotePage({ params, searchParams }: NotePageProps) {
  try {
    const { slug } = params;
    const module = await import(`../${slug}.mdx`);
    const Content = module.default;

    return (
      <Container>
        <div className="mx-auto max-w-2xl mt-16">
          <div className="mb-8">
            <Link 
              href="/notes" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <IconArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">{module.metadata.title}</h1>
            <div className="mt-2 text-sm text-muted-foreground">
              <time dateTime={module.metadata.date}>{module.metadata.date}</time>
            </div>
          </div>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <Content />
          </article>
          <Comments path={`/notes/${slug}`} />
        </div>
      </Container>
    );
  } catch (error) {
    console.error('Error loading note:', error);
    notFound();
  }
} 