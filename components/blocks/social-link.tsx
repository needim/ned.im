import NumberTicker from "@/components/blocks/number-ticker";
import Link from "next/link";

export function SocialLink({
	icon: Icon,
	count,
	label,
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	count?: number;
	label?: string;
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<Link
			className="group -m-1 p-1 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded flex items-center gap-2"
			{...props}
			target="_blank"
		>
			<Icon className="h-6 w-6 fill-muted-foreground transition group-hover:fill-primary" />
			{count && (
				<span className="text-muted-foreground text-sm group-hover:text-primary">
					<NumberTicker play value={count} label={label} />
				</span>
			)}
		</Link>
	);
}
