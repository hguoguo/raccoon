/**
 * 架构图容器组件 — 带标题的居中可视化容器，用于展示数据结构全景图、流程图等
 *
 * @example
 * <DiagramBlock title="数据结构全景图">
 *   <svg>...</svg>
 * </DiagramBlock>
 *
 * @props
 * - title: string — 图表标题
 * - children: ReactNode — SVG 或其他可视化内容
 */
import type { ReactNode } from 'react'

interface DiagramBlockProps {
  title: string
  children: ReactNode
}

export default function DiagramBlock({ title, children }: DiagramBlockProps) {
  return (
    <div className="bg-parchment-light border border-border rounded-paper-md p-7 my-5 text-center shadow-paper overflow-x-auto">
      <div className="font-sans font-semibold text-xs text-ink-faded mb-4 uppercase tracking-[0.06em]">
        {title}
      </div>
      <div className="w-full max-w-[500px] mx-auto">
        {children}
      </div>
    </div>
  )
}
