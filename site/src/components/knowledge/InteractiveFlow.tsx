/**
 * 交互式流程图组件 — 展示操作步骤流程，支持折叠和逐步展开
 *
 * @example
 * <InteractiveFlow
 *   title="put 操作流程"
 *   steps={[
 *     { label: '计算 hash', description: '对 key 调用 hashCode()', icon: '🔢' },
 *     { label: '定位桶', description: 'hash & (capacity - 1)', icon: '📍' },
 *   ]}
 * />
 *
 * @props
 * - title: string — 流程标题
 * - steps: FlowStep[] — 步骤列表，每项含 label, description?, icon?
 * - collapsible?: boolean — 是否可折叠，默认 true
 */
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface FlowStep {
  label: string
  description?: string
  icon?: string
}

interface InteractiveFlowProps {
  title: string
  steps: FlowStep[]
  collapsible?: boolean
  orientation?: 'horizontal' | 'vertical' // 布局方向，默认 horizontal
}

export default function InteractiveFlow({ title, steps, collapsible = true, orientation = 'horizontal' }: InteractiveFlowProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="bg-parchment-light border border-border rounded-paper-md my-5 overflow-hidden shadow-paper">
      {/* Header */}
      <button
        onClick={() => collapsible && setCollapsed(v => !v)}
        className="flex items-center gap-3 w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left hover:bg-parchment-warm transition-colors"
      >
        <span className="font-sans font-semibold text-[10px] sm:text-xs text-ink-faded uppercase tracking-[0.06em]">
          流程图
        </span>
        <span className="flex-1 font-sans text-[13px] sm:text-sm font-medium text-ink">{title}</span>
        {collapsible && (
          <ChevronDown
            size={14}
            className={`text-ink-ghost transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
          />
        )}
      </button>

      {/* Flow */}
      {!collapsed && (
        <div className="px-4 sm:px-5 pb-5">
          {orientation === 'vertical' ? (
            /* 纵向布局 */
            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  {/* Node */}
                  <button
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center gap-1.5 shrink-0"
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      font-display font-bold text-xs transition-all duration-200
                      ${i === activeStep
                        ? 'border-2 border-accent text-accent bg-accent-soft'
                        : i < activeStep
                          ? 'border-2 border-teal text-teal bg-teal-soft'
                          : 'border-2 border-border text-ink-faded bg-parchment-light'
                      }
                    `}>
                      {step.icon || (i + 1)}
                    </div>
                    {/* 连接线（除了最后一个） */}
                    {i < steps.length - 1 && (
                      <div className={`w-[1px] h-6 ${
                        i < activeStep
                          ? 'bg-gradient-to-b from-teal to-border'
                          : 'bg-border'
                      }`} />
                    )}
                  </button>
                  {/* Step Content */}
                  <div className="flex-1 py-1">
                    <span className={`text-[13px] sm:text-[14px] font-medium font-sans ${
                      i === activeStep ? 'text-ink' : 'text-ink-muted'
                    }`}>
                      {step.label}
                    </span>
                    {step.description && (
                      <p className="mt-1 text-[12px] sm:text-[13px] text-ink-muted font-sans leading-[1.7]">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 横向布局（原有逻辑） */
            <>
              {/* Scrollable on mobile */}
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-0 min-w-max sm:min-w-0 sm:w-full pb-2">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center shrink-0 sm:shrink sm:flex-1">
                      {/* Node */}
                      <button
                        onClick={() => setActiveStep(i)}
                        className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[72px] sm:min-w-[110px]"
                      >
                        <div className={`
                          w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                          font-display font-bold text-xs sm:text-sm transition-all duration-200
                          ${i === activeStep
                            ? 'border-2 border-accent text-accent bg-accent-soft'
                            : i < activeStep
                              ? 'border-2 border-teal text-teal bg-teal-soft'
                              : 'border-2 border-border text-ink-faded bg-parchment-light'
                          }
                        `}>
                          {step.icon || (i + 1)}
                        </div>
                        <span className={`text-[11px] sm:text-[12px] text-center whitespace-nowrap font-sans ${
                          i === activeStep ? 'text-ink font-medium' : 'text-ink-muted'
                        }`}>
                          {step.label}
                        </span>
                      </button>
                      {/* Connector */}
                      {i < steps.length - 1 && (
                        <div className={`w-6 sm:w-[50px] h-[1px] shrink-0 mb-5 sm:mb-6 ${
                          i < activeStep
                            ? 'bg-gradient-to-r from-teal to-border'
                            : 'bg-border'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Active Step Description */}
              {steps[activeStep]?.description && (
                <div className="mt-3 sm:mt-4 p-3 bg-parchment-warm rounded-paper-md text-[12px] sm:text-[13px] text-ink-muted font-sans leading-[1.7]">
                  {steps[activeStep].description}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
