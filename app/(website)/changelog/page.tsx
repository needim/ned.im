import { ChangelogList } from "@/components/blocks/changelog-list";
import { Container } from "@/components/blocks/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Changelog",
};

export default function Changelog() {
	return (
		<Container className="py-8 pb-10 px-8">
			<div className="max-w-3xl">
				<h1 className="tracking-tight text-5xl">Changelog</h1>
				<div className="pro text-muted-foreground text-balance">
					<p className="mt-2">
						Here you can find the major updates and changes to my life.
					</p>
				</div>
				<ChangelogList />
			</div>
		</Container>
	);
}
