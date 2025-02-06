interface Photo {
  src: string;
  variant: '1x1' | '4x3' | '4x5';
}

interface Music {
  platform: 'netease';
  id: string;
  url: string;
}

interface Metadata {
  time?: string;
  location?: string;
  music?: Music;
  video?: string;
  from?: string;
}

export interface TimelineItem {
  date: string;
  event: string;
  title: string;
  description: string;
  icon: string;
  photos?: Photo[];
  link?: string;
  dateFormatOptions?: Intl.DateTimeFormatOptions & { locale?: string };
  metadata?: Metadata;
} 