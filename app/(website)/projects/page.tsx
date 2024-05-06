import { Container } from "@/components/blocks/container";
import { ProjectCard } from "@/components/blocks/project-card";
import { projects } from "@/lib/utils";

export default function Home() {
  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
        <h1 className="tracking-tight text-5xl">Projects</h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-2">All the projects I&apos;ve worked on.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              title={project.name}
              description={project.description}
              link={project.link.href}
              label={project.link.label}
              icon={project.logo}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
