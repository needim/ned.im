"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function ModeToggle({
	align = "start",
}: {
	align?: "center" | "start" | "end";
}) {
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex size-11 shrink-0 items-center justify-center rounded-3xl transition-colors hover:bg-zinc-100 duration-300 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
						<path d="M12 5l0 .01" />
						<path d="M17 7l0 .01" />
						<path d="M19 12l0 .01" />
						<path d="M17 17l0 .01" />
						<path d="M12 19l0 .01" />
						<path d="M7 17l0 .01" />
						<path d="M5 12l0 .01" />
						<path d="M7 7l0 .01" />
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" />
					</svg>
					<span className="sr-only">Toggle theme</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align={align}>
				<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
					<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
