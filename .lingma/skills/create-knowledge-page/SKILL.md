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

**默认行为：快速、自动化、无中断地完成整个流程。** 仅在文件已存在且未明确覆盖、或检测到严重冲突时才需确认。

---

## 核心规范（所有规则仅在此定义一次）

### 1. 四层结构路径

页面文件必须存放在对应的四层目录中：

```
Domain(领域) → SubCategory(子类别) → Chapter(章节) → Article(文章)
```

**路径公式：** `site/src/pages/articles/{domain.id}/{subCategory.id}/{category}/{slug}.tsx`

从 `chapters.ts` 中的 `domains` 数据查找 domain 和 subCategory：
```typescript
const domain = domains.find(d => d.subCategories.some(sc => sc.chapters.some(ch => ch.id === meta.category)))
const subCategory = domain?.subCategories.find(sc => sc.chapters.some(ch => ch.id === meta.category))
```

**路径示例：**

| category | 文件路径 |
|----------|----------|
| 01-java-core | `backend/java/01-java-core/java-basics.tsx` |
| 02-collections | `backend/java/02-collections/hashmap-deep-dive.tsx` |
| 06-spring-framework | `backend/java/06-spring-framework/spring-transaction.tsx` |
| 06-ai-theory | `ai/ai-application/06-ai-theory/llm-basics.tsx` |
| 07-ai-frameworks | `ai/ai-application/07-ai-frameworks/langchain-basics.tsx` |
| redis | `infra/nosql/redis/redis-cache.tsx` |

**规则：** 目录不存在时必须先创建；文件路径必须从 `chapters.ts` 中的层级数据计算得出。

### 2. 文件名 = slug

- slug 使用 **kebab-case**（如 `concurrent-hashmap`）
- 文件名必须与 slug **完全一致**（`concurrent-hashmap.tsx`）
- `meta.id` 与 slug 一致（路由层通过 `getArticleMeta(category, id)` 查找）
- 原因：`import.meta.glob` 根据文件名匹配组件，不一致会导致页面 404

### 3. meta 由路由层注入

- **禁止**在组件内部定义 `const meta: KnowledgeNode = {...}`
- 组件签名必须为：`export default function Xxx({ meta }: { meta: KnowledgeNode })`
- meta 数据定义在 `chapters.ts` 中，由路由层通过 `getArticleMeta()` 注入 props

### 4. 布局结构

```tsx
export default function XxxPage({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>
          {/* 文章内容 */}

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
```

**关键规则：**
- **SmartTOC**：直接渲染 `<SmartTOC items={tocItems} />`，禁止用 `<aside className="hidden xl:block">` 包裹（会隐藏移动端悬浮按钮）
- **ArticleNav**：必须在 `<KnowledgeLayout>` 内部的最后位置
- **tocItems**：必须定义 `TocItem[]` 数组，所有 `<h2>` 和 `<h3>` 都必须有 `id` 属性与 tocItems 一一对应
- **必须导入**：`SmartTOC`、`ArticleNav`、`getArticleNav`、`KnowledgeNode`/`TocItem` 类型

### 5. 导入路径计算

根据文件所在层级深度计算相对路径：
- `backend/java/01-java-core/java-basics.tsx` → `../../../../../components/...`（5层到 src/）
- 通用：从文件位置向上数到 `src/` 目录的层数，再进入 `components/` 或 `data/`

### 6. 组件使用规范

- **必须使用**项目已封装的组件（`Playground`、`SideNote`、`ContextSwitcher`、`Callout` 等），禁止内联拼凑
- **禁止**在页面中内联定义子组件（如 `function XxxCard() {...}`）
- **需要新组件时**：先在 `components/knowledge/` 或 `components/ui/` 下封装独立可复用组件，写好 JSDoc 头部注释，再使用
- 可用组件以代码即文档方式管理：组件文件头部有 JSDoc 注释，步骤 1 自动扫描

### 7. 样式约定

- h2：`className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink"`
- h3：`className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink"`
- 正文：`className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4"`
- 行内代码：`className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]"`
- 重复出现的 UI 模式应封装为组件，不在页面中复制 className

### 8. 内容要素

每篇文章必须包含 12 项结构要素，详见 `references/content-spec.md`。

时间有限时的优先级：定义+架构图 > 原理+源码 > 面试真题 > 流程图+误区 > 实验场+上下文切换

---

## 工作流程

### 步骤 0：检测元数据是否已存在

**在开始任何工作之前，先检查 `chapters.ts` 中是否已有该知识点的元数据。**

1. 从用户需求中提取知识点名称或 slug
2. 在 `chapters.ts` 中搜索匹配项（精确匹配 slug → 模糊匹配 title → 关键词包含）
3. 判断结果：
   - ✅ 找到完整 meta → 跳转【快速模式】
   - ❌ 未找到 → 继续标准流程（步骤 1-8）

#### 快速模式：直接生成页面

元数据已存在时，跳过步骤 1-2：

1. 确认 meta 完整性（slug、title、level、tags、difficulty、category、prerequisites、relatedPatterns、readingTime）
2. 根据核心规范 §1 计算文件路径
3. 文件已存在 → 询问是否覆盖；不存在 → 直接创建
4. 使用 meta 中的 tags/level/difficulty/prerequisites 指引内容创作
5. 完成后直接执行步骤 8 自动部署

#### 批量创建模式

用户请求"批量创建某章节的所有页面"时：

1. 识别目标章节，扫描该章节下所有文章的 slug
2. 检测哪些页面文件缺失（根据核心规范 §1 计算路径）
3. 展示待创建列表，自动逐个创建（可用 `dispatching-parallel-agents` skill 并行）
4. 全部完成后统一执行步骤 8 部署

**注意：** 每个页面内容质量不降低；元数据不完整的页面跳过并提示；批量操作只在最后统一部署一次。

**⚠️ 并行 Agent 约束（极易出错，必须遵守）：**

使用 `dispatching-parallel-agents` 派发子任务时，**必须在 prompt 中明确以下约束**，否则子代理可能误判为"浏览前端页面"而调用 Browser 工具，导致无法写入文件：

1. **任务性质声明**：明确告知子代理这是一个**代码文件生成任务**，不是浏览/测试任务
2. **工具限制**：子代理只能使用 `write_to_file` / `replace_in_file` 写入文件，**禁止使用 Browser Automation、playwright-cli 等浏览器自动化工具**
3. **禁止预览**：子代理不需要启动 dev server 或在浏览器中预览页面
4. **单个文件职责**：每个子代理只负责生成一个 `.tsx` 文件

**子代理 Prompt 模板（直接复制使用）：**

```
你是一个代码生成代理。你的任务是创建一个知识点页面 TSX 文件。

【任务性质】这是一个纯代码文件生成任务，你只需要写文件，不需要浏览网页、启动服务器或预览效果。

【工具限制】
- ✅ 使用 write_to_file 创建文件
- ✅ 使用 replace_in_file 修改文件
- ✅ 使用 read_file 读取参考文件
- ❌ 禁止使用 Browser Automation / playwright-cli 等浏览器工具
- ❌ 禁止启动 dev server 或 npm run dev
- ❌ 禁止尝试预览页面

【任务详情】
- 知识点：{title}
- slug：{slug}
- 目标文件路径：{filePath}
- 章节：{category}
- 难度：{level}
- 标签：{tags}

【执行步骤】
1. 读取 site/src/data/chapters.ts 确认元数据
2. 扫描 site/src/components/knowledge/ 和 site/src/components/ui/ 下的组件 JSDoc
3. 参考已有页面（如 langgraph-core.tsx）的布局结构
4. 使用 write_to_file 在目标路径创建 .tsx 文件
5. 确保文件内容遵循以下核心规范：
   - 组件签名：export default function Xxx({ meta }: { meta: KnowledgeNode })
   - 布局：flex 容器 + KnowledgeLayout + SmartTOC + ArticleNav
   - SmartTOC 直接渲染，不用 aside 包裹
   - ArticleNav 在 KnowledgeLayout 内部末尾
   - 所有 h2/h3 有 id 属性，与 tocItems 对应
   - 包含 12 项结构要素（定义、架构、原理、源码、流程、实验场、边注、上下文切换、误区、面试、对比、关联）
6. 完成后报告文件路径，不要执行构建或部署
```

### 步骤 1：收集需求 + 扫描组件库（标准流程）

*仅在步骤 0 未找到元数据时执行。*

确认（或从上下文推断）：
- 知识点名称、所属章节、难度等级（Junior/Senior/Expert）、前置知识、关联知识点

**智能推断：** HashMap → 02-collections；多线程 → 03-concurrency；Python → 04-python；基础概念 → Junior，框架 → Senior，源码 → Expert

然后扫描组件库：读取 `components/knowledge/`、`components/ui/`、`components/article/` 下所有 `.tsx` 文件的 JSDoc 头部注释，了解可用组件。

### 步骤 2：更新章节目录（先写元数据！）

*元数据已存在则跳过。*

编辑 `site/src/data/chapters.ts`，添加完整的 ArticleMeta 对象（结构见 `references/page-template.md` 中的"chapters.ts 元数据模板"）。

**无需手动更新路由或组件映射**——`import.meta.glob` 自动发现组件，动态路由 `<Route path="/docs/:chapterId/:slug">` 自动渲染。

### 步骤 3：创建文章页面

根据核心规范 §1 计算路径，创建 `<slug>.tsx` 文件。模板见 `references/page-template.md`。参考已有页面 `langgraph-core.tsx` 的布局结构。

严格遵循核心规范 §2-§7 的所有规则。

### 步骤 4：创建自定义动画组件（可选）

涉及数据结构操作时，使用 `StepAnimator<TStep>` 创建专属动画组件，放在 `components/knowledge/<TopicName>Animator.tsx`。

### 步骤 5：创建新通用组件（如需要）

按核心规范 §6 的规范封装，写好 JSDoc 头部注释。

### 步骤 6：验证

运行 `npm run build` 确认无错误。构建失败时自动分析错误日志并修复。

### 步骤 7：质量检查

确认以下项：

**内容完整性：** 12 项要素齐全；源码附运行结果；面试题 ≥5 道；误区 ≥3 条；对比表格数据准确；无占位/TODO。

**技术准确性：** 概念正确；代码可运行；性能结论有依据；信息不过时。

**项目集成（对应核心规范）：**
- §1 文件路径符合四层结构
- §2 文件名 = slug
- §3 组件签名正确，meta 由 props 接收
- §4 布局结构完整（SmartTOC/ArticleNav/tocItems）
- §5 导入路径正确
- §7 样式一致
- `npm run build` 通过

### 步骤 8：自动部署

1. 提交到 Git：`git add . && git commit -m "feat: 添加 <知识点名称> 页面" && git push`
2. 调用 `remote-deploy` skill（SSH → 拉代码 → 构建 → Docker → 重启）
3. 验证部署成功

**批量创建时只在最后统一部署一次。**

---

## 检视模式

当用户要求检查/审核已有页面时执行。

### 检视步骤

**0. 前置检测：** 扫描 `chapters.ts` 中所有文章，根据核心规范 §1 计算路径，检查页面文件是否存在。缺失的仅报告，不自动创建。

**1. 定位目标文件：** 在 `chapters.ts` 中查找 meta 数据，根据核心规范 §1 计算文件路径，读取文件内容。

**2. 逐项检查：**

| 维度 | 严重性 | 关键检查项 |
|------|--------|-----------|
| 组件签名与 meta | 🔴 阻断 | 签名为 `function Xxx({ meta }: { meta: KnowledgeNode })`；内部无 `const meta` 定义；导入了 `KnowledgeNode` 类型 |
| 布局结构 | 🔴 阻断 | flex 外层容器；SmartTOC 导入并直接渲染（无 aside 包裹）；tocItems 定义；ArticleNav 导入并在 KnowledgeLayout 内部末尾 |
| tocItems 一致性 | 🟡 警告 | 每个 tocItem.id 有对应 DOM id；每个 h2/h3 有 id 属性（含 h3） |
| 内容结构 | 🟡 警告 | 12 项要素检查（见 `references/content-spec.md`）：定义、架构图、原理、源码、流程、实验场、边注、上下文切换、误区(≥3)、面试(≥5)、对比、关联 |
| 项目集成 | 🔴 阻断 | chapters.ts 中有完整元数据；文件路径符合 §1；文件名 = slug；导入路径正确 |
| 代码规范 | 🟡 警告 | 无内联子组件；使用封装组件；无 TODO/占位；样式一致 |

**3. 输出检视报告：**

```
## 检视报告：<知识点名称>

### 🔴 阻断问题（必须修复）
- [ ] 问题描述 → 修复建议

### 🟡 警告问题（建议修复）
- [ ] 问题描述 → 修复建议

### ✅ 通过项（共 N 项）
- ✅ ...

### 合规评分
- 总体：🟢 合格 / 🟡 需改进 / 🔴 不合格
```

**4. 自动修复（可选）：** 用户要求时按 🔴→🟡 优先级修复，修复后重新检视。

---

## 常见错误速查

| 症状 | 原因 | 修复 |
|------|------|------|
| 右侧目录不显示 / 移动端缺目录按钮 | SmartTOC 被 aside 包裹或未导入 | → 核心规范 §4 |
| 无法切换上/下篇文章 | 缺 ArticleNav 或位置错误 | → 核心规范 §4 |
| 点击目录项无法跳转 | h2/h3 缺 id 或与 tocItems 不一致 | → 核心规范 §4 |
| 页面 404 | 文件名 ≠ slug 或路径层级错误 | → 核心规范 §1 §2 |
| meta 数据不一致 | 组件内部定义了 meta | → 核心规范 §3 |
| 组件找不到 | 导入路径错误 | → 核心规范 §5 |
| slug 与文件名不匹配 | 先建页面后写元数据 | 严格按步骤 2→3 顺序执行 |
