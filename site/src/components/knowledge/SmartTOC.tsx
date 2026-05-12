/**
 * 智能目录导航组件 — 自动追踪滚动位置，桌面端右侧栏，移动端悬浮按钮+底部抽屉
 *
 * @example
 * <SmartTOC items={[
 *   { id: 'definition', text: '一句话定义', level: 2 },
 *   { id: 'source', text: '源码分析', level: 3 },
 * ]} />
 *
 * @props
 * - items: TocItem[] — 目录项列表，每项含 id, text, level(2=h2, 3=h3)
 */
import { useState, useEffect, useRef } from 'react'
import type { TocItem } from '../../data/types'
import { List } from 'lucide-react'

interface SmartTOCProps {
  items: TocItem[]
}

export default function SmartTOC({ items }: SmartTOCProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const headings = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )

    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  const scrollTo = (id: string) => {
    const targetEl = document.getElementById(id)
    // Close mobile sheet first (removes body-lock), then scroll after layout settles
    setMobileOpen(false)
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }, 350)
    }
  }

  // Lock body scroll when mobile TOC is open (save/restore scroll position)
  useEffect(() => {
    if (mobileOpen) {
      scrollYRef.current = window.scrollY
      document.body.classList.add('body-lock')
    } else {
      document.body.classList.remove('body-lock')
      window.scrollTo(0, scrollYRef.current)
    }
    return () => document.body.classList.remove('body-lock')
  }, [mobileOpen])

  const tocContent = (
    <>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-ghost mb-3 font-sans">
        目录
      </div>
      <ul className="list-none">
        {items.map(item => (
          <li key={item.id} className="mb-[2px]">
            <button
              onClick={() => scrollTo(item.id)}
              className={`block text-left w-full text-[12px] font-sans py-1.5 px-[10px] border-l-2 rounded-r-[3px] transition-all duration-150 leading-[1.5] ${
                activeId === item.id
                  ? 'text-accent border-l-accent bg-accent-soft'
                  : item.level === 3
                    ? 'text-ink-faded pl-5 text-[11px] border-l-transparent hover:text-ink-muted hover:bg-accent-glow'
                    : 'text-ink-faded border-l-transparent hover:text-ink-muted hover:bg-accent-glow'
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <>
      {/* Desktop TOC — right sidebar */}
      <aside className="hidden xl:block fixed top-[54px] right-0 bottom-0 w-[220px] p-6 overflow-y-auto border-l border-border bg-[rgba(247,242,232,0.6)]">
        {tocContent}
      </aside>

      {/* Mobile TOC — floating button + right drawer */}
      {/* Floating Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-20 right-5 w-11 h-11 rounded-full bg-teal text-white shadow-[0_4px_16px_rgba(95,122,104,0.35)] flex items-center justify-center z-[90] hover:scale-105 active:scale-95 transition-transform xl:hidden"
        aria-label="文章目录"
      >
        <List size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[rgba(44,36,22,0.3)] z-[199] xl:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Right Drawer */}
      <div className={`
        fixed top-0 right-0 bottom-0 w-[260px] bg-parchment-light border-l border-border
        z-[200] overflow-y-auto
        shadow-[-8px_0_32px_rgba(44,36,22,0.15)]
        transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        xl:hidden
      `}>
        <div className="flex items-center justify-between px-5 pt-[18px] pb-3 border-b border-border-light sticky top-0 bg-parchment-light z-[1]">
          <h3 className="font-display font-bold text-base text-ink">📑 文章目录</h3>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-full bg-parchment-deep border border-border text-ink-muted flex items-center justify-center hover:bg-paper-aged transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-4 pb-8">
          {tocContent}
        </div>
      </div>
    </>
  )
}
