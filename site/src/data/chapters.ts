import React from 'react'
import type { Chapter, KnowledgeNode, Domain, SubCategory, LearningGoal } from './types';

// 通过 Vite import.meta.glob 自动发现所有文章组件，无需手动维护映射
const articleModules = import.meta.glob<{ default: React.ComponentType<{ meta: KnowledgeNode }> }>(
  '../pages/articles/*.tsx'
);

export function getArticleComponent(slug: string) {
  const importFn = articleModules[`../pages/articles/${slug}.tsx`];
  return importFn ? React.lazy(importFn) : undefined;
}

// ===== 领域分组数据（唯一数据源） =====
// 章节定义内联到 domains → subCategories.chapters 中
// 下方 chapters 由 domains 派生导出，保证单一数据源

export const domains: Domain[] = [
  {
    id: 'backend',
    title: '后端开发',
    icon: '⚙️',
    color: 'orange',
    subCategories: [
      {
        id: 'java',
        title: 'Java',
        icon: '☕',
        domainId: 'backend',
        description: '从语法基础到框架应用，打牢 Java 编程根基',
        chapters: [
          {
            id: '01-java-core',
            title: 'Java 核心基础',
            icon: '☕',
            description: '从语法基础到面向对象思想，打牢 Java 编程根基',
            difficulty: 2,
            color: 'orange',
            articles: [
              { slug: 'java-basics', title: 'Java基础（必须打牢）', meta: { id: 'java-basics', title: 'Java基础（必须打牢）', level: 'Expert', tags: ['Java', '基础语法', '面向对象', '封装', '继承', '多态', '接口', '抽象类', 'String', 'BigDecimal'], difficulty: 3, category: '01-java-core', prerequisites: [], relatedPatterns: ['java-collections', 'java-concurrency'], readingTime: 60 } },
              { slug: 'generic-enum', title: '泛型与枚举', meta: { id: 'generic-enum', title: '泛型与枚举', level: 'Senior', tags: ['泛型', 'Generic', '枚举', 'Enum', '类型擦除', '通配符', 'PECS', 'EnumSet', 'EnumMap'], difficulty: 3, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['collection-framework'], readingTime: 50 } },
              { slug: 'java-exception-mechanism', title: '异常机制', meta: { id: 'java-exception-mechanism', title: '异常机制', level: 'Junior', tags: ['Exception', 'Throwable', 'try-catch-finally', 'throw', 'throws', '自定义异常', '检查型异常', '非检查型异常', '异常链'], difficulty: 2, category: '01-java-core', prerequisites: ['java-basics'], relatedPatterns: ['io-stream', 'concurrency'], readingTime: 45 } },
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
            id: '12-multithreading',
            title: '多线程基础',
            icon: '🧵',
            description: '线程创建、生命周期管理、线程安全等并发编程基础知识',
            difficulty: 3,
            color: 'indigo',
            articles: [
              { slug: 'multi-threading-basics', title: '多线程基础（线程创建/生命周期/线程安全）', meta: { id: 'multi-threading-basics', title: '多线程基础（线程创建/生命周期/线程安全）', level: 'Expert', tags: ['Thread', 'Runnable', 'Callable', '线程状态', '线程安全', '原子性', '可见性', '有序性', 'volatile', 'synchronized'], difficulty: 3, category: '12-multithreading', prerequisites: ['java-basics'], relatedPatterns: ['concurrent-programming', 'thread-pool'], readingTime: 55 } },
            ],
          },
        ],
      },
      {
        id: 'python',
        title: 'Python',
        icon: '🐍',
        domainId: 'backend',
        description: '从基础语法到工程化实践，完整覆盖 Python 技术栈',
        chapters: [
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
        ],
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI / 机器学习',
    icon: '🤖',
    color: 'indigo',
    subCategories: [
      {
        id: 'ai-fundamentals',
        title: 'AI 基础',
        icon: '🧠',
        domainId: 'ai',
        description: 'LLM 基础概念、Prompt 工程、结构化输出等 AI 核心技术',
        chapters: [
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
        ],
      },
      {
        id: 'langchain',
        title: 'LangChain',
        icon: '⛓️',
        domainId: 'ai',
        description: 'LangChain + LangGraph 应用开发框架',
        chapters: [
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
        ],
      },
    ],
  },
  {
    id: 'frontend',
    title: '前端开发',
    icon: '🎨',
    color: 'teal',
    subCategories: [],
  },
  {
    id: 'infra',
    title: '基础设施',
    icon: '🏗️',
    color: 'rose',
    subCategories: [],
  },
];

// ===== 章节数据（由 domains 派生，单一数据源） =====

export const chapters: Chapter[] = domains.flatMap(d => d.subCategories.flatMap(sc => sc.chapters));

// ===== 学习目标路线 =====

export const learningGoals: LearningGoal[] = [
  {
    id: 'backend-engineer',
    title: '后端工程师',
    icon: '⚙️',
    description: '掌握 Java 生态核心技术栈，成为合格的后端开发工程师',
    stages: [
      {
        title: '语言基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-java-core', title: 'Java 基础', icon: '☕', readingTime: 60, difficulty: 2 },
          { chapterId: '02-collections', title: '集合框架', icon: '📦', readingTime: 250, difficulty: 3 },
        ],
      },
      {
        title: '并发编程',
        estimatedHours: 20,
        nodes: [
          { chapterId: '12-multithreading', title: '多线程基础', icon: '🧵', readingTime: 55, difficulty: 3 },
        ],
      },
      {
        title: 'Python 全栈',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-python-basics', title: 'Python 基础', icon: '🐍', readingTime: 240, difficulty: 2 },
        ],
      },
      {
        title: 'AI 应用开发',
        estimatedHours: 40,
        nodes: [
          { chapterId: '06-ai-fundamentals', title: 'AI 基础与大模型', icon: '🤖', readingTime: 240, difficulty: 2 },
          { chapterId: '07-langchain-framework', title: 'LangChain + LangGraph', icon: '⛓️', readingTime: 270, difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'fullstack-engineer',
    title: '全栈工程师',
    icon: '🔄',
    description: '前后端通吃，独立完成全链路开发',
    stages: [
      {
        title: '后端基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-java-core', title: 'Java 基础', icon: '☕', readingTime: 60, difficulty: 2 },
          { chapterId: '01-python-basics', title: 'Python 基础', icon: '🐍', readingTime: 240, difficulty: 2 },
        ],
      },
      {
        title: 'AI 赋能',
        estimatedHours: 40,
        nodes: [
          { chapterId: '06-ai-fundamentals', title: 'AI 基础与大模型', icon: '🤖', readingTime: 240, difficulty: 2 },
          { chapterId: '07-langchain-framework', title: 'LangChain + LangGraph', icon: '⛓️', readingTime: 270, difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'ai-engineer',
    title: 'AI 工程师',
    icon: '🤖',
    description: '掌握 AI 应用开发全栈能力，从模型调用到 Agent 编排',
    stages: [
      {
        title: 'Python 基础',
        estimatedHours: 40,
        nodes: [
          { chapterId: '01-python-basics', title: 'Python 基础', icon: '🐍', readingTime: 240, difficulty: 2 },
        ],
      },
      {
        title: 'AI 核心',
        estimatedHours: 50,
        nodes: [
          { chapterId: '06-ai-fundamentals', title: 'AI 基础与大模型', icon: '🤖', readingTime: 240, difficulty: 2 },
          { chapterId: '07-langchain-framework', title: 'LangChain + LangGraph', icon: '⛓️', readingTime: 270, difficulty: 4 },
        ],
      },
    ],
  },
];

// ===== 数据完整性校验 =====

export function validateDataIntegrity(): string[] {
  const errors: string[] = [];
  const chapterIds = new Set(chapters.map(c => c.id));

  // 检查 learningGoals 中的 chapterId 是否都存在于 chapters 中
  for (const goal of learningGoals) {
    for (const stage of goal.stages) {
      for (const node of stage.nodes) {
        if (!chapterIds.has(node.chapterId)) {
          errors.push(`learningGoals: chapterId "${node.chapterId}" in goal "${goal.id}" does not exist in chapters`);
        }
      }
    }
  }

  // 检查文章的 prerequisites 和 relatedPatterns 中的引用是否有效
  const articleSlugs = new Set(chapters.flatMap(c => c.articles.map(a => a.slug)));
  for (const chapter of chapters) {
    for (const article of chapter.articles) {
      for (const prereq of article.meta.prerequisites) {
        if (!articleSlugs.has(prereq)) {
          errors.push(`prerequisites: article "${article.slug}" references non-existent prereq "${prereq}"`);
        }
      }
    }
  }

  // 检查 domains 中的 subCategory.domainId 是否与父 domain.id 一致
  for (const domain of domains) {
    for (const sub of domain.subCategories) {
      if (sub.domainId !== domain.id) {
        errors.push(`domains: subCategory "${sub.id}" has domainId "${sub.domainId}" but is under domain "${domain.id}"`);
      }
    }
  }

  return errors;
}

// 开发模式下自动校验
if (import.meta.env.DEV) {
  const errors = validateDataIntegrity();
  if (errors.length > 0) {
    console.warn('[Data Integrity] 以下数据不一致：', errors);
  }
}

// ===== 查询函数 =====

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getTotalArticles(): number {
  return chapters.reduce((sum, ch) => sum + ch.articles.length, 0);
}

export function getArticlePath(chapterId: string, slug: string): string {
  return `/docs/${chapterId}/${slug}`;
}

export function getDomainById(id: string): Domain | undefined {
  return domains.find(d => d.id === id);
}

export function getSubCategoryById(id: string): SubCategory | undefined {
  for (const domain of domains) {
    const found = domain.subCategories.find(sc => sc.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getSubCategoryForChapter(chapterId: string): SubCategory | undefined {
  for (const domain of domains) {
    const found = domain.subCategories.find(sc =>
      sc.chapters.some(ch => ch.id === chapterId)
    );
    if (found) return found;
  }
  return undefined;
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

export function getArticleMeta(chapterId: string, slug: string) {
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) return undefined;
  
  const article = chapter.articles.find(a => a.slug === slug);
  return article?.meta;
}
