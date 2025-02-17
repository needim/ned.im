import { IconBrandGithub } from '@tabler/icons-react';
import { LinkButton } from './link-button';

interface GitHubButtonProps {
  url: string;
}

export function GitHubButton({ url }: GitHubButtonProps) {
  // 从 URL 中提取仓库名称
  const getRepoInfo = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return {
          owner: pathParts[0],
          repo: pathParts[1]
        };
      }
    } catch (e) {
      console.error('Invalid GitHub URL:', e);
    }
    return null;
  };

  const repoInfo = getRepoInfo(url);
  
  if (!repoInfo) return null;

  return (
    <div className="my-4">
      <LinkButton
        href={url}
        icon={<IconBrandGithub className="w-4 h-4" />}
        iconPosition="left"
        radius="md"
        external
        className="!bg-[#24292e] hover:!bg-[#1b1f23] dark:!bg-[#333639] dark:hover:!bg-[#24292e]"
      >
        {repoInfo.owner}/{repoInfo.repo}
      </LinkButton>
    </div>
  );
} 