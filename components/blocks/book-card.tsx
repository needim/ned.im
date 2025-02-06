import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface BookCardProps {
  title: string;
  description?: string;
  slug: string;
  cover: string;
  color?: string;
  className?: string;
}

export function BookCard({ title, description, slug, cover, color, className }: BookCardProps) {
  return (
    <Link href={`/notes/${slug}`}>
      <div
        className={cn(
          'group relative w-[160px] h-[220px]',
          className
        )}
      >
        <div className="relative w-full h-full transition-all duration-300 ease-out group-hover:-translate-y-2">
          {/* Book Shadow */}
          <div className="absolute -bottom-2 left-1 right-1 h-4 bg-black/30 blur-md rounded-full transition-all duration-300 ease-out group-hover:translate-y-2 group-hover:blur-lg group-hover:opacity-70" />
          
          {/* Book Cover */}
          <div className="relative w-full h-full bg-card rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-out group-hover:shadow-xl">
            {/* Book Spine Effect */}
            <div className="absolute left-0 top-0 w-4 h-full bg-black/10 rounded-l-lg transform -skew-y-12">
              {/* Spine Details */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-black/10" />
            </div>
            
            {/* Book Cover Design */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* Cover Image */}
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-80",
                color || "from-primary/80 via-primary/40 to-primary/20"
              )} />

              {/* Book Edge Effects */}
              <div className="absolute top-0 right-0 w-px h-full bg-white/20" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
            </div>
            
            {/* Book Content */}
            <div className="relative z-10 flex flex-col h-full p-4">
              <div className="flex-1 flex flex-col items-center justify-end text-center">
                <div className="bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <h3 className="text-base font-bold leading-tight text-white">{title}</h3>
                  {description && (
                    <p className="mt-1 text-xs text-white/80 line-clamp-2">{description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 