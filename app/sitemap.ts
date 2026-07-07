import { sitemapRoutes } from "@/content/site";

export default async function sitemap() {
	const routes = sitemapRoutes.map((route) => ({
		url: `https://ned.im${route === "/" ? "" : route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
