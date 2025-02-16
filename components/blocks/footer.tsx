"use client";

import Link from "next/link";

import { ContainerInner, ContainerOuter } from "@/components/blocks/container";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import IconNextjs from "@/components/icons/nextjs";
import { navigation } from "@/lib/navigation";
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
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="faded-border" />
        <div className="pb-16 pt-10 ">
          <ContainerInner>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-muted-foreground mb-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
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
                  href="https://github.com/laogou717/ned.im"
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
