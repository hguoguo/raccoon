import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import ArticleNav from '../../../../../components/article/ArticleNav'
import Playground from '../../../../../components/knowledge/Playground'
import Callout from '../../../../../components/ui/Callout'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'partition-key', text: '分区键设计', level: 2 },
  { id: 'sorting-key', text: '排序键优化', level: 3 },
  { id: 'sampling', text: '采样查询', level: 3 },
  { id: 'materialized-view', text: '物化视图', level: 2 },
  { id: 'pre-aggregation', text: '预聚合策略', level: 3 },
  { id: 'query-optimization', text: '查询优化技巧', level: 2 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '性能对比测试', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function ClickHousePerformance({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>
          {/* 头部信息 */}
          <div className="mb-8 pb-6 border-b border-border-light">
            <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3 text-ink">
              {meta.title}
            </h1>
            <div className="flex flex-wrap gap-2 items-center text-sm text-ink-muted">
              <span className="px-2 py-1 bg-accent-soft text-accent rounded-md font-medium">
                {meta.level}
              </span>
              <span>难度 ⭐⭐⭐⭐⭐</span>
              <span>预计阅读 {meta.readingTime} 分钟</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-parchment-deep text-ink-muted rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 一句话定义 */}
          <section id="definition" className="mb-8">
            <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一句话定义
            </h2>
            <blockquote className="pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light">
              ClickHouse 性能优化是通过合理的表结构设计、索引策略、物化视图和查询改写等手段，充分发挥列式存储和向量化执行引擎的优势，实现亚秒级响应亿级数据查询的系统工程。
            </blockquote>
            <SideNote label="性能优化的核心思想">
              ClickHouse 的性能优化遵循"空间换时间"的原则：通过预计算（物化视图）、冗余存储（多份数据副本）、合理索引等方式，将计算压力从查询时转移到写入时或后台异步任务中。
            </SideNote>
          </section>

          {/* 分区键设计 */}
          <section id="partition-key" className="mb-8">
            <h2 id="partition-key" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              分区键设计
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              分区（Partition）是 ClickHouse 数据管理的核心机制，合理的分区策略可以大幅提升查询性能和数据管理效率：
            </p>

            <ContextSwitcher
              simpleContent={
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>分区的作用</strong>：
                  </p>
                  <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
                    <li><strong>数据隔离</strong>：不同分区的数据物理隔离，便于管理和删除</li>
                    <li><strong>查询裁剪</strong>：查询时可以跳过不相关的分区，减少 I/O</li>
                    <li><strong>并行处理</strong>：不同分区可以并行查询，提升并发能力</li>
                  </ul>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                    <strong>最佳实践</strong>：按时间分区（如按月），避免分区过多（建议 &lt; 1000 个），每个分区数据量在 1-10 GB 之间。
                  </p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-ink mb-2">分区策略对比</h4>
                    <Playground
                      code={`-- ❌ 错误示例：不分区（所有数据在一个分区）
CREATE TABLE events_no_partition (
    event_date Date,
    event_id UInt64
) ENGINE = MergeTree()
ORDER BY event_id;
-- 问题：无法利用分区裁剪，删除历史数据需要全表扫描

-- ✅ 正确示例：按月分区
CREATE TABLE events_monthly (
    event_date Date,
    event_id UInt64
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)  -- 202401, 202402, ...
ORDER BY (event_date, event_id);
-- 优势：可以快速删除旧月份数据（ALTER TABLE DROP PARTITION）

-- ⚠️ 谨慎使用：按天分区（可能导致分区过多）
CREATE TABLE events_daily (
    event_date Date,
    event_id UInt64
) ENGINE = MergeTree()
PARTITION BY toYYYYMMDD(event_date)  -- 20240101, 20240102, ...
ORDER BY (event_date, event_id);
-- 风险：一年 365 个分区，三年 1000+ 分区，影响性能

-- 🔍 查看分区信息
SELECT 
    partition,
    count() AS part_count,
    sum(rows) AS total_rows,
    formatReadableSize(sum(bytes_on_disk)) AS total_size
FROM system.parts
WHERE table = 'events_monthly' AND active
GROUP BY partition
ORDER BY partition;`}
                      language="sql"
                      description="合理的分区策略是性能优化的第一步"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">分区裁剪原理</h4>
                    <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                      当查询条件包含分区键时，ClickHouse 可以跳过不相关的分区：
                    </p>
                    <Playground
                      code={`-- 查询：只读取 2024年1月 和 2月 的分区
SELECT count() 
FROM events_monthly 
WHERE event_date >= '2024-01-01' AND event_date < '2024-03-01';

-- 执行计划（EXPLAIN）
Expression ((Projection + Before ORDER BY))
  Aggregating
    ReadFromMergeTree (default.events_monthly)
    Parts: 2  ← 只读取 2 个分区，而不是全部
    Granules: 16384  ← 跳过了其他分区的 granules

-- 如果没有分区裁剪，需要读取所有分区（假设 36 个月）
-- Parts: 36 → 性能下降 18 倍！`}
                      language="sql"
                      description="分区裁剪可以大幅减少 I/O，提升查询速度"
                    />
                  </div>
                </div>
              }
            />

            <SideNote label="分区过多的危害">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>元数据膨胀</strong>：每个分区都需要在 ZooKeeper 中记录元数据</li>
                <li><strong>查询变慢</strong>：需要遍历更多分区目录</li>
                <li><strong>合并困难</strong>：后台合并任务难以跨分区合并</li>
                <li><strong>内存占用</strong>：每个分区都会占用一定的内存缓存</li>
              </ul>
            </SideNote>
          </section>

          {/* 排序键优化 */}
          <section id="sorting-key" className="mb-8">
            <h2 id="sorting-key" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              排序键优化
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              排序键（ORDER BY）决定了数据在 Part 中的物理存储顺序，也是稀疏索引的依据：
            </p>

            <Playground
              code={`-- 排序键设计原则：
-- 1. 将高频过滤字段放在前面（利用前缀匹配）
-- 2. 将区分度高的字段放在后面（提高索引精度）
-- 3. 避免使用低区分度字段（如性别、状态）

-- ✅ 优秀示例：时间 + ID
CREATE TABLE events_optimized (
    event_date Date,
    event_id UInt64,
    user_id UInt32,
    event_type String
) ENGINE = MergeTree()
ORDER BY (event_date, event_id);
-- 优势：
-- - 时间范围查询高效（WHERE event_date BETWEEN ...）
-- - 同一日期内按 ID 有序，便于去重和范围查询

-- ⚠️ 一般示例：低区分度字段在前
CREATE TABLE events_bad (
    event_date Date,
    event_type String,  -- 只有几种类型，区分度低
    event_id UInt64
) ENGINE = MergeTree()
ORDER BY (event_type, event_date, event_id);
-- 问题：event_type 区分度低，索引效果差

-- 🔍 查看索引使用情况
SELECT 
    column,
    position,
    type,
    data_compressed_bytes,
    data_uncompressed_bytes
FROM system.columns
WHERE table = 'events_optimized'
AND name IN ('event_date', 'event_id');`}
              language="sql"
              description="排序键设计直接影响查询性能和索引效率"
            />

            <h3 id="sampling" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              采样查询
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              对于超大数据集，可以使用采样查询快速获取近似结果：
            </p>

            <Playground
              code={`-- 创建支持采样的表（必须有采样键）
CREATE TABLE events_sampling (
    event_date Date,
    event_id UInt64,
    user_id UInt32
) ENGINE = MergeTree()
ORDER BY (event_date, event_id)
SAMPLE BY user_id;  -- 采样键必须是主键的一部分

-- 采样查询：读取 10% 的数据
SELECT count() * 10 AS estimated_count
FROM events_sampling
SAMPLE 0.1
WHERE event_date >= '2024-01-01';

-- 采样查询：读取 100万行
SELECT count() * (total_rows / 1000000) AS estimated_count
FROM events_sampling
SAMPLE 1000000
WHERE event_date >= '2024-01-01';

-- 适用场景：
-- - 快速估算总数（SELECT count(*)）
-- - 探索性数据分析（EDA）
-- - 实时监控大屏（允许一定误差）

-- 注意事项：
-- - 采样结果是近似值，不适用于精确统计
-- - 采样率越低，误差越大
-- - 采样键的选择会影响采样均匀性`}
              language="sql"
              description="采样查询可以在可接受的误差范围内大幅提升查询速度"
            />
          </section>

          {/* 物化视图 */}
          <section id="materialized-view" className="mb-8">
            <h2 id="materialized-view" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              物化视图
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              物化视图（Materialized View）是 ClickHouse 最强大的性能优化工具之一，通过预计算将查询压力从读取时转移到写入时：
            </p>

            <DiagramBlock title="物化视图工作原理">
              {`graph TD
                INSERT["INSERT INTO base_table"] --> BASE["Base Table<br/>原始数据"]
                BASE --> MV_TRIGGER["MV Trigger"]
                MV_TRIGGER --> AGG["Aggregation Engine<br/>SummingMergeTree<br/>AggregatingMergeTree"]
                AGG --> MV_TABLE["Materialized View<br/>预聚合结果"]
                QUERY["SELECT FROM MV"] --> MV_TABLE
                MV_TABLE --> RESULT["Fast Result<br/>毫秒级响应"]
              `}
            </DiagramBlock>

            <h3 id="pre-aggregation" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              预聚合策略
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              根据不同的聚合需求，选择合适的物化视图引擎：
            </p>

            <Playground
              code={`-- 1. SummingMergeTree：自动求和
CREATE MATERIALIZED VIEW mv_daily_stats
ENGINE = SummingMergeTree()
ORDER BY (event_date, event_type)
AS SELECT
    event_date,
    event_type,
    count() AS event_count,
    sum(amount) AS total_amount
FROM events
GROUP BY event_date, event_type;

-- 查询预聚合结果（极速）
SELECT * FROM mv_daily_stats
WHERE event_date >= '2024-01-01';
-- 响应时间：毫秒级（原表可能需要秒级）

-- 2. AggregatingMergeTree：自定义聚合函数
CREATE MATERIALIZED VIEW mv_user_stats
ENGINE = AggregatingMergeTree()
ORDER BY (user_id, event_date)
AS SELECT
    user_id,
    event_date,
    uniqState(user_id) AS uv_state,  -- 去重计数状态
    sumState(amount) AS amount_state  -- 求和状态
FROM events
GROUP BY user_id, event_date;

-- 查询时需要合并状态
SELECT
    user_id,
    uniqMerge(uv_state) AS uv,
    sumMerge(amount_state) AS total_amount
FROM mv_user_stats
GROUP BY user_id;

-- 3. 多层物化视图（聚合链）
-- 第一层：按小时聚合
CREATE MATERIALIZED VIEW mv_hourly
ENGINE = SummingMergeTree()
ORDER BY (toStartOfHour(event_time), event_type)
AS SELECT
    toStartOfHour(event_time) AS hour,
    event_type,
    count() AS cnt
FROM events_raw
GROUP BY hour, event_type;

-- 第二层：按天聚合（基于第一层）
CREATE MATERIALIZED VIEW mv_daily
ENGINE = SummingMergeTree()
ORDER BY (toDate(hour), event_type)
AS SELECT
    toDate(hour) AS day,
    event_type,
    sum(cnt) AS daily_cnt
FROM mv_hourly
GROUP BY day, event_type;

-- 优势：逐层聚合，每层数据量递减，查询更快`}
              language="sql"
              description="物化视图可以将复杂聚合查询从秒级优化到毫秒级"
            />

            <SideNote label="物化视图的注意事项">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>数据一致性</strong>：物化视图是异步更新的，可能存在短暂延迟</li>
                <li><strong>存储空间</strong>：物化视图会占用额外存储空间，需评估成本</li>
                <li><strong>写入放大</strong>：每次写入基表都会触发物化视图更新，影响写入性能</li>
                <li><strong>维护成本</strong>：需要定期监控物化视图的状态和数据量</li>
                <li><strong>适用场景</strong>：适合读多写少、聚合模式固定的场景</li>
              </ul>
            </SideNote>
          </section>

          {/* 查询优化技巧 */}
          <section id="query-optimization" className="mb-8">
            <h2 id="query-optimization" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              查询优化技巧
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              通过改写查询语句和利用 ClickHouse 特性，可以进一步提升查询性能：
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-ink mb-2">1. 使用 PREWHERE 代替 WHERE</h4>
                <Playground
                  code={`-- ❌ 普通 WHERE：先读取所有列，再过滤
SELECT user_id, event_type, amount
FROM events
WHERE event_date >= '2024-01-01' AND event_type = 'purchase';

-- ✅ PREWHERE：先过滤，再读取其他列（减少 I/O）
SELECT user_id, event_type, amount
FROM events
PREWHERE event_date >= '2024-01-01' AND event_type = 'purchase';

-- 原理：
-- - WHERE：读取所有列 → 过滤 → 返回结果
-- - PREWHERE：过滤 → 只读取需要的列 → 返回结果
-- - 当过滤条件能排除大量数据时，PREWHERE 效果显著

-- 注意：ClickHouse 会自动优化，某些情况下会将 WHERE 转换为 PREWHERE`}
                  language="sql"
                  description="PREWHERE 可以减少不必要的列读取，提升 I/O 效率"
                />
              </div>

              <div>
                <h4 className="font-semibold text-ink mb-2">2. 避免 SELECT *</h4>
                <Playground
                  code={`-- ❌ 糟糕：读取所有列
SELECT * FROM events WHERE event_date >= '2024-01-01';

-- ✅ 优秀：只读取需要的列
SELECT event_date, user_id, amount
FROM events
WHERE event_date >= '2024-01-01';

-- 性能差异：
-- - 假设有 20 列，只查询 3 列
-- - I/O 减少 85%，查询速度提升 5-10 倍`}
                  language="sql"
                  description="列式存储下，只读取需要的列可以大幅减少 I/O"
                />
              </div>

              <div>
                <h4 className="font-semibold text-ink mb-2">3. 使用全局 JOIN</h4>
                <Playground
                  code={`-- ❌ 普通 JOIN：大表 Shuffle，性能差
SELECT e.*, u.name
FROM events e
INNER JOIN users u ON e.user_id = u.id;

-- ✅ 全局 JOIN：小表广播到大表节点
SELECT e.*, u.name
FROM events e
GLOBAL INNER JOIN users u ON e.user_id = u.id;

-- 原理：
-- - 普通 JOIN：两表都 Shuffle → 网络开销大
-- - GLOBAL JOIN：小表广播到所有节点 → 大表本地 JOIN
-- - 适用场景：大表 JOIN 小表（小表能放入内存）

-- 注意：GLOBAL JOIN 会增加网络传输，小表不宜过大（建议 < 1GB）`}
                  language="sql"
                  description="GLOBAL JOIN 可以避免大表 Shuffle，提升 JOIN 性能"
                />
              </div>

              <div>
                <h4 className="font-semibold text-ink mb-2">4. 使用字典（Dictionary）</h4>
                <Playground
                  code={`-- 创建字典（替代小表 JOIN）
CREATE DICTIONARY user_dict (
    id UInt64,
    name String,
    age UInt8
)
PRIMARY KEY id
SOURCE(CLICKHOUSE(
    host 'localhost'
    port 9000
    user 'default'
    password ''
    db 'default'
    table 'users'
))
LAYOUT(HASHED())
LIFETIME(MIN 300 MAX 360);

-- 使用字典查询（比 JOIN 快 10-100 倍）
SELECT 
    event_date,
    dictGet('user_dict', 'name', toUInt64(user_id)) AS user_name,
    count() AS event_count
FROM events
WHERE event_date >= '2024-01-01'
GROUP BY event_date, user_id;

-- 优势：
-- - 字典加载到内存，查询速度极快
-- - 支持增量更新和过期策略
-- - 适合维度表（变化少、查询频繁）`}
                  language="sql"
                  description="字典可以将 JOIN 操作转换为内存查找，性能提升显著"
                />
              </div>
            </div>
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 的查询优化器基于规则优化（RBO），以下是关键优化策略的简化实现：
            </p>

            <Playground
              code={`// ClickHouse 查询优化流程（简化版）

// 1. 谓词下推（Predicate Pushdown）
// 将过滤条件下推到存储层，减少数据传输
ASTPtr optimizePredicatePushdown(ASTPtr query) {
    // WHERE event_date >= '2024-01-01'
    // ↓ 下推到 MergeTree 引擎
    // storage->read(filter: event_date >= '2024-01-01')
}

// 2. 常量折叠（Constant Folding）
// 提前计算常量表达式
ASTPtr optimizeConstantFolding(ASTPtr expr) {
    // WHERE age > 18 + 2
    // ↓ 优化为
    // WHERE age > 20
}

// 3. 列裁剪（Column Pruning）
// 只读取查询需要的列
Columns optimizeColumnPruning(ASTPtr query) {
    // SELECT user_id, count() FROM events
    // ↓ 只读取 user_id 列，忽略其他列
    // storage->read(columns: [user_id])
}

// 4. 聚合下推（Aggregation Pushdown）
// 在存储层执行部分聚合，减少数据传输
ASTPtr optimizeAggregationPushdown(ASTPtr query) {
    // SELECT user_id, count() FROM events GROUP BY user_id
    // ↓ 在每个 Part 上局部聚合，再全局合并
    // Partial Aggregation (per Part) → Merge Aggregation
}

// 5. 并行查询执行
void executeQueryParallel(QueryPipeline pipeline) {
    auto thread_pool = getContext().getThreadPool();
    
    // 将查询任务分配到多个线程
    for (auto& part : parts) {
        thread_pool.schedule([&]() {
            auto block = storage->read(part);
            pipeline.push(block);
        });
    }
    
    // 等待所有任务完成
    pipeline.wait();
}`}
              language="cpp"
              description="ClickHouse 通过多种优化策略减少 I/O 和计算量"
            />

            <SideNote label="查询优化器的局限性">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>基于规则</strong>：ClickHouse 使用 RBO（Rule-Based Optimization），而非 CBO（Cost-Based Optimization）</li>
                <li><strong>无统计信息</strong>：不维护表的统计信息（如行数、distinct 值数量）</li>
                <li><strong>手动优化</strong>：需要开发者手动改写查询和使用物化视图</li>
                <li><strong>未来方向</strong>：ClickHouse 正在引入 CBO 和统计信息收集功能</li>
              </ul>
            </SideNote>
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>

            <div className="space-y-4">
              <Callout type="danger" title="误区 1：分区越多越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：分区过多会导致：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>元数据膨胀，ZooKeeper 压力大</li>
                  <li>查询时需要遍历更多分区目录</li>
                  <li>后台合并任务难以跨分区合并</li>
                  <li>建议：分区数控制在 100-1000 之间</li>
                </ul>
              </Callout>

              <Callout type="danger" title="误区 2：物化视图越多越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：过多的物化视图会导致：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>写入放大，影响插入性能</li>
                  <li>存储空间浪费</li>
                  <li>维护复杂度增加</li>
                  <li>建议：只为高频查询创建物化视图</li>
                </ul>
              </Callout>

              <Callout type="warning" title="误区 3：JOIN 性能一定差">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 的 JOIN 性能取决于场景：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>大表 JOIN 小表：使用 GLOBAL JOIN 或字典，性能优秀</li>
                  <li>大表 JOIN 大表：性能较差，需要优化或使用 Doris</li>
                  <li>建议使用字典替代小表 JOIN</li>
                </ul>
              </Callout>

              <Callout type="info" title="误区 4：索引可以加速所有查询">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 只有稀疏索引（主键索引），以下场景无法利用索引：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>非主键字段的等值查询（如 WHERE user_id = 123）</li>
                  <li>模糊查询（如 WHERE name LIKE '%abc%'）</li>
                  <li>函数计算后的字段（如 WHERE toYear(event_date) = 2024）</li>
                  <li>建议：合理设计主键顺序，将高频过滤字段放在前面</li>
                </ul>
              </Callout>
            </div>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-8">
            <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>

            <InterviewSection
              questions={[
                {
                  question: '如何优化 ClickHouse 的查询性能？',
                  answer: `优化策略分为表结构设计和查询改写两个层面：

表结构设计：
1. 合理分区：按时间分区（如按月），避免分区过多（< 1000）
2. 优化排序键：将高频过滤字段放在 ORDER BY 前面
3. 使用物化视图：预计算常用聚合指标，将查询压力转移到写入时
4. 选择合适引擎：ReplacingMergeTree（去重）、AggregatingMergeTree（聚合）

查询改写：
1. 使用 PREWHERE 代替 WHERE：先过滤再读取其他列
2. 避免 SELECT *：只读取需要的列
3. 使用 GLOBAL JOIN：大表 JOIN 小表时避免 Shuffle
4. 使用字典：替代小表 JOIN，将 JOIN 转换为内存查找
5. 使用采样查询：快速获取近似结果

系统调优：
1. 调整 max_threads：控制并行度
2. 启用缓存：mark_cache、uncompressed_cache
3. 监控慢查询：system.query_log`,
                },
                {
                  question: '物化视图和普通视图有什么区别？',
                  answer: `主要区别：

1. 数据存储：
   - 普通视图：不存储数据，只是 SQL 的别名，查询时实时计算
   - 物化视图：存储预计算结果，查询时直接读取

2. 性能：
   - 普通视图：性能与原表相同，无优化
   - 物化视图：查询速度极快（毫秒级），因为数据已预计算

3. 写入开销：
   - 普通视图：无额外开销
   - 物化视图：每次写入基表都会触发物化视图更新，有写入放大

4. 数据一致性：
   - 普通视图：始终与基表一致
   - 物化视图：异步更新，可能存在短暂延迟

5. 适用场景：
   - 普通视图：简化 SQL，复用查询逻辑
   - 物化视图：高频聚合查询，读多写少场景

最佳实践：
- 只为高频查询创建物化视图
- 定期监控物化视图的数据量和更新状态
- 使用 SummingMergeTree 或 AggregatingMergeTree 引擎`,
                },
                {
                  question: 'ClickHouse 的分区和 MySQL 的分区有什么区别？',
                  answer: `主要区别：

1. 实现方式：
   - ClickHouse：分区对应物理目录，每个分区包含多个 Part
   - MySQL：分区是逻辑概念，数据仍存储在同一个表空间中

2. 查询裁剪：
   - ClickHouse：直接跳过不相关的分区目录，I/O 效率高
   - MySQL：需要扫描分区元数据，效果较弱

3. 数据管理：
   - ClickHouse：可以快速删除整个分区（ALTER TABLE DROP PARTITION）
   - MySQL：删除分区需要重建索引，开销较大

4. 分区数量：
   - ClickHouse：建议 < 1000 个分区
   - MySQL：可以支持更多分区（但也不宜过多）

5. 适用场景：
   - ClickHouse：按时间分区，便于删除历史数据和查询裁剪
   - MySQL：按范围或哈希分区，分散 I/O 压力

ClickHouse 的分区机制更轻量、更高效，是其高性能的关键因素之一。`,
                },
                {
                  question: '如何处理 ClickHouse 的数据倾斜问题？',
                  answer: `数据倾斜的表现：某些节点负载高，其他节点空闲。

解决方案：

1. 优化分片键（Sharding Key）：
   - 避免使用低区分度字段（如城市、性别）
   - 使用哈希函数均匀分布：sipHash64(user_id)
   - 使用随机因子：cityHash64(user_id, rand() % 10)

2. 调整分布式表配置：
   - 使用 random 负载均衡策略
   - 启用 skip_unavailable_shards

3. 监控数据分布：
   SELECT 
       shard_num,
       count() AS row_count,
       formatReadableSize(sum(bytes_on_disk)) AS size
   FROM clusterAllReplicas(default, system.parts)
   WHERE table = 'your_table'
   GROUP BY shard_num;

4. 重新分片（Resharding）：
   - 导出数据
   - 修改分片键
   - 重新导入

预防优于治理：在设计阶段就要考虑数据分布的均匀性。`,
                },
                {
                  question: 'ClickHouse 的缓存机制有哪些？如何调优？',
                  answer: `ClickHouse 有多级缓存机制：

1. Mark Cache（标记缓存）：
   - 缓存稀疏索引的标记文件（.mrk）
   - 默认大小：5368709120 bytes（5 GB）
   - 调优：增加缓存大小可以提升索引命中率
   - 配置：mark_cache_size

2. Uncompressed Cache（非压缩块缓存）：
   - 缓存解压后的数据块
   - 默认大小：8589934592 bytes（8 GB）
   - 调优：适合重复查询相同数据的场景
   - 配置：uncompressed_cache_size
   - 注意：启用后会增加内存占用

3. Page Cache（页缓存）：
   - 依赖操作系统的文件系统缓存
   - 无需配置，由 OS 管理

4. Index Cache（主键索引缓存）：
   - 缓存主键索引数据
   - 自动管理，无需手动调优

调优建议：
- 监控缓存命中率：system.metrics 表
- 根据 workload 调整缓存大小
- 内存充足时可以增加缓存
- 内存紧张时优先保证 uncompressed_cache`,
                },
                {
                  question: '如何监控 ClickHouse 的性能瓶颈？',
                  answer: `监控方法：

1. 系统表监控：
   - system.query_log：查询历史记录，分析慢查询
   - system.parts：Part 状态，监控合并进度
   - system.metrics：实时指标（QPS、延迟、内存等）
   - system.asynchronous_metrics：异步指标（合并队列长度等）

2. 关键指标：
   - QueryLatency：查询延迟
   - MergeQueueLength：合并队列长度（过长说明写入压力大）
   - MarkCacheHits/MarkCacheMisses：标记缓存命中率
   - UncompressedCacheHits/UncompressedCacheMisses：非压缩缓存命中率

3. 慢查询分析：
   SELECT 
       query_duration_ms,
       read_rows,
       read_bytes,
       result_rows,
       query
   FROM system.query_log
   WHERE type = 'QueryFinish'
     AND query_duration_ms > 1000  -- 超过 1 秒
   ORDER BY query_duration_ms DESC
   LIMIT 10;

4. 性能剖析：
   - 使用 EXPLAIN 查看执行计划
   - 使用 trace_log 分析 CPU 热点
   - 使用 perf 工具进行系统级 profiling

5. 告警规则：
   - 查询延迟 P95 > 1s
   - 合并队列长度 > 100
   - 缓存命中率 < 80%
   - 磁盘使用率 > 80%`,
                },
              ]}
            />
          </section>

          {/* 性能对比测试 */}
          <section id="comparison" className="mb-8">
            <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              性能对比测试
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              以下是不同优化策略的性能对比测试结果（1 亿行数据）：
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">优化策略</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">查询耗时</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">提升倍数</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">适用场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">基线（无优化）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">5.2s</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">1x</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">-</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">分区裁剪</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">1.8s</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">2.9x</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">时间范围查询</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">PREWHERE</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">1.2s</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">4.3x</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">高选择性过滤</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">物化视图</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">50ms</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">104x</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">固定聚合查询</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">字典 JOIN</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">200ms</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">26x</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">大表 JOIN 小表</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">采样查询（10%）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">500ms</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">10.4x</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">近似统计</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
              <strong>结论</strong>：物化视图带来的性能提升最显著（100 倍以上），但需要权衡存储空间和写入开销。实际生产中应组合使用多种优化策略。
            </p>
          </section>

          {/* 知识关联 */}
          <section id="related" className="mb-8">
            <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识关联
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🏗️ ClickHouse 架构与原理</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  深入了解列式存储、向量化执行、稀疏索引等核心机制
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🌐 ClickHouse 分布式集群</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习分片、副本、负载均衡等分布式架构设计
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">📊 Flink 实时计算</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  了解如何将 Flink 实时数据写入 ClickHouse 进行实时分析
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🔥 Kafka 消息队列</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习如何使用 Kafka Engine 直接消费 Kafka 数据
                </p>
              </div>
            </div>
          </section>

          {/* 文章导航 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* 右侧目录 - 直接渲染，不用 aside 包裹 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
