import { Link } from 'react-router-dom'
import { learningGoals } from '../../data/chapters'
import type { LearningGoal, LearningStage, LearningNode } from '../../data/types'
import { useState } from 'react'

export default function LearningPathSection() {
  const [selectedGoalId, setSelectedGoalId] = useState(learningGoals[0]?.id || '')
  const selectedGoal = learningGoals.find(g => g.id === selectedGoalId)

  const totalNodes = selectedGoal?.stages.reduce((sum, s) => sum + s.nodes.length, 0) || 0
  const totalHours = selectedGoal?.stages.reduce((sum, s) => sum + s.estimatedHours, 0) || 0
  const totalArticles = selectedGoal?.stages.reduce((sum, s) =>
    sum + s.nodes.reduce((nSum, n) => {
      // 粗略估算：每个节点对应 chapter 下的文章数
      return nSum + Math.ceil(n.readingTime / 50)
    }, 0)
  , 0) || 0

  return (
    <section className="px-4 sm:px-6 lg:px-11 py-5 sm:py-6 max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4 sm:mb-5 pb-3 border-b border-border-light">
        <div>
          <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
            <span className="mr-2 text-lg">🎯</span>选择你的学习目标
          </h2>
          <p className="text-[#8b7b6d] mt-1 text-sm">按职业方向规划系统化学习路线</p>
        </div>
      </div>

      {/* Goal Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
        {learningGoals.map(goal => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoalId(goal.id)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-sans text-[13px] sm:text-[14px] font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
              selectedGoalId === goal.id
                ? 'bg-accent text-white shadow-paper-sm'
                : 'bg-white border border-[#e2d5c3] text-ink-muted hover:border-accent/30 hover:text-ink-light'
            }`}
          >
            <span className="text-[16px]">{goal.icon}</span>
            <span>{goal.title}</span>
          </button>
        ))}
      </div>

      {/* Goal Description */}
      {selectedGoal && (
        <p className="text-ink-muted font-sans text-[14px] mb-4">{selectedGoal.description}</p>
      )}

      {/* Stages */}
      {selectedGoal?.stages.map((stage, stageIdx) => (
        <StageBlock key={stageIdx} stage={stage} stageIndex={stageIdx} />
      ))}

      {/* Summary */}
      {selectedGoal && (
        <div className="mt-4 pt-4 border-t border-border-light">
          <div className="flex items-center gap-6 text-[13px] font-sans text-ink-muted">
            <span>📊 <strong className="text-ink">{totalNodes}</strong> 个专题</span>
            <span>⏱ 预计 <strong className="text-ink">{totalHours}</strong> 小时</span>
            <span>📄 <strong className="text-ink">{totalArticles}+</strong> 篇文章</span>
          </div>
        </div>
      )}
    </section>
  )
}

function StageBlock({ stage, stageIndex }: { stage: LearningStage; stageIndex: number }) {
  return (
    <div className="mb-4 last:mb-0">
      {/* Stage Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-[11px] font-bold flex items-center justify-center font-sans">
            {stageIndex + 1}
          </span>
          <h3 className="font-display font-bold text-[15px] sm:text-base text-ink">
            {stage.title}
          </h3>
        </div>
        <span className="text-[12px] text-ink-faded font-sans">
          预计 {stage.estimatedHours}h
        </span>
      </div>

      {/* Node Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {stage.nodes.map((node, nodeIdx) => (
          <NodeCard key={nodeIdx} node={node} isLast={nodeIdx === stage.nodes.length - 1} />
        ))}
      </div>
    </div>
  )
}

function NodeCard({ node, isLast }: { node: LearningNode; isLast: boolean }) {
  return (
    <div className="flex items-center shrink-0">
      <Link
        to={`/docs/${node.chapterId}`}
        className="group w-[140px] sm:w-[160px] bg-white border border-[#e2d5c3] rounded-2xl p-4 hover:shadow-paper-md hover:border-accent/30 transition-all duration-200 cursor-pointer"
      >
        {/* Icon */}
        <span className="text-2xl block mb-2">{node.icon}</span>
        {/* Title */}
        <h4 className="font-display font-semibold text-[13px] sm:text-[14px] text-ink group-hover:text-accent transition-colors leading-tight">
          {node.title}
        </h4>
        {/* Meta */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] sm:text-[11px] text-ink-faded font-sans">
            ⏱ {Math.ceil(node.readingTime / 60)}h+
          </span>
          <span className="flex gap-[1px]">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-[7px] ${i < node.difficulty ? 'text-accent' : 'text-border'}`}>★</span>
            ))}
          </span>
        </div>
      </Link>
      {/* Arrow */}
      {!isLast && (
        <span className="text-ink-ghost text-[14px] mx-1 shrink-0">→</span>
      )}
    </div>
  )
}
