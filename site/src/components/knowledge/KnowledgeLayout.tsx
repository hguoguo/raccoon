/**
 * 知识点文章布局组件 — 渲染文章头部（等级徽章、难度星级、阅读时长、标题、标签）并包裹正文内容
 *
 * @example
 * <KnowledgeLayout meta={meta}>
 *   <section>...</section>
 * </KnowledgeLayout>
 *
 * @props
 * - meta: KnowledgeNode — 文章元信息（id, title, level, tags, difficulty, category, prerequisites, relatedPatterns, readingTime）
 * - children: ReactNode — 文章正文内容
 */
import type { ReactNode } from 'react'
import type { KnowledgeNode } from '../../data/types'

interface KnowledgeLayoutProps {
  meta: KnowledgeNode
  children: ReactNode
}

export default function KnowledgeLayout({ meta, children }: KnowledgeLayoutProps) {
  return (
    <article className="animate-fade-in">
      {/* Article Header */}
      <header className="mb-8 sm:mb-10 pb-5 sm:pb-7 border-b border-border">
        <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap mb-3 sm:mb-4">
          <LevelBadge level={meta.level} />
          <DifficultyStars difficulty={meta.difficulty} />
          <span className="text-[11px] sm:text-[12px] text-ink-faded font-sans flex items-center gap-1">
            ⏱ 约{meta.readingTime}分钟
          </span>
        </div>
        <h1 className="font-display font-bold text-[24px] sm:text-display-lg tracking-tight text-ink mb-3 sm:mb-[14px] leading-[1.3]">
          {meta.title}
        </h1>
        <div className="flex gap-1.5 flex-wrap mt-3 sm:mt-4">
          {meta.tags.map(tag => (
            <span key={tag} className="text-[10px] sm:text-[11px] font-mono text-ink-faded bg-parchment-warm border border-border-light px-[8px] sm:px-[10px] py-[2px] rounded-[20px] whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Body */}
      <div className="article-body">
        {children}
      </div>
    </article>
  )
}

function LevelBadge({ level }: { level: KnowledgeNode['level'] }) {
  const config = {
    Junior: { label: '初级', bg: 'bg-teal-soft', color: 'text-teal' },
    Senior: { label: '中级', bg: 'bg-accent-soft', color: 'text-accent' },
    Expert: { label: '高级', bg: 'bg-rose-soft', color: 'text-rose' },
  }
  const c = config[level]
  return (
    <span className={`inline-flex items-center gap-[5px] text-[11px] sm:text-[12px] font-medium font-sans ${c.bg} ${c.color} px-[8px] sm:px-[10px] py-[3px] rounded-[3px] whitespace-nowrap`}>
      {c.label}
    </span>
  )
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <span className="inline-flex items-center gap-[2px] text-[11px] sm:text-[12px] font-sans text-accent bg-accent-soft px-[8px] sm:px-[10px] py-[3px] rounded-[3px] whitespace-nowrap">
      难度 {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-[10px] ${i < difficulty ? 'text-accent' : 'text-border'}`}>★</span>
      ))}
    </span>
  )
}
