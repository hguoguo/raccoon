---
name: unify-article-metadata-v2
overview: 去掉 ArticlePage.tsx，将元数据和组件映射统一维护在 chapters.ts，App.tsx 内联 ArticleRenderer
todos:
  - id: add-component-mapping
    content: 在 chapters.ts 中新增 articleComponents 映射和 getArticleComponent 函数
    status: completed
  - id: inline-renderer-in-app
    content: 在 App.tsx 内联 ArticleRenderer 组件，删除 ArticlePage 引用，加 Suspense
    status: completed
    dependencies:
      - add-component-mapping
  - id: delete-article-page
    content: 删除 ArticlePage.tsx
    status: completed
    dependencies:
      - inline-renderer-in-app
  - id: update-all-articles
    content: 修改 16 个文章组件，移除 useParams/getArticleMeta/404，改为 props 接收 meta
    status: completed
    dependencies:
      - add-component-mapping
  - id: verify-build
    content: 运行构建验证无类型错误
    status: completed
    dependencies:
      - inline-renderer-in-app
      - delete-article-page
      - update-all-articles
---

## 用户需求

将文章元数据的维护统一收归到 `chapters.ts`，去掉 `ArticlePage.tsx`，让元数据和组件映射只在 `chapters.ts` 中存在。

## 当前问题

1. `ArticlePage.tsx` 作为一个中间层，单独维护了 slug → 组件的映射，与 `chapters.ts` 中的元数据分处两处
2. 16 个文章组件内部各自重复执行 `useParams` + `getArticleMeta` + 404 兜底逻辑（与 `ArticlePage.tsx` 重复）

## 核心目标

- `chapters.ts` 作为元数据 + 组件映射的唯一数据源
- 删除 `ArticlePage.tsx`
- `App.tsx` 内联轻量 `ArticleRenderer` 组件，统一做 meta 查找 + 组件查找 + 404 兜底 + props 传递
- 16 个文章组件移除 `useParams`/`getArticleMeta`/404 兜底，改为从 props 接收 `meta`

## 技术栈

- React + TypeScript + React Router
- 现有数据层：`chapters.ts` + `types.ts`（KnowledgeNode 接口）

## 实现方案

**核心思路**：将 slug → 组件的映射从 `ArticlePage.tsx` 移入 `chapters.ts`，使用 `React.lazy` 懒加载。`App.tsx` 内联 `ArticleRenderer` 组件，统一处理路由参数 → meta 查找 → 组件查找 → 404 兜底 → props 传递。文章组件只接收 `{ meta: KnowledgeNode }` props，不再自行获取 meta。

### 数据流

```
URL (/docs/:chapterId/:slug)
  → App.tsx ArticleRenderer (useParams → getArticleMeta + getArticleComponent)
    → ArticleComponent (props: { meta: KnowledgeNode })
      → KnowledgeLayout (meta)
      → ArticleNav (meta.category, meta.id)
```

### 具体改动

**1. `chapters.ts` — 新增组件映射**

- 导入 `React` 和 `lazy`
- 新增 `articleComponents` 映射（slug → `React.lazy(() => import(...))`)
- 新增 `getArticleComponent(slug: string)` 函数
- 保留现有 `getArticleMeta` 函数

**2. `App.tsx` — 内联 ArticleRenderer，删除 ArticlePage 引用**

- 移除 `import ArticlePage`
- 新增内联 `ArticleRenderer` 组件：`useParams` → `getArticleMeta` + `getArticleComponent` → 渲染或 404
- 用 `<Suspense>` 包裹懒加载组件
- 路由仍为 `<Route path="/docs/:chapterId/:slug" element={<ArticleRenderer />} />`

**3. 删除 `ArticlePage.tsx`**

**4. 16 个文章组件 — 移除元数据获取逻辑，改为 props 接收**

- 移除 `import { useParams } from 'react-router-dom'`
- 移除 `import { getArticleMeta } from '../../data/chapters'` 中的 `getArticleMeta`（保留 `getArticleNav`）
- 移除 `useParams` 调用和 `getArticleMeta` 调用
- 移除 404 兜底 UI 块
- 函数签名从 `function Xxx()` 改为 `function Xxx({ meta }: { meta: KnowledgeNode })`
- 导入 `KnowledgeNode` 类型（从 `../../data/types`）

## 目录结构

```
site/src/
├── data/
│   ├── chapters.ts              # [修改] 新增 articleComponents 映射 + getArticleComponent 函数
│   └── types.ts                 # [不变]
├── App.tsx                      # [修改] 内联 ArticleRenderer，删除 ArticlePage import，加 Suspense
├── pages/
│   ├── ArticlePage.tsx          # [删除] 功能合并到 App.tsx
│   └── articles/
│       ├── python-basics.tsx    # [修改] 移除 useParams/getArticleMeta/404，改 props 接收 meta
│       ├── pydantic.tsx         # [修改] 同上
│       ├── python-async.tsx     # [修改] 同上
│       ├── fastapi.tsx          # [修改] 同上
│       ├── python-engineering.tsx # [修改] 同上
│       ├── hashmap-deep-dive.tsx  # [修改] 同上
│       ├── llm-basics.tsx       # [修改] 同上
│       ├── prompt-engineering.tsx # [修改] 同上
│       ├── structured-output.tsx  # [修改] 同上
│       ├── function-calling.tsx   # [修改] 同上
│       ├── openai-sdk.tsx       # [修改] 同上
│       ├── langchain-basics.tsx   # [修改] 同上
│       ├── langchain-advanced.tsx # [修改] 同上
│       ├── langgraph-core.tsx     # [修改] 同上
│       ├── agent-patterns.tsx     # [修改] 同上
│       └── workflow-design.tsx    # [修改] 同上
```

## 实现注意事项

- `articleComponents` 使用 `React.lazy` 实现代码分割，避免首屏加载全部文章组件
- `App.tsx` 中 `ArticleRenderer` 需用 `<Suspense fallback={...}>` 包裹懒加载组件
- `chapters.ts` 中的 `articleComponents` 映射 slug 需与 `chapters` 数组中的 slug 完全一致（注意 `hashmap-deep-dive.tsx` 的 slug 是 `hashmap`）
- 文章组件中 `getArticleNav` 需保留导入，因为 `ArticleNav` 需要 `meta.category` 和 `meta.id`
- 新增文章时只需在 `chapters.ts` 中添加元数据条目 + 组件映射，无需改动路由或其他文件