import { cn } from "@/lib/utils";

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
}

export function SectionHeader({
	title,
	subtitle,
	className,
}: SectionHeaderProps) {
	return (
		<div className={cn("mb-8", className)}>
			<h2 className="text-3xl">{title}</h2>
			{subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
		</div>
	);
}
