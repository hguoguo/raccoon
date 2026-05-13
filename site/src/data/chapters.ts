import React from 'react'
import type { Chapter, KnowledgeNode } from './types';

// 通过 Vite import.meta.glob 自动发现所有文章组件，无需手动维护映射
const articleModules = import.meta.glob<{ default: React.ComponentType<{ meta: KnowledgeNode }> }>(
  '../pages/articles/*.tsx'
);

export function getArticleComponent(slug: string) {
  const importFn = articleModules[`../pages/articles/${slug}.tsx`];
  return importFn ? React.lazy(importFn) : undefined;
}

export const chapters: Chapter[] = [
  {
    id: '01-java-core',
    title: 'Java 核心基础',
    icon: '☕',
    description: '从语法基础到面向对象思想，打牢 Java 编程根基',
    difficulty: 2,
    color: 'orange',
    articles: [
      { slug: 'java-basics', title: 'Java基础（必须打牢）', meta: { id: 'java-basics', title: 'Java基础（必须打牢）', level: 'Expert', tags: ['Java', '基础语法', '面向对象', '封装', '继承', '多态', '接口', '抽象类', 'String', 'BigDecimal'], difficulty: 3, category: '01-java-core', prerequisites: [], relatedPatterns: ['java-collections', 'java-concurrency'], readingTime: 60 } },
    ],
  },
  {
    id: '01-python-basics',
    title: 'Python 基础',
    icon: '🐍',
    description: '从基础语法到工程化实践，完整覆盖 AI/LLM 应用开发所需的 Python 技术栈',
    difficulty: 2,
    color: 'orange',
    articles: [
      { slug: 'python-basics', title: 'Python基础语法', meta: { id: 'python-basics', title: 'Python基础语法', level: 'Junior', tags: ['Python', '基础语法', '变量', '数据类型', '函数', '类'], difficulty: 1, category: '01-python-basics', prerequisites: [], relatedPatterns: ['python-oop', 'python-modules'], readingTime: 45 } },
      { slug: 'pydantic', title: 'Pydantic 数据验证', meta: { id: 'pydantic', title: 'Pydantic 数据验证', level: 'Senior', tags: ['Pydantic', 'BaseModel', '数据验证', 'JSON Schema', '序列化'], difficulty: 3, category: '01-python-basics', prerequisites: ['python-basics', 'python-typing'], relatedPatterns: ['fastapi', 'data-validation'], readingTime: 40 } },
      { slug: 'python-async', title: 'Python 异步编程', meta: { id: 'python-async', title: 'Python 异步编程', level: 'Senior', tags: ['async', 'await', 'asyncio', '协程', '并发', 'aiohttp', 'httpx'], difficulty: 4, category: '01-python-basics', prerequisites: ['python-basics', 'python-functions'], relatedPatterns: ['fastapi', 'concurrent-programming'], readingTime: 50 } },
      { slug: 'fastapi', title: 'FastAPI 框架深度解析', meta: { id: 'fastapi', title: 'FastAPI 框架深度解析', level: 'Senior', tags: ['FastAPI', '路由', '请求参数', '响应', '文件上传', '中间件', 'OpenAPI', 'Streaming', 'SSE', 'WebSocket'], difficulty: 4, category: '01-python-basics', prerequisites: ['python-async', 'pydantic'], relatedPatterns: ['uvicorn', 'starlette', 'sqlmodel'], readingTime: 55 } },
      { slug: 'python-engineering', title: 'Python 工程化实践', meta: { id: 'python-engineering', title: 'Python 工程化实践', level: 'Senior', tags: ['pip', 'uv', '虚拟环境', '日志', 'dotenv', 'yaml', 'pytest', '工程化'], difficulty: 3, category: '01-python-basics', prerequisites: ['python-basics', 'python-modules'], relatedPatterns: ['fastapi', 'project-structure', 'ci-cd'], readingTime: 50 } },
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
      { slug: 'collection-framework', title: 'Collection体系架构', meta: { id: 'collection-framework', title: 'Collection体系架构', level: 'Expert', tags: ['Collection', 'List', 'Set', 'Queue', 'Map', '集合框架', '接口层次'], difficulty: 3, category: '02-collections', prerequisites: [], relatedPatterns: ['list-deep-dive', 'set-deep-dive', 'map-framework'], readingTime: 45 } },
      { slug: 'list-deep-dive', title: 'List深度解析（ArrayList/LinkedList）', meta: { id: 'list-deep-dive', title: 'List深度解析（ArrayList/LinkedList）', level: 'Expert', tags: ['List', 'ArrayList', 'LinkedList', '动态数组', '双向链表', '扩容机制'], difficulty: 4, category: '02-collections', prerequisites: ['collection-framework'], relatedPatterns: ['set-deep-dive', 'map-framework'], readingTime: 50 } },
      { slug: 'set-deep-dive', title: 'Set深度解析（HashSet/TreeSet）', meta: { id: 'set-deep-dive', title: 'Set深度解析（HashSet/TreeSet）', level: 'Expert', tags: ['Set', 'HashSet', 'TreeSet', '去重', '红黑树', 'hashCode'], difficulty: 4, category: '02-collections', prerequisites: ['collection-framework'], relatedPatterns: ['map-framework', 'hashmap-deep-dive'], readingTime: 45 } },
      { slug: 'map-framework', title: 'Map框架（HashMap/TreeMap）', meta: { id: 'map-framework', title: 'Map框架（HashMap/TreeMap）', level: 'Expert', tags: ['Map', 'HashMap', 'TreeMap', '键值对', '红黑树', '哈希表'], difficulty: 4, category: '02-collections', prerequisites: ['collection-framework'], relatedPatterns: ['hashmap-deep-dive', 'set-deep-dive'], readingTime: 50 } },
      { slug: 'hashmap-deep-dive', title: 'HashMap深度剖析（重点🔥）', meta: { id: 'hashmap-deep-dive', title: 'HashMap深度剖析（重点🔥）', level: 'Expert', tags: ['HashMap', '扰动函数', '高低位分流', '扩容', '线程安全', '死循环', '红黑树', 'JDK7 vs JDK8'], difficulty: 5, category: '02-collections', prerequisites: ['map-framework'], relatedPatterns: ['concurrent-hashmap'], readingTime: 60 } },
    ],
  },

  {
    id: '06-ai-fundamentals',
    title: 'AI 基础与大模型',
    icon: '🤖',
    description: 'LLM 基础概念、Prompt 工程、结构化输出等 AI 核心技术',
    difficulty: 2,
    color: 'indigo',
    articles: [
      { slug: 'llm-basics', title: '大模型基础概念', meta: { id: 'llm-basics', title: '大模型基础概念', level: 'Junior', tags: ['LLM', 'Token', 'Context Window', 'Temperature', 'Top P', 'Embedding'], difficulty: 2, category: '06-ai-fundamentals', prerequisites: [], relatedPatterns: ['prompt-engineering', 'structured-output'], readingTime: 40 } },
      { slug: 'prompt-engineering', title: 'Prompt 工程', meta: { id: 'prompt-engineering', title: 'Prompt 工程', level: 'Junior', tags: ['Prompt', 'System Prompt', 'Few-shot', 'Chain of Thought', 'ReAct', 'Prompt Template'], difficulty: 2, category: '06-ai-fundamentals', prerequisites: ['llm-basics'], relatedPatterns: ['structured-output', 'llm-basics'], readingTime: 45 } },
      { slug: 'structured-output', title: '结构化输出', meta: { id: 'structured-output', title: '结构化输出', level: 'Senior', tags: ['JSON', 'Schema', 'Pydantic', 'Output Parser', 'Validation', 'Structured Data'], difficulty: 3, category: '06-ai-fundamentals', prerequisites: ['llm-basics', 'prompt-engineering'], relatedPatterns: ['pydantic', 'fastapi'], readingTime: 50 } },
      { slug: 'function-calling', title: 'Function Calling', meta: { id: 'function-calling', title: 'Function Calling', level: 'Senior', tags: ['Function Calling', 'Tool Calling', 'JSON Schema', 'Tool Definition', 'Parameter Validation', 'Error Handling'], difficulty: 4, category: '06-ai-fundamentals', prerequisites: ['llm-basics', 'prompt-engineering', 'structured-output'], relatedPatterns: ['structured-output', 'react-agent'], readingTime: 55 } },
      { slug: 'openai-sdk', title: 'OpenAI SDK', meta: { id: 'openai-sdk', title: 'OpenAI SDK', level: 'Senior', tags: ['OpenAI', 'Chat API', 'Streaming', 'Function Calling', 'Embedding', 'Structured Output', 'Python SDK'], difficulty: 3, category: '06-ai-fundamentals', prerequisites: ['llm-basics', 'prompt-engineering', 'structured-output'], relatedPatterns: ['function-calling', 'fastapi'], readingTime: 50 } },
    ],
  },
  {
    id: '07-langchain-framework',
    title: 'LangChain + LangGraph',
    icon: '⛓️',
    description: 'LLM 应用开发框架，包括 LangChain 基础组件、LangGraph 工作流编排和 Agent 模式',
    difficulty: 4,
    color: 'indigo',
    articles: [
      { slug: 'langchain-basics', title: 'LangChain 基础核心', meta: { id: 'langchain-basics', title: 'LangChain 基础核心', level: 'Senior', tags: ['LangChain', 'PromptTemplate', 'ChatModel', 'Runnable', 'OutputParser', 'Tool', 'Memory'], difficulty: 3, category: '07-langchain-framework', prerequisites: ['llm-basics', 'prompt-engineering', 'python-async'], relatedPatterns: ['langchain-advanced', 'langgraph-core', 'agent-patterns'], readingTime: 50 } },
      { slug: 'langchain-advanced', title: 'LangChain 进阶技巧', meta: { id: 'langchain-advanced', title: 'LangChain 进阶技巧', level: 'Senior', tags: ['LangChain', 'LCEL', 'RunnableParallel', 'RunnableLambda', 'RunnableBranch', '动态Prompt', 'Tool Binding'], difficulty: 4, category: '07-langchain-framework', prerequisites: ['langchain-basics'], relatedPatterns: ['langgraph-core', 'agent-patterns', 'workflow-design'], readingTime: 55 } },
      { slug: 'langgraph-core', title: 'LangGraph 核心架构', meta: { id: 'langgraph-core', title: 'LangGraph 核心架构', level: 'Senior', tags: ['LangGraph', 'StateGraph', 'Node', 'Edge', 'Conditional Edge', 'Checkpoint', 'Interrupt', 'Human-in-the-loop'], difficulty: 4, category: '07-langchain-framework', prerequisites: ['langchain-basics', 'langchain-advanced'], relatedPatterns: ['agent-patterns', 'workflow-design'], readingTime: 60 } },
      { slug: 'agent-patterns', title: 'Agent 设计模式', meta: { id: 'agent-patterns', title: 'Agent 设计模式', level: 'Senior', tags: ['Agent', 'ReAct', 'Planner', 'Executor', 'Router', 'Reflection', 'Tool Agent'], difficulty: 4, category: '07-langchain-framework', prerequisites: ['langchain-basics', 'langgraph-core'], relatedPatterns: ['workflow-design', 'function-calling'], readingTime: 55 } },
      { slug: 'workflow-design', title: 'Workflow 工作流设计', meta: { id: 'workflow-design', title: 'Workflow 工作流设计', level: 'Expert', tags: ['Workflow', 'DAG', '状态机', 'Retry', 'Timeout', '并发执行', '持久化'], difficulty: 5, category: '07-langchain-framework', prerequisites: ['langgraph-core', 'agent-patterns'], relatedPatterns: ['langchain-advanced'], readingTime: 50 } },
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

export interface ArticleNavItem {
  prevTitle?: string;
  prevPath?: string;
  nextTitle?: string;
  nextPath?: string;
}

export function getArticleNav(chapterId: string, slug: string): ArticleNavItem {
  const flatList = chapters.flatMap(ch =>
    ch.articles.map(a => ({ chapterId: ch.id, slug: a.slug, title: a.title }))
  );
  const index = flatList.findIndex(a => a.chapterId === chapterId && a.slug === slug);
  if (index === -1) return {};

  const prev = index > 0 ? flatList[index - 1] : undefined;
  const next = index < flatList.length - 1 ? flatList[index + 1] : undefined;

  return {
    prevTitle: prev?.title,
    prevPath: prev ? getArticlePath(prev.chapterId, prev.slug) : undefined,
    nextTitle: next?.title,
    nextPath: next ? getArticlePath(next.chapterId, next.slug) : undefined,
  };
}

/**
 * 根据章节ID和文章slug获取文章元数据
 */
export function getArticleMeta(chapterId: string, slug: string) {
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) return undefined;
  
  const article = chapter.articles.find(a => a.slug === slug);
  return article?.meta;
}
