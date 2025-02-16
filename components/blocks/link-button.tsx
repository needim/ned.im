import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';

type RadiusType = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | number;

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  radius?: RadiusType;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconUrl?: string;
  iconClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function LinkButton({ 
  href, 
  children, 
  className,
  external = false,
  radius = 'xl',
  icon,
  iconPosition = 'right',
  iconUrl,
  iconClassName,
  onClick
}: LinkButtonProps) {
  // 处理圆角样式
  const getRadiusClass = (r: RadiusType) => {
    if (typeof r === 'number') {
      return `!rounded-[${r}px]`;
    }
    const radiusMap: Record<Exclude<RadiusType, number>, string> = {
      'sm': '!rounded-sm',
      'md': '!rounded-md',
      'lg': '!rounded-lg',
      'xl': '!rounded-xl',
      '2xl': '!rounded-2xl',
      '3xl': '!rounded-3xl',
      'full': '!rounded-full'
    };
    return radiusMap[r as Exclude<RadiusType, number>] || '!rounded-xl';
  };

  // 构建图标元素
  const getIcon = () => {
    if (icon) return icon;
    if (iconUrl) {
      return (
        <Image 
          src={iconUrl} 
          alt="button icon" 
          width={14} 
          height={14} 
          className={cn("object-contain", iconClassName)}
        />
      );
    }
    return <IconArrowUpRight size={14} className={cn("text-emerald-400 dark:text-emerald-500", iconClassName)} stroke={2.5} />;
  };

  const buttonClasses = cn(
    "link-button",
    "inline-flex items-center gap-1.5",
    "h-7 px-3",
    "bg-zinc-900 dark:bg-zinc-800 text-white",
    "text-[13px] font-medium",
    getRadiusClass(radius),
    "no-underline",
    "transition-colors duration-150",
    "hover:bg-zinc-800 dark:hover:bg-zinc-700",
    className
  );

  const content = (
    <>
      {iconPosition === 'left' && getIcon()}
      <span>{children}</span>
      {iconPosition === 'right' && getIcon()}
    </>
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  if (external) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClasses} onClick={handleClick}>
      {content}
    </Link>
  );
} 