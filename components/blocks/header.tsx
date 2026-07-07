"use client";
import { SectionDivider } from "@/components/blocks/section-divider";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { mainNavItems } from "@/content/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SiteHeader = () => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path || pathname.startsWith(`${path}/`);
	};

	return (
		<>
			<header className="border-b border-border/50">
				<div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-8">
					<nav className="flex min-w-0 items-center gap-4" aria-label="Main">
						<Link
							href="/"
							aria-label="Home"
							className={cn(
								"shrink-0 rounded px-1 py-1 font-mono text-sm/6 font-semibold tracking-normal text-muted-foreground transition hover:text-foreground",
								pathname === "/" && "text-foreground",
							)}
						>
							ned.im
						</Link>
						<div className="flex min-w-0 items-center gap-1">
							{mainNavItems
								.filter((item) => item.href !== "/")
								.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"rounded px-2.5 py-1 text-sm/6 font-medium text-muted-foreground transition hover:bg-accent/60 hover:text-foreground",
											isActive(item.href) && "text-foreground",
										)}
									>
										{item.label}
									</Link>
								))}
						</div>
					</nav>
					<div className="flex size-9 shrink-0 items-center justify-center rounded transition-colors hover:bg-accent/60">
						<ThemeToggle hideIndicator />
					</div>
				</div>
			</header>

			<div className="relative max-w-3xl mx-auto pointer-events-none">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 -top-14 bottom-0 mx-auto max-w-3xl"
				>
					<div className="to-border/50 absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-transparent to-75%" />
					<div className="to-border/50 absolute bottom-0 right-0 top-0 w-px bg-linear-to-b from-transparent to-75%" />
				</div>
			</div>
			<SectionDivider className="border-t-0" />
		</>
	);
};
