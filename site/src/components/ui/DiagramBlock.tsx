/**
 * 架构图容器组件 — 带标题的居中可视化容器，用于展示数据结构全景图、流程图等
 *
 * 支持三种使用方式：
 * 1. 传入 Mermaid 语法文本（自动检测并渲染为 SVG）
 * 2. 传入 ReactNode（如 <pre> 标签的 ASCII 图，或 <svg>）
 * 3. 传入带有 ```mermaid 包裹的文本（自动清理并渲染）
 *
 * @example
 * // Mermaid 语法（自动渲染）
 * <DiagramBlock title="流程图">
 *   {`graph LR\n  A --> B`}
 * </DiagramBlock>
 *
 * // ASCII 图
 * <DiagramBlock title="架构图">
 *   <pre>...</pre>
 * </DiagramBlock>
 *
 * @props
 * - title: string — 图表标题
 * - children: ReactNode — Mermaid 文本、SVG、ASCII 图等
 */
import type { ReactNode } from 'react'
import MermaidRenderer from './MermaidRenderer'

interface DiagramBlockProps {
  title: string
  children: ReactNode
}

/** 判断字符串是否为 Mermaid 语法 */
function isMermaidCode(text: string): boolean {
  const trimmed = text.trim()
  // 已被 ```mermaid 包裹
  if (/^```mermaid\s*\n/i.test(trimmed)) return true
  // 以 Mermaid 图表类型关键字开头
  return /^(graph |flowchart |sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|gitGraph|journey|mindmap|timeline|quadrantChart|sankey|xychart|block\b)/i.test(trimmed)
}

/** 清理 Mermaid 代码中的包裹标记 */
function cleanMermaidCode(text: string): string {
  return text
    .replace(/^```mermaid\s*\n?/i, '')
    .replace(/\n?```\s*$/i, '')
    .trim()
}

export default function DiagramBlock({ title, children }: DiagramBlockProps) {
  // 判断 children 是否为 Mermaid 文本
  let mermaidCode: string | null = null
  let isMermaid = false

  if (typeof children === 'string') {
    if (isMermaidCode(children)) {
      mermaidCode = cleanMermaidCode(children)
      isMermaid = true
    }
  }

  return (
    <div className="bg-parchment-light border border-border rounded-paper-md p-7 my-5 text-center shadow-paper overflow-x-auto">
      <div className="font-sans font-semibold text-xs text-ink-faded mb-4 uppercase tracking-[0.06em]">
        {title}
      </div>
      <div className={`w-full ${isMermaid ? '' : 'max-w-[500px]'} mx-auto`}>
        {isMermaid && mermaidCode ? (
          <MermaidRenderer code={mermaidCode} />
        ) : (
          children
        )}
      </div>
    </div>
  )
}
