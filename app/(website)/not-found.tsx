import { Container } from "@/components/blocks/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
	return (
		<Container className="flex h-full items-center pt-16 sm:pt-32">
			<div className="flex flex-col items-center">
				<p className="text-base font-mono font-semibold text-indigo-500">404</p>
				<h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
					Page not found
				</h1>
				<p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<Link
					href="/"
					className={cn(buttonVariants({ variant: "secondary" }), "mt-4")}
				>
					Go back home
				</Link>
			</div>
		</Container>
	);
}
