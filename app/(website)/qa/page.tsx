"use client";

import { Container } from "@/components/blocks/container";
import { QASection } from "@/components/blocks/qa-section";
import {
	IconBrain,
	IconClock,
	IconHeart,
	IconMessageCircle2,
} from "@tabler/icons-react";

export default function QAPage() {
	const features = [
		{
			icon: <IconMessageCircle2 className="w-5 h-5" />,
			title: "随时交流",
			description: "有任何问题都可以随时提出",
		},
		{
			icon: <IconBrain className="w-5 h-5" />,
			title: "技术讨论",
			description: "分享你的想法和见解",
		},
		{
			icon: <IconHeart className="w-5 h-5" />,
			title: "友好互动",
			description: "建立积极的交流氛围",
		},
		{
			icon: <IconClock className="w-5 h-5" />,
			title: "及时回复",
			description: "我会尽快回应你的问题",
		},
	];

	return (
		<Container>
			<div className="mx-auto max-w-3xl mt-16">
				<div className="space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold tracking-tight">问答</h1>
						<p className="text-muted-foreground">
							这里是问答区，你可以在这里向我提出任何问题。
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{features.map((feature, index) => (
							<div
								key={index}
								className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
							>
								<div className="flex flex-col items-center text-center space-y-2">
									<div className="p-2 rounded-full bg-primary/10 text-primary">
										{feature.icon}
									</div>
									<h3 className="font-medium">{feature.title}</h3>
									<p className="text-sm text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<QASection path="/qa" />
			</div>
		</Container>
	);
}
