const updates = [
  { type: 'new' as const, text: '<strong>DuckDB OLAP引擎文档</strong> — 快速入门、架构分析、Java集成实战', date: '04-17' },
  { type: 'new' as const, text: '<strong>Dify平台学习教程</strong> — 快速入门、架构分析、Java集成实践', date: '04-17' },
  { type: 'new' as const, text: '<strong>AI应用开发章节</strong> — 大模型基础、RAG、Agent、MCP协议', date: '04-17' },
  { type: 'update' as const, text: '<strong>MySQL深入专题</strong> — 日志机制、MVCC、执行计划、索引优化', date: '04-16' },
  { type: 'update' as const, text: '<strong>并发编程与JVM深化</strong> — 锁机制、CAS、JMM、线程池、AQS', date: '04-16' },
  { type: 'update' as const, text: '<strong>集合源码深度分析</strong> — ArrayList、HashMap、ConcurrentHashMap', date: '04-16' },
]

const typeConfig = {
  new: { label: 'NEW', bg: 'bg-teal-soft', color: 'text-teal' },
  update: { label: 'UPD', bg: 'bg-accent-soft', color: 'text-accent' },
}

export default function RecentUpdates() {
  return (
    <section className="px-4 sm:px-6 lg:px-11 py-7 sm:py-9 pb-10 sm:pb-14 max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-5 sm:mb-6 pb-3 border-b border-border-light">
        <h2 className="font-display font-bold text-display-sm tracking-tight text-ink">
          <span className="mr-2 text-lg">📋</span>最近更新
        </h2>
        <a href="#" className="text-[12px] sm:text-[13px] text-accent font-sans flex items-center gap-1 hover:gap-2 transition-all">
          查看全部 →
        </a>
      </div>

      {/* Updates */}
      <div className="flex flex-col gap-[1px]">
        {updates.map((u, i) => {
          const cfg = typeConfig[u.type]
          return (
            <div key={i} className="flex items-center gap-2 sm:gap-[14px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-paper-md hover:bg-parchment-light transition-colors cursor-pointer">
              <span className={`font-mono text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-[2px] sm:py-[3px] rounded-[3px] uppercase tracking-[0.06em] shrink-0 ${cfg.bg} ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="flex-1 text-[12px] sm:text-[13px] text-ink-muted font-sans line-clamp-2" dangerouslySetInnerHTML={{ __html: u.text }} />
              <span className="font-mono text-[10px] sm:text-[11px] text-ink-ghost shrink-0 hidden sm:inline">{u.date}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
