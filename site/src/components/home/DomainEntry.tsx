import { Link } from 'react-router-dom'
import { domains } from '../../data/chapters'

const domainColors: Record<string, string> = {
  orange: 'from-[#fff4e9] to-[#fff0de] border-[#eadcce]',
  teal: 'from-[#eff8ef] to-[#e8f4e8] border-[#d4e8d4]',
  indigo: 'from-[#f4f1ff] to-[#eeeaff] border-[#d8d4f0]',
  rose: 'from-[#fef2f2] to-[#fde8e8] border-[#efd4d4]',
}

const domainAccentColors: Record<string, string> = {
  orange: 'text-[#c8782a]',
  teal: 'text-[#4a9956]',
  indigo: 'text-[#6b5fc7]',
  rose: 'text-[#c75454]',
}

export default function DomainEntry() {
  return (
    <section className="px-4 sm:px-6 lg:px-11 py-7 sm:py-9 max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5 sm:mb-6 pb-3 border-b border-border-light">
        <div>
          <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
            <span className="mr-2 text-lg">📚</span>按领域探索
          </h2>
          <p className="text-[#8b7b6d] mt-1 text-sm">按技术领域分类浏览学习内容</p>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {domains.map(domain => {
          const subCount = domain.subCategories.length
          const chapterCount = domain.subCategories.reduce((sum, sc) => sum + sc.chapters.length, 0)

          return (
            <Link
              key={domain.id}
              to={domain.subCategories[0] ? `/docs/${domain.subCategories[0].chapters[0]?.id || ''}` : '/'}
              className={`group bg-gradient-to-br ${domainColors[domain.color] || domainColors.orange} border rounded-[24px] p-5 sm:p-6 hover:shadow-paper-md transition-all duration-200 cursor-pointer`}
            >
              {/* Icon */}
              <span className="text-3xl sm:text-4xl block mb-3">{domain.icon}</span>
              {/* Title */}
              <h3 className={`font-display font-bold text-[15px] sm:text-base ${domainAccentColors[domain.color] || 'text-ink'} group-hover:translate-x-[2px] transition-transform`}>
                {domain.title}
              </h3>
              {/* Stats */}
              <div className="flex items-center gap-3 mt-2 text-[11px] sm:text-[12px] text-ink-faded font-sans">
                {subCount > 0 ? (
                  <>
                    <span>{subCount} 个子类</span>
                    <span>·</span>
                    <span>{chapterCount} 个专题</span>
                  </>
                ) : (
                  <span className="text-ink-ghost">即将上线 🚀</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
