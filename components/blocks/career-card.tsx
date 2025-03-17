import type { careerItems } from "@/lib/utils";

export function CareerCard({ item }: { item: (typeof careerItems)[number] }) {
	return (
		<div className="group relative hover:bg-muted dark:hover:bg-muted/30 transition-colors duration-300 px-8 py-4">
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span>{item.location}</span>{" "}
				<span>
					{item.from} — {item.to || "Present"}
				</span>
			</div>
			<div className="mb-1 flex flex-col items-start justify-between gap-2 text-balance text-lg sm:flex-row sm:items-center">
				<div className="font-medium">
					{item.title} <span className="text-muted-foreground">at</span>{" "}
					{item.company.name}
				</div>
			</div>
			<div className="flex flex-col gap-2 text-sm leading-normal sm:gap-3 sm:text-base text-muted-foreground">
				{item.description}
			</div>

			{item.subRoles?.length && (
				<blockquote className="mt-5 text-sm text-muted-foreground border-l-[3px] border-border/70 pl-4">
					{item.subRoles.map((role, index) => (
						<div key={`role-${index}`}>
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>{role.location}</span>{" "}
								<span>
									{role.from} — {role.to || "Present"}
								</span>
							</div>
							<div className="mb-1 flex flex-col items-start text-foreground justify-between gap-2 text-balance text-lg sm:flex-row sm:items-center">
								<div className="font-medium">{role.title} </div>
							</div>
							<div className="flex flex-col gap-2 text-sm leading-normal sm:gap-3 sm:text-base text-muted-foreground">
								{role.description}
							</div>
						</div>
					))}
				</blockquote>
			)}
		</div>
	);
}
