/**
 * 侧边备注组件 — 不打断主线的补充说明（历史演进、版本差异、延伸阅读）
 *
 * @example
 * <SideNote label="JDK 版本差异">
 *   JDK7 使用头插法，JDK8 改为尾插法...
 * </SideNote>
 *
 * @props
 * - children: ReactNode — 备注内容
 * - label?: string — 标签文字，默认 "备注"
 */
import type { ReactNode } from 'react'

interface SideNoteProps {
  children: ReactNode
  label?: string
}

export default function SideNote({ children, label = '备注' }: SideNoteProps) {
  return (
    <aside className="my-5 sm:ml-4 sm:pl-4 ml-2 pl-3 border-l-[3px] border-l-ink-whisper py-1">
      <div className="text-[10px] sm:text-[11px] font-mono text-ink-ghost uppercase tracking-[0.06em] mb-1">
        {label}
      </div>
      <div className="text-[12px] sm:text-[13px] text-ink-muted font-sans leading-[1.7]">
        {children}
      </div>
    </aside>
  )
}
