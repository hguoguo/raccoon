# 知识点内容规范

## 一、元信息（KnowledgeNode）

| 字段 | 说明 |
|------|------|
| `level` | Junior / Senior / Expert，读者自我定位 |
| `difficulty` | 1-5 星，内容本身的难度 |
| `tags` | 检索关键词，方便搜索和关联 |
| `prerequisites` | 前置知识点，形成依赖图 |
| `readingTime` | 阅读时长预期（分钟） |

## 二、正文结构要素（12 项，必须全部包含）

### 1. 一句话定义
开篇用一句话说清这个知识点是什么，建立认知锚点。
组件：blockquote + accent 样式

### 2. 整体架构图
可视化全局结构，先见森林再看树木。
组件：`DiagramBlock`

### 3. 核心原理
深入底层机制（源码、算法、设计思想），用 Callout 强调关键结论。
组件：正文 + `Callout`

### 4. 源码分析
带注释的关键源码片段，不是贴全量，而是裁剪出核心逻辑。
**必须附上运行结果**：在代码块后用注释或单独代码块展示实际输出，让读者无需编译即可理解执行效果。
组件：`Playground`（带 highlights 标注关键行）

### 5. 流程/状态转换
把 put/get/resize 等过程做成可交互的流程图。
组件：`InteractiveFlow`

### 6. 代码实验场
可修改参数、观察输出的交互区，从"看懂"到"会用"。
**示例代码片段应附带运行结果**，帮助读者直接理解输出。
组件：`Playground`

### 7. 边注/扩展
不打断主线的补充：历史演进、不同 JDK 版本差异、延伸阅读。
组件：`SideNote`

### 8. 上下文切换
同一知识点在不同上下文下的表现（如 JDK7 vs JDK8、单线程 vs 并发）。
组件：`ContextSwitcher`

### 9. 常见误区
"你以为的 ×  实际的 ✓"，避免面试踩坑。至少 3 条。
组件：`Callout` (type="danger")

### 10. 面试真题
高频面试题 + 参考答案。至少 5 题。
组件：`InterviewSection`

### 11. 对比表格
与同类技术的横向对比（如 HashMap vs TreeMap vs LinkedHashMap）。
组件：Markdown 表格

### 12. 知识关联
prerequisites + relatedPatterns 形成知识图谱导航。
组件：自定义卡片链接

## 三、写作模板

```tsx
{/* 1. 一句话定义 */}
<blockquote>HashMap 是基于哈希表的键值对存储结构，JDK8 后采用 数组+链表+红黑树 实现。</blockquote>

{/* 2. 整体架构（DiagramBlock） */}
<DiagramBlock title="数据结构全景图">...</DiagramBlock>

{/* 3. 核心原理 */}
<h2>核心原理</h2>
{/* 数据结构 / 哈希计算 / 扩容机制 */}
{/* 每节：原理 → 源码 → 交互验证 */}

{/* 4. 源码分析（Playground） */}
<Playground code={...} language="java" highlights={[3,7,12]} />

{/* 5. 流程详解（InteractiveFlow） */}
<InteractiveFlow title="put 流程" steps={[...]} />

{/* 6. 代码实验场（Playground） */}
<Playground code={...} language="java" description="修改初始容量观察阈值变化" />

{/* 7. 边注/扩展（SideNote） */}
<SideNote label="JDK 版本差异">...</SideNote>

{/* 8. 上下文对比（ContextSwitcher） */}
<ContextSwitcher simpleContent={...} hardcoreContent={...} />

{/* 9. 常见误区（Callout danger） */}
<Callout type="danger" title="误区一：...">...</Callout>

{/* 10. 面试真题（InterviewSection） */}
<InterviewSection questions={[...]} />

{/* 11. 对比表格 */}
<table>...</table>

{/* 12. 知识关联 */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">...</div>
```

## 优先级建议

1. **一句话定义 + 架构图** — 最有价值，秒建全局认知
2. **核心原理 + 源码** — 面试必问
3. **面试真题** — 目标驱动
4. **流程图 + 误区** — 区分度最高
5. **Playground + 上下文切换** — 锦上添花
