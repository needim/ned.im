import { Container } from "@/components/blocks/container";

export default function Notes() {
	return (
		<Container className="px-8 py-10 sm:py-12">
			<div className="max-w-3xl">
				<h1 className="text-5xl/[1.05]">Notes</h1>
				<div className="mt-3 text-balance text-base/7 text-muted-foreground">
					<p>The notes I&apos;ve taken during my journey.</p>
				</div>
			</div>
		</Container>
	);
}
