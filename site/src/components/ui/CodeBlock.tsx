/**
 * 基础代码块组件 — 带语法高亮、行号、复制按钮的代码展示（底层组件，通常通过 Playground 使用）
 *
 * @example
 * <CodeBlock language="java" code="System.out.println(42);" highlights={[1]} filename="Main.java" />
 *
 * @props
 * - language: string — 语言标识
 * - code: string — 源代码字符串
 * - highlights?: number[] — 高亮行号
 * - filename?: string — 文件名徽章
 */
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  language: string
  code: string
  highlights?: number[]
  filename?: string
}

export default function CodeBlock({ language, code, highlights = [], filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-paper-aged border border-border rounded-paper-md my-5 overflow-hidden shadow-paper">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-parchment-deep border-b border-border font-mono text-[11px] text-ink-faded">
        <span className="bg-accent-soft text-accent px-2 py-0.5 rounded-[3px] text-[10px] uppercase font-semibold">
          {language}
        </span>
        {filename && <span className="text-ink-ghost text-[11px]">{filename}</span>}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 bg-transparent border-none text-ink-faded cursor-pointer text-xs hover:text-ink-muted transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span className="text-[12px]">{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
      {/* Code */}
      <pre className="p-4 px-5 overflow-x-auto font-mono text-[13px] leading-[1.7] text-ink-muted">
        <code>
          {code.split('\n').map((line, i) => (
            <div
              key={i}
              className={
                highlights.includes(i + 1)
                  ? 'bg-accent-glow -mx-5 px-5 border-l-2 border-accent'
                  : ''
              }
            >
              {line || ' '}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
