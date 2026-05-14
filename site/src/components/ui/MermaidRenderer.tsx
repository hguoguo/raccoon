/**
 * Mermaid 渲染组件 — 将 Mermaid 语法文本渲染为 SVG 图表
 *
 * @example
 * <MermaidRenderer code="graph LR\n  A --> B" />
 *
 * @props
 * - code: string — Mermaid 语法文本
 */
import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// 初始化 mermaid 配置（全局只执行一次）
let mermaidInitialized = false
function initMermaid() {
  if (mermaidInitialized) return
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
    sequence: {
      useMaxWidth: true,
      showSequenceNumbers: false,
    },
  })
  mermaidInitialized = true
}

interface MermaidRendererProps {
  code: string
}

let idCounter = 0

export default function MermaidRenderer({ code }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    initMermaid()

    const id = `mermaid-${++idCounter}-${Date.now()}`

    // 清理 code：移除可能存在的 ```mermaid 包裹标记
    const cleanCode = code
      .replace(/^```mermaid\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
      .trim()

    // 使用 mermaid.render 进行渲染
    mermaid
      .render(id, cleanCode)
      .then(({ svg: renderedSvg }) => {
        setSvg(renderedSvg)
        setError(null)
      })
      .catch((err) => {
        console.error('Mermaid render error:', err)
        console.error('Failed code:', cleanCode)
        setError(cleanCode)
      })
  }, [code])

  if (error) {
    // 渲染失败时回退为纯文本展示
    return (
      <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre text-left">
        {error}
      </pre>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-renderer w-full flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
