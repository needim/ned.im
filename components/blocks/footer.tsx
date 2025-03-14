import Link from "next/link";

import { ContainerInner, ContainerOuter } from "@/components/blocks/container";
import { SectionDivider } from "@/components/blocks/section-divider";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import IconNextjs from "@/components/icons/nextjs";
import { navItems } from "@/lib/utils";
import { IconBrandGithubFilled, IconBrandVercel } from "@tabler/icons-react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-zinc-500 dark:hover:text-zinc-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="flex-none">
      <SectionDivider />
      <div className="relative max-w-3xl mx-auto pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-x-4 -bottom-14 top-0 mx-auto max-w-7xl lg:inset-x-0"
        >
          <div className="from-(--color-border)/50 absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b to-transparent to-75%" />
          <div className="from-(--color-border)/50 absolute bottom-0 right-0 top-0 w-px bg-gradient-to-b to-transparent to-75%" />
        </div>
      </div>
      <ContainerOuter>
        <div className="pb-16 pt-4">
          <ContainerInner className="px-8">
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-muted-foreground mb-4">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
              <NavLink key={"/colophon"} href="/colophon">
                Colophon
              </NavLink>
            </div>
            <div className="text-sm text-muted-foreground">
              <div className="items-center flex flex-wrap gap-4">
                <Link
                  href="https://nextjs.org"
                  target="_blank"
                  rel="nofollow"
                  className="items-center flex gap-1 dark:hover:text-white"
                >
                  Built with <IconNextjs className="size-4 inline" />
                </Link>
                <Link
                  href="https://www.vercel.com"
                  target="_blank"
                  rel="nofollow"
                  className="items-center flex gap-1 dark:hover:text-white"
                >
                  Deployed on <IconBrandVercel className="size-4 inline" />
                </Link>
                <Link
                  href="https://github.com/needim/ned.im"
                  target="_blank"
                  rel="nofollow"
                  className="items-center flex gap-1 dark:hover:text-white"
                >
                  Source on <IconBrandGithubFilled className="size-4 inline" />
                </Link>
                <div className="grow" />
                <ThemeToggle />
              </div>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
