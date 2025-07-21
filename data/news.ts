export interface NewsItem {
	id: string;
	title: string;
	description: string;
	url: string;
	category: string;
	publishedAt: string;
	source: string;
	tags: string[];
}

export const newsItems: NewsItem[] = [
	{
		id: "1",
		title: "Kiro AI助手0.1预览版发布，革命性的开发体验",
		description:
			"Kiro是一款创新的AI编程助手，提供智能代码生成、实时调试和项目管理功能。虽然官网暂时关闭，但可通过第三方平台下载体验这款强大的开发工具。",
		url: "https://www.techspot.com/downloads/7778-amazon-kiro.html",
		category: "AI",
		publishedAt: "2025-07-21T16:00:00Z",
		source: "TechSpot",
		tags: ["Kiro", "AI助手", "编程工具", "开发体验"],
	},
	{
		id: "2",
		title: "Next.js 15 正式发布，带来重大性能提升",
		description:
			"Next.js 15 引入了新的编译器优化、改进的开发体验和更好的性能表现。支持React 19，新增Turbopack稳定版本。",
		url: "https://nextjs.org/blog/next-15",
		category: "技术",
		publishedAt: "2024-01-20T10:00:00Z",
		source: "Next.js Blog",
		tags: ["Next.js", "React", "前端", "性能优化"],
	},
	{
		id: "3",
		title: "AI 编程助手的新突破：代码生成准确率提升40%",
		description:
			"最新的AI编程助手通过改进的训练模型，在代码生成和bug修复方面表现出色。支持多种编程语言和框架。",
		url: "https://github.com/features/copilot",
		category: "AI",
		publishedAt: "2024-01-19T15:30:00Z",
		source: "GitHub Blog",
		tags: ["AI", "编程", "机器学习", "GitHub Copilot"],
	},
	{
		id: "4",
		title: "开源项目管理的最佳实践指南",
		description:
			"如何有效管理开源项目，包括社区建设、代码审查和版本发布策略。涵盖从项目启动到维护的完整流程。",
		url: "https://opensource.guide/",
		category: "开源",
		publishedAt: "2024-01-18T09:15:00Z",
		source: "Open Source Guides",
		tags: ["开源", "项目管理", "社区", "最佳实践"],
	},
	{
		id: "5",
		title: "Web3 技术栈的演进与未来趋势",
		description:
			"探讨区块链技术在Web开发中的应用，以及去中心化应用的发展前景。分析当前主流Web3框架和工具。",
		url: "https://web3.foundation/",
		category: "区块链",
		publishedAt: "2024-01-17T14:20:00Z",
		source: "Web3 Foundation",
		tags: ["Web3", "区块链", "去中心化", "DApp"],
	},
	{
		id: "6",
		title: "TypeScript 5.3 发布：新增装饰器支持",
		description:
			"TypeScript 5.3 正式支持装饰器语法，同时改进了类型推断和错误提示。为现代JavaScript开发带来更好的体验。",
		url: "https://devblogs.microsoft.com/typescript/",
		category: "技术",
		publishedAt: "2024-01-16T11:45:00Z",
		source: "TypeScript Blog",
		tags: ["TypeScript", "JavaScript", "装饰器", "类型系统"],
	},
	{
		id: "7",
		title: "Rust 在系统编程中的应用趋势",
		description:
			"Rust语言在系统级编程、Web后端和区块链开发中的应用越来越广泛。分析其内存安全特性的优势。",
		url: "https://www.rust-lang.org/",
		category: "技术",
		publishedAt: "2024-01-15T16:20:00Z",
		source: "Rust Foundation",
		tags: ["Rust", "系统编程", "内存安全", "性能"],
	},
];

export const newsCategories = ["全部", "技术", "AI", "开源", "区块链"] as const;

export type NewsCategory = (typeof newsCategories)[number];
