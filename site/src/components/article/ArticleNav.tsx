/**
 * 文章上下翻页导航组件 — 文章底部的上一篇/下一篇链接
 *
 * @example
 * <ArticleNav
 *   prevTitle="HashMap 深度解析"
 *   prevPath="/docs/02-collections/hashmap-deep-dive"
 *   nextTitle="ConcurrentHashMap"
 *   nextPath="/docs/02-collections/concurrent-hashmap"
 * />
 *
 * @props
 * - prevTitle?: string — 上一篇文章标题
 * - prevPath?: string — 上一篇文章路径
 * - nextTitle?: string — 下一篇文章标题
 * - nextPath?: string — 下一篇文章路径
 */
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ArticleNavProps {
  prevTitle?: string
  prevPath?: string
  nextTitle?: string
  nextPath?: string
}

export default function ArticleNav({ prevTitle, prevPath, nextTitle, nextPath }: ArticleNavProps) {
  if (!prevTitle && !nextTitle) return null

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[14px] mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-border">
      {prevTitle && prevPath ? (
        <Link
          to={prevPath}
          className="flex-1 bg-parchment-light border border-border rounded-paper-md p-3.5 sm:p-4 px-4 sm:px-[18px] hover:bg-paper-aged hover:border-border-dark transition-all shadow-paper-sm group"
        >
          <div className="text-[10px] sm:text-[11px] text-ink-ghost mb-1 font-sans flex items-center gap-1">
            <ChevronLeft size={12} /> 上一篇
          </div>
          <div className="text-[13px] sm:text-sm text-ink font-medium truncate group-hover:text-accent transition-colors">
            {prevTitle}
          </div>
        </Link>
      ) : (
        <div className="flex-1 hidden sm:block" />
      )}
      {nextTitle && nextPath ? (
        <Link
          to={nextPath}
          className="flex-1 bg-parchment-light border border-border rounded-paper-md p-3.5 sm:p-4 px-4 sm:px-[18px] hover:bg-paper-aged hover:border-border-dark transition-all shadow-paper-sm text-right group"
        >
          <div className="text-[10px] sm:text-[11px] text-ink-ghost mb-1 font-sans flex items-center justify-end gap-1">
            下一篇 <ChevronRight size={12} />
          </div>
          <div className="text-[13px] sm:text-sm text-ink font-medium truncate group-hover:text-accent transition-colors">
            {nextTitle}
          </div>
        </Link>
      ) : (
        <div className="flex-1 hidden sm:block" />
      )}
    </div>
  )
}
