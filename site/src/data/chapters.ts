import type { Chapter } from './types';

export const chapters: Chapter[] = [
  {
    id: '01-python-basics',
    title: 'Python 基础语法',
    icon: '🐍',
    description: 'Python 编程语言的核心语法和基础知识',
    difficulty: 1,
    color: 'orange',
    articles: [
      { slug: 'python-basics', title: 'Python基础语法', meta: { id: 'python-basics', title: 'Python基础语法', level: 'Junior', tags: ['Python', '基础语法', '变量', '数据类型', '函数', '类'], difficulty: 1, category: '01-python-basics', prerequisites: [], relatedPatterns: ['python-oop', 'python-modules'], readingTime: 45 } },
    ],
  },
  {
    id: '02-collections',
    title: '集合框架深度解析',
    icon: '📦',
    description: 'ArrayList、HashMap、ConcurrentHashMap等源码级别的深度分析',
    difficulty: 3,
    color: 'teal',
    articles: [
      { slug: 'hashmap', title: 'HashMap深度剖析', meta: { id: 'hashmap', title: 'HashMap深度剖析', level: 'Senior', tags: ['HashMap', '红黑树', '扩容机制', '哈希冲突'], difficulty: 4, category: '02-collections', prerequisites: ['map-framework'], relatedPatterns: ['concurrent-hashmap'], readingTime: 35 } },
    ],
  },
];

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getTotalArticles(): number {
  return chapters.reduce((sum, ch) => sum + ch.articles.length, 0);
}

export function getArticlePath(chapterId: string, slug: string): string {
  return `/docs/${chapterId}/${slug}`;
}
