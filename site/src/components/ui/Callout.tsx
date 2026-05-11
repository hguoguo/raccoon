/**
 * 提示框组件 — 用于强调关键结论、警告、误区等信息
 * tip=青色💡, warning=橙色⚠️, danger=玫红🔴, info=天蓝📖
 *
 * @example
 * <Callout type="danger" title="误区：HashMap 是线程安全的">
 *   实际上 HashMap 非线程安全...
 * </Callout>
 *
 * @props
 * - type: 'tip' | 'warning' | 'danger' | 'info' — 提示类型
 * - title: string — 标题
 * - children: ReactNode — 内容
 */
import type { ReactNode } from 'react'

type CalloutType = 'tip' | 'warning' | 'danger' | 'info'

interface CalloutProps {
  type: CalloutType
  title: string
  children: ReactNode
}

const calloutConfig: Record<CalloutType, { icon: string; bg: string; border: string; titleColor: string }> = {
  tip: { icon: '💡', bg: 'bg-teal-soft', border: 'border-l-teal', titleColor: 'text-teal' },
  warning: { icon: '⚠️', bg: 'bg-accent-soft', border: 'border-l-accent', titleColor: 'text-accent' },
  danger: { icon: '🔴', bg: 'bg-rose-soft', border: 'border-l-rose', titleColor: 'text-rose' },
  info: { icon: '📖', bg: 'bg-sky-soft', border: 'border-l-sky', titleColor: 'text-sky' },
}

export default function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type]
  return (
    <div className={`flex gap-[14px] p-4 px-5 rounded-paper-md my-5 text-sm leading-[1.7] border-l-[3px] ${config.bg} ${config.border}`}>
      <span className="text-lg shrink-0 mt-0.5">{config.icon}</span>
      <div>
        <div className={`font-semibold mb-1 font-sans ${config.titleColor}`}>{title}</div>
        <div className="text-ink-muted">{children}</div>
      </div>
    </div>
  )
}
