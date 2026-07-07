"use client";

import { notyRoutes } from "@/content/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NotyNav() {
	const pathname = usePathname();

	return (
		<nav aria-label="Noty documentation">
			<div className="flex flex-row flex-wrap gap-1.5 text-sm lg:flex-col lg:items-stretch">
				{notyRoutes.map((item) => {
					const isActive =
						pathname === item.href ||
						(item.href !== "/noty" && pathname.startsWith(`${item.href}/`));

					return (
						<Link
							key={item.href}
							href={item.href}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								"rounded px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:-mx-2.5",
								isActive && "bg-accent text-foreground",
							)}
						>
							{item.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
