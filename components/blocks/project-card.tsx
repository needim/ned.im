import Link from 'next/link';
import { GitHubIcon } from './social-icons';

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function ProjectCard({ title, description, href, icon: Icon = GitHubIcon }: ProjectCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="group relative flex items-center space-x-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-700/50 dark:bg-zinc-800 shadow-md dark:shadow-zinc-700/50">
        <Icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 truncate">
          {description}
        </p>
      </div>
    </Link>
  );
}
