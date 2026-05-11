export interface KnowledgeNode {
  id: string;
  title: string;
  level: 'Junior' | 'Senior' | 'Expert';
  tags: string[];
  difficulty: number;
  category: string;
  prerequisites: string[];
  relatedPatterns: string[];
  readingTime: number;
}

export interface Chapter {
  id: string;
  title: string;
  icon: string;
  description: string;
  difficulty: number;
  color: 'orange' | 'teal' | 'rose' | 'indigo';
  articles: ArticleMeta[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  meta: KnowledgeNode;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface SearchResult {
  type: 'chapter' | 'article';
  title: string;
  description: string;
  path: string;
  chapterIcon?: string;
}
