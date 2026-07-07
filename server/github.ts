"use server";

import { unstable_cache as cache } from "next/cache";
import {
	CACHE_DURATION,
	DEFAULT_GITHUB_RESPONSE,
	shouldUseMockData,
} from "./mock-data";

const GITHUB_QUERY = `
{
  viewer {
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

export const getGithubInfo = cache(
	async (): Promise<Externals.Github.ApiResponse> => {
		if (shouldUseMockData()) {
			return DEFAULT_GITHUB_RESPONSE;
		}

		try {
			const res = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query: GITHUB_QUERY,
				}),
				next: { revalidate: CACHE_DURATION },
			});

			if (!res.ok) {
				throw new Error(`GitHub API responded with ${res.status}`);
			}

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
