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
  {
    id: '03-python-advanced',
    title: 'Python 进阶技术',
    icon: '🚀',
    description: 'Pydantic、异步编程、高级特性等 Python 进阶内容',
    difficulty: 3,
    color: 'indigo',
    articles: [
      { slug: 'pydantic', title: 'Pydantic 数据验证', meta: { id: 'pydantic', title: 'Pydantic 数据验证', level: 'Senior', tags: ['Pydantic', 'BaseModel', '数据验证', 'JSON Schema', '序列化'], difficulty: 3, category: '03-python-advanced', prerequisites: ['python-basics', 'python-typing'], relatedPatterns: ['fastapi', 'data-validation'], readingTime: 40 } },
      { slug: 'python-async', title: 'Python 异步编程', meta: { id: 'python-async', title: 'Python 异步编程', level: 'Senior', tags: ['async', 'await', 'asyncio', '协程', '并发', 'aiohttp', 'httpx'], difficulty: 4, category: '03-python-advanced', prerequisites: ['python-basics', 'python-functions'], relatedPatterns: ['fastapi', 'concurrent-programming'], readingTime: 50 } },
    ],
  },
  {
    id: '04-fastapi',
    title: 'FastAPI Web 框架',
    icon: '⚡',
    description: '现代高性能 Python Web 框架，自动文档、依赖注入、异步支持',
    difficulty: 4,
    color: 'rose',
    articles: [
      { slug: 'fastapi', title: 'FastAPI 框架深度解析', meta: { id: 'fastapi', title: 'FastAPI 框架深度解析', level: 'Senior', tags: ['FastAPI', '路由', '请求参数', '响应', '文件上传', '中间件', 'OpenAPI', 'Streaming', 'SSE', 'WebSocket'], difficulty: 4, category: '04-fastapi', prerequisites: ['python-async', 'pydantic'], relatedPatterns: ['uvicorn', 'starlette', 'sqlmodel'], readingTime: 55 } },
    ],
  },
  {
    id: '05-python-engineering',
    title: 'Python 工程化',
    icon: '🛠️',
    description: 'pip、uv、虚拟环境、日志、配置管理、pytest 测试等工程化实践',
    difficulty: 3,
    color: 'teal',
    articles: [
      { slug: 'python-engineering', title: 'Python 工程化实践', meta: { id: 'python-engineering', title: 'Python 工程化实践', level: 'Senior', tags: ['pip', 'uv', '虚拟环境', '日志', 'dotenv', 'yaml', 'pytest', '工程化'], difficulty: 3, category: '05-python-engineering', prerequisites: ['python-basics', 'python-modules'], relatedPatterns: ['fastapi', 'project-structure', 'ci-cd'], readingTime: 50 } },
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
