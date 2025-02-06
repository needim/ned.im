import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["mdx", "ts", "tsx"],
	reactStrictMode: false,
	experimental: {
		mdxRs: true,
		webpackBuildWorker: true,
		optimizePackageImports: ['@mdx-js/react'],
		serverActions: {
			bodySizeLimit: '2mb'
		},
	},
	webpack: (config, { dev, isServer }) => {
		if (dev) {
			config.watchOptions = {
				poll: 1000,
				aggregateTimeout: 300,
				ignored: ['**/node_modules', '**/.next'],
			};
		}
		return config;
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
		remarkPlugins: [
			remarkFrontmatter,
			remarkMdxFrontmatter,
			[remarkGfm, { singleTilde: false }],
		],
		rehypePlugins: [
			rehypeSlug,
			[rehypeHighlight, { ignoreMissing: true }],
		],
		providerImportSource: "@mdx-js/react",
	},
});

export default withMDX({
	...nextConfig,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
