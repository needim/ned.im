import Link from 'next/link';
import { IconArrowLeft, IconFileText } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface PreviousPostProps {
  href: string;
  title?: string;
  children: React.ReactNode;
}

export function PreviousPost({ href, title, children }: PreviousPostProps) {
  const currentPath = usePathname();
  const linkWithRef = `${href}?from=${encodeURIComponent(currentPath)}`;

  return (
    <Link 
      href={linkWithRef}
      className={cn(
        "group relative block no-underline",
        "my-8 p-7",
        "bg-gradient-to-b from-white/80 via-white/50 to-white/80",
        "dark:from-zinc-900/80 dark:via-zinc-900/50 dark:to-zinc-900/80",
        "rounded-2xl",
        "transition-all duration-300",
        "backdrop-blur-md",
        "border-2 border-white/40",
        "dark:border-white/[0.08]",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]",
        "dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]",
        "hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)]",
        "dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)]",
        "hover:border-white/60",
        "dark:hover:border-white/[0.12]",
        "hover:translate-y-[-2px]"
      )}
    >
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <div className={cn(
            "p-3 rounded-xl",
            "bg-gradient-to-br from-white/40 to-white/20",
            "dark:from-white/10 dark:to-transparent",
            "backdrop-blur-md",
            "transition-all duration-300",
            "border border-white/30",
            "dark:border-white/[0.08]",
            "group-hover:border-white/40",
            "dark:group-hover:border-white/[0.12]",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
            "dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          )}>
            <IconFileText className="w-5 h-5 text-zinc-600/80 dark:text-zinc-300/80" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn(
              "text-lg font-medium",
              "text-zinc-800 dark:text-zinc-100",
              "mb-2.5",
              "line-clamp-2"
            )}>
              {title}
            </h4>
          )}
          <div className={cn(
            "text-[15px]",
            "text-zinc-600 dark:text-zinc-400",
            "group-hover:text-zinc-900 dark:group-hover:text-zinc-300",
            "transition-colors duration-300",
            "line-clamp-2",
            "leading-relaxed"
          )}>
            {children}
          </div>
        </div>
        <div className={cn(
          "shrink-0 self-center",
          "text-zinc-400 dark:text-zinc-500",
          "group-hover:text-zinc-600 dark:group-hover:text-zinc-300",
          "transition-all duration-300",
          "group-hover:translate-x-1",
          "opacity-50 group-hover:opacity-100"
        )}>
          <IconArrowLeft className="w-5 h-5 rotate-180" />
        </div>
      </div>
    </Link>
  );
} 