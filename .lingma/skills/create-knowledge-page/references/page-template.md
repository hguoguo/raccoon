# 页面模板

知识点文章页面的标准模板。

## 文件位置
`site/src/pages/articles/<slug>.tsx`

## 命名规范
- 文件名：kebab-case，如 `concurrent-hashmap.tsx`、`array-list.tsx`
- 组件名：PascalCase，如 `ConcurrentHashmap`、`ArrayListDeepDive`

## 完整模板

**⚠️ 重要：布局结构必须严格按照以下格式，否则右侧目录不会显示！**

```tsx
import KnowledgeLayout from '../../components/knowledge/KnowledgeLayout'
import Playground from '../../components/knowledge/Playground'
import InteractiveFlow from '../../components/knowledge/InteractiveFlow'
import SideNote from '../../components/knowledge/SideNote'
import ContextSwitcher from '../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../components/knowledge/SmartTOC'  // ⚠️ 必须导入
// import XxxAnimator from '../../components/knowledge/XxxAnimator'  // 仅当需要自定义动画时
import Callout from '../../components/ui/Callout'
import DiagramBlock from '../../components/ui/DiagramBlock'
import InterviewSection from '../../components/ui/InterviewSection'
import ArticleNav from '../../components/article/ArticleNav'
import type { KnowledgeNode, TocItem } from '../../data/types'  // ⚠️ 必须导入类型

const meta: KnowledgeNode = {
  id: '{{SLUG}}',
  title: '{{TITLE}}',
  level: 'Senior',
  tags: ['{{TAG1}}', '{{TAG2}}'],
  difficulty: 3,
  category: '{{CHAPTER_ID}}',
  prerequisites: ['{{PREREQ}}'],
  relatedPatterns: ['{{RELATED}}'],
  readingTime: 30,
}

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、整体架构概述', level: 2 },
  { id: 'structure', text: '二、底层数据结构', level: 2 },
  { id: 'core', text: '三、核心原理', level: 2 },
  { id: 'source', text: '3.1 源码分析', level: 3 },
  { id: 'flow', text: '3.2 操作流程', level: 3 },
  { id: 'animation', text: '3.3 操作动画演示', level: 3 },
  { id: 'comparison', text: '四、同类对比', level: 2 },
  { id: 'misconceptions', text: '五、常见误区', level: 2 },
  { id: 'interview', text: '六、面试真题', level: 2 },
  { id: 'related', text: '七、知识关联', level: 2 },
]

export default function {{PascalCaseName}}() {
  return (
    {/* ⚠️ 外层必须是 flex 布局 */}
    <div className="flex max-w-[100vw] overflow-x-hidden">
      {/* 左侧主内容区 */}
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* 1. 一句话定义 */}
          <section id="definition">
            <blockquote className="border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md">
              <p className="text-[15px] sm:text-base font-medium text-ink leading-[1.7]">
                {{ONE_SENTENCE_DEFINITION}}
              </p>
            </blockquote>
          </section>

          {/* 2. 整体架构概述 */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一、整体架构概述
            </h2>
            <DiagramBlock title="{{DIAGRAM_TITLE}}">
              {/* SVG 或可视化内容 */}
            </DiagramBlock>
          </section>

          {/* 3. 底层数据结构 */}
          <section id="structure">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              二、底层数据结构
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              {{STRUCTURE_DESCRIPTION}}
            </p>
          </section>

          {/* 4. 核心原理 */}
          <section id="core">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              三、核心原理
            </h2>

            <h3 id="source" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.1 源码分析
            </h3>
            <Playground code={`...`} language="java" highlights={[3,7,12]} filename="Xxx.java" description="..." />

            <h3 id="flow" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              3.2 操作流程
            </h3>
            <InteractiveFlow title="..." steps={[...]} />

            {/* <h3 id="animation" ...>3.3 操作动画演示</h3>
            <XxxAnimator /> */}
          </section>

          {/* 5. 同类对比 */}
          <section id="comparison">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              四、同类对比
            </h2>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead><tr className="border-b-2 border-border">
                  <th className="text-left py-2 px-3 font-semibold text-ink">特性</th>
                  <th className="text-left py-2 px-3 font-semibold text-ink">{{A}}</th>
                  <th className="text-left py-2 px-3 font-semibold text-ink">{{B}}</th>
                </tr></thead>
                <tbody><tr className="border-b border-border-light">
                  <td className="py-2 px-3 text-ink-muted">底层数据结构</td>
                  <td className="py-2 px-3 text-ink">...</td>
                  <td className="py-2 px-3 text-ink">...</td>
                </tr></tbody>
              </table>
            </div>
          </section>

          {/* 6. 常见误区 */}
          <section id="misconceptions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              五、常见误区
            </h2>
            <Callout type="danger" title="误区一：...">
              <span className="font-semibold text-ink-light">你以为的：</span>...<br />
              <span className="font-semibold text-accent">实际：</span>...
            </Callout>
          </section>

          {/* 7. 面试真题 */}
          <section id="interview">
            <InterviewSection questions={[...]} />
          </section>

          {/* 8. 知识关联 */}
          <section id="related">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              七、知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
                <div className="text-[10px] font-mono text-ink-ghost mb-1">前置知识</div>
                <div className="text-[13px] font-medium text-ink">{{PREREQ}}</div>
              </div>
              <div className="p-4 bg-accent-glow border border-accent/20 rounded-paper-md">
                <div className="text-[10px] font-mono text-accent mb-1">延伸知识</div>
                <div className="text-[13px] font-medium text-ink">{{RELATED}}</div>
              </div>
            </div>
          </section>

          <ArticleNav prevTitle="..." prevPath="/docs/..." nextTitle="..." nextPath="/docs/..." />
        </KnowledgeLayout>
      </div>
      
      {/* ⚠️ 右侧目录侧边栏（仅大屏 xl 以上显示）*/}
      <aside className="hidden xl:block w-[240px] shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-4">
        <SmartTOC items={tocItems} />
      </aside>
    </div>
  )
}
```

## 需要更新的其他文件

### 1. chapters.ts
路径：`site/src/data/chapters.ts`

在对应章节的 `articles` 数组中添加：
```ts
{
  slug: '{{SLUG}}',
  title: '{{TITLE}}',
  meta: { ...与页面中 meta 一致... }
}
```

或创建新章节：
```ts
{
  id: '{{CHAPTER_ID}}',
  title: '{{CHAPTER_TITLE}}',
  icon: '{{EMOJI}}',
  description: '...',
  difficulty: 3,
  color: 'teal',  // 'orange' | 'teal' | 'rose' | 'indigo'
  articles: [...]
}
```

### 2. App.tsx
路径：`site/src/App.tsx`

添加导入：
```ts
import {{PascalCaseName}} from './pages/articles/{{slug}}'
```

添加路由（在 `<Routes>` 内）：
```tsx
<Route path="/docs/{{chapterId}}/{{slug}}" element={<{{PascalCaseName}} />} />
```
