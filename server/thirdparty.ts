"use server";

import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";

const CACHE_DURATION = 3600 * 1.5; // 1.5 hours
const USE_MOCK_DATA_FOR_DEVELOPMENT = true;
const DEFAULT_X_RESPONSE = {
	data: { public_metrics: { followers_count: 4184 } },
};
const DEFAULT_GITHUB_RESPONSE = {
	data: {
		viewer: {
			login: "needim",
			repositories: {
				totalCount: 31,
				nodes: [
					{
						nameWithOwner: "needim/noty",
						name: "noty",
						description:
							"⛔️ DEPRECATED - Dependency-free notification library that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.",
						forkCount: 1041,
						stargazerCount: 6679,
						createdAt: "2012-01-28T09:15:14Z",
						updatedAt: "2024-09-18T06:12:05Z",
					},
					{
						nameWithOwner: "needim/wdt-emoji-bundle",
						name: "wdt-emoji-bundle",
						description:
							"Slack like emoji picker with apple/ios, twitter/twemoji, google, emojione, facebook, messenger emoji support",
						forkCount: 86,
						stargazerCount: 419,
						createdAt: "2016-01-29T04:19:12Z",
						updatedAt: "2023-12-28T17:32:38Z",
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
						nameWithOwner: "needim/wdtLoading",
						name: "wdtLoading",
						description: "Asana like application loading screen",
						forkCount: 19,
						stargazerCount: 91,
						createdAt: "2016-01-10T12:22:19Z",
						updatedAt: "2024-04-10T04:45:39Z",
					},
					{
						nameWithOwner: "needim/termic",
						name: "termic",
						description:
							"Termic is an idea for personal pages and terminal lovers! <3",
						forkCount: 5,
						stargazerCount: 82,
						createdAt: "2013-11-14T19:09:59Z",
						updatedAt: "2024-01-16T04:49:38Z",
					},
					{
						nameWithOwner: "needim/gider.im-website",
						name: "gider.im-website",
						description: "gider.im website",
						forkCount: 4,
						stargazerCount: 72,
						createdAt: "2024-07-28T11:24:41Z",
						updatedAt: "2024-09-20T18:53:01Z",
					},
					{
						nameWithOwner: "needim/radix-ui-themes-with-tailwind",
						name: "radix-ui-themes-with-tailwind",
						description: "Radix UI Themes Integration with Tailwind CSS",
						forkCount: 1,
						stargazerCount: 47,
						createdAt: "2023-08-21T15:40:45Z",
						updatedAt: "2024-08-18T15:35:29Z",
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
						nameWithOwner: "needim/minibed",
						name: "minibed",
						description:
							"It's a mini editable, customizable playground for web",
						forkCount: 4,
						stargazerCount: 39,
						createdAt: "2017-04-23T19:17:21Z",
						updatedAt: "2023-08-18T12:24:58Z",
					},
					{
						nameWithOwner: "needim/numbars",
						name: "numbars",
						description: "number visualization with bars, like progressbar",
						forkCount: 7,
						stargazerCount: 36,
						createdAt: "2014-01-05T19:54:42Z",
						updatedAt: "2023-10-10T12:48:49Z",
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
					{
						nameWithOwner: "needim/react-useoverlay",
						name: "react-useoverlay",
						description: "if floating-ui and framer-motion had a baby",
						forkCount: 0,
						stargazerCount: 13,
						createdAt: "2022-06-23T23:53:15Z",
						updatedAt: "2024-03-12T16:18:51Z",
					},
					{
						nameWithOwner: "needim/pixel-race-game",
						name: "pixel-race-game",
						description: "I built this game for a short time fun.",
						forkCount: 8,
						stargazerCount: 10,
						createdAt: "2014-01-14T20:26:03Z",
						updatedAt: "2024-01-20T09:37:35Z",
					},
					{
						nameWithOwner: "needim/obs-shortcuts",
						name: "obs-shortcuts",
						description: "Keyboard shortcuts for OBS with websoket API",
						forkCount: 1,
						stargazerCount: 5,
						createdAt: "2018-08-27T10:45:37Z",
						updatedAt: "2023-08-21T15:49:54Z",
					},
					{
						nameWithOwner: "needim/needim.github.io",
						name: "needim.github.io",
						description: "Personal Page",
						forkCount: 1,
						stargazerCount: 4,
						createdAt: "2013-12-26T21:02:59Z",
						updatedAt: "2024-05-02T18:43:13Z",
					},
					{
						nameWithOwner: "needim/evolu-vite-react-pwa",
						name: "evolu-vite-react-pwa",
						description: null,
						forkCount: 0,
						stargazerCount: 1,
						createdAt: "2024-05-31T18:27:21Z",
						updatedAt: "2024-07-30T14:35:04Z",
					},
					{
						nameWithOwner: "needim/giveinsight",
						name: "giveinsight",
						description:
							"A modern tool to help your business collaborate and grow",
						forkCount: 0,
						stargazerCount: 1,
						createdAt: "2023-07-20T22:33:23Z",
						updatedAt: "2023-09-05T12:01:57Z",
					},
					{
						nameWithOwner: "needim/needim",
						name: "needim",
						description: "readme",
						forkCount: 1,
						stargazerCount: 1,
						createdAt: "2022-01-04T16:19:36Z",
						updatedAt: "2024-08-08T19:55:42Z",
					},
					{
						nameWithOwner: "needim/perdaily-react",
						name: "perdaily-react",
						description: "React Personal Daily",
						forkCount: 0,
						stargazerCount: 1,
						createdAt: "2021-01-28T12:26:25Z",
						updatedAt: "2021-02-12T07:36:22Z",
					},
					{
						nameWithOwner: "needim/notymanager-preview",
						name: "notymanager-preview",
						description: "Notification manager plugin",
						forkCount: 2,
						stargazerCount: 1,
						createdAt: "2014-03-05T13:25:41Z",
						updatedAt: "2023-03-07T05:15:42Z",
					},
				],
			},
			followers: {
				totalCount: 877,
			},
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: 1244,
					weeks: [
						{
							contributionDays: [
								{
									contributionCount: 8,
									date: "2023-09-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2023-09-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 18,
									date: "2023-09-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-09-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 56,
									date: "2023-09-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 14,
									date: "2023-09-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-09-30T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 2,
									date: "2023-10-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-10-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 52,
									date: "2023-10-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2023-10-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-07T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-10-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2023-10-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2023-10-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2023-10-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-14T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-10-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2023-10-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2023-10-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2023-10-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-21T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-10-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 14,
									date: "2023-10-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2023-10-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 19,
									date: "2023-10-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 11,
									date: "2023-10-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2023-10-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-10-28T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-10-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 7,
									date: "2023-10-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 19,
									date: "2023-10-31T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2023-11-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-11-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 10,
									date: "2023-11-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-04T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-11-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2023-11-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2023-11-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2023-11-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2023-11-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2023-11-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-11T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-11-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2023-11-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-11-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2023-11-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-18T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-11-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2023-11-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2023-11-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 7,
									date: "2023-11-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2023-11-25T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-11-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2023-11-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-11-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2023-11-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2023-12-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-12-02T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-12-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-12-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2023-12-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2023-12-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2023-12-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2023-12-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-12-09T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-12-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2023-12-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2023-12-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-12-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2023-12-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-12-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-12-16T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 6,
									date: "2023-12-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 21,
									date: "2023-12-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2023-12-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 9,
									date: "2023-12-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 34,
									date: "2023-12-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-12-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 16,
									date: "2023-12-23T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 9,
									date: "2023-12-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 26,
									date: "2023-12-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2023-12-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 9,
									date: "2023-12-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2023-12-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 10,
									date: "2023-12-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2023-12-30T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2023-12-31T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-01-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-01-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-01-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-01-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 15,
									date: "2024-01-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-01-06T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-01-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-01-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-01-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 7,
									date: "2024-01-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2024-01-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 9,
									date: "2024-01-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2024-01-13T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-01-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-01-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-01-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-01-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2024-01-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-01-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-01-20T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-01-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2024-01-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2024-01-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-01-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-01-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 11,
									date: "2024-01-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-01-27T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-01-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2024-01-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-01-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-01-31T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-02-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-02-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-03T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-02-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-02-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-10T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-02-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-02-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-02-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-17T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-02-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-02-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-02-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-02-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-24T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-02-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-02-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-02-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-02-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-02-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-03-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-02T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-03-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-03-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-03-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-09T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-03-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-03-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-03-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-16T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-03-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-03-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-03-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-23T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-03-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-03-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-03-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-03-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-03-30T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 7,
									date: "2024-03-31T00:00:00.000+00:00",
								},
								{
									contributionCount: 7,
									date: "2024-04-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-04-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-04-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 10,
									date: "2024-04-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-04-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-04-06T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 1,
									date: "2024-04-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-13T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-04-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-04-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2024-04-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-04-20T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-04-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-04-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-04-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-04-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-04-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-04-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 11,
									date: "2024-04-27T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 28,
									date: "2024-04-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 19,
									date: "2024-04-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-04-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-05-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-05-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-04T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-05-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-05-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 19,
									date: "2024-05-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-05-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-05-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-05-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-11T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-05-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-05-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-05-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-05-18T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-05-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-05-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-05-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-05-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-05-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-05-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-25T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-05-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-05-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-05-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-05-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-05-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 11,
									date: "2024-05-31T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-06-01T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-06-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-06-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-08T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-06-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-06-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-15T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-06-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-22T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-06-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-06-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-06-29T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-06-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-07-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-07-06T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-07-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-07-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-07-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-13T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-07-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-07-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2024-07-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-07-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-20T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 2,
									date: "2024-07-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-07-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-07-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-07-24T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2024-07-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-27T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 12,
									date: "2024-07-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-07-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-07-31T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-03T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 7,
									date: "2024-08-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 12,
									date: "2024-08-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-08-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 17,
									date: "2024-08-07T00:00:00.000+00:00",
								},
								{
									contributionCount: 13,
									date: "2024-08-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 4,
									date: "2024-08-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 8,
									date: "2024-08-10T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-08-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-08-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-08-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 5,
									date: "2024-08-14T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-08-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-17T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-08-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-08-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-08-21T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-08-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-23T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-24T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-08-25T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-26T00:00:00.000+00:00",
								},
								{
									contributionCount: 1,
									date: "2024-08-27T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-28T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-29T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-30T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-08-31T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-09-01T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-09-02T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-03T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-04T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-05T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-06T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-07T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-09-08T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-09T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-10T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-09-11T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-09-12T00:00:00.000+00:00",
								},
								{
									contributionCount: 3,
									date: "2024-09-13T00:00:00.000+00:00",
								},
								{
									contributionCount: 6,
									date: "2024-09-14T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 7,
									date: "2024-09-15T00:00:00.000+00:00",
								},
								{
									contributionCount: 7,
									date: "2024-09-16T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-17T00:00:00.000+00:00",
								},
								{
									contributionCount: 2,
									date: "2024-09-18T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-19T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-20T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-21T00:00:00.000+00:00",
								},
							],
						},
						{
							contributionDays: [
								{
									contributionCount: 0,
									date: "2024-09-22T00:00:00.000+00:00",
								},
								{
									contributionCount: 0,
									date: "2024-09-23T00:00:00.000+00:00",
								},
							],
						},
					],
				},
			},
		},
	},
};

const rateLimitPlugin = new TwitterApiRateLimitPlugin();
const client = new TwitterApi(
	{
		appKey: process.env.X_API_KEY!,
		appSecret: process.env.X_API_SECRET!,
		accessToken: process.env.X_MY_ACCESS_TOKEN!,
		accessSecret: process.env.X_MY_ACCESS_TOKEN_SECRET!,
	},
	{
		plugins: [rateLimitPlugin],
	},
);

export const getGithubInfo = cache(
	async (): Promise<Externals.Github.ApiResponse> => {
		try {
			// Avoid rate limiting in development
			// set USE_MOCK_DATA_FOR_DEVELOPMENT false to use real data
			if (
				process.env.NODE_ENV === "development" &&
				USE_MOCK_DATA_FOR_DEVELOPMENT
			) {
				return DEFAULT_GITHUB_RESPONSE;
			}

			const query = `
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

			console.log("API HIT: github");
			const res = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query,
				}),
				next: { revalidate: CACHE_DURATION },
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
			// Avoid rate limiting in development
			// set USE_MOCK_DATA_FOR_DEVELOPMENT false to use real data
			if (
				process.env.NODE_ENV === "development" &&
				USE_MOCK_DATA_FOR_DEVELOPMENT
			) {
				return DEFAULT_X_RESPONSE;
			}

			const currentRateLimitForMe =
				await rateLimitPlugin.v2.getRateLimit("users/me");
			console.log("API RATES: X", currentRateLimitForMe);

			console.log("API HIT: X");
			const user = await client.v2.me({
				"user.fields": "public_metrics",
			});
			console.log("API RESPONSE: X", user);

			return user;
		} catch (error) {
			console.error("x api error", error);
			return DEFAULT_X_RESPONSE;
		}
	},
	["ned-im-x-data"],
	{
		revalidate: false,
	},
);
