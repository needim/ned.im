"use client";
import { Avatar } from "@/components/blocks/avatar";
import { HeaderGradient } from "@/components/blocks/header-gradient";
import { SectionDivider } from "@/components/blocks/section-divider";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { Button } from "@/components/ui/button";
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
			<HeaderGradient />
			<header className="border-b dark:[--color-border:color-mix(in_oklab,var(--color-zinc-800)_60%,transparent)]">
				<div className="mx-auto flex max-w-3xl justify-between px-8 py-4">
					<div className="flex gap-6 items-center">
						<Avatar />
						<div className="flex gap-1">
							<Button
								asChild
								size="sm"
								variant="ghost"
								className={cn(
									"text-foreground/50",
									isActive("/projects") && "text-foreground",
								)}
							>
								<Link href="/projects" className="!text-sm">
									Projects
								</Link>
							</Button>
							<Button
								asChild
								size="sm"
								variant="ghost"
								className={cn(
									"text-foreground/50",
									isActive("/changelog") && "text-foreground",
								)}
							>
								<Link href="/changelog" className="!text-sm">
									Changelog
								</Link>
							</Button>
						</div>
					</div>
					<div className="flex items-center">
						<ThemeToggle hideIndicator />
					</div>
				</div>
			</header>

			<div className="relative max-w-3xl mx-auto pointer-events-none">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 -top-14 bottom-0 mx-auto max-w-3xl"
				>
					<div className="to-(--color-border)/50 absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent to-75%" />
					<div className="to-(--color-border)/50 absolute bottom-0 right-0 top-0 w-px bg-gradient-to-b from-transparent to-75%" />
				</div>
			</div>
			<SectionDivider className="border-t-0" />
		</>
	);
};
