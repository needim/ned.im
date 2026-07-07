"use server";

import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";
import {
	CACHE_DURATION,
	DEFAULT_X_RESPONSE,
	shouldUseMockData,
} from "./mock-data";

function createXClient() {
	const {
		X_API_KEY,
		X_API_SECRET,
		X_MY_ACCESS_TOKEN,
		X_MY_ACCESS_TOKEN_SECRET,
	} = process.env;

	if (
		!X_API_KEY ||
		!X_API_SECRET ||
		!X_MY_ACCESS_TOKEN ||
		!X_MY_ACCESS_TOKEN_SECRET
	) {
		return null;
	}

	const rateLimitPlugin = new TwitterApiRateLimitPlugin();
	const client = new TwitterApi(
		{
			appKey: X_API_KEY,
			appSecret: X_API_SECRET,
			accessToken: X_MY_ACCESS_TOKEN,
			accessSecret: X_MY_ACCESS_TOKEN_SECRET,
		},
		{
			plugins: [rateLimitPlugin],
		},
	);

	return client;
}

export const getXInfo = cache(
	async (): Promise<Externals.X.ApiResponse> => {
		if (shouldUseMockData()) {
			return DEFAULT_X_RESPONSE;
		}

		try {
			const client = createXClient();

			if (!client) {
				return DEFAULT_X_RESPONSE;
			}

			return await client.v2.me({
				"user.fields": "public_metrics",
			});
		} catch (error) {
			console.error("x api error", error);
			return DEFAULT_X_RESPONSE;
		}
	},
	["ned-im-x-data"],
	{
		revalidate: CACHE_DURATION,
	},
);
