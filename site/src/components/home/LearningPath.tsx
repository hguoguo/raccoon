import { Link } from 'react-router-dom'
import { learningGoals } from '../../data/chapters'
import type { LearningStage, LearningNode } from '../../data/types'
import { useState } from 'react'

export default function LearningPathSection() {
  const [selectedGoalId, setSelectedGoalId] = useState(learningGoals[0]?.id || '')
  const selectedGoal = learningGoals.find(g => g.id === selectedGoalId)

  const totalNodes = selectedGoal?.stages.reduce((sum, s) => sum + s.nodes.length, 0) || 0
  const totalHours = selectedGoal?.stages.reduce((sum, s) => sum + s.estimatedHours, 0) || 0
  const totalArticles = selectedGoal?.stages.reduce((sum, s) =>
    sum + s.nodes.reduce((nSum, n) => nSum + Math.ceil(n.readingTime / 50), 0)
  , 0) || 0

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3 sm:mb-4 pb-3 border-b border-border-light">
        <div>
          <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
            <span className="mr-2 text-lg">🎯</span>选择你的学习目标
          </h2>
        </div>
        {selectedGoal && (
          <div className="hidden sm:flex items-center gap-3 text-[12px] font-sans text-ink-faded">
            <span>📊 <strong className="text-ink">{totalNodes}</strong> 专题</span>
            <span>⏱ <strong className="text-ink">{totalHours}</strong> 小时</span>
            <span>📄 <strong className="text-ink">{totalArticles}+</strong> 篇</span>
          </div>
        )}
      </div>

      {/* Goal Tabs + Description inline */}
      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-1">
        {learningGoals.map(goal => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoalId(goal.id)}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-sans text-[13px] sm:text-[14px] font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
              selectedGoalId === goal.id
                ? 'bg-accent text-white shadow-paper-sm'
                : 'bg-white border border-[#e2d5c3] text-ink-muted hover:border-accent/30 hover:text-ink-light'
            }`}
          >
            <span className="text-[15px]">{goal.icon}</span>
            <span>{goal.title}</span>
          </button>
        ))}
        {selectedGoal && (
          <span className="hidden lg:inline text-[13px] text-ink-faded font-sans whitespace-nowrap shrink-0">
            — {selectedGoal.description}
          </span>
        )}
      </div>

      {/* Timeline Map — 2-col stages on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6">
        {selectedGoal?.stages.map((stage, stageIdx) => (
          <StageRow key={stageIdx} stage={stage} stageIndex={stageIdx} isLast={stageIdx === selectedGoal.stages.length - 1} totalStages={selectedGoal.stages.length} />
        ))}
      </div>

      {/* Mobile Summary */}
      {selectedGoal && (
        <div className="sm:hidden mt-3 pt-3 border-t border-border-light">
          <div className="flex items-center gap-4 text-[12px] font-sans text-ink-muted">
            <span>📊 <strong className="text-ink">{totalNodes}</strong> 专题</span>
            <span>⏱ <strong className="text-ink">{totalHours}</strong> 小时</span>
            <span>📄 <strong className="text-ink">{totalArticles}+</strong> 篇</span>
          </div>
        </div>
      )}
    </section>
  )
}

function StageRow({ stage, stageIndex, isLast, totalStages }: { stage: LearningStage; stageIndex: number; isLast: boolean; totalStages: number }) {
  // On xl: if odd total, last item spans full; even total, no span needed
  const isOddLast = totalStages % 2 !== 0 && stageIndex === totalStages - 1

  return (
    <div className={`flex gap-3 sm:gap-4 ${isLast ? '' : 'pb-4 sm:pb-5'} ${isOddLast ? 'xl:col-span-2' : ''}`}>
      {/* Slim Timeline Rail */}
      <div className="flex flex-col items-center shrink-0 w-7 sm:w-8">
        {/* Node Dot */}
        <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent text-white flex items-center justify-center font-display font-bold text-[12px] sm:text-[13px] shadow-paper-sm shrink-0">
          {stageIndex + 1}
        </div>
        {/* Connector */}
        {!isLast && (
          <div className="w-[2px] flex-1 bg-gradient-to-b from-accent/30 to-accent/10 min-h-[8px]" />
        )}
      </div>

      {/* Stage Content */}
      <div className="flex-1 min-w-0">
        {/* Stage Header — inline badge */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-display font-bold text-[15px] sm:text-base text-ink leading-tight">
            {stage.title}
          </h3>
          <span className="text-[11px] text-accent font-sans font-semibold whitespace-nowrap bg-accent-glow px-1.5 py-px rounded-full leading-snug">
            {stage.estimatedHours}h
          </span>
        </div>

        {/* Node Cards Grid — more columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          {stage.nodes.map((node, nodeIdx) => (
            <NodeCard key={nodeIdx} node={node} />
          ))}
        </div>
      </div>
    </div>
  )
}

function NodeCard({ node }: { node: LearningNode }) {
  return (
    <Link
      to={`/docs/${node.chapterId}`}
      className="group bg-white border border-[#e2d5c3] rounded-lg p-2.5 hover:shadow-paper-md hover:border-accent/30 transition-all duration-200 cursor-pointer"
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-lg sm:text-xl leading-none shrink-0">{node.icon}</span>
        <h4 className="font-display font-semibold text-[12px] sm:text-[13px] text-ink group-hover:text-accent transition-colors leading-snug line-clamp-2">
          {node.title}
        </h4>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] text-ink-faded font-sans">
          ⏱ {Math.ceil(node.readingTime / 60)}h+
        </span>
        <span className="flex gap-[1px]">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-[6px] sm:text-[7px] ${i < node.difficulty ? 'text-accent' : 'text-border'}`}>★</span>
          ))}
        </span>
      </div>
    </Link>
  )
}
