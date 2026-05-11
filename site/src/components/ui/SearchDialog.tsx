/**
 * 全局搜索弹窗组件 — 在所有文章中搜索关键词，展示匹配结果
 * （全局组件，文章页面通常不直接使用）
 *
 * @props
 * - open: boolean — 是否打开
 * - onClose: () => void — 关闭回调
 */
import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { chapters } from '../../data/chapters'
import type { SearchResult } from '../../data/types'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results: SearchResult[] = query.trim()
    ? chapters.flatMap(ch =>
        ch.articles
          .filter(a => a.title.toLowerCase().includes(query.toLowerCase()) ||
                       a.meta.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
          .map(a => ({
            type: 'article' as const,
            title: a.title,
            description: a.meta.tags.join(' · '),
            path: `/docs/${ch.id}/${a.slug}`,
            chapterIcon: ch.icon,
          }))
      ).slice(0, 12)
    : []

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
        else open && onClose()
      }
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(44,36,22,0.4)] backdrop-blur-[4px]" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-[560px] mx-4 bg-parchment-light border border-border rounded-paper-lg shadow-paper-lg overflow-hidden animate-fade-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search size={18} className="text-ink-ghost shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索知识点、面试题、代码示例..."
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-ink font-sans placeholder:text-ink-ghost"
          />
          <button onClick={onClose} className="text-ink-ghost hover:text-ink-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-5 py-8 text-center text-ink-faded font-sans text-sm">
              未找到相关内容
            </div>
          )}
          {results.map((r, i) => (
            <a
              key={i}
              href={r.path}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 hover:bg-accent-glow transition-colors cursor-pointer"
            >
              <span className="text-[16px] shrink-0">{r.chapterIcon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-ink font-sans font-medium truncate">{r.title}</div>
                <div className="text-[11px] text-ink-faded font-mono truncate">{r.description}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border-light flex items-center gap-4 text-[11px] text-ink-ghost font-sans">
          <span className="font-mono bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ESC</span>
          <span>关闭</span>
          <span className="font-mono bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">↵</span>
          <span>打开</span>
        </div>
      </div>
    </div>
  )
}
