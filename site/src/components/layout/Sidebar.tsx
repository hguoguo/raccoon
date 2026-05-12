import { Link, useLocation } from 'react-router-dom'
import { chapters, getChapterById } from '../../data/chapters'
import { useState } from 'react'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <aside className={`
      fixed top-0 left-0 bottom-0 z-[100]
      w-[260px] bg-parchment-warm border-r border-border
      flex flex-col
      transition-transform duration-300 ease-in-out
      ${open ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Brand */}
      <Link to="/" onClick={onClose} className="flex items-center gap-3 px-[22px] py-6 border-b border-border">
        <img src="/logo.png" alt="Raccoon Logo" className="w-10 h-10 rounded-paper-md" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-[17px] tracking-tight text-ink">Raccoon</span>
          <span className="text-[11px] text-ink-faded font-sans tracking-wide">编程学习库</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-[10px]">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-ghost px-[14px] py-[18px] pb-1 font-sans">
          开始
        </div>
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center gap-[10px] px-[14px] py-[7px] rounded-paper-sm font-sans text-[13px] transition-all duration-150 relative ${
            location.pathname === '/' ? 'bg-accent-soft text-accent font-medium' : 'text-ink-muted hover:bg-accent-glow hover:text-ink-light'
          }`}
        >
          {location.pathname === '/' && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-accent rounded-r-[2px]" />
          )}
          <span className="text-[14px] w-5 text-center shrink-0">🏠</span>
          <span className="flex-1">主页</span>
        </Link>

        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-ghost px-[14px] pt-5 pb-1 font-sans">
          知识体系
        </div>

        {chapters.map(chapter => (
          <NavGroup
            key={chapter.id}
            chapter={chapter}
            expanded={expandedId === chapter.id}
            onToggle={() => toggleExpand(chapter.id)}
            currentPath={location.pathname}
            onNavigate={onClose}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-[22px] py-[14px] border-t border-border text-[11px] text-ink-ghost text-center font-mono">
        v1.6.0 · 2026-04-17
      </div>
    </aside>
  )
}

function NavGroup({ chapter, expanded, onToggle, currentPath, onNavigate }: {
  chapter: typeof chapters[0]
  expanded: boolean
  onToggle: () => void
  currentPath: string
  onNavigate: () => void
}) {
  const chPath = `/docs/${chapter.id}`
  const isActive = currentPath.startsWith(chPath)

  return (
    <div className="mb-[1px]">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-[6px] rounded-paper-sm font-sans text-[13px] w-full transition-all duration-150 ${
          isActive ? 'bg-accent-glow text-ink-light' : 'text-ink-muted hover:bg-accent-glow hover:text-ink-light'
        }`}
      >
        <span className="text-[14px] w-5 text-center shrink-0">{chapter.icon}</span>
        <span className="flex-1 truncate text-left">{chapter.title}</span>
        <span className="text-[10px] font-mono bg-parchment-deep text-ink-faded px-[5px] py-[1px] rounded-[3px]">
          {chapter.articles.length}
        </span>
        <span className={`text-[9px] text-ink-ghost transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
      </button>

      {expanded && (
        <div className="py-[2px]">
          {chapter.articles.map(article => {
            const artPath = `/docs/${chapter.id}/${article.slug}`
            const isArtActive = currentPath === artPath
            return (
              <Link
                key={article.slug}
                to={artPath}
                onClick={onNavigate}
                className={`block pl-[44px] pr-3 py-[5px] text-[12px] font-sans rounded-paper-sm transition-all duration-150 truncate ${
                  isArtActive ? 'text-accent font-medium bg-accent-soft' : 'text-ink-faded hover:bg-accent-glow hover:text-ink-muted'
                }`}
              >
                {article.title}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
