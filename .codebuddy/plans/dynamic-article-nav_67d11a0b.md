---
name: dynamic-article-nav
overview: 将 ArticleNav 组件改为基于 chapters.ts 数据动态生成，而非硬编码 prop。新增辅助函数计算前后篇，创建 SmartArticleNav 包装组件，并更新所有 16 个文章页面。
todos:
  - id: add-getArticleNav
    content: 在 chapters.ts 中新增 getArticleNav 工具函数，实现基于扁平化文章列表的上下篇动态计算
    status: completed
  - id: update-python-articles
    content: 更新 Python 章节文章页面（python-basics, pydantic, python-async, fastapi, python-engineering）使用动态导航
    status: completed
    dependencies:
      - add-getArticleNav
  - id: update-collections-article
    content: 更新 hashmap-deep-dive 文章页面使用动态导航，移除不存在的文章引用
    status: completed
    dependencies:
      - add-getArticleNav
  - id: update-ai-articles
    content: 更新 AI 章节文章页面（llm-basics, prompt-engineering, structured-output, function-calling, openai-sdk）使用动态导航
    status: completed
    dependencies:
      - add-getArticleNav
  - id: update-langchain-articles
    content: 更新 LangChain 章节文章页面（langchain-basics, langchain-advanced, langgraph-core, agent-patterns, workflow-design）使用动态导航
    status: completed
    dependencies:
      - add-getArticleNav
---

## 用户需求

每个知识点页面都应该有 ArticleNav 组件，并且是读取 `site/src/data/chapters.ts` 动态生成上下篇导航。

## 现状分析

- ArticleNav 组件已存在，所有 16 个文章页面已引入，但导航数据是**硬编码**的
- 5 个 Python 章节文章传入空字符串，导致导航不显示
- hashmap 文章引用了 chapters.ts 中不存在的文章路径
- AI/LangChain 系列文章硬编码了正确数据，但跨章节（openai-sdk → langchain-basics）
- 当新增/调整文章顺序时，需要手动更新所有受影响页面的硬编码数据，维护成本高

## 核心功能

- 基于 chapters.ts 数据，动态计算当前文章的上一篇/下一篇
- 支持跨章节导航（当前章节最后一篇 → 下一章节第一篇，反之亦然）
- 所有 16 个文章页面统一使用动态生成方式，消除硬编码

## 技术栈

- 沿用现有技术栈：React + TypeScript + react-router-dom + Vite

## 实现方案

### 核心思路

在 `chapters.ts` 中新增 `getArticleNav` 工具函数，该函数将所有章节的文章扁平化为有序列表，根据当前文章的 `chapterId` 和 `slug` 定位其在列表中的位置，自动计算上一篇和下一篇文章的标题与路径。各文章页面调用该函数并以展开运算符传入 ArticleNav，彻底消除硬编码。

### 关键技术决策

1. **扁平化全量文章列表**：将 chapters 数组按章节顺序展平为单一有序数组，使跨章节导航自然生效（如 openai-sdk 的下一篇自动指向 langchain-basics）
2. **保持 ArticleNav 组件接口不变**：`getArticleNav` 返回 `{ prevTitle, prevPath, nextTitle, nextPath }`，与现有 ArticleNavProps 完全匹配，零破坏性
3. **函数放在 chapters.ts**：与 `getArticlePath` 等现有工具函数同文件，数据源和查询逻辑内聚

### 性能说明

- chapters.ts 包含 4 章节 16 篇文章，`getArticleNav` 每次调用遍历一次扁平数组（O(n)，n=16），性能开销可忽略
- 该函数在组件渲染时同步调用，无需缓存

## 目录结构

```
site/src/
├── data/
│   └── chapters.ts              # [MODIFY] 新增 getArticleNav 函数，返回上下篇导航数据
├── components/
│   └── article/
│       └── ArticleNav.tsx       # 无需修改，接口保持不变
└── pages/articles/              # [MODIFY] 16 个文章页面统一改为动态导航
    ├── python-basics.tsx        # <ArticleNav {...getArticleNav(meta.category, meta.id)} />
    ├── pydantic.tsx             # 同上
    ├── python-async.tsx         # 同上
    ├── fastapi.tsx              # 同上
    ├── python-engineering.tsx   # 同上
    ├── hashmap-deep-dive.tsx    # 同上（移除不存在的文章引用）
    ├── llm-basics.tsx           # 同上
    ├── prompt-engineering.tsx   # 同上
    ├── structured-output.tsx    # 同上
    ├── function-calling.tsx     # 同上
    ├── openai-sdk.tsx           # 同上
    ├── langchain-basics.tsx     # 同上
    ├── langchain-advanced.tsx   # 同上
    ├── langgraph-core.tsx       # 同上
    ├── agent-patterns.tsx       # 同上
    └── workflow-design.tsx      # 同上
```

## 实现要点

### getArticleNav 函数设计

```typescript
interface ArticleNavItem {
  prevTitle?: string;
  prevPath?: string;
  nextTitle?: string;
  nextPath?: string;
}

export function getArticleNav(chapterId: string, slug: string): ArticleNavItem {
  // 1. 将所有章节文章扁平化为有序列表，每项包含 chapterId, slug, title
  // 2. 找到当前文章在列表中的索引
  // 3. 前一篇 = flatList[index - 1]（跨章节自然生效）
  // 4. 后一篇 = flatList[index + 1]（跨章节自然生效）
  // 5. 使用 getArticlePath 生成路径
  // 6. 返回 { prevTitle, prevPath, nextTitle, nextPath }
}
```

### 文章页面改动模板

```typescript
// 改动前
<ArticleNav prevTitle="" prevPath="" nextTitle="" nextPath="" />

// 改动后
import { getArticleNav } from '../../data/chapters'
// ...
<ArticleNav {...getArticleNav(meta.category, meta.id)} />
```

### 边界情况

- 列表第一篇文章无 prev，最后一篇无 next → 对应字段为 undefined → ArticleNav 内部 `if (!prevTitle && !nextTitle) return null` 兜底
- hashmap 是 02-collections 唯一文章，prev 指向 01-python-basics 最后一篇，next 指向 06-ai-fundamentals 第一篇（跨章节导航）
- 文章页已有 `import { getArticlePath } from '../../data/chapters'` 等引用，部分页面需追加 `getArticleNav` 的导入；部分页面之前未导入 chapters.ts，需新增 import