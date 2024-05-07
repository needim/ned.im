import { Container } from "@/components/blocks/container";
import { projects } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
        <h1 className="tracking-tight text-5xl">Projects</h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-2">All the projects I&apos;ve worked on.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="relative flex items-center space-x-3 rounded-lg border bg-card px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-primary"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={project.link.href}
                  target={
                    project.link.href.startsWith("http") ? "_blank" : undefined
                  }
                  className="focus:outline-none"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-base font-medium">{project.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </Link>
              </div>
              <div className="flex-shrink-0">
                {project.logo && project.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
