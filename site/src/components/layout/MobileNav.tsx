import { useState } from 'react'
import { chapters } from '../../data/chapters'
import { Link } from 'react-router-dom'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-5 w-12 h-12 rounded-full bg-accent text-white shadow-[0_4px_16px_rgba(181,101,29,0.35)] text-xl flex items-center justify-center z-[90] hover:scale-105 active:scale-95 transition-transform lg:hidden"
        aria-label="大纲导航"
      >
        📚
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-[rgba(44,36,22,0.3)] z-[199] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-parchment-light border-t border-border rounded-t-[20px]
        z-[200] max-h-[70vh] overflow-y-auto
        shadow-[0_-8px_32px_rgba(44,36,22,0.15)]
        transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? 'translate-y-0' : 'translate-y-full'}
        lg:hidden
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-[18px] pb-3 border-b border-border-light sticky top-0 bg-parchment-light rounded-t-[20px] z-[1]">
          <h3 className="font-display font-bold text-base text-ink">📚 全部章节</h3>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-parchment-deep border border-border text-ink-muted flex items-center justify-center hover:bg-paper-aged transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chapter List */}
        <div className="p-2 pb-6">
          {chapters.map(chapter => (
            <div key={chapter.id} className="mb-[2px]">
              <button
                onClick={() => toggleExpand(chapter.id)}
                className="flex items-center gap-2 px-[14px] py-[10px] text-[13px] font-semibold font-sans text-ink w-full rounded-paper-md hover:bg-parchment-warm transition-colors"
              >
                <span className="text-[14px] shrink-0">{chapter.icon}</span>
                <span className="flex-1 truncate text-left">{chapter.title}</span>
                <span className="text-[10px] font-mono text-ink-ghost bg-parchment-deep px-1.5 py-[1px] rounded-lg shrink-0">
                  {chapter.articles.length}
                </span>
                <span className={`text-[10px] text-ink-ghost transition-transform duration-200 shrink-0 ${expandedId === chapter.id ? 'rotate-90' : ''}`}>
                  ▶
                </span>
              </button>
              {expandedId === chapter.id && (
                <div className="pl-9 pr-[14px]">
                  {chapter.articles.map(article => (
                    <Link
                      key={article.slug}
                      to={`/docs/${chapter.id}/${article.slug}`}
                      onClick={() => setOpen(false)}
                      className="block text-[13px] font-sans text-ink-muted py-[7px] px-[10px] rounded-paper-sm hover:bg-accent-glow hover:text-ink-light transition-colors"
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
