import { Routes, Route, useParams } from 'react-router-dom'
import { Suspense } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import Footer from './components/layout/Footer'
import MobileNav from './components/layout/MobileNav'
import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'
import SearchDialog from './components/ui/SearchDialog'
import { getArticleMeta, getArticleComponent } from './data/chapters'
import { useState, useCallback } from 'react'

function ArticleRenderer() {
  const { chapterId, slug } = useParams<{ chapterId: string; slug: string }>()
  const meta = chapterId && slug ? getArticleMeta(chapterId, slug) : undefined
  const Component = slug ? getArticleComponent(slug) : undefined

  if (!meta || !Component) {
    return (
      <div className="px-5 sm:px-6 lg:px-11 py-16 sm:py-20 text-center">
        <h1 className="font-display font-bold text-[24px] sm:text-display-lg text-ink mb-4">浣熊迷路啦～</h1>
        <p className="text-ink-muted font-sans text-[14px] sm:text-base">小浣熊正在努力搬运知识，这篇文章即将上线，敬请期待～</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="px-5 sm:px-6 lg:px-11 py-16 text-center text-ink-muted">加载中...</div>}>
      <Component meta={meta} />
    </Suspense>
  )
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  return (
    <div className="flex min-h-screen relative z-[1] max-w-[100vw] overflow-x-hidden">
      {/* Paper Texture */}
      <div className="paper-texture" />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(44,36,22,0.35)] z-[99] lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 ml-0 lg:ml-[260px] min-h-screen">
        <Topbar
          onMenuToggle={toggleSidebar}
          onSearchOpen={openSearch}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/:chapterId" element={<ChapterPage />} />
          <Route path="/docs/:chapterId/:slug" element={<ArticleRenderer />} />
        </Routes>
        <Footer />
      </main>

      {/* Mobile Nav */}
      <MobileNav />

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </div>
  )
}
