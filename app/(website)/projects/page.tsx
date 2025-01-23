import { Container } from "@/components/blocks/container";
import { projects } from "@/lib/utils";
import { getGithubInfo } from "@/server/thirdparty";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Home() {
  const githubResponse = await getGithubInfo();
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);
  projects.forEach((project) => {
    const repo = githubResponse.data.viewer.repositories.nodes.find(
      (repo) => repo.nameWithOwner === project.githubSlug
    );
    if (repo) {
      project.released = repo.createdAt;
      project.metrics = [
        {
          label: "Stars",
          value: repo.stargazerCount,
        },
        {
          label: "Forks",
          value: repo.forkCount,
        },
      ];
    }
  });

  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
        <h1 className="tracking-tight text-5xl">Projects</h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-2">
            I've worked on a range of projects over the years—some as hobbies,
            others as proof of concept, and a few to solve my own challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {featuredProjects.map((project, index) => (
            <div
              key={`project-${index}`}
              className="overflow-hidden bg-card/20 rounded-3xl shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] dark:bg-zinc-950 p-6 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700 relative"
            >
              <div className="absolute right-5 top-5 hidden sm:block">
                {project.logo}
              </div>
              <h2 className="flex items-center justify-between text-lg">
                {project.name}
              </h2>
              <p className="my-3 pr-0 sm:pr-14 text-muted-foreground">
                {project.description}
              </p>
              {/* <div className="mt-2 gap-2 flex"></div> */}
              <div className="-mx-3 -mb-3 -mt-1 flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between p-3">
                <div className="flex gap-2">
                  {project.metrics.map((metric, index) => (
                    <div
                      key={`metric-${index}`}
                      className="rouded-md rounded-b-none flex items-center rounded-lg bg-linear-to-b from-zinc-200/40 dark:from-zinc-900 dark:to-zinc-950 px-3 py-1.5 shadow-inner gap-3"
                    >
                      <span className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                        {metric.label}
                      </span>
                      <span className="font-mono font-semibold text-lg">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-5 text-zinc-500 text-sm">
                  {project.links.map((link, index) => (
                    <a
                      key={`link-${index}`}
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      className="hover:text-zinc-600 flex items-center gap-1"
                    >
                      {<link.icon className="size-4" />}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-muted-foreground">
          Here are some more projects that I have worked on. You can find the
          complete list of projects on my{" "}
          <a
            href="https://github.com/needim"
            className="font-semibold transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            GitHub profile
          </a>
          .
        </p>

        <div className="flex flex-col gap-3 mt-4">
          {otherProjects.map((project, index) => (
            <a
              href={project.links[0].href}
              key={`project-${index}`}
              className="group relative w-full rounded-xl cursor-pointer overflow-hidden shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] bg-card/20 py-3 px-4 ring-2 hover:ring-3 ring-zinc-900/5 dark:ring-zinc-800 transition-all duration-500 hover:ring-zinc-600/20 dark:hover:ring-zinc-700"
            >
              <div className="">
                <div className="whitespace-nowrap flex items-center font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 inline-block"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                  {project.name}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
