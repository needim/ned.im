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
          'group relative w-[140px] h-[200px]',
          className
        )}
      >
        <div className="relative w-full h-full transition-all duration-300 ease-out group-hover:-translate-y-2">
          {/* Book Shadow */}
          <div className="absolute -bottom-2 left-1 right-1 h-3 bg-black/20 blur-md rounded-full transition-all duration-300 ease-out group-hover:translate-y-2 group-hover:blur-lg group-hover:opacity-70" />
          
          {/* Book Cover */}
          <div className="relative w-full h-full bg-card rounded-md shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-out group-hover:shadow-xl">
            {/* Book Spine Effect */}
            <div className="absolute left-0 top-0 w-4 h-full bg-muted/50 rounded-l-md transform -skew-y-12">
              {/* Spine Details */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
            </div>
            
            {/* Book Cover Design */}
            <div className="absolute inset-0 rounded-md overflow-hidden">
              {/* Gradient Overlay */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-90",
                color || "from-primary/10 to-primary/5"
              )} />
              
              {/* Cover Image */}
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover opacity-40"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Book Edge Effect */}
              <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-l from-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            
            {/* Book Content */}
            <div className="relative z-10 flex flex-col h-full p-4">
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h3 className="text-base font-bold leading-tight">{title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 