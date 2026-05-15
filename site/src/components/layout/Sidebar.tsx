import { Link, useLocation, useNavigate, useResolvedPath } from 'react-router-dom'
import { domains, getSubCategoryById } from '../../data/chapters'
import { useState, useEffect } from 'react'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // 从当前路由推断选中的领域和子类
  const getCurrentDomainId = () => {
    for (const domain of domains) {
      for (const sub of domain.subCategories) {
        for (const ch of sub.chapters) {
          if (location.pathname.includes(`/docs/${ch.id}`)) {
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
          if (location.pathname.includes(`/docs/${ch.id}`)) {
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
    if (domainId !== selectedDomainId) setSelectedDomainId(domainId)
    if (subId !== selectedSubCategoryId) setSelectedSubCategoryId(subId)
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

  return (
    <aside className={`
      fixed top-0 left-0 bottom-0 z-[100]
      w-[280px] bg-[#f2ebdf] border-r border-border
      flex flex-col
      transition-transform duration-300 ease-in-out
      ${open ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Brand */}
      <Link to="/" onClick={onClose} className="flex items-center gap-3 px-6 py-6 border-b border-border">
        <div className="w-10 h-10 rounded-2xl bg-[#e8dcc8] flex items-center justify-center shadow-sm">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Raccoon Logo" className="w-7 h-7 object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-[17px] tracking-tight text-ink">Raccoon</span>
          <span className="text-[11px] text-ink-faded font-sans tracking-wide">技术学习平台</span>
        </div>
      </Link>

      {/* 2级联动下拉框 */}
      <div className="px-4 pt-4 pb-2 space-y-2 border-b border-border">
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

      {/* 动态目录：Chapter → Article */}
      <nav className="flex-1 overflow-y-auto py-3 px-[10px]">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-ghost px-[14px] py-[18px] pb-1 font-sans">
          开始
        </div>
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center gap-[10px] px-[14px] py-[7px] rounded-2xl font-sans text-[13px] transition-all duration-150 relative ${
            location.pathname === '/' ? 'bg-[#eadcc8] border border-[#e2cfb7] text-ink font-medium' : 'text-ink-muted hover:bg-white hover:text-ink-light'
          }`}
        >
          {location.pathname === '/' && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-accent rounded-r-[2px]" />
          )}
          <span className="text-[14px] w-5 text-center shrink-0">🏠</span>
          <span className="flex-1">主页</span>
        </Link>

        {selectedSubCategory && selectedSubCategory.chapters.length > 0 && (
          <>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-ghost px-[14px] pt-5 pb-1 font-sans">
              {selectedSubCategory.icon} {selectedSubCategory.title}
            </div>
            {selectedSubCategory.chapters.map(chapter => (
              <NavGroup
                key={chapter.id}
                chapter={chapter}
                currentPath={location.pathname}
                onNavigate={onClose}
              />
            ))}
          </>
        )}

        {selectedSubCategory && selectedSubCategory.chapters.length === 0 && (
          <div className="px-[14px] py-8 text-center">
            <span className="text-2xl block mb-2">🚀</span>
            <span className="text-[12px] text-ink-faded font-sans">内容筹备中...</span>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-[22px] py-[14px] border-t border-border text-[11px] text-ink-ghost text-center font-mono">
        v1.7.0 · 2026
      </div>
    </aside>
  )
}

function NavGroup({ chapter, currentPath, onNavigate }: {
  chapter: { id: string; title: string; icon: string; articles: { slug: string; title: string }[] }
  currentPath: string
  onNavigate: () => void
}) {
  const chPath = useResolvedPath(`/docs/${chapter.id}`).pathname
  const isActive = currentPath === chPath || currentPath.startsWith(chPath + '/')
  const [expanded, setExpanded] = useState(isActive)

  // 当路由匹配时自动展开
  useEffect(() => {
    if (isActive) setExpanded(true)
  }, [isActive])

  return (
    <div className="mb-[1px]">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 px-4 py-[6px] rounded-2xl font-sans text-[13px] w-full transition-all duration-150 ${
          isActive ? 'bg-[#eadcc8] border border-[#e2cfb7] text-ink-light' : 'text-ink-muted hover:bg-white hover:text-ink-light'
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
            const artSlug = `/docs/${chapter.id}/${article.slug}`
            return (
              <ArticleLink
                key={article.slug}
                articleSlug={artSlug}
                articleTitle={article.title}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

function ArticleLink({ articleSlug, articleTitle, currentPath, onNavigate }: {
  articleSlug: string
  articleTitle: string
  currentPath: string
  onNavigate: () => void
}) {
  const resolvedPath = useResolvedPath(articleSlug).pathname
  const isArtActive = currentPath === resolvedPath
  
  return (
    <Link
      to={articleSlug}
      onClick={onNavigate}
      className={`block pl-[44px] pr-3 py-[5px] text-[12px] font-sans rounded-2xl transition-all duration-150 truncate ${
        isArtActive ? 'text-accent font-medium bg-[#eadcc8] border border-[#e2cfb7]' : 'text-ink-faded hover:bg-white hover:text-ink-muted'
      }`}
    >
      {articleTitle}
    </Link>
  )
}
