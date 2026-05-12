---
name: unify-article-metadata
overview: 将文章元数据统一维护在 chapters.ts 中，移除各文章页面中的重复元数据定义，改为通过 getArticleMeta() 动态获取
---

现在情况完全清楚了。每个文章组件中 `meta` 只有两处使用：

1. `<KnowledgeLayout meta={meta}>` — 文章头部展示
2. `<ArticleNav {...getArticleNav(meta.category, meta.id)} />` — 上下篇导航

同时 `ArticlePage.tsx` 已经做了 meta 查找和 404 兜底，却没有把 meta 传给子组件。最优方案是让 `ArticlePage` 通过 props 把 `meta` 传给各文章组件，彻底消除 16 个组件中的 `useParams` + `getArticleMeta` + 404 兜底重复代码。

<plan_result>
<req>

## 用户需求

将文章元数据的维护统一收归到 `chapters.ts`，移除各文章页面中的重复定义。

## 当前问题

工作区中已完成初步重构，但仍存在逻辑重复：`ArticlePage.tsx` 已通过 `useParams` + `getArticleMeta` 获取元数据并做了 404 兜底，但 16 个文章组件内部又各自重复执行了相同的 `useParams` + `getArticleMeta` + 404 兜底逻辑。

## 核心目标

- `chapters.ts` 作为元数据唯一数据源（已完成）
- `ArticlePage.tsx` 统一负责元数据查找和 404 兜底，并通过 props 将 `meta` 传递给文章组件
- 16 个文章组件移除 `useParams`、`getArticleMeta` 导入和调用、404 兜底 UI，改为从 props 接收 `meta`
- 消除元数据获取逻辑的 16 处重复
</req>

<tech>

## 技术栈

- React + TypeScript + React Router
- 现有数据层：`chapters.ts` + `types.ts`（KnowledgeNode 接口）

## 实现方案

**核心思路**：`ArticlePage` 已是路由入口且已做 meta 查找 + 404 兜底，应将 `meta` 通过 props 传递给文章组件，文章组件不再自行获取 meta。

### 具体改动

1. **定义文章组件的 Props 接口**：每个文章组件新增 `{ meta: KnowledgeNode }` props
2. **修改 `ArticlePage.tsx`**：将 meta 通过 props 传给子组件 `<Component meta={meta} />`，同时修改组件映射类型为 `React.ComponentType<{ meta: KnowledgeNode }>`
3. **修改 16 个文章组件**：

- 移除 `useParams` 导入和调用
- 移除 `getArticleMeta` 导入和调用
- 移除 404 兜底 UI 块
- 组件函数签名改为接收 `{ meta: KnowledgeNode }` props
- 保留 `getArticleNav` 导入（仍需 `meta.category` 和 `meta.id`）
- 保留 `KnowledgeLayout` 和 `ArticleNav` 对 meta 的使用

### 数据流

```
URL (/docs/:chapterId/:slug)
  → ArticlePage (useParams → getArticleMeta → meta)
    → ArticleComponent (props: { meta })
      → KnowledgeLayout (meta)
      → ArticleNav (meta.category, meta.id)
```

## 目录结构

```
site/src/
├── data/
│   └── chapters.ts              # [已改] 元数据唯一数据源 + getArticleMeta 函数
│   └── types.ts                 # [不变] KnowledgeNode 接口定义
├── pages/
│   └── ArticlePage.tsx          # [修改] 传递 meta props 给子组件
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

- `ArticlePage.tsx` 中组件映射类型需从 `React.ComponentType` 改为 `React.ComponentType<{ meta: KnowledgeNode }>`，确保类型安全
- 文章组件中 `getArticleNav` 仍需保留导入，因为 `ArticleNav` 需要导航数据
- `useParams` 在文章组件中不再需要，因为 `meta` 已通过 props 传入
- 404 兜底逻辑仅保留在 `ArticlePage.tsx` 一处
</tech>

<todolist>
<item id="modify-article-page" deps="">修改 ArticlePage.tsx，将 meta 通过 props 传递给文章组件</item>
<item id="update-all-articles" deps="modify-article-page">修改 16 个文章组件，移除 useParams/getArticleMeta/404，改为 props 接收 meta</item>
<item id="verify-build" deps="update-all-articles">运行构建验证无类型错误</item>
</todolist>
</plan_result>