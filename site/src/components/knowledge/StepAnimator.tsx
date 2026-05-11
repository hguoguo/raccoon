/**
 * 通用动画框架组件 — 提供播放控制（▶⏸⏮⏭⟲）、进度条、场景切换 Tab、步骤说明、自动播放
 *
 * @example
 * <StepAnimator<HashMapStep>
 *   title="HashMap 操作动画"
 *   scenarios={scenarios}
 *   getPhase={s => s.phase}
 *   getDescription={s => s.desc}
 *   renderVisualization={step => <HashMapViz step={step} />}
 *   renderStats={step => <span>容量: {step.capacity}</span>}
 *   playInterval={1800}
 * />
 *
 * @props
 * - title: string — 动画标题
 * - scenarios: Scenario<TStep>[] — 场景列表，每项含 meta(ScenarioMeta) 和 steps(TStep[])
 * - renderVisualization: (step: TStep) => ReactNode — 渲染当前步骤的可视化
 * - getPhase: (step: TStep) => string — 从步骤中提取阶段名称
 * - getDescription: (step: TStep) => string — 从步骤中提取描述文字
 * - renderStats?: (step: TStep) => ReactNode — 可选统计栏渲染
 * - playInterval?: number — 自动播放间隔，默认 1800ms
 *
 * @exports
 * - ScenarioMeta: { name: string, short: string, icon: string }
 * - Scenario<TStep>: { meta: ScenarioMeta, steps: TStep[] }
 * - StepAnimatorProps<TStep>
 */
import { useState, useEffect, useRef, type ReactNode } from 'react'

// ===== Generic Types =====
export interface ScenarioMeta {
  name: string
  short: string
  icon: string
}

export interface Scenario<TStep> {
  meta: ScenarioMeta
  steps: TStep[]
}

export interface StepAnimatorProps<TStep> {
  /** Card title, e.g. "HashMap 操作动画" */
  title: string
  /** Array of scenarios, each with metadata and step data */
  scenarios: Scenario<TStep>[]
  /** Render the visualization area for the current step */
  renderVisualization: (step: TStep) => ReactNode
  /** Extract phase label from step, e.g. "① 计算 hash" */
  getPhase: (step: TStep) => string
  /** Extract description from step */
  getDescription: (step: TStep) => string
  /** Optional stats bar renderer */
  renderStats?: (step: TStep) => ReactNode
  /** Auto-play interval in ms, default 1800 */
  playInterval?: number
}

// ===== Main Component =====
export default function StepAnimator<TStep>({
  title,
  scenarios,
  renderVisualization,
  getPhase,
  getDescription,
  renderStats,
  playInterval = 1800,
}: StepAnimatorProps<TStep>) {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)

  const scenario = scenarios[scenarioIdx]
  const step = scenario.steps[stepIdx]
  const totalSteps = scenario.steps.length

  // Auto-play
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setStepIdx(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, playInterval)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, totalSteps, playInterval])

  // Reset when switching scenario
  const switchScenario = (idx: number) => {
    setScenarioIdx(idx)
    setStepIdx(0)
    setIsPlaying(false)
  }

  const goNext = () => setStepIdx(prev => Math.min(prev + 1, totalSteps - 1))
  const goPrev = () => setStepIdx(prev => Math.max(prev - 1, 0))
  const goReset = () => { setStepIdx(0); setIsPlaying(false) }
  const togglePlay = () => {
    if (stepIdx >= totalSteps - 1) { setStepIdx(0); setIsPlaying(true) }
    else setIsPlaying(v => !v)
  }

  return (
    <div className="bg-parchment-light border border-border rounded-paper-md my-5 overflow-hidden shadow-paper">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light bg-parchment-warm/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-sans font-semibold text-[10px] sm:text-xs text-ink-faded uppercase tracking-[0.06em]">
            交互式演示
          </span>
          <span className="font-sans text-[12px] sm:text-sm font-medium text-ink">{title}</span>
        </div>

        {/* Scenario Tabs */}
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => switchScenario(i)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-paper-sm text-[10px] sm:text-[11px] font-medium font-sans transition-all duration-200 border ${
                scenarioIdx === i
                  ? 'bg-accent-soft border-accent/30 text-accent'
                  : 'bg-parchment-light border-border text-ink-muted hover:border-border-dark'
              }`}
            >
              <span className="mr-1">{s.meta.icon}</span>
              <span className="hidden sm:inline">{s.meta.name}</span>
              <span className="sm:hidden">{s.meta.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar (optional) */}
      {renderStats && (
        <div className="px-4 sm:px-5 py-2 border-b border-border-light/50 flex items-center gap-3 sm:gap-5 text-[10px] sm:text-[11px] font-mono text-ink-faded">
          {renderStats(step)}
        </div>
      )}

      {/* Visualization */}
      <div className="px-2 sm:px-3 py-2 sm:py-3 overflow-x-auto">
        <div className="min-w-[280px]">
          {renderVisualization(step)}
        </div>
      </div>

      {/* Step Info */}
      <div className="px-4 sm:px-5 py-3 border-t border-border-light bg-parchment-warm/30">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center px-1.5 py-[1px] rounded-[3px] bg-accent-soft text-accent text-[10px] sm:text-[11px] font-semibold font-sans whitespace-nowrap">
            {getPhase(step)}
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-ink-ghost">
            {stepIdx + 1} / {totalSteps}
          </span>
        </div>
        <p className="text-[12px] sm:text-[13px] text-ink-muted font-sans leading-[1.7]">
          {getDescription(step)}
        </p>
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-border-light flex items-center gap-2 sm:gap-3 bg-parchment-light">
        {/* Progress bar */}
        <div className="flex-1 h-1 bg-parchment-deep rounded-full overflow-hidden mr-1">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <button
          onClick={goReset}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] border border-border bg-parchment-light text-ink-faded flex items-center justify-center hover:bg-parchment-deep hover:text-ink-muted transition-colors text-[11px]"
          title="重置"
        >
          ⟲
        </button>
        <button
          onClick={goPrev}
          disabled={stepIdx === 0}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] border border-border bg-parchment-light text-ink-faded flex items-center justify-center hover:bg-parchment-deep hover:text-ink-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="上一步"
        >
          ‹
        </button>
        <button
          onClick={togglePlay}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-warm active:scale-95 transition-all shadow-paper-sm text-sm"
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={goNext}
          disabled={stepIdx >= totalSteps - 1}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] border border-border bg-parchment-light text-ink-faded flex items-center justify-center hover:bg-parchment-deep hover:text-ink-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="下一步"
        >
          ›
        </button>
      </div>
    </div>
  )
}
