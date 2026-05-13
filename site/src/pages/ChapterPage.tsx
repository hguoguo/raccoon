import { useParams, Link } from 'react-router-dom'
import { getChapterById } from '../data/chapters'
import { ChevronRight } from 'lucide-react'

const colorMap = {
  orange: { bg: 'bg-accent-soft', text: 'text-accent' },
  teal: { bg: 'bg-teal-soft', text: 'text-teal' },
  rose: { bg: 'bg-rose-soft', text: 'text-rose' },
  indigo: { bg: 'bg-indigo-soft', text: 'text-indigo' },
  purple: { bg: 'bg-purple-soft', text: 'text-purple' },
  blue: { bg: 'bg-blue-soft', text: 'text-blue' },
}

export default function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const chapter = getChapterById(chapterId || '')

  if (!chapter) {
    return (
      <div className="px-5 sm:px-6 lg:px-11 py-16 sm:py-20 text-center">
        <h1 className="font-display font-bold text-[24px] sm:text-display-lg text-ink mb-4">章节未找到</h1>
        <p className="text-ink-muted font-sans text-[14px] sm:text-base">请从侧边栏选择一个章节开始阅读</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-6 text-accent font-sans font-medium hover:gap-3 transition-all">
          ← 返回首页
        </Link>
      </div>
    )
  }

  const colors = colorMap[chapter.color]

  return (
    <div className="px-4 sm:px-6 lg:px-11 py-6 sm:py-10 lg:py-12 animate-fade-in max-w-[100vw] overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-ink-ghost font-sans mb-4 sm:mb-6">
        <Link to="/" className="text-ink-muted hover:text-accent transition-colors">首页</Link>
        <ChevronRight size={10} className="text-border-dark" />
        <span className="text-ink">{chapter.title}</span>
      </div>

      {/* Chapter Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <span className={`text-2xl sm:text-3xl w-14 h-14 rounded-2xl flex items-center justify-center ${colors.bg}`}>
            {chapter.icon}
          </span>
          <div>
            <h1 className="font-display font-bold text-[22px] sm:text-display-lg tracking-tight text-ink">
              {chapter.title}
            </h1>
            <div className="flex items-center gap-2 sm:gap-3 mt-1">
              <span className={`text-[11px] sm:text-[12px] font-sans font-medium ${colors.bg} ${colors.text} px-[8px] sm:px-[10px] py-[3px] rounded-[3px]`}>
                {chapter.articles.length} 篇文档
              </span>
              <span className="flex gap-[1px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-[9px] sm:text-[10px] ${i < chapter.difficulty ? 'text-accent' : 'text-border'}`}>★</span>
                ))}
              </span>
            </div>
          </div>
        </div>
        <p className="text-ink-muted font-sans text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.8] max-w-[600px]">
          {chapter.description}
        </p>
      </div>

      {/* Article List */}
      <div className="grid gap-4 sm:gap-5">
        {chapter.articles.map((article, i) => (
          <Link
            key={article.slug}
            to={`/docs/${chapter.id}/${article.slug}`}
            className="group flex items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white border border-[#eadfce] rounded-[32px] hover:shadow-paper-md transition-all duration-200 card-hover"
          >
            <span className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-bold text-sm sm:text-base shrink-0 ${
              i < 3 ? colors.bg + ' ' + colors.text : 'bg-parchment-deep text-ink-faded'
            }`}>
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-[14px] sm:text-[15px] text-ink group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
                <span className="text-[10px] sm:text-[11px] font-mono text-ink-faded">
                  {article.meta.tags.slice(0, 3).join(' · ')}
                </span>
                <span className="text-[10px] sm:text-[11px] text-ink-ghost font-sans">
                  ⏱ {article.meta.readingTime}min
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-ink-ghost group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
