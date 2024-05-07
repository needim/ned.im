"use server";

import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";

const CACHE_DURATION = 3600; // 1 hour
const USE_MOCK_DATA_FOR_DEVELOPMENT = true;
const DEFAULT_X_RESPONSE = {
  data: { public_metrics: { followers_count: 1402 } },
};
const DEFAULT_GITHUB_RESPONSE = {
  data: {
    viewer: {
      login: "nedim",
      repositories: {
        totalCount: 32,
        nodes: [
          {
            nameWithOwner: "needim/noty",
            name: "noty",
            forkCount: 1046,
            stargazerCount: 6688,
          },
          {
            nameWithOwner: "needim/wdt-emoji-bundle",
            name: "wdt-emoji-bundle",
            forkCount: 90,
            stargazerCount: 419,
          },
          {
            nameWithOwner: "needim/wdtLoading",
            name: "wdtLoading",
            forkCount: 19,
            stargazerCount: 91,
          },
          {
            nameWithOwner: "needim/termic",
            name: "termic",
            forkCount: 5,
            stargazerCount: 82,
          },
          {
            nameWithOwner: "needim/radix-ui-themes-with-tailwind",
            name: "radix-ui-themes-with-tailwind",
            forkCount: 0,
            stargazerCount: 40,
          },
        ],
      },
      followers: {
        totalCount: 683,
      },
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 2274,
          weeks: [
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-05-07",
                },
                {
                  contributionCount: 20,
                  date: "2023-05-08",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-09",
                },
                {
                  contributionCount: 8,
                  date: "2023-05-10",
                },
                {
                  contributionCount: 144,
                  date: "2023-05-11",
                },
                {
                  contributionCount: 9,
                  date: "2023-05-12",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-13",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-05-14",
                },
                {
                  contributionCount: 32,
                  date: "2023-05-15",
                },
                {
                  contributionCount: 12,
                  date: "2023-05-16",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-17",
                },
                {
                  contributionCount: 60,
                  date: "2023-05-18",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-19",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-20",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-05-21",
                },
                {
                  contributionCount: 58,
                  date: "2023-05-22",
                },
                {
                  contributionCount: 12,
                  date: "2023-05-23",
                },
                {
                  contributionCount: 19,
                  date: "2023-05-24",
                },
                {
                  contributionCount: 26,
                  date: "2023-05-25",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-26",
                },
                {
                  contributionCount: 1,
                  date: "2023-05-27",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-05-28",
                },
                {
                  contributionCount: 0,
                  date: "2023-05-29",
                },
                {
                  contributionCount: 20,
                  date: "2023-05-30",
                },
                {
                  contributionCount: 46,
                  date: "2023-05-31",
                },
                {
                  contributionCount: 28,
                  date: "2023-06-01",
                },
                {
                  contributionCount: 16,
                  date: "2023-06-02",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-03",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-06-04",
                },
                {
                  contributionCount: 17,
                  date: "2023-06-05",
                },
                {
                  contributionCount: 22,
                  date: "2023-06-06",
                },
                {
                  contributionCount: 10,
                  date: "2023-06-07",
                },
                {
                  contributionCount: 68,
                  date: "2023-06-08",
                },
                {
                  contributionCount: 40,
                  date: "2023-06-09",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-10",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-06-11",
                },
                {
                  contributionCount: 16,
                  date: "2023-06-12",
                },
                {
                  contributionCount: 26,
                  date: "2023-06-13",
                },
                {
                  contributionCount: 36,
                  date: "2023-06-14",
                },
                {
                  contributionCount: 13,
                  date: "2023-06-15",
                },
                {
                  contributionCount: 4,
                  date: "2023-06-16",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-17",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-06-18",
                },
                {
                  contributionCount: 16,
                  date: "2023-06-19",
                },
                {
                  contributionCount: 18,
                  date: "2023-06-20",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-21",
                },
                {
                  contributionCount: 4,
                  date: "2023-06-22",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-23",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-24",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-06-25",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-26",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-27",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-28",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-29",
                },
                {
                  contributionCount: 0,
                  date: "2023-06-30",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-01",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-07-02",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-03",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-04",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-05",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-06",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-07",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-08",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-07-09",
                },
                {
                  contributionCount: 2,
                  date: "2023-07-10",
                },
                {
                  contributionCount: 6,
                  date: "2023-07-11",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-12",
                },
                {
                  contributionCount: 14,
                  date: "2023-07-13",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-14",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-15",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-07-16",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-17",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-18",
                },
                {
                  contributionCount: 2,
                  date: "2023-07-19",
                },
                {
                  contributionCount: 3,
                  date: "2023-07-20",
                },
                {
                  contributionCount: 4,
                  date: "2023-07-21",
                },
                {
                  contributionCount: 1,
                  date: "2023-07-22",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 3,
                  date: "2023-07-23",
                },
                {
                  contributionCount: 8,
                  date: "2023-07-24",
                },
                {
                  contributionCount: 4,
                  date: "2023-07-25",
                },
                {
                  contributionCount: 4,
                  date: "2023-07-26",
                },
                {
                  contributionCount: 18,
                  date: "2023-07-27",
                },
                {
                  contributionCount: 4,
                  date: "2023-07-28",
                },
                {
                  contributionCount: 0,
                  date: "2023-07-29",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-07-30",
                },
                {
                  contributionCount: 12,
                  date: "2023-07-31",
                },
                {
                  contributionCount: 14,
                  date: "2023-08-01",
                },
                {
                  contributionCount: 10,
                  date: "2023-08-02",
                },
                {
                  contributionCount: 22,
                  date: "2023-08-03",
                },
                {
                  contributionCount: 7,
                  date: "2023-08-04",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-05",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-08-06",
                },
                {
                  contributionCount: 7,
                  date: "2023-08-07",
                },
                {
                  contributionCount: 10,
                  date: "2023-08-08",
                },
                {
                  contributionCount: 10,
                  date: "2023-08-09",
                },
                {
                  contributionCount: 1,
                  date: "2023-08-10",
                },
                {
                  contributionCount: 11,
                  date: "2023-08-11",
                },
                {
                  contributionCount: 3,
                  date: "2023-08-12",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 8,
                  date: "2023-08-13",
                },
                {
                  contributionCount: 2,
                  date: "2023-08-14",
                },
                {
                  contributionCount: 10,
                  date: "2023-08-15",
                },
                {
                  contributionCount: 5,
                  date: "2023-08-16",
                },
                {
                  contributionCount: 5,
                  date: "2023-08-17",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-18",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-19",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-08-20",
                },
                {
                  contributionCount: 31,
                  date: "2023-08-21",
                },
                {
                  contributionCount: 3,
                  date: "2023-08-22",
                },
                {
                  contributionCount: 42,
                  date: "2023-08-23",
                },
                {
                  contributionCount: 9,
                  date: "2023-08-24",
                },
                {
                  contributionCount: 3,
                  date: "2023-08-25",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-26",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-08-27",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-28",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-29",
                },
                {
                  contributionCount: 0,
                  date: "2023-08-30",
                },
                {
                  contributionCount: 13,
                  date: "2023-08-31",
                },
                {
                  contributionCount: 0,
                  date: "2023-09-01",
                },
                {
                  contributionCount: 0,
                  date: "2023-09-02",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 7,
                  date: "2023-09-03",
                },
                {
                  contributionCount: 5,
                  date: "2023-09-04",
                },
                {
                  contributionCount: 14,
                  date: "2023-09-05",
                },
                {
                  contributionCount: 28,
                  date: "2023-09-06",
                },
                {
                  contributionCount: 1,
                  date: "2023-09-07",
                },
                {
                  contributionCount: 8,
                  date: "2023-09-08",
                },
                {
                  contributionCount: 0,
                  date: "2023-09-09",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-09-10",
                },
                {
                  contributionCount: 9,
                  date: "2023-09-11",
                },
                {
                  contributionCount: 8,
                  date: "2023-09-12",
                },
                {
                  contributionCount: 12,
                  date: "2023-09-13",
                },
                {
                  contributionCount: 12,
                  date: "2023-09-14",
                },
                {
                  contributionCount: 24,
                  date: "2023-09-15",
                },
                {
                  contributionCount: 5,
                  date: "2023-09-16",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-09-17",
                },
                {
                  contributionCount: 5,
                  date: "2023-09-18",
                },
                {
                  contributionCount: 12,
                  date: "2023-09-19",
                },
                {
                  contributionCount: 14,
                  date: "2023-09-20",
                },
                {
                  contributionCount: 18,
                  date: "2023-09-21",
                },
                {
                  contributionCount: 8,
                  date: "2023-09-22",
                },
                {
                  contributionCount: 0,
                  date: "2023-09-23",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 8,
                  date: "2023-09-24",
                },
                {
                  contributionCount: 4,
                  date: "2023-09-25",
                },
                {
                  contributionCount: 18,
                  date: "2023-09-26",
                },
                {
                  contributionCount: 16,
                  date: "2023-09-27",
                },
                {
                  contributionCount: 56,
                  date: "2023-09-28",
                },
                {
                  contributionCount: 14,
                  date: "2023-09-29",
                },
                {
                  contributionCount: 0,
                  date: "2023-09-30",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 2,
                  date: "2023-10-01",
                },
                {
                  contributionCount: 16,
                  date: "2023-10-02",
                },
                {
                  contributionCount: 52,
                  date: "2023-10-03",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-04",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-05",
                },
                {
                  contributionCount: 4,
                  date: "2023-10-06",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-07",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-10-08",
                },
                {
                  contributionCount: 12,
                  date: "2023-10-09",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-10",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-11",
                },
                {
                  contributionCount: 12,
                  date: "2023-10-12",
                },
                {
                  contributionCount: 12,
                  date: "2023-10-13",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-14",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-10-15",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-16",
                },
                {
                  contributionCount: 2,
                  date: "2023-10-17",
                },
                {
                  contributionCount: 1,
                  date: "2023-10-18",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-19",
                },
                {
                  contributionCount: 5,
                  date: "2023-10-20",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-21",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-10-22",
                },
                {
                  contributionCount: 14,
                  date: "2023-10-23",
                },
                {
                  contributionCount: 2,
                  date: "2023-10-24",
                },
                {
                  contributionCount: 19,
                  date: "2023-10-25",
                },
                {
                  contributionCount: 11,
                  date: "2023-10-26",
                },
                {
                  contributionCount: 6,
                  date: "2023-10-27",
                },
                {
                  contributionCount: 0,
                  date: "2023-10-28",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-10-29",
                },
                {
                  contributionCount: 7,
                  date: "2023-10-30",
                },
                {
                  contributionCount: 19,
                  date: "2023-10-31",
                },
                {
                  contributionCount: 8,
                  date: "2023-11-01",
                },
                {
                  contributionCount: 16,
                  date: "2023-11-02",
                },
                {
                  contributionCount: 10,
                  date: "2023-11-03",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-04",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-11-05",
                },
                {
                  contributionCount: 2,
                  date: "2023-11-06",
                },
                {
                  contributionCount: 12,
                  date: "2023-11-07",
                },
                {
                  contributionCount: 6,
                  date: "2023-11-08",
                },
                {
                  contributionCount: 4,
                  date: "2023-11-09",
                },
                {
                  contributionCount: 2,
                  date: "2023-11-10",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-11",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-11-12",
                },
                {
                  contributionCount: 5,
                  date: "2023-11-13",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-14",
                },
                {
                  contributionCount: 16,
                  date: "2023-11-15",
                },
                {
                  contributionCount: 6,
                  date: "2023-11-16",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-17",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-18",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-11-19",
                },
                {
                  contributionCount: 6,
                  date: "2023-11-20",
                },
                {
                  contributionCount: 3,
                  date: "2023-11-21",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-22",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-23",
                },
                {
                  contributionCount: 9,
                  date: "2023-11-24",
                },
                {
                  contributionCount: 1,
                  date: "2023-11-25",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-11-26",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-27",
                },
                {
                  contributionCount: 8,
                  date: "2023-11-28",
                },
                {
                  contributionCount: 0,
                  date: "2023-11-29",
                },
                {
                  contributionCount: 3,
                  date: "2023-11-30",
                },
                {
                  contributionCount: 1,
                  date: "2023-12-01",
                },
                {
                  contributionCount: 0,
                  date: "2023-12-02",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-12-03",
                },
                {
                  contributionCount: 0,
                  date: "2023-12-04",
                },
                {
                  contributionCount: 8,
                  date: "2023-12-05",
                },
                {
                  contributionCount: 8,
                  date: "2023-12-06",
                },
                {
                  contributionCount: 2,
                  date: "2023-12-07",
                },
                {
                  contributionCount: 1,
                  date: "2023-12-08",
                },
                {
                  contributionCount: 0,
                  date: "2023-12-09",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-12-10",
                },
                {
                  contributionCount: 8,
                  date: "2023-12-11",
                },
                {
                  contributionCount: 3,
                  date: "2023-12-12",
                },
                {
                  contributionCount: 16,
                  date: "2023-12-13",
                },
                {
                  contributionCount: 6,
                  date: "2023-12-14",
                },
                {
                  contributionCount: 0,
                  date: "2023-12-15",
                },
                {
                  contributionCount: 0,
                  date: "2023-12-16",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 6,
                  date: "2023-12-17",
                },
                {
                  contributionCount: 21,
                  date: "2023-12-18",
                },
                {
                  contributionCount: 12,
                  date: "2023-12-19",
                },
                {
                  contributionCount: 9,
                  date: "2023-12-20",
                },
                {
                  contributionCount: 34,
                  date: "2023-12-21",
                },
                {
                  contributionCount: 17,
                  date: "2023-12-22",
                },
                {
                  contributionCount: 16,
                  date: "2023-12-23",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 9,
                  date: "2023-12-24",
                },
                {
                  contributionCount: 26,
                  date: "2023-12-25",
                },
                {
                  contributionCount: 1,
                  date: "2023-12-26",
                },
                {
                  contributionCount: 9,
                  date: "2023-12-27",
                },
                {
                  contributionCount: 8,
                  date: "2023-12-28",
                },
                {
                  contributionCount: 10,
                  date: "2023-12-29",
                },
                {
                  contributionCount: 0,
                  date: "2023-12-30",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2023-12-31",
                },
                {
                  contributionCount: 0,
                  date: "2024-01-01",
                },
                {
                  contributionCount: 2,
                  date: "2024-01-02",
                },
                {
                  contributionCount: 8,
                  date: "2024-01-03",
                },
                {
                  contributionCount: 8,
                  date: "2024-01-04",
                },
                {
                  contributionCount: 15,
                  date: "2024-01-05",
                },
                {
                  contributionCount: 0,
                  date: "2024-01-06",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-01-07",
                },
                {
                  contributionCount: 8,
                  date: "2024-01-08",
                },
                {
                  contributionCount: 0,
                  date: "2024-01-09",
                },
                {
                  contributionCount: 7,
                  date: "2024-01-10",
                },
                {
                  contributionCount: 6,
                  date: "2024-01-11",
                },
                {
                  contributionCount: 9,
                  date: "2024-01-12",
                },
                {
                  contributionCount: 6,
                  date: "2024-01-13",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-01-14",
                },
                {
                  contributionCount: 1,
                  date: "2024-01-15",
                },
                {
                  contributionCount: 0,
                  date: "2024-01-16",
                },
                {
                  contributionCount: 0,
                  date: "2024-01-17",
                },
                {
                  contributionCount: 5,
                  date: "2024-01-18",
                },
                {
                  contributionCount: 4,
                  date: "2024-01-19",
                },
                {
                  contributionCount: 2,
                  date: "2024-01-20",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-01-21",
                },
                {
                  contributionCount: 6,
                  date: "2024-01-22",
                },
                {
                  contributionCount: 12,
                  date: "2024-01-23",
                },
                {
                  contributionCount: 3,
                  date: "2024-01-24",
                },
                {
                  contributionCount: 3,
                  date: "2024-01-25",
                },
                {
                  contributionCount: 11,
                  date: "2024-01-26",
                },
                {
                  contributionCount: 0,
                  date: "2024-01-27",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-01-28",
                },
                {
                  contributionCount: 6,
                  date: "2024-01-29",
                },
                {
                  contributionCount: 3,
                  date: "2024-01-30",
                },
                {
                  contributionCount: 1,
                  date: "2024-01-31",
                },
                {
                  contributionCount: 1,
                  date: "2024-02-01",
                },
                {
                  contributionCount: 2,
                  date: "2024-02-02",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-03",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-02-04",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-05",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-06",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-07",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-08",
                },
                {
                  contributionCount: 1,
                  date: "2024-02-09",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-10",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-02-11",
                },
                {
                  contributionCount: 4,
                  date: "2024-02-12",
                },
                {
                  contributionCount: 1,
                  date: "2024-02-13",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-14",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-15",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-16",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-17",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-02-18",
                },
                {
                  contributionCount: 2,
                  date: "2024-02-19",
                },
                {
                  contributionCount: 3,
                  date: "2024-02-20",
                },
                {
                  contributionCount: 1,
                  date: "2024-02-21",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-22",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-23",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-24",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-02-25",
                },
                {
                  contributionCount: 1,
                  date: "2024-02-26",
                },
                {
                  contributionCount: 1,
                  date: "2024-02-27",
                },
                {
                  contributionCount: 0,
                  date: "2024-02-28",
                },
                {
                  contributionCount: 2,
                  date: "2024-02-29",
                },
                {
                  contributionCount: 1,
                  date: "2024-03-01",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-02",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-03-03",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-04",
                },
                {
                  contributionCount: 2,
                  date: "2024-03-05",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-06",
                },
                {
                  contributionCount: 1,
                  date: "2024-03-07",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-08",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-09",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-03-10",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-11",
                },
                {
                  contributionCount: 4,
                  date: "2024-03-12",
                },
                {
                  contributionCount: 1,
                  date: "2024-03-13",
                },
                {
                  contributionCount: 4,
                  date: "2024-03-14",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-15",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-16",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-03-17",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-18",
                },
                {
                  contributionCount: 1,
                  date: "2024-03-19",
                },
                {
                  contributionCount: 1,
                  date: "2024-03-20",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-21",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-22",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-23",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-03-24",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-25",
                },
                {
                  contributionCount: 2,
                  date: "2024-03-26",
                },
                {
                  contributionCount: 2,
                  date: "2024-03-27",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-28",
                },
                {
                  contributionCount: 0,
                  date: "2024-03-29",
                },
                {
                  contributionCount: 4,
                  date: "2024-03-30",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 7,
                  date: "2024-03-31",
                },
                {
                  contributionCount: 7,
                  date: "2024-04-01",
                },
                {
                  contributionCount: 3,
                  date: "2024-04-02",
                },
                {
                  contributionCount: 8,
                  date: "2024-04-03",
                },
                {
                  contributionCount: 10,
                  date: "2024-04-04",
                },
                {
                  contributionCount: 3,
                  date: "2024-04-05",
                },
                {
                  contributionCount: 1,
                  date: "2024-04-06",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 1,
                  date: "2024-04-07",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-08",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-09",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-10",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-11",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-12",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-13",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-04-14",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-15",
                },
                {
                  contributionCount: 2,
                  date: "2024-04-16",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-17",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-18",
                },
                {
                  contributionCount: 5,
                  date: "2024-04-19",
                },
                {
                  contributionCount: 1,
                  date: "2024-04-20",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-04-21",
                },
                {
                  contributionCount: 2,
                  date: "2024-04-22",
                },
                {
                  contributionCount: 0,
                  date: "2024-04-23",
                },
                {
                  contributionCount: 8,
                  date: "2024-04-24",
                },
                {
                  contributionCount: 2,
                  date: "2024-04-25",
                },
                {
                  contributionCount: 1,
                  date: "2024-04-26",
                },
                {
                  contributionCount: 11,
                  date: "2024-04-27",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 33,
                  date: "2024-04-28",
                },
                {
                  contributionCount: 19,
                  date: "2024-04-29",
                },
                {
                  contributionCount: 4,
                  date: "2024-04-30",
                },
                {
                  contributionCount: 1,
                  date: "2024-05-01",
                },
                {
                  contributionCount: 3,
                  date: "2024-05-02",
                },
                {
                  contributionCount: 0,
                  date: "2024-05-03",
                },
                {
                  contributionCount: 0,
                  date: "2024-05-04",
                },
              ],
            },
            {
              contributionDays: [
                {
                  contributionCount: 0,
                  date: "2024-05-05",
                },
                {
                  contributionCount: 8,
                  date: "2024-05-06",
                },
                {
                  contributionCount: 4,
                  date: "2024-05-07",
                },
              ],
            },
          ],
        },
      },
    },
  },
};

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
  }
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

      const client = new TwitterApi({
        appKey: process.env.X_API_KEY!,
        appSecret: process.env.X_API_SECRET!,
        accessToken: process.env.X_MY_ACCESS_TOKEN!,
        accessSecret: process.env.X_MY_ACCESS_TOKEN_SECRET!,
      });

      const user = await client.v2.me({
        "user.fields": "public_metrics",
      });

      return user;
    } catch (error) {
      console.error("x api error", error);
      return DEFAULT_X_RESPONSE;
    }
  },
  ["ned-im-x-data"],
  {
    revalidate: CACHE_DURATION,
  }
);
