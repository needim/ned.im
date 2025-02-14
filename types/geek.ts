export interface GeekPost {
  slug: string;
  fileName: string;
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
  attachmentUrl?: string;
}

export interface GeekMeta {
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
  attachmentUrl?: string;
} 