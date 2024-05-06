import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";

const TOKEN = process.env.GITHUB_TOKEN;
const query = `
{
  viewer {
    login
    repositories(
      first: 5
      affiliations: OWNER
      isFork: false
      orderBy: {field: STARGAZERS, direction: DESC}
    ) {
      totalCount
      nodes {
        nameWithOwner
        name
        forkCount
        stargazerCount
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
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query,
      }),
    });

    return res.json();
  },
  ["ned-im-github-data"],
  {
    revalidate: 3600 * 6, // 6 hours
  }
);

export const getXInfo = cache(
  async () => {
    const client = new TwitterApi({
      appKey: process.env.X_API_KEY!,
      appSecret: process.env.X_API_SECRET!,
      accessToken: process.env.X_MY_ACCESS_TOKEN!,
      accessSecret: process.env.X_MY_ACCESS_TOKEN_SECRET!,
    });

    const user = await client.v2.me({
      "user.fields": "public_metrics",
    });

    console.dir(user);

    return user;
  },
  ["ned-im-x-data"],
  {
    revalidate: 3600 * 6, // 6 hours
  }
);
