import { cn } from "@/lib/utils";

interface SectionDividerProps {
	className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
	return (
		<section className={cn("border-y border-border/50", className)}>
			<div className="h-1.5 w-full bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] opacity-50" />
		</section>
	);
}
