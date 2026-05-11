import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import Footer from './components/layout/Footer'
import MobileNav from './components/layout/MobileNav'
import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'
import HashmapDeepDive from './pages/articles/hashmap-deep-dive'
import SearchDialog from './components/ui/SearchDialog'
import { useState, useCallback } from 'react'

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
          <Route path="/docs/02-collections/hashmap" element={<HashmapDeepDive />} />
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
