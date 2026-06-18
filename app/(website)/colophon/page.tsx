import { Container } from "@/components/blocks/container";

export default function Notes() {
	return (
		<Container className="py-10 pb-12 sm:py-12">
			<div className="px-8">
				<h1 className="text-5xl/[1.05]">Colophon</h1>
				<div className="mt-3 text-balance text-base/7 text-muted-foreground">
					<p>The website deets.</p>
				</div>

				<div className="mt-12">
					<h2 className="text-3xl/[1.1]">Typefaces</h2>
					<ul className="mt-5 list-disc space-y-2 pl-6 text-base/7 text-muted-foreground">
						<li>
							<a
								target="_blank"
								href="https://fonts.google.com/specimen/Lexend"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								Lexend
							</a>{" "}
							by Bonnie Shaver-Troup, Thomas Jockin, Santiago Orozco, Héctor
							Gómez, Superunion
						</li>
						<li>
							<a
								target="_blank"
								href="https://vercel.com/font"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								Geist Sans
							</a>{" "}
							by Vercel
						</li>
						<li>
							<a
								target="_blank"
								href="https://vercel.com/font"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								Geist Mono
							</a>{" "}
							by Rasmus Andersson
						</li>
					</ul>
				</div>

				<div className="mt-12">
					<h2 className="text-3xl/[1.1]">Inspirations</h2>
					<ul className="mt-5 list-disc space-y-2 pl-6 text-base/7 text-muted-foreground">
						<li>
							<a
								target="_blank"
								href="https://ademilter.com"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://ademilter.com
							</a>{" "}
							by Adem İlter
						</li>
						<li>
							<a
								target="_blank"
								href="https://onur.dev"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://onur.dev
							</a>{" "}
							by Onur Şuyalçınkaya
						</li>
						<li>
							<a
								target="_blank"
								href="https://leerob.io"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://leerob.io
							</a>{" "}
							by Lee Robinson
						</li>
						<li>
							<a
								target="_blank"
								href="https://spotlight.tailwindui.com"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://spotlight.tailwindui.com
							</a>{" "}
							by Tailwind UI (header interactions)
						</li>
						<li>
							<a
								target="_blank"
								href="https://opaque.framer.website"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://opaque.framer.website
							</a>{" "}
							by Aaron Rolston
						</li>
						<li>
							<a
								target="_blank"
								href="https://benton.framer.website"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://benton.framer.website
							</a>{" "}
							by Fouroom
						</li>
						<li>
							<a
								target="_blank"
								href="https://www.joshwcomeau.com"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://www.joshwcomeau.com
							</a>{" "}
							by Josh W. Comeau
						</li>
						<li>
							<a
								target="_blank"
								href="https://kamranahmed.info"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://kamranahmed.info
							</a>{" "}
							by Kamran Ahmed
						</li>
						<li>
							<a
								target="_blank"
								href="https://www.raycast.com"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://www.raycast.com
							</a>
						</li>
						<li>
							<a
								target="_blank"
								href="https://nsui.irung.me"
								rel="noreferrer"
								className="text-foreground underline underline-offset-4"
							>
								https://nsui.irung.me
							</a>
						</li>
					</ul>
				</div>
			</div>
		</Container>
	);
}
