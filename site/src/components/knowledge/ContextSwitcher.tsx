/**
 * 上下文切换组件 — 同一知识点在不同上下文下的表现（如简明模式 vs 硬核模式、JDK7 vs JDK8）
 *
 * @example
 * <ContextSwitcher
 *   simpleContent={<p>简单说明...</p>}
 *   hardcoreContent={<p>底层源码细节...</p>}
 * />
 *
 * @props
 * - simpleContent: ReactNode — 简明模式内容
 * - hardcoreContent: ReactNode — 硬核模式内容
 */
import { useState, type ReactNode } from 'react'

interface ContextSwitcherProps {
  simpleContent: ReactNode
  hardcoreContent: ReactNode
}

export default function ContextSwitcher({ simpleContent, hardcoreContent }: ContextSwitcherProps) {
  const [mode, setMode] = useState<'simple' | 'hardcore'>('simple')

  return (
    <div className="my-5">
      {/* Switcher Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('simple')}
          className={`px-4 py-1.5 rounded-paper-md text-[13px] font-medium font-sans transition-all duration-200 border ${
            mode === 'simple'
              ? 'bg-accent-soft border-accent/30 text-accent'
              : 'bg-parchment-light border-border text-ink-muted hover:border-border-dark hover:text-ink-light'
          }`}
        >
          🌱 简明模式
        </button>
        <button
          onClick={() => setMode('hardcore')}
          className={`px-4 py-1.5 rounded-paper-md text-[13px] font-medium font-sans transition-all duration-200 border ${
            mode === 'hardcore'
              ? 'bg-rose-soft border-rose/30 text-rose'
              : 'bg-parchment-light border-border text-ink-muted hover:border-border-dark hover:text-ink-light'
          }`}
        >
          🔥 硬核模式
        </button>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {mode === 'simple' ? simpleContent : hardcoreContent}
      </div>
    </div>
  )
}
