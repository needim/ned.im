import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://laogou717.com",
			lastModified: new Date(),
		},
		{
			url: "https://laogou717.com/timeline",
			lastModified: new Date(),
		},
		{
			url: "https://laogou717.com/notes",
			lastModified: new Date(),
		},
		{
			url: "https://laogou717.com/colophon",
			lastModified: new Date(),
		},
	];
}
