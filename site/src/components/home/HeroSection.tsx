import { chapters, getTotalArticles } from '../../data/chapters'

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-11 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-[60px] relative max-w-[100vw] overflow-x-hidden">
      <div className="max-w-[780px] min-w-0">
        {/* Tag */}
        <div className="inline-flex items-center gap-[6px] bg-accent-soft border border-accent/18 text-accent text-[11px] sm:text-[12px] font-medium px-[12px] sm:px-[14px] py-1 rounded-[20px] mb-5 sm:mb-6 font-sans animate-fade-in-up">
          <span>🦝</span>
          <span>Java面试全面指南 · v1.6.0</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-[28px] sm:text-display-lg lg:text-display-xl text-ink mb-4 sm:mb-[18px] animate-fade-in-up leading-[1.2]" style={{ animationDelay: '0.1s' }}>
          深入Java<br />
          <span className="relative inline-block">
            探索底层原理
            <span className="absolute left-0 bottom-1 w-full h-2 bg-accent/12 rounded-[2px] -z-[1]" />
          </span>
        </h1>

        {/* Description */}
        <p className="text-[14px] sm:text-base text-ink-muted leading-[1.8] sm:leading-[1.9] max-w-[560px] mb-6 sm:mb-8 font-body animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          系统化整理 Java 技术栈核心知识点，覆盖从基础到高级的 16 个专题，帮助开发者深入理解底层原理、掌握源码分析、攻克面试难关。
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a href="#chapters" className="inline-flex items-center justify-center gap-2 py-[11px] px-[26px] bg-accent text-white font-sans font-semibold text-sm rounded-paper-md hover:bg-accent-warm hover:-translate-y-[1px] hover:shadow-paper-md transition-all shadow-paper-sm">
            开始学习 →
          </a>
          <a href="#" className="inline-flex items-center justify-center gap-2 py-[11px] px-[26px] bg-parchment-light text-ink-muted font-sans font-medium text-sm rounded-paper-md border border-border hover:bg-parchment-deep hover:text-ink-light transition-all">
            学习路线图
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:flex sm:gap-11 gap-x-6 gap-y-4 mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Stat value="90+" accent="90" label="核心文档" />
          <Stat value="347+" accent="347" label="面试题目" />
          <Stat value="196+" accent="196" label="可视化图表" />
          <Stat value="77.5K" accent="77.5" label="行技术内容" />
        </div>

        {/* Divider */}
        <div className="w-[60px] h-[2px] bg-accent mt-6 sm:mt-8 rounded-[1px] opacity-50" />
      </div>
    </section>
  )
}

function Stat({ value, accent, label }: { value: string; accent: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display font-bold text-[24px] sm:text-[30px] text-ink tracking-tight">
        <span className="text-accent">{accent}</span>{value.replace(accent, '')}
      </span>
      <span className="text-[11px] sm:text-[12px] text-ink-faded mt-[2px] font-sans">{label}</span>
    </div>
  )
}
