import { Link } from 'react-router-dom'
import { chapters } from '../../data/chapters'

const pathIcons: Record<string, string> = {
  '01-python-basics': '🐍',
  '02-collections': '🌐',
  '06-ai-fundamentals': '🤖',
  '07-langchain-framework': '☕',
}

const pathColors: Record<string, string> = {
  '01-python-basics': 'bg-[#eff8ef]',
  '02-collections': 'bg-[#eef6ff]',
  '06-ai-fundamentals': 'bg-[#f4f1ff]',
  '07-langchain-framework': 'bg-[#fff4e9]',
}

const pathDescriptions: Record<string, string> = {
  '01-python-basics': '覆盖 Python 后端、异步编程、数据处理与 AI 开发基础能力。',
  '02-collections': '从 Web 基础到 React 工程化，系统掌握现代前端开发能力。',
  '06-ai-fundamentals': '学习 Prompt、RAG、Agent、LangGraph 与 AI 工作流开发。',
  '07-langchain-framework': '深入理解 JVM、并发、Spring 与分布式系统架构设计。',
}

export default function LearningPath() {
  const displayChapters = chapters.slice(0, 4)

  return (
    <section className="px-4 sm:px-6 lg:px-11 py-7 sm:py-9 max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5 sm:mb-6 pb-3 border-b border-border-light">
        <div>
          <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
            <span className="mr-2 text-lg">🗺️</span>学习路线图
          </h2>
          <p className="text-[#8b7b6d] mt-1 text-sm">四大技术方向的系统化成长路径</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayChapters.map((ch, i) => (
          <Link
            key={ch.id}
            to={`/docs/${ch.id}`}
            className="bg-white border border-[#eadfce] rounded-[32px] p-7 cursor-pointer transition-all duration-200 card-hover animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Icon */}
            <div className="flex items-start justify-between">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${pathColors[ch.id] || 'bg-[#f4f1ff]'}`}>
                {pathIcons[ch.id] || ch.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-2xl mt-6 text-ink">{ch.title}</h3>

            {/* Description */}
            <p className="text-[#6b5b4d] leading-7 mt-4 font-sans text-[14px] line-clamp-2">
              {pathDescriptions[ch.id] || ch.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
