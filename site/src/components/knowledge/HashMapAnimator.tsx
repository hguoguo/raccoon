/**
 * HashMap 操作动画组件 — 演示 put/get/resize 过程中的桶数组与链表变化
 * 基于 StepAnimator 通用框架，仅包含 HashMap 专属的数据步骤和可视化渲染
 *
 * @example
 * <HashMapAnimator />
 *
 * 无外部 Props，内部自带 4 组场景数据（put无冲突、put哈希冲突、扩容、get查询）
 */
import { Fragment } from 'react'
import StepAnimator, { type Scenario } from './StepAnimator'

// ===== HashMap-specific Types =====
interface BNode {
  key: string
  value: string
}

interface HashMapStep {
  capacity: number
  buckets: (BNode[] | null)[]
  hlBucket?: number
  hlNode?: number
  newNode?: string
  phase: string
  desc: string
}

// ===== Sub Components (HashMap-specific visualization) =====
function NodeBox({ node, isHighlighted, isNew }: { node: BNode; isHighlighted: boolean; isNew: boolean }) {
  return (
    <div
      className={`
        inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[4px] border text-[10px] sm:text-[11px] font-mono
        transition-all duration-300 whitespace-nowrap
        ${isHighlighted
          ? 'border-accent bg-accent-soft text-accent-deep shadow-[0_0_8px_rgba(181,101,29,0.3)]'
          : 'border-border bg-parchment-light text-ink-muted'}
        ${isNew ? 'animate-node-pop' : ''}
      `}
    >
      <span className="font-semibold">{node.key}</span>
      <span className="text-ink-ghost">:</span>
      <span>{node.value}</span>
    </div>
  )
}

function ArrowRight() {
  return <span className="text-ink-ghost text-[10px] mx-0.5 shrink-0">→</span>
}

function BucketRow({ index, nodes, isHighlighted, hlNodeIdx, newNodeKey, capacity }: {
  index: number; nodes: BNode[] | null; isHighlighted: boolean
  hlNodeIdx?: number; newNodeKey?: string; capacity: number
}) {
  if (index >= capacity) return null
  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-[6px] transition-all duration-300 ${
        isHighlighted ? 'bg-accent-glow' : ''
      }`}
    >
      <span
        className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-[3px] text-[9px] sm:text-[10px] font-mono shrink-0 transition-all duration-300 ${
          isHighlighted ? 'bg-accent text-white' : 'bg-parchment-deep text-ink-faded'
        }`}
      >
        {index}
      </span>
      <div className="flex items-center gap-0.5 min-h-[24px] flex-wrap">
        {nodes && nodes.length > 0 ? (
          nodes.map((node, i) => (
            <Fragment key={`${node.key}-${i}`}>
              {i > 0 && <ArrowRight />}
              <NodeBox
                node={node}
                isHighlighted={isHighlighted && hlNodeIdx === i}
                isNew={node.key === newNodeKey}
              />
            </Fragment>
          ))
        ) : (
          <span className="text-ink-ghost text-[11px] sm:text-[12px] italic">∅</span>
        )}
      </div>
    </div>
  )
}

// ===== Scenario Data =====
const INIT_8: (BNode[] | null)[] = [
  null,
  [{ key: 'id', value: '1' }],
  null,
  [{ key: 'age', value: '20' }, { key: 'score', value: '95' }],
  null,
  null,
  null,
  null,
]

const scenarios: Scenario<HashMapStep>[] = [
  {
    meta: { name: 'put — 无冲突插入', short: '无冲突', icon: '🟢' },
    steps: [
      { capacity: 8, buckets: INIT_8, phase: '初始状态', desc: 'HashMap 当前有 3 个键值对，容量为 8，threshold = 6' },
      { capacity: 8, buckets: INIT_8, phase: '① 计算 hash', desc: '执行 put("name", "Alice")，调用 hash() 方法进行扰动处理' },
      { capacity: 8, buckets: INIT_8, hlBucket: 7, phase: '② 定位桶', desc: 'hash("name") 扰动后 = 3393079，索引 = (8-1) & 3393079 = 7' },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }, { key: 'score', value: '95' }], null, null, null, [{ key: 'name', value: 'Alice' }]],
        hlBucket: 7, newNode: 'name', phase: '③ 直接插入', desc: '桶[7]为空，直接插入新节点 ✅',
      },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }, { key: 'score', value: '95' }], null, null, null, [{ key: 'name', value: 'Alice' }]],
        hlBucket: 7, phase: '④ 完成', desc: '插入完成！size=4，未超过 threshold(6)，无需扩容',
      },
    ],
  },
  {
    meta: { name: 'put — 哈希冲突', short: '冲突+尾插', icon: '🟡' },
    steps: [
      { capacity: 8, buckets: INIT_8, phase: '初始状态', desc: 'HashMap 当前有 3 个键值对' },
      { capacity: 8, buckets: INIT_8, phase: '① 计算 hash', desc: '执行 put("phone", "123-4567")，计算 hash 值' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, phase: '② 定位桶', desc: 'hash("phone") 扰动后 = 3923447，索引 = 7 & 3923447 = 3' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, hlNode: 0, phase: '③ 遍历链表', desc: '桶[3]不为空，检查第1个节点：key="age" ≠ "phone"，继续' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, hlNode: 1, phase: '③ 遍历链表', desc: '检查第2个节点：key="score" ≠ "phone"，继续' },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }, { key: 'score', value: '95' }, { key: 'phone', value: '123-4567' }], null, null, null, null],
        hlBucket: 3, newNode: 'phone', phase: '④ 尾插法追加', desc: '遍历结束未找到相同 key，尾插法追加到链表末尾 ✅',
      },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }, { key: 'score', value: '95' }, { key: 'phone', value: '123-4567' }], null, null, null, null],
        hlBucket: 3, phase: '⑤ 完成', desc: '插入完成！链表长度 = 3，未超过树化阈值 8',
      },
    ],
  },
  {
    meta: { name: 'get — 查找操作', short: 'get查找', icon: '🔵' },
    steps: [
      { capacity: 8, buckets: INIT_8, phase: '初始状态', desc: 'HashMap 当前有 3 个键值对' },
      { capacity: 8, buckets: INIT_8, phase: '① 计算 hash', desc: '执行 get("score")，计算 hash 值' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, phase: '② 定位桶', desc: 'hash("score") 扰动后 = 1094923，索引 = 7 & 1094923 = 3' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, hlNode: 0, phase: '③ 首节点检查', desc: '首节点 key="age" ≠ "score"，继续遍历' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, hlNode: 1, phase: '④ 命中！', desc: '第2个节点 key="score" = "score"，找到目标 🎯' },
      { capacity: 8, buckets: INIT_8, hlBucket: 3, hlNode: 1, phase: '⑤ 完成', desc: '返回 value="95"，查找完成' },
    ],
  },
  {
    meta: { name: 'resize — 扩容迁移', short: '扩容', icon: '🔴' },
    steps: [
      {
        capacity: 4,
        buckets: [null, [{ key: 'id', value: '1' }, { key: 'name', value: 'Tom' }], null, [{ key: 'age', value: '20' }]],
        phase: '初始状态', desc: '容量=4，size=3，threshold=3。put("score","95") 将使 size>threshold，触发扩容',
      },
      {
        capacity: 4,
        buckets: [null, [{ key: 'id', value: '1' }, { key: 'name', value: 'Tom' }], null, [{ key: 'age', value: '20' }]],
        phase: '① 触发扩容', desc: 'size(4) > threshold(3)，创建新数组，容量翻倍 4 → 8',
      },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, null, null, null, null, null],
        hlBucket: 1, newNode: 'id', phase: '② 迁移 bucket[1]',
        desc: '"id" → hash & oldCap(4) = 0 → 留在原位[1]',
      },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, null, null, [{ key: 'name', value: 'Tom' }], null, null],
        hlBucket: 5, newNode: 'name', phase: '② 迁移 bucket[1]',
        desc: '"name" → hash & oldCap(4) ≠ 0 → 移到[1+4=5]',
      },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }], null, [{ key: 'name', value: 'Tom' }], null, null],
        hlBucket: 3, newNode: 'age', phase: '③ 迁移 bucket[3]',
        desc: '"age" → hash & oldCap(4) = 0 → 留在原位[3]',
      },
      {
        capacity: 8,
        buckets: [null, [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }], null, [{ key: 'name', value: 'Tom' }], null, null],
        phase: '④ 迁移完成', desc: '扩容完成！元素在新数组中分布更均匀，链表长度缩短',
      },
      {
        capacity: 8,
        buckets: [[{ key: 'score', value: '95' }], [{ key: 'id', value: '1' }], null, [{ key: 'age', value: '20' }], null, [{ key: 'name', value: 'Tom' }], null, null],
        hlBucket: 0, newNode: 'score', phase: '⑤ 插入新元素',
        desc: '继续 put("score","95")，hash 定位到桶[0]，直接插入',
      },
    ],
  },
]

// ===== Main Component =====
export default function HashMapAnimator() {
  return (
    <StepAnimator<HashMapStep>
      title="HashMap 操作动画"
      scenarios={scenarios}
      getPhase={step => step.phase}
      getDescription={step => step.desc}
      renderStats={step => {
        const nonEmpty = step.buckets.filter(b => b && b.length > 0).length
        const total = step.buckets.reduce((acc, b) => acc + (b?.length ?? 0), 0)
        return (
          <>
            <span>容量: <strong className="text-ink-muted">{step.capacity}</strong></span>
            <span>节点: <strong className="text-ink-muted">{total}</strong></span>
            <span>非空桶: <strong className="text-ink-muted">{nonEmpty}</strong></span>
          </>
        )
      }}
      renderVisualization={step => (
        <>
          {step.buckets.map((nodes, i) => (
            <BucketRow
              key={`b-${i}`}
              index={i}
              nodes={nodes}
              isHighlighted={step.hlBucket === i}
              hlNodeIdx={step.hlBucket === i ? step.hlNode : undefined}
              newNodeKey={step.hlBucket === i ? step.newNode : undefined}
              capacity={step.capacity}
            />
          ))}
        </>
      )}
    />
  )
}
