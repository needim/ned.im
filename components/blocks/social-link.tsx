import NumberTicker from "@/components/blocks/number-ticker";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SocialLink({
	icon: Icon,
	count,
	label,
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	count?: number;
	label?: string;
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<Link
			className={cn(
				"group inline-flex h-8 items-center gap-2 rounded border border-border/60 bg-background/25 px-2.5 text-muted-foreground ring-offset-background transition hover:border-border hover:bg-accent/40 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className,
			)}
			{...props}
			target="_blank"
		>
			<Icon className="size-4 fill-current transition" />
			{count && (
				<span className="text-sm/6">
					<NumberTicker play value={count} label={label} />
				</span>
			)}
		</Link>
	);
}
