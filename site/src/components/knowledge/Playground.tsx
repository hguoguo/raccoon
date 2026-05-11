/**
 * 代码展示组件 — 带语法高亮、行标注、文件名徽章和说明文字的代码块
 *
 * @example
 * <Playground
 *   code={`List<String> list = new ArrayList<>();\nlist.add("A");`}
 *   language="java"
 *   highlights={[1]}
 *   filename="Main.java"
 *   description="演示 ArrayList 基本操作"
 * />
 *
 * @props
 * - code: string — 源代码字符串
 * - language: string — 语言标识，如 "java"、"typescript"
 * - highlights?: number[] — 高亮行号
 * - filename?: string — 文件名徽章
 * - description?: string — 代码前的说明文字
 */
import { useState } from 'react'
import CodeBlock from '../ui/CodeBlock'

interface PlaygroundProps {
  code: string
  language: string
  highlights?: number[]
  filename?: string
  description?: string
}

export default function Playground({ code, language, highlights = [], filename, description }: PlaygroundProps) {
  const [showHighlighted, setShowHighlighted] = useState(true)

  return (
    <div className="my-6">
      {description && (
        <div className="text-[13px] text-ink-muted font-sans mb-2 flex items-center gap-2">
          <span className="text-accent font-mono text-[11px] bg-accent-soft px-2 py-0.5 rounded-[3px]">PLAYGROUND</span>
          {description}
        </div>
      )}
      {highlights.length > 0 && (
        <button
          onClick={() => setShowHighlighted(v => !v)}
          className="text-[11px] font-mono text-ink-ghost hover:text-accent mb-2 transition-colors"
        >
          {showHighlighted ? '⚪ 隐藏行标注' : '⚫ 显示行标注'}
        </button>
      )}
      <CodeBlock
        language={language}
        code={code}
        highlights={showHighlighted ? highlights : []}
        filename={filename}
      />
    </div>
  )
}
