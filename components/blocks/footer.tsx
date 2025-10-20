import Link from "next/link";

import { ContainerInner } from "@/components/blocks/container";
import { SectionDivider } from "@/components/blocks/section-divider";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import IconNextjs from "@/components/icons/nextjs";
import { navItems } from "@/lib/utils";
import { IconBrandGithubFilled } from "@tabler/icons-react";

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
			className="transition text-muted-foreground  hover:text-zinc-900 dark:hover:text-white"
		>
			{children}
		</Link>
	);
}

export function Footer() {
	return (
		<>
			<SectionDivider />
			<footer className="flex-none border-x border-border/50 max-w-3xl mx-auto">
				<div className="py-4">
					<div className="pb-8">
						<ContainerInner className="">
							<div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-muted-foreground pb-4 px-8 border-b border-border/50">
								{navItems.map((item) => (
									<NavLink key={item.href} href={item.href}>
										{item.label}
									</NavLink>
								))}
								<NavLink key={"/colophon"} href="/colophon">
									Colophon
								</NavLink>
							</div>
							<div className="text-sm text-muted-foreground px-8 py-4">
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
										href="https://github.com/needim/ned.im"
										target="_blank"
										rel="nofollow"
										className="items-center flex gap-1 dark:hover:text-white"
									>
										Source on{" "}
										<IconBrandGithubFilled className="size-4 inline" />
									</Link>
									<div className="grow" />
									<ThemeToggle hideIndicator />
								</div>
							</div>
						</ContainerInner>
					</div>
				</div>
			</footer>
		</>
	);
}
