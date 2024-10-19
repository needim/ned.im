import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["mdx", "ts", "tsx"],
	reactStrictMode: false,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	experimental: {
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
			},
		],
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
