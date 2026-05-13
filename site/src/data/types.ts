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

// ===== 新增：领域分类体系 =====

export interface Domain {
  id: string;
  title: string;
  icon: string;
  color: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  title: string;
  icon: string;
  domainId: string;
  description: string;
  chapters: Chapter[];
}

// ===== 新增：学习目标路线 =====

export interface LearningGoal {
  id: string;
  title: string;
  icon: string;
  description: string;
  stages: LearningStage[];
}

export interface LearningStage {
  title: string;
  estimatedHours: number;
  nodes: LearningNode[];
}

export interface LearningNode {
  chapterId: string;
  title: string;
  icon: string;
  readingTime: number;
  difficulty: number;
}
