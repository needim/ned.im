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
              name: string;
              nameWithOwner: string;
              forkCount: number;
              stargazerCount: number;
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
