---
name: create-knowledge-page
description: |
  This skill should be used when the user wants to create a new knowledge point page for the Raccoon-Edu learning site, OR when the user wants to review/audit an existing page against the creation spec.
  Triggers include: "创建XX知识点", "新增XX文章", "写一篇关于XX的深度分析", "添加XX知识点", or any request to generate a new knowledge article page.
  Also triggers for review: "检查XX页面", "检视XX文章", "审核XX知识点", "XX页面是否符合规范", or any request to audit an existing page.
  This skill ensures all pages follow the same content spec, component usage, and project structure conventions.
---

# 创建知识点页面

为 Raccoon-Edu 学习站点生成完整、符合规范的知识点文章页面，或检视已有页面是否符合规范。

## 目标

产出风格统一、结构一致、组件规范的文章页面，包含：
1. 更新章节目录数据（`chapters.ts`）— **步骤 2**
2. 新的文章页面组件（TSX）— **步骤 3**

**⚠️ 重要工作流程变更：先写元数据，再创建页面！**
- **步骤 2**：先在 `chapters.ts` 中定义完整的 meta 数据（slug、title、level、tags 等）
- **步骤 3**：根据 `chapters.ts` 中的 `slug` 创建对应的页面文件 `<slug>.tsx`
- 这样可以确保文件名与 slug 的一致性，避免后续匹配问题

**无需手动更新路由或组件映射**——项目使用 `import.meta.glob` 自动发现 `articles/` 目录下的组件，使用动态路由 `<Route path="/docs/:chapterId/:slug">` 渲染。

## 内容规范

每篇文章**必须**包含 12 项结构要素，详见 `references/content-spec.md`。

时间有限时的优先级：
1. 一句话定义 + 架构图
2. 核心原理 + 源码
3. 面试真题
4. 流程图 + 常见误区
5. 代码实验场 + 上下文切换

## 工作流程

### 步骤 0：智能检测元数据是否已存在（⚡ 新增）

**在开始任何工作之前，首先检查 `chapters.ts` 中是否已有该知识点的元数据。**

#### 检测方法：

1. **从用户需求中提取知识点名称或 slug**
   - 用户可能说：“创建 ConcurrentHashMap 页面” → 提取 “ConcurrentHashMap”
   - 用户可能说：“生成 concurrent-hashmap 文章” → 提取 “concurrent-hashmap”
   - 用户可能直接提供 slug：“添加 reflection 知识点” → 提取 “reflection”

2. **扫描 `chapters.ts` 查找匹配项**
   ```typescript
   // 搜索策略（按优先级）：
   // 1. 精确匹配 slug
   const article = chapters.flatMap(c => c.articles).find(a => a.slug === extractedSlug)
   
   // 2. 模糊匹配 title（去除空格、转小写）
   const article = chapters.flatMap(c => c.articles).find(a => 
     a.title.toLowerCase().replace(/\s+/g, '-') === extractedSlug.toLowerCase()
   )
   
   // 3. 关键词匹配（包含关系）
   const article = chapters.flatMap(c => c.articles).find(a => 
     a.title.toLowerCase().includes(keyword) || 
     a.slug.toLowerCase().includes(keyword)
   )
   ```

3. **判断结果分支**
   - ✅ **找到完整 meta 数据** → 跳转到【快速模式：直接生成页面】
   - ❌ **未找到或 meta 不完整** → 继续执行标准流程（步骤 1-8）

#### 🚀 批量创建模式（⚡ 新增）

如果用户请求“批量创建某章节的所有页面”或“生成所有缺失的页面”，执行以下流程：

1. **识别目标章节**
   - 用户可能说：“创建 02-collections 章节的所有页面”
   - 用户可能说：“生成 Java 核心基础的所有文章”
   - 从输入中提取 `chapterId` 或章节标题

2. **扫描该章节下所有文章的 slug**
   ```typescript
   const targetChapter = chapters.find(c => c.id === chapterId)
   const articles = targetChapter?.articles || []
   ```

3. **检测哪些页面文件缺失**
   ```typescript
   const missingPages = articles.filter(article => {
     const filePath = `site/src/pages/articles/${article.slug}.tsx`
     return !fileExists(filePath)
   })
   ```

4. **展示待创建列表并确认**
   ```
   📋 检测到 02-collections 章节下有 6 篇文章，其中 3 篇页面文件缺失：
   
   ✅ 已存在:
      - collection-framework.tsx
      - list-deep-dive.tsx
   
   ⏳ 待创建:
      - set-deep-dive.tsx (Set深度解析)
      - map-framework.tsx (Map框架)
      - hashmap-deep-dive.tsx (HashMap深度剖析)
   
   是否批量创建这 3 个页面？(Y/n)
   ```

5. **逐个创建页面**
   - 对每个缺失的页面，执行【快速模式：直接生成页面】
   - 每创建一个页面后，显示进度：`[1/3] 已完成 set-deep-dive.tsx`
   - 全部完成后，汇总报告

6. **批量部署**
   - 所有页面创建完成后，统一执行步骤 8 自动部署

**注意：**
- 批量创建时，每个页面的内容质量不应降低
- 如果某个页面的元数据不完整，跳过该页面并提示用户
- 批量操作建议配合 `dispatching-parallel-agents` skill 提升效率（如同时创建多个页面）

---

#### 快速模式：直接生成页面

如果检测到 `chapters.ts` 中已有完整的元数据：

```typescript
// 示例：chapters.ts 中已有
{
  slug: 'concurrent-hashmap',
  title: 'ConcurrentHashMap 深度解析',
  meta: {
    id: 'concurrent-hashmap',
    title: 'ConcurrentHashMap 深度解析',
    level: 'Expert',
    tags: ['ConcurrentHashMap', '线程安全', '分段锁', 'CAS'],
    difficulty: 5,
    category: '02-collections',
    prerequisites: ['hashmap-deep-dive'],
    relatedPatterns: ['collection-framework'],
    readingTime: 60
  }
}
```

**则跳过步骤 1-2，直接进入步骤 3：**

1. ✅ **确认元数据完整性**：
   - 检查 `slug`、`title`、`level`、`tags`、`difficulty`、`category`、`prerequisites`、`relatedPatterns`、`readingTime` 是否都存在
   - 如果缺少任何字段，提示用户并回退到标准流程

2. ✅ **提取关键信息**：
   ```typescript
   const { slug, title, meta } = foundArticle
   const chapterId = meta.category
   const componentPath = `site/src/pages/articles/${slug}.tsx`
   ```

3. ✅ **验证文件是否存在**：
   - 如果 `<slug>.tsx` 已存在 → 询问用户是否覆盖或检视现有页面
   - 如果不存在 → 直接创建新页面文件

4. ✅ **生成页面内容**：
   - 使用 `meta.tags` 中的关键词作为内容创作的指引
   - 使用 `meta.level` 和 `meta.difficulty` 决定内容深度
   - 使用 `meta.prerequisites` 和 `meta.relatedPatterns` 构建知识关联部分
   - 严格按照步骤 3 的布局规范创建页面

5. ✅ **跳过部署确认**：
   - 因为元数据已存在，说明这是规划好的知识点，直接执行步骤 8 自动部署

**用户提示示例：**
```
✅ 检测到 chapters.ts 中已有 "ConcurrentHashMap" 的完整元数据：
   - slug: concurrent-hashmap
   - 章节: 02-collections (集合框架深度解析)
   - 难度: Expert (⭐⭐⭐⭐⭐)
   - 标签: ConcurrentHashMap, 线程安全, 分段锁, CAS

📝 将直接创建页面文件: site/src/pages/articles/concurrent-hashmap.tsx

是否继续？(Y/n)
```

---

### 步骤 1：收集需求 + 扫描组件库（标准流程）

**仅在步骤 0 未找到元数据时执行此步骤。**

向用户确认（或从上下文推断）：
- **知识点名称**（如 "ArrayList"）
- **所属章节**（如 "02-collections"），不确定时根据主题提出建议
- **难度等级**（Junior / Senior / Expert）和**难度星级**（1-5）
- **前置知识**和**关联知识点**

然后**扫描组件库**，了解可用组件：
- 读取 `site/src/components/knowledge/` 目录下所有 `.tsx` 文件的头部注释
- 读取 `site/src/components/ui/` 目录下所有 `.tsx` 文件的头部注释
- 读取 `site/src/components/article/` 目录下所有 `.tsx` 文件的头部注释
- 组件文件头部注释格式为 JSDoc，包含组件用途、Props 接口、使用示例
- 根据扫描结果决定页面中可使用哪些组件

### 步骤 2：更新章节目录（⚠️ 先写元数据）

**🔴 阻断性要求：必须先完成此步骤，才能创建页面文件！**

**⚡ 如果步骤 0 已检测到元数据存在，则跳过此步骤，直接进入步骤 3。**

否则，编辑 `site/src/data/chapters.ts`：
- 章节已存在：在该章节的 `articles` 数组中添加 `ArticleMeta` 对象
- 章节不存在：在 `chapters` 数组中添加新的 `Chapter` 对象

**必须包含完整的 meta 信息：**
```typescript
{
  slug: 'concurrent-hashmap',  // kebab-case，将作为文件名
  title: 'ConcurrentHashMap 深度解析',
  meta: {
    id: 'concurrent-hashmap',   // 与 slug 一致
    title: 'ConcurrentHashMap 深度解析',
    level: 'Expert',            // Junior | Senior | Expert
    tags: ['ConcurrentHashMap', '线程安全', '分段锁', 'CAS'],
    difficulty: 5,              // 1-5
    category: '02-collections', // 必须与章节 ID 匹配
    prerequisites: ['hashmap-deep-dive'],
    relatedPatterns: ['collection-framework'],
    readingTime: 60
  }
}
```

**关键规则：**
- **slug 使用 kebab-case**：`concurrent-hashmap`、`array-list-deep-dive`
- **slug 将作为文件名**：`concurrent-hashmap.tsx`，必须完全一致
- **meta.id 与 slug 一致**：路由层通过 `getArticleMeta(category, id)` 查找
- **meta.category 指向正确的章节 ID**：用于文章间导航
- **tags 应包含主要类名/概念名**：便于搜索和分类

`chapters.ts` 中的 `meta` 对象是文章元数据的唯一来源，路由层会通过 `getArticleMeta()` 读取并注入组件。

**无需手动更新 `App.tsx` 或组件映射**——项目使用以下机制自动关联：
- `import.meta.glob('../pages/articles/*.tsx')` 自动发现组件
- `getArticleComponent(slug)` 根据文件名 `<slug>.tsx` 查找组件
- `App.tsx` 中动态路由 `<Route path="/docs/:chapterId/:slug" element={<ArticleRenderer />} />` 渲染

只要文件名与 `slug` 一致，新文章就会被自动识别。

### 步骤 3：创建文章页面（基于 chapters.ts 中的元数据）

在 `site/src/pages/articles/<slug>.tsx` 创建新文件，模板见 `references/page-template.md`。

**✅ 此时 chapters.ts 中已有该文章的完整 meta 数据，直接使用即可！**

**⚡ 无论通过步骤 0（快速模式）还是步骤 2（标准流程）获取元数据，此步骤的执行方式完全一致。**

**关键规则（必须严格遵守）：**
- **文件名 = chapters.ts 中的 slug**：必须完全一致，因为 `import.meta.glob` 根据文件名匹配组件
- 组件名使用 PascalCase：`ConcurrentHashmap`、`ArrayListDeepDive`
- 组件签名必须为 `export default function Xxx({ meta }: { meta: KnowledgeNode })`，**meta 由路由层注入，不再在组件内部定义**
- `meta.category` 已在 chapters.ts 中定义，直接使用
- `meta.tags` 已在 chapters.ts 中定义，可用于页面展示
- 所有章节必须有 `id` 属性，与 `tocItems` 一一对应
- **`<h2>` 和 `<h3>` 都必须有 `id` 属性**，用于 SmartTOC 的锚点跳转
- 如果 `tocItems` 中有 `level: 3` 的条目，对应的 `<h3>` 必须添加 `id` 属性，否则点击目录无法跳转

**⚠️ 布局结构强制要求（极易出错，务必遵守）：**

1. **必须导入以下组件和工具函数**：
   ```tsx
   import SmartTOC from '../../components/knowledge/SmartTOC'
   import ArticleNav from '../../components/article/ArticleNav'
   import { getArticleNav } from '../../data/chapters'
   import type { KnowledgeNode, TocItem } from '../../data/types'
   ```

2. **必须定义 `tocItems` 数组**：
   ```tsx
   const tocItems: TocItem[] = [
     { id: 'definition', text: '一句话定义', level: 2 },
     // ... 所有 h2/h3 章节的 id 和标题
   ]
   ```

3. **必须使用 flex 布局包裹整个页面，并在 KnowledgeLayout 内部末尾添加 ArticleNav**：
   ```tsx
   export default function XxxPage({ meta }: { meta: KnowledgeNode }) {
     return (
       <div className="flex max-w-[100vw] overflow-x-hidden">
         {/* 左侧主内容区 */}
         <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
           <KnowledgeLayout meta={meta}>
             {/* 文章内容 */}
             
             {/* ⚠️ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
             <ArticleNav {...getArticleNav(meta.category, meta.id)} />
           </KnowledgeLayout>
         </div>
         
         {/* ⚠️ SmartTOC 直接渲染，不要用 <aside> 包裹！组件自行管理桌面端右侧栏和移动端右侧抽屉 */}
         <SmartTOC items={tocItems} />
       </div>
     )
   }
   ```

**⚠️ SmartTOC 渲染规则（极易出错）：**
- **❌ 禁止用 `<aside className="hidden xl:block ...">` 包裹 SmartTOC** — 这会导致移动端的悬浮按钮和侧边抽屉被一起隐藏
- **✅ 直接渲染 `<SmartTOC items={tocItems} />`** — 组件内部已处理桌面端（`xl:block` 右侧栏）和移动端（悬浮按钮 + 右侧抽屉）的显隐
- 移动端效果：SmartTOC 显示绿色悬浮按钮，点击后从右侧滑入抽屉；MobileNav（📚 橙色按钮）从左侧滑入

**❌ 禁止的错误做法：**
```tsx
// 错误！ArticleNav 放在了 KnowledgeLayout 外部
export default function XxxPage({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          {/* 内容 */}
        </KnowledgeLayout>
      </div>
      {/* ❌ 禁止用 aside 包裹 SmartTOC！这会隐藏移动端目录按钮 */}
      <aside className="hidden xl:block w-[240px] shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-4">
        <SmartTOC items={tocItems} />
      </aside>
      {/* ❌ ArticleNav 不应该在这里 */}
      <ArticleNav {...getArticleNav(meta.category, meta.id)} />
    </div>
  )
}
```

### 步骤 4：创建自定义动画组件（可选）

如果知识点涉及数据结构操作（列表、树、队列等），创建自定义动画组件：
- 使用 `StepAnimator<TStep>` 作为框架，从 `../../components/knowledge/StepAnimator` 导入
- 定义知识点专属的步骤类型和可视化渲染
- 放置在 `site/src/components/knowledge/<TopicName>Animator.tsx`

### 步骤 5：创建新通用组件（如需要）

如果文章需要项目尚无的 UI 组件（如新的可视化类型、交互模式）：

1. 在 `site/src/components/knowledge/` 或 `site/src/components/ui/` 下封装独立可复用组件
2. **在组件文件头部写好 JSDoc 注释**，格式如下：
   ```tsx
   /**
    * 组件用途简述
    *
    * @example
    * <ComponentName prop1="value" prop2={42} />
    *
    * @props
    * - prop1: string — 属性说明
    * - prop2?: number — 可选属性说明
    */
   ```
   后续创建页面时，Skill 会自动扫描此注释来发现和使用组件，无需手动更新 Skill 文件。

### 步骤 6：验证

- 在 `site/` 目录下运行 `npm run build` 确认无错误
- 在浏览器中预览页面

### 步骤 7：质量检查清单

完成任务前，确认以下所有项：

**内容完整性：**
- [ ] 12 项结构要素全部包含（定义、架构、原理、源码、流程、实验场、边注、上下文切换、误区、面试、对比、关联）
- [ ] 源码片段包含示例代码 + 预期输出（如注释中的控制台输出或单独代码块）
- [ ] 面试题：至少 5 道，附准确答案
- [ ] 常见误区：至少 3 条，针对真实的高频误解
- [ ] 对比表格：数据准确，不可编造
- [ ] 无占位内容或 TODO 注释

**技术准确性：**
- [ ] 概念解释正确
- [ ] 代码逻辑正确
- [ ] 性能结论有依据或标注为近似值
- [ ] 信息不过时（与当前主流版本一致）

**项目集成：**
- [ ] **✅ `chapters.ts` 中已有完整的 meta 数据**（步骤 2 已完成）
- [ ] 文件名与 `chapters.ts` 中的 `slug` 完全一致（`import.meta.glob` 据此匹配组件）
- [ ] 组件签名为 `export default function Xxx({ meta }: { meta: KnowledgeNode })`
- [ ] `meta.category` 指向正确的章节 ID（已在 chapters.ts 中定义）
- [ ] `npm run build` 通过

**风格一致性：**
- [ ] 所有 UI 元素使用已有封装组件，无内联拼凑
- [ ] 无页面内定义的子组件（所有组件独立文件）
- [ ] 样式 className 与已有页面一致，无随意编造
- [ ] 若创建了新组件，文件头部已有规范的 JSDoc 注释
- [ ] **✅ 页面使用了 flex 布局包裹（`<div className="flex max-w-[100vw] overflow-x-hidden">`）**
- [ ] **✅ 定义了 `tocItems` 数组并导入了 `SmartTOC` 组件**
- [ ] **✅ `<SmartTOC items={tocItems} />` 直接渲染，不被 `<aside hidden xl:block>` 包裹**
- [ ] **✅ 所有 `<h2>` 和 `<h3>` 都有 `id` 属性，与 `tocItems` 中的 id 一一对应**
- [ ] **✅ 导入了 `ArticleNav` 组件和 `getArticleNav` 函数**
- [ ] **✅ 在页面末尾添加了 `<ArticleNav {...getArticleNav(meta.category, meta.id)} />`**
- [ ] **✅ 页面结构与 `langgraph-core.tsx` 等其他页面保持一致**

### 步骤 8：自动部署到远程服务器

完成质量检查后，自动调用 `remote-deploy` skill 将新创建的知识点页面部署到远程服务器：

1. **提交更改到 Git**：
   ```bash
   git add .
   git commit -m "feat: 添加新的知识点页面 <知识点名称>"
   git push
   ```

2. **调用 remote-deploy skill**：
   - 使用 Skill 工具调用 `remote-deploy`
   - 这将自动执行：SSH 连接到 xb-nas 服务器 → 拉取最新代码 → 构建前端 → 构建 Docker 镜像 → 重启容器

3. **验证部署**：
   - 确认容器正常运行：`ssh xb-nas "docker ps | grep raccoon-edu"`
   - 访问应用确认新页面可正常浏览

## 组件与风格规范

### 布局结构参考

在创建页面时，**必须**参考以下已验证的正确示例：
- ✅ [langgraph-core.tsx](file:///Users/liujianhua/IdeaProjects/raccoon-edu/site/src/pages/articles/langgraph-core.tsx) - 完整的布局结构，包含 ArticleNav
- ✅ [python-basics.tsx](file:///Users/liujianhua/IdeaProjects/raccoon-edu/site/src/pages/articles/python-basics.tsx) - 完整的布局结构
- ✅ [hashmap.tsx](file:///Users/liujianhua/IdeaProjects/raccoon-edu/site/src/pages/articles/hashmap.tsx) - 带侧边栏目录

关键特征：
1. 外层 `<div className="flex max-w-[100vw] overflow-x-hidden">`
2. 左侧主内容区 `<div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">`
3. `<SmartTOC items={tocItems} />` 直接渲染（**不用 aside 包裹**）
4. 导入并使用 `SmartTOC` 组件
5. 定义 `tocItems` 数组
6. 所有 h2/h3 都有 `id` 属性，与 tocItems 一一对应
7. **导入 `ArticleNav` 和 `getArticleNav`**
8. **在页面末尾添加 `<ArticleNav {...getArticleNav(meta.category, meta.id)} />`**

### 组件发现机制

**本 Skill 不维护静态组件列表**。可用组件以代码即文档方式管理：

- 组件文件位置：`site/src/components/knowledge/` 和 `site/src/components/ui/`
- 每个组件文件头部有 JSDoc 注释，说明用途、Props、使用示例
- Skill 在步骤 1 中自动扫描这些目录和注释，获取最新的组件清单
- 新增组件只需写好头部注释，无需更新 Skill 文件

### 必须使用已有封装组件

页面中所有 UI 元素**必须**使用项目已封装的组件，禁止内联拼凑。禁止做法示例：
- 手写 `<pre><code>` 代替 `Playground`
- 手写 aside/div 代替 `SideNote`
- 手写 tab/切换逻辑 代替 `ContextSwitcher`
- 手写 div + 样式 代替 `Callout`

不确定有哪些组件时，扫描组件目录查看头部注释。

### 需要新组件时：先封装，再使用

如果已有组件无法满足需求（如需要新的可视化类型），**必须**：

1. **先封装**：在 `site/src/components/knowledge/` 或 `site/src/components/ui/` 下创建独立的可复用组件
2. **写注释**：在文件头部添加 JSDoc 注释（用途 + Props + 示例）
3. **再使用**：在文章页面中 import 使用

**禁止**在文章页面中内联定义组件（如 `function XxxCard() {...}` 写在页面文件里）。
**禁止**在文章页面中手写大量 Tailwind 样式拼凑 UI，应抽取为组件。

### 样式约定

- h2 标题：`className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink"`
- h3 标题：`className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink"`
- 正文：`className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4"`
- 行内代码：`className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]"`
- 外层容器：`max-w-[100vw] overflow-x-hidden`
- flex 子元素含文本时：`min-w-0`

以上样式**只用于文章正文排版**。任何重复出现的 UI 模式应封装为组件，而非在页面中复制 className。

## 重要约束

- **禁止**生成占位内容，每个章节必须有真实、充实的知识内容
- 源码片段必须与当前主流版本一致（如 Python 3.10+、JDK 8+，视具体技术栈而定）
- 面试题必须是真实问题，答案必须准确
- 常见误区必须针对真实的高频误解
- 对比表格必须使用准确的性能/数据特征
- 页面必须自包含，不得出现 "TODO: 后续补充" 类注释

## 检视模式

当用户要求检查、审核、检视已有知识点页面时，执行以下流程。

### 检视步骤

#### 0. 前置检测：元数据与文件一致性（⚡ 新增）

**在开始检视之前，先检测是否存在“元数据已配置但页面文件缺失”的情况。**

1. **扫描 `chapters.ts` 中所有文章的 slug**
   ```typescript
   const allArticles = chapters.flatMap(c => c.articles)
   ```

2. **检查对应页面文件是否存在**
   ```typescript
   for (const article of allArticles) {
     const filePath = `site/src/pages/articles/${article.slug}.tsx`
     if (!fileExists(filePath)) {
       console.warn(`⚠️ 元数据已配置但页面文件缺失: ${article.slug}`)
     }
   }
   ```

3. **如果发现缺失文件**：
   - 🔴 **阻断性提示**：“检测到 `chapters.ts` 中配置了 `<slug>` 的元数据，但页面文件 `<slug>.tsx` 不存在。”
   - 💡 **建议操作**：“是否立即创建该页面？(Y/n)”
   - 如果用户选择 Y → 跳转到【快速模式：直接生成页面】
   - 如果用户选择 n → 继续标准检视流程

---

#### 1. 定位目标文件

- 用户提供知识点名称或 slug → 定位到 `site/src/pages/articles/<slug>.tsx`
- **首先检查 `site/src/data/chapters.ts`**：确认该文章的 meta 数据已存在且完整
- 若不确定 slug，扫描 `site/src/data/chapters.ts` 中的 `articles` 列表查找匹配项
- 读取目标文件完整内容

#### 2. 逐项检查

读取目标文件后，按以下维度逐项检查并输出结果。

**A. 组件签名与 meta 注入（严重性：🔴 阻断）**

| 检查项 | 检查方法 | 通过条件 |
|--------|----------|----------|
| 组件签名 | 搜索 `export default function` | 签名为 `function Xxx({ meta }: { meta: KnowledgeNode })` |
| meta 不在组件内定义 | 搜索 `const meta` | 组件内部不应有 `const meta: KnowledgeNode = {...}` |
| 导入 `KnowledgeNode` 类型 | 搜索 `import.*KnowledgeNode` | 存在从 `../../data/types` 的导入 |

**B. 布局结构完整性（严重性：🔴 阻断）**

| 检查项 | 检查方法 | 通过条件 |
|--------|----------|----------|
| flex 外层容器 | 搜索 `className.*flex.*max-w-\[100vw\]` | 存在 `<div className="flex max-w-[100vw] overflow-x-hidden">` |
| SmartTOC 导入 | 搜索 `import.*SmartTOC` | 存在 |
| tocItems 定义 | 搜索 `const tocItems` | 存在 `TocItem[]` 类型数组 |
| SmartTOC 侧边栏 | 搜索 `<SmartTOC` | 存在且**不被** `<aside hidden xl:block>` 包裹 |
| aside 侧边栏 | 搜索 `<aside` | **不应存在**包裹 SmartTOC 的 aside（旧版模板有，新版已移除） |
| ArticleNav 导入 | 搜索 `import.*ArticleNav` | 存在 |
| getArticleNav 导入 | 搜索 `import.*getArticleNav` | 从 `../../data/chapters` 导入 |
| ArticleNav 位置 | 搜索 `<ArticleNav` | 在 `<KnowledgeLayout>` 内部且在最后（`</KnowledgeLayout>` 之前） |

**C. tocItems 与章节 id 一致性（严重性：🟡 警告）**

| 检查项 | 检查方法 | 通过条件 |
|--------|----------|----------|
| 每个 tocItem.id 有对应 DOM id | 对比 `tocItems` 中的 id 与文件中 `id="xxx"` / `<h2 id="xxx">` / `<h3 id="xxx">` | 全部匹配（**包括 level 3 的 h3**） |
| 每个 DOM id 有对应 tocItem | 反向对比 | 全部匹配 |
| h3 有 id 属性 | 搜索 `<h3` 且不含 `id=` | **不应存在无 id 的 h3**（否则移动端点击目录无法跳转） |

**D. 内容结构要素（严重性：🟡 警告）**

12 项结构要素检查（详见 `references/content-spec.md`）：

| 检查项 | 检查方法 | 最低要求 |
|--------|----------|----------|
| 一句话定义 | 搜索 `id="definition"` 或 `<blockquote` | 存在 |
| 整体架构图 | 搜索 `<DiagramBlock` 或 `id="overview"` | 存在 |
| 核心原理 | 搜索 `id="core"` 或核心原理相关 h2 | 存在 |
| 源码分析 | 搜索 `<Playground` | 至少 1 个 |
| 流程/状态转换 | 搜索 `<InteractiveFlow` 或流程相关章节 | 存在 |
| 代码实验场 | 搜索 `<Playground` 中带 `description` | 至少 1 个交互式 |
| 边注/扩展 | 搜索 `<SideNote` | 存在 |
| 上下文切换 | 搜索 `<ContextSwitcher` | 存在 |
| 常见误区 | 搜索 `id="misconceptions"` 或 `<Callout type="danger"` | 至少 3 条 |
| 面试真题 | 搜索 `<InterviewSection` 或 `id="interview"` | 至少 5 题 |
| 对比表格 | 搜索 `<table` 或 `id="comparison"` | 存在 |
| 知识关联 | 搜索 `id="related"` 或前置/延伸知识卡片 | 存在 |

**E. 项目集成（严重性：🔴 阻断）**

| 检查项 | 检查方法 | 通过条件 |
|--------|----------|----------|
| **chapters.ts 中已有完整元数据** | 在 `chapters.ts` 中搜索 slug | **必须存在且 `meta` 字段完整**（步骤 2 应先完成） |
| 文件名与 slug 一致 | 对比文件名（去 `.tsx`）与 `chapters.ts` 中对应文章的 `slug` | 完全一致 |
| meta 字段匹配 | 对比 `chapters.ts` 中的 meta 与组件中 `getArticleNav(meta.category, meta.id)` 使用值 | category 指向正确的章节 ID |

**F. 代码规范（严重性：🟡 警告）**

| 检查项 | 检查方法 | 通过条件 |
|--------|----------|----------|
| 无内联子组件定义 | 搜索 `function [A-Z]` 在组件体内 | 页面文件内不应定义非导出组件 |
| 使用已有封装组件 | 搜索 `<pre><code>` / 手写 tab 逻辑等 | 不存在手写替代 |
| 无 TODO/占位内容 | 搜索 `TODO` / `FIXME` / `xxx` / `待补充` | 不存在 |
| h2/h3 标题样式一致 | 检查 h2/h3 的 className | 与样式约定一致 |

#### 3. 输出检视报告

按以下格式输出检查结果：

```
## 📋 检视报告：<知识点名称>

### 🔴 阻断问题（必须修复）
- [ ] 问题描述 → 修复建议

### 🟡 警告问题（建议修复）
- [ ] 问题描述 → 修复建议

### ✅ 通过项（共 N 项）
- ✅ 组件签名正确：`export default function Xxx({ meta }: { meta: KnowledgeNode })`
- ✅ flex 布局完整
- ...

### 📊 合规评分
- 阻断项：0/0 通过
- 警告项：0/0 通过
- 总体：🟢 合格 / 🟡 需改进 / 🔴 不合格
```

#### 4. 自动修复（可选）

如果用户要求修复发现的问题，按以下优先级处理：
1. 先修复 🔴 阻断问题
2. 再修复 🟡 警告问题
3. 修复后重新运行检视确认

## 常见错误及修复

### 错误 1：右侧目录不显示或缺少文章导航

**症状：** 页面正常渲染，但右侧没有章节目录，或无法切换到上一篇/下一篇文章，或移动端缺少目录悬浮按钮。

**原因：**
- 缺少 `SmartTOC` 组件导入
- 未定义 `tocItems` 数组
- 外层没有使用 flex 布局
- 直接返回 `<KnowledgeLayout>` 而没有包裹在 flex 容器中
- **用 `<aside className="hidden xl:block">` 包裹了 SmartTOC**（这会隐藏移动端的目录按钮）
- **缺少 `ArticleNav` 组件或 `getArticleNav` 函数导入**
- **未在页面末尾添加 `<ArticleNav {...getArticleNav(meta.category, meta.id)} />`**

**修复：**
```tsx
// ❌ 错误写法：缺少 ArticleNav，且 SmartTOC 被 aside 包裹（移动端目录按钮会消失）
export default function XxxPage({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          {/* 内容 */}
        </KnowledgeLayout>
      </div>
      {/* ❌ 禁止！hidden xl:block 会把移动端悬浮按钮一起隐藏 */}
      <aside className="hidden xl:block w-[240px] shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-4">
        <SmartTOC items={tocItems} />
      </aside>
      {/* ❌ 缺少 ArticleNav */}
    </div>
  )
}

// ✅ 正确写法：ArticleNav 在 KnowledgeLayout 内部，SmartTOC 直接渲染
import SmartTOC from '../../components/knowledge/SmartTOC'
import ArticleNav from '../../components/article/ArticleNav'
import { getArticleNav } from '../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../data/types'

const tocItems: TocItem[] = [
  { id: 'section1', text: '章节1', level: 2 },
  { id: 'subsection1', text: '子章节1', level: 3 },
  // ...
]

export default function XxxPage({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          {/* 内容 */}

          {/* ✅ ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>
      {/* ✅ SmartTOC 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
```

### 错误 2：使用了未定义的组件

**症状：** TypeScript 报错 "Cannot find module" 或 "Property does not exist"。

**原因：** 导入了不存在的组件或拼写错误。

**修复：** 扫描 `site/src/components/` 目录确认组件是否存在，检查导入路径是否正确。

### 错误 3：tocItems 与章节 id 不匹配（h3 缺少 id）

**症状：** 点击目录项无法跳转到对应章节，尤其是 h3 级别的子章节。

**原因：** `tocItems` 中的 `id` 与 `<h2>`/`<h3>` 的 `id` 属性不一致，或 `<h3>` 缺少 `id` 属性。

**修复：** 确保每个有目录项的章节都有对应的 `id` 属性，**h3 也必须有 id**：
```tsx
// ❌ 错误：h3 缺少 id，点击目录无法跳转
<h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
  1.1 子章节标题
</h3>

// ✅ 正确：h3 必须有 id，与 tocItems 中的 id 一致
<h3 id="subsection1" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
  1.1 子章节标题
</h3>
```

### 错误 4：文件名与 slug 不一致导致页面 404

**症状：** 访问文章 URL 返回"文章未找到"，但 `chapters.ts` 中已有该文章的元数据。

**原因：** `import.meta.glob` 根据文件名匹配组件。如果 `chapters.ts` 中 `slug` 为 `concurrent-hashmap`，但文件名为 `concurrenthashmap.tsx` 或 `concurrent-hash-map.tsx`，则 `getArticleComponent(slug)` 找不到对应组件。

**修复：** 确保文件名与 slug 完全一致：
```
slug: 'concurrent-hashmap' → 文件: concurrent-hashmap.tsx ✅
slug: 'concurrent-hashmap' → 文件: concurrentHashMap.tsx  ❌
slug: 'concurrent-hashmap' → 文件: concurrent-hash-map.tsx ❌
```

### 错误 5：在组件内部定义 meta 而非从 props 接收

**症状：** TypeScript 编译错误或页面渲染时 meta 数据与 `chapters.ts` 不一致。

**原因：** 旧版模式在组件内部定义 `const meta: KnowledgeNode = {...}`，但当前架构中 meta 由路由层通过 `getArticleMeta()` 获取后注入组件 props。

**修复：**
```tsx
// ❌ 旧写法：组件内部定义 meta
export default function XxxPage() {
  const meta: KnowledgeNode = { id: 'xxx', ... }
  // ...
}

// ✅ 新写法：从 props 接收 meta
export default function XxxPage({ meta }: { meta: KnowledgeNode }) {
  // meta 已由路由层注入，直接使用
}
```

### 错误 6：未先在 chapters.ts 中写入元数据就创建页面

**症状：** 创建页面后发现文件名与 slug 不一致，或 meta 字段缺失/不匹配。

**原因：** 先创建了页面文件，后更新 chapters.ts，导致两者不一致。

**修复：** **严格遵循工作流程：步骤 2（更新 chapters.ts）→ 步骤 3（创建页面）**
1. 先在 `chapters.ts` 中定义完整的 meta 数据（包括 slug、title、level、tags 等）
2. 根据 `chapters.ts` 中的 `slug` 创建对应的页面文件 `<slug>.tsx`
3. 确保文件名与 slug 完全一致

## 使用示例

### 场景 1：元数据已存在，直接生成页面

**用户输入：**
```
创建 ConcurrentHashMap 知识点页面
```

**Skill 执行流程：**
1. ✅ 步骤 0：检测到 `chapters.ts` 中已有 `concurrent-hashmap` 的完整元数据
2. ⏭️ 跳过步骤 1-2
3. ✅ 步骤 3：直接创建 `site/src/pages/articles/concurrent-hashmap.tsx`
4. ✅ 步骤 4-7：生成内容、验证、质量检查
5. ✅ 步骤 8：自动部署到远程服务器

---

### 场景 2：元数据不存在，标准流程

**用户输入：**
```
添加一个新的知识点：Redis 缓存穿透
```

**Skill 执行流程：**
1. ❌ 步骤 0：未在 `chapters.ts` 中找到 "redis-cache-penetration"
2. ✅ 步骤 1：询问用户所属章节、难度等级等信息
3. ✅ 步骤 2：在 `chapters.ts` 中添加新的 ArticleMeta
4. ✅ 步骤 3：创建 `site/src/pages/articles/redis-cache-penetration.tsx`
5. ✅ 步骤 4-8：后续流程同上

---

### 场景 3：批量创建某章节的所有页面

**用户输入：**
```
批量创建 02-collections 章节的所有缺失页面
```

**Skill 执行流程：**
1. ✅ 步骤 0（批量模式）：扫描 `02-collections` 章节下所有文章
2. 🔍 检测哪些页面文件缺失
3. 📋 展示待创建列表并确认
4. 🔄 逐个创建缺失的页面（快速模式）
5. ✅ 全部完成后统一部署

---

### 场景 4：检视已有页面

**用户输入：**
```
检查 hashmap-deep-dive 页面是否符合规范
```

**Skill 执行流程：**
1. ✅ 检视步骤 0：确认元数据和文件都存在
2. ✅ 检视步骤 1-6：逐项检查组件签名、布局结构、内容完整性等
3. 📊 输出检视报告，列出阻断问题和警告问题
4. 💡 如用户要求，自动修复发现的问题
