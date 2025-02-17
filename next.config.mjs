import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["mdx", "ts", "tsx"],
	reactStrictMode: true,
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
			},
			{
				protocol: "https",
				hostname: "p2.music.126.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "m802.music.126.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "m701.music.126.net",
				port: "",
				pathname: "/**",
			}
		],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains'
					},
					{
						key: 'Content-Security-Policy',
						value: "default-src 'self' https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: http://*.music.126.net https://*.music.126.net https://i.ytimg.com; media-src 'self' blob: https: http://*.music.126.net https://*.music.126.net http://m*.music.126.net https://m*.music.126.net; font-src 'self' data: https:; connect-src 'self' https: wss://*.pusher.com https://*.laogou717.com https://*.music.126.net http://*.music.126.net https://music.laogou717.com;"
					},
					{
						key: 'Access-Control-Allow-Origin',
						value: '*'
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, PUT, DELETE, OPTIONS'
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-Requested-With, Content-Type, Authorization'
					}
				]
			}
		];
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
		format: 'mdx'
	}
});

export default withMDX(nextConfig);
