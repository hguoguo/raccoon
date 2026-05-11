/**
 * 面试题组件 — 可折叠的面试问答列表，默认展开第一题
 *
 * @example
 * <InterviewSection questions={[
 *   { question: 'HashMap 的默认初始容量是多少？', answer: '16' },
 *   { question: 'loadFactor 的作用是什么？', answer: '决定扩容阈值...' },
 * ]} />
 *
 * @props
 * - questions: InterviewQuestion[] — 面试题列表，每项含 question 和 answer
 */
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface InterviewQuestion {
  question: string
  answer: string
}

interface InterviewSectionProps {
  questions: InterviewQuestion[]
}

export default function InterviewSection({ questions }: InterviewSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-border">
      {/* Header */}
      <div className="flex items-center gap-[8px] sm:gap-[10px] mb-4 sm:mb-5">
        <h2 className="font-display font-bold text-[18px] sm:text-display-sm tracking-tight">🎯 面试精选</h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-accent bg-accent-soft px-[8px] sm:px-[10px] py-0.5 rounded-[10px]">
          {questions.length} 题
        </span>
      </div>

      {/* Questions */}
      {questions.map((q, idx) => (
        <div
          key={idx}
          className={`bg-parchment-light border border-border rounded-paper-md mb-2 sm:mb-[10px] overflow-hidden transition-colors shadow-paper-sm hover:border-border-dark ${
            openIdx === idx ? 'border-border-dark' : ''
          }`}
        >
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex items-start gap-2 sm:gap-3 p-3 sm:p-[14px] px-3.5 sm:px-[18px] w-full text-left cursor-pointer"
          >
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-accent bg-accent-soft px-1.5 sm:px-2 py-0.5 rounded-[3px] shrink-0 mt-0.5">
              Q{idx + 1}
            </span>
            <span className="text-[13px] sm:text-sm text-ink leading-[1.6] font-sans flex-1 min-w-0">
              {q.question}
            </span>
            <ChevronDown
              size={14}
              className={`text-ink-ghost shrink-0 mt-1 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`}
            />
          </button>
          {openIdx === idx && (
            <div className="px-3.5 sm:px-[18px] pb-3 sm:pb-[14px] pl-[32px] sm:pl-[44px] text-[12px] sm:text-[13px] text-ink-muted leading-[1.7] sm:leading-[1.8]">
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
