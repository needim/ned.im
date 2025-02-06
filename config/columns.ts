export interface Column {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug: string;
  color?: string;
}

export const columns: Column[] = [
  {
    id: 'diary',
    title: '个人日记',
    description: '记录生活点滴，分享日常感悟',
    cover: '/images/diary.jpg',
    slug: 'diary',
    color: 'from-blue-500/20 to-blue-500/5'
  },
  {
    id: 'dreams',
    title: '梦的记录',
    description: '记录有趣的梦境，探索潜意识世界',
    cover: '/images/dream.jpg',
    slug: 'dreams',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  {
    id: 'reading',
    title: '读书笔记',
    description: '如果有天堂,那一定是图书馆的模样',
    cover: '/images/reading.jpg',
    slug: 'reading',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  {
    id: 'submissions',
    title: '网友投稿',
    description: '收录网友分享的故事和创作',
    cover: '/images/links.jpg',
    slug: 'submissions',
    color: 'from-red-500/20 to-red-500/5'
  }
]; 