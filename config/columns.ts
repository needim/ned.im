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
    cover: '/images/columns/diary.jpg',
    slug: 'diary',
    color: 'from-blue-500/20 to-blue-500/5'
  },
  {
    id: 'dreams',
    title: '梦的记录',
    description: '记录有趣的梦境，探索潜意识世界',
    cover: '/images/columns/dreams.jpg',
    slug: 'dreams',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  {
    id: 'tech',
    title: '技术笔记',
    description: '分享技术学习和实践经验',
    cover: '/images/columns/tech.jpg',
    slug: 'tech',
    color: 'from-green-500/20 to-green-500/5'
  },
  {
    id: 'reading',
    title: '读书笔记',
    description: '书籍阅读笔记和思考',
    cover: '/images/columns/reading.jpg',
    slug: 'reading',
    color: 'from-yellow-500/20 to-yellow-500/5'
  },
  {
    id: 'submissions',
    title: '网友投稿',
    description: '收录网友分享的故事和创作',
    cover: '/images/columns/submissions.jpg',
    slug: 'submissions',
    color: 'from-red-500/20 to-red-500/5'
  }
]; 