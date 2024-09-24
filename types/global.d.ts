declare namespace Externals {
	namespace Github {
		type ContributionDay = {
			contributionCount: number;
			date: string;
		};

		type ApiResponse = {
			data: {
				viewer: {
					login: string;
					repositories: {
						totalCount: number;
						nodes: {
							nameWithOwner: string;
							name: string;
							description: string | null;
							forkCount: number;
							stargazerCount: number;
							createdAt: string;
							updatedAt: string;
						}[];
					};
					followers: {
						totalCount: number;
					};
					contributionsCollection: {
						contributionCalendar: {
							totalContributions: number;
							weeks: {
								contributionDays: ContributionDay[];
							}[];
						};
					};
				};
			};
		};
	}
}
