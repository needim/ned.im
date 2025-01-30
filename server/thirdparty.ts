"use server";

import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";

interface TwitterUser {
	followers_count: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: unknown;
}

interface TwitterResponse {
	data: {
		public_metrics?: {
			followers_count: number;
		};
	};
}

const CACHE_DURATION = 3600 * 1.5; // 1.5 hours
const USE_MOCK_DATA_FOR_DEVELOPMENT = false;
const DEFAULT_X_RESPONSE = {
	data: { 
		public_metrics: { 
			followers_count: 52 
		} 
	},
};
const DEFAULT_GITHUB_RESPONSE = {
	data: {
		user: {
			login: "laogou717",
			repositories: {
				totalCount: 0,
				nodes: [],
			},
			followers: {
				totalCount: 33,
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

const rateLimitPlugin = new TwitterApiRateLimitPlugin();
const client = new TwitterApi({
	appKey: process.env.X_API_KEY!,
	appSecret: process.env.X_API_SECRET!,
	accessToken: process.env.X_MY_ACCESS_TOKEN!,
	accessSecret: process.env.X_MY_ACCESS_TOKEN_SECRET!,
}, {
	plugins: [rateLimitPlugin]
});

export const getGithubInfo = cache(
	async (): Promise<Externals.Github.ApiResponse> => {
		try {
			if (process.env.NODE_ENV === "development" && USE_MOCK_DATA_FOR_DEVELOPMENT) {
				return DEFAULT_GITHUB_RESPONSE;
			}

			const query = `
{
  user(login: "laogou717") {
    login
    repositories(
      first: 20
      affiliations: OWNER
      isFork: false
      orderBy: {field: STARGAZERS, direction: DESC}
    ) {
      totalCount
      nodes {
        nameWithOwner
        name
        description
        forkCount
        stargazerCount
        createdAt
        updatedAt
      }
    }
    followers {
      totalCount
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

			console.log("API HIT: github");
			const res = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query,
				}),
			});

			return await res.json();
		} catch (error) {
			console.error("github api error", error);
			return DEFAULT_GITHUB_RESPONSE;
		}
	},
	["ned-im-github-data"],
	{
		revalidate: CACHE_DURATION,
	},
);

export const getXInfo = cache(
	async () => {
		try {
			if (process.env.NODE_ENV === "development" && USE_MOCK_DATA_FOR_DEVELOPMENT) {
				return DEFAULT_X_RESPONSE;
			}

			const response = await client.v1.verifyCredentials();
			
			if (!response?.followers_count && response?.followers_count !== 0) {
				console.error("Invalid response from X API:", response);
				return DEFAULT_X_RESPONSE;
			}

			return {
				data: {
					public_metrics: {
						followers_count: response.followers_count
					}
				}
			};
		} catch (error) {
			console.error("X API failed:", error);
			if (error instanceof Error) {
				console.error("Error details:", error.message);
			}
			return DEFAULT_X_RESPONSE;
		}
	},
	["ned-im-x-data"],
	{
		revalidate: CACHE_DURATION,
	},
);
