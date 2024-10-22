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
	async redirects() {
		return [
			{
				source: "/.well-known/host-meta*",
				destination: "https://fed.brid.gy/.well-known/host-meta:splat", // Using :splat to capture dynamic parts
				permanent: false, // Equivalent to 302 redirect
			},
			{
				source: "/.well-known/webfinger*",
				destination: "https://fed.brid.gy/.well-known/webfinger",
				permanent: false, // Equivalent to 302 redirect
			},
		];
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
