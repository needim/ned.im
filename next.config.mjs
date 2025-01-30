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
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "img.laogou717.com",
				port: "",
				pathname: "/file/**",
			},
			{
				protocol: "https",
				hostname: "p1.music.126.net",
				port: "",
				pathname: "/**",
			}
		],
	},
	async redirects() {
		return [
			{
				source: "/.well-known/host-meta/:slug*",
				destination: "https://fed.brid.gy/.well-known/host-meta/:slug*",
				permanent: true,
			},
			{
				source: "/.well-known/webfinger:slug*",
				destination: "https://fed.brid.gy/.well-known/webfinger:slug*",
				permanent: true,
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
