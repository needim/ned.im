import Link from "next/link";

export function SocialLink({
	icon: Icon,
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<Link
			className="group flex items-center justify-center p-2 rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
			{...props}
			target="_blank"
		>
			<Icon className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300" />
		</Link>
	);
}
