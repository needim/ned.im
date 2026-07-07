export const CACHE_DURATION = 3600 * 1.5; // 1.5 hours
export const USE_MOCK_DATA_FOR_DEVELOPMENT = true;

export const DEFAULT_X_RESPONSE: Externals.X.ApiResponse = {
	data: { public_metrics: { followers_count: 4184 } },
};

export const DEFAULT_GITHUB_RESPONSE: Externals.Github.ApiResponse = {
	data: {
		viewer: {
			login: "needim",
			repositories: {
				totalCount: 6,
				nodes: [
					{
						nameWithOwner: "needim/noty",
						name: "noty",
						description:
							"Dependency-free notification library that makes it easy to create notification messages.",
						forkCount: 1041,
						stargazerCount: 6679,
						createdAt: "2012-01-28T09:15:14Z",
						updatedAt: "2024-09-18T06:12:05Z",
					},
					{
						nameWithOwner: "needim/wageso",
						name: "wageso",
						description:
							"Private money tracker for income, expenses, assets, and net worth.",
						forkCount: 0,
						stargazerCount: 0,
						createdAt: "2025-11-20T00:00:00Z",
						updatedAt: "2025-11-20T00:00:00Z",
					},
					{
						nameWithOwner: "needim/gider.im-pwa",
						name: "gider.im-pwa",
						description:
							"gider.im - privacy-focused income and expense tracking app",
						forkCount: 13,
						stargazerCount: 92,
						createdAt: "2024-07-28T11:25:34Z",
						updatedAt: "2024-09-23T10:26:15Z",
					},
					{
						nameWithOwner: "smashing-tools/smashing.tools",
						name: "smashing.tools",
						description:
							"A directory of starter kits, UI libraries, and frontend resources.",
						forkCount: 0,
						stargazerCount: 0,
						createdAt: "2023-12-25T00:00:00Z",
						updatedAt: "2023-12-25T00:00:00Z",
					},
					{
						nameWithOwner: "needim/ned.im",
						name: "ned.im",
						description: "My personal website",
						forkCount: 2,
						stargazerCount: 45,
						createdAt: "2024-05-06T15:40:49Z",
						updatedAt: "2024-09-20T18:11:04Z",
					},
					{
						nameWithOwner: "needim/Kit25D",
						name: "Kit25D",
						description:
							"Creating fake 3D world with 2D colliders and sprites in Unity",
						forkCount: 5,
						stargazerCount: 25,
						createdAt: "2017-12-18T22:43:27Z",
						updatedAt: "2023-08-30T09:50:28Z",
					},
				],
			},
			followers: {
				totalCount: 877,
			},
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: 0,
					weeks: [],
				},
			},
		},
	},
};

export function shouldUseMockData() {
	return (
		process.env.NODE_ENV === "development" && USE_MOCK_DATA_FOR_DEVELOPMENT
	);
}
