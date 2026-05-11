import { Link } from 'react-router-dom'
import { chapters } from '../../data/chapters'

const colorMap = {
  orange: 'bg-accent-soft',
  teal: 'bg-teal-soft',
  rose: 'bg-rose-soft',
  indigo: 'bg-indigo-soft',
}

export default function ChapterGrid() {
  const featured = chapters.slice(0, 8)

  return (
    <section className="px-4 sm:px-6 lg:px-11 py-7 sm:py-9 pb-10 sm:pb-14 max-w-[100vw] overflow-x-hidden" id="chapters">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5 sm:mb-6 pb-3 border-b border-border-light">
        <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
          <span className="mr-2 text-lg">📚</span>知识体系
        </h2>
        <a href="#" className="text-[12px] sm:text-[13px] text-accent font-sans flex items-center gap-1 hover:gap-2 transition-all">
          查看全部 →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {featured.map((ch, i) => (
          <Link
            key={ch.id}
            to={`/docs/${ch.id}`}
            className={`group bg-parchment-light border border-border rounded-paper-lg p-4 sm:p-[22px] cursor-pointer transition-all duration-200 relative hover:bg-paper-aged hover:border-border-dark hover:-translate-y-[2px] hover:shadow-paper-md animate-fade-in-up stagger-${i + 1}`}
          >
            {/* Paper shadow on hover */}
            <div className="absolute -bottom-[3px] left-2 right-2 h-[6px] bg-paper-shadow rounded-b-paper-lg opacity-0 group-hover:opacity-50 blur-[3px] transition-opacity" />

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-paper-md flex items-center justify-center text-base sm:text-lg shrink-0 ${colorMap[ch.color]}`}>
                {ch.icon}
              </div>
              <div className="flex gap-[1px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-[9px] sm:text-[10px] ${i < ch.difficulty ? 'text-accent' : 'text-border'}`}>★</span>
                ))}
              </div>
            </div>

            {/* Content */}
            <h3 className="font-display font-semibold text-[14px] sm:text-[15px] mb-1.5 text-ink">{ch.title}</h3>
            <p className="text-[12px] sm:text-[13px] text-ink-muted leading-[1.6] sm:leading-[1.7] mb-3 sm:mb-[14px] font-sans line-clamp-2">
              {ch.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] text-ink-faded">
                <span className="text-accent font-semibold">{ch.articles.length}</span> 篇文档
              </span>
              <span className="text-ink-ghost text-sm group-hover:text-accent group-hover:translate-x-[3px] transition-all">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
