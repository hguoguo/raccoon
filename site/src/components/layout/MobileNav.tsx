import { useState, useEffect } from 'react'
import { domains } from '../../data/chapters'
import { Link, useLocation } from 'react-router-dom'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const location = useLocation()

  // 从当前路由推断选中的领域和子类
  const getCurrentDomainId = () => {
    for (const domain of domains) {
      for (const sub of domain.subCategories) {
        for (const ch of sub.chapters) {
          if (location.pathname.startsWith(`/docs/${ch.id}`)) {
            return domain.id
          }
        }
      }
    }
    return domains[0]?.id || ''
  }

  const getCurrentSubCategoryId = () => {
    for (const domain of domains) {
      for (const sub of domain.subCategories) {
        for (const ch of sub.chapters) {
          if (location.pathname.startsWith(`/docs/${ch.id}`)) {
            return sub.id
          }
        }
      }
    }
    const firstDomain = domains[0]
    return firstDomain?.subCategories[0]?.id || ''
  }

  const [selectedDomainId, setSelectedDomainId] = useState(getCurrentDomainId)
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(getCurrentSubCategoryId)

  // 路由变化时同步选中状态
  useEffect(() => {
    const domainId = getCurrentDomainId()
    const subId = getCurrentSubCategoryId()
    setSelectedDomainId(domainId)
    setSelectedSubCategoryId(subId)
  }, [location.pathname])

  const selectedDomain = domains.find(d => d.id === selectedDomainId)
  const selectedSubCategory = selectedDomain?.subCategories.find(sc => sc.id === selectedSubCategoryId)

  // 领域切换时，自动选中第一个子类
  const handleDomainChange = (domainId: string) => {
    setSelectedDomainId(domainId)
    const domain = domains.find(d => d.id === domainId)
    const firstSub = domain?.subCategories[0]
    if (firstSub) {
      setSelectedSubCategoryId(firstSub.id)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-5 w-12 h-12 rounded-2xl bg-accent text-white shadow-[0_4px_16px_rgba(181,101,29,0.35)] text-xl flex items-center justify-center z-[90] hover:scale-105 active:scale-95 transition-transform lg:hidden"
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

      {/* Left Drawer */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-[280px] bg-[#f2ebdf] border-r border-border
        z-[200] overflow-y-auto
        shadow-[8px_0_32px_rgba(44,36,22,0.15)]
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:hidden
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-border sticky top-0 bg-[#f2ebdf] z-[1]">
          <h3 className="font-display font-bold text-base text-ink">📚 全部章节</h3>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-parchment-deep border border-border text-ink-muted flex items-center justify-center hover:bg-paper-aged transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 二级联动下拉框 */}
        <div className="px-4 pt-3 pb-2 space-y-2 border-b border-border">
          {/* 领域下拉 */}
          <select
            value={selectedDomainId}
            onChange={e => handleDomainChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#e2d5c3] text-[13px] font-sans text-ink cursor-pointer focus:outline-none focus:border-accent/40 transition-colors appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b7b6d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {domains.map(domain => (
              <option key={domain.id} value={domain.id}>
                {domain.icon} {domain.title}
              </option>
            ))}
          </select>

          {/* 子类下拉 */}
          <select
            value={selectedSubCategoryId}
            onChange={e => setSelectedSubCategoryId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#e2d5c3] text-[13px] font-sans text-ink cursor-pointer focus:outline-none focus:border-accent/40 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedDomain?.subCategories.length}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b7b6d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {selectedDomain?.subCategories.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.icon} {sub.title}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter List */}
        <div className="p-2 pb-6">
          {selectedSubCategory && selectedSubCategory.chapters.length > 0 ? (
            selectedSubCategory.chapters.map(chapter => (
              <div key={chapter.id} className="mb-[2px]">
                <button
                  onClick={() => toggleExpand(chapter.id)}
                  className="flex items-center gap-2 px-4 py-[10px] text-[13px] font-semibold font-sans text-ink w-full rounded-2xl hover:bg-white transition-colors"
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
                        className="block text-[13px] font-sans text-ink-muted py-[7px] px-[10px] rounded-2xl hover:bg-white hover:text-ink-light transition-colors"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-[14px] py-8 text-center">
              <span className="text-2xl block mb-2">🚀</span>
              <span className="text-[12px] text-ink-faded font-sans">内容筹备中...</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
