import { useState } from 'react'

const paths = {
  junior: {
    label: '🌱 初级工程师',
    shortLabel: '🌱 初级',
    steps: ['Java基础', '集合框架', 'Spring Boot', 'MySQL基础', 'Redis基础', '设计模式'],
  },
  mid: {
    label: '🚀 中级工程师',
    shortLabel: '🚀 中级',
    steps: ['并发编程', 'JVM深入', '分布式系统', 'MySQL优化', '消息队列', '系统设计'],
  },
  senior: {
    label: '🎯 高级/架构师',
    shortLabel: '🎯 高级',
    steps: ['架构设计', '性能调优', '云原生', 'AI工程化', '领域建模', '技术领导力'],
  },
}

type PathKey = keyof typeof paths

export default function LearningPath() {
  const [activePath, setActivePath] = useState<PathKey>('junior')
  const [activeStep, setActiveStep] = useState(2)
  const currentPath = paths[activePath]

  return (
    <section className="px-4 sm:px-6 lg:px-11 py-7 sm:py-9 max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5 sm:mb-6 pb-3 border-b border-border-light">
        <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
          <span className="mr-2 text-lg">🗺️</span>学习路线
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 sm:mb-6 flex-wrap">
        {(Object.entries(paths) as [PathKey, typeof paths.junior][]).map(([key, path]) => (
          <button
            key={key}
            onClick={() => { setActivePath(key); setActiveStep(0) }}
            className={`px-3 sm:px-[18px] py-2 rounded-paper-md text-[12px] sm:text-[13px] font-medium font-sans transition-all duration-200 border ${
              activePath === key
                ? 'bg-accent-soft border-accent/30 text-accent'
                : 'bg-parchment-light border-border text-ink-muted hover:border-border-dark hover:text-ink-light'
            }`}
          >
            <span className="sm:hidden">{path.shortLabel}</span>
            <span className="hidden sm:inline">{path.label}</span>
          </button>
        ))}
      </div>

      {/* Timeline - scrollable on mobile */}
      <div className="overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-0 min-w-max sm:min-w-0 sm:w-full">
          {currentPath.steps.map((step, i) => (
            <div key={i} className="flex items-center shrink-0 sm:shrink sm:flex-1">
              <button
                onClick={() => setActiveStep(i)}
                className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[72px] sm:min-w-[110px]"
              >
                <div className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                  font-display font-bold text-xs sm:text-sm transition-all duration-200
                  ${i <= activeStep
                    ? 'border-2 border-accent text-accent bg-accent-soft'
                    : 'border-2 border-border text-ink-faded bg-parchment-light'
                  }
                `}>
                  {i + 1}
                </div>
                <span className="text-[11px] sm:text-[12px] text-center whitespace-nowrap font-sans text-ink-muted">{step}</span>
              </button>
              {i < currentPath.steps.length - 1 && (
                <div className={`w-8 sm:w-[50px] h-[1px] shrink-0 mb-5 sm:mb-6 ${
                  i < activeStep
                    ? 'bg-gradient-to-r from-accent to-border'
                    : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
