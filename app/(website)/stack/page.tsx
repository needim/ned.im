import { Container } from "@/components/blocks/container";
import { StackList } from "@/components/blocks/stack-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stack",
};

export default function Notes() {
	const desk = [
		{
			name: "27” 27UN880 4K",
			brand: "LG",
			category: "Monitor",
			imageSrc: "/stack/monitor.png",
		},
		{
			name: "C500",
			brand: "Rapido",
			category: "Chair",
			imageSrc: "/stack/chair.png",
		},
		{
			name: "White 140x60",
			brand: "Lagkapten",
			category: "Table Top",
			imageSrc: "/stack/desk.png",
		},
		{
			name: "4 x White 60-90cm",
			brand: "Olov",
			category: "Table Leg",
			imageSrc: "/stack/desk-leg.png",
		},
	];

	const everyday = [
		{
			name: "iPhone 15 Pro 256 GB",
			brand: "Apple",
			category: "Phone",
			imageSrc: "/stack/phone.png",
		},
		{
			name: "MacBook M3 Pro 14” - 18 GB",
			brand: "Apple",
			category: "Laptop",
			imageSrc: "/stack/laptop.png",
		},
		{
			name: "CC8-19-002",
			brand: "Samsonite",
			category: "Bag",
			imageSrc: "/stack/bag.png",
		},
		{
			name: "Studio 3 Wireless",
			brand: "Beats",
			category: "Headphones",
			imageSrc: "/stack/head.png",
		},
	];

	const gaming = [
		{
			name: "ROG Strix G15",
			brand: "Asus",
			category: "Laptop",
			imageSrc: "/stack/gaming.png",
		},
		{
			name: "Pusat One Shot Pro",
			brand: "Monster",
			category: "Mouse",
			imageSrc: "/stack/gaming-mouse.png",
		},
	];

	return (
		<Container className="py-8 pb-10 px-8">
			<div className="max-w-3xl">
				<h1 className="tracking-tight text-5xl">Stack</h1>
				<div className="pro text-muted-foreground text-balance">
					<p className="mt-2">
						The technologies & products I use daily for building projects and
						managing my life.
					</p>
				</div>
				<StackList
					title="Desk"
					description="At home, I have a simple setup with a desk, chair, and monitor."
					items={desk}
				/>
				<StackList
					title="Everyday"
					description="The devices I carry with me daily to work and around the city."
					items={everyday}
				/>
				<StackList
					title="Gaming"
					description="The devices I use for gaming."
					items={gaming}
				/>
			</div>
		</Container>
	);
}
