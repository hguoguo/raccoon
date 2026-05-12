import { Link } from 'react-router-dom'
import { chapters } from '../../data/chapters'

const colorMap = {
  orange: 'bg-[#fff4e9]',
  teal: 'bg-[#eff8ef]',
  rose: 'bg-[#fef2f2]',
  indigo: 'bg-[#f4f1ff]',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featured.map((ch, i) => (
          <Link
            key={ch.id}
            to={`/docs/${ch.id}`}
            className={`group bg-white border border-[#eadfce] rounded-[32px] p-7 cursor-pointer transition-all duration-200 relative card-hover animate-fade-in-up stagger-${i + 1}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${colorMap[ch.color].replace('-soft', '-light')}`}>
                {ch.icon}
              </div>
              <div className="flex gap-[1px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-[9px] sm:text-[10px] ${i < ch.difficulty ? 'text-accent' : 'text-border'}`}>★</span>
                ))}
              </div>
            </div>

            {/* Content */}
            <h3 className="font-display font-bold text-2xl mt-6 text-ink">{ch.title}</h3>
            <p className="text-[14px] text-[#6b5b4d] leading-7 mt-4 font-sans line-clamp-2">
              {ch.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
