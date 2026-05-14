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
  { id: 'overview', text: '整体架构', level: 2 },
  { id: 'columnar-storage', text: '列式存储原理', level: 3 },
  { id: 'vectorized-execution', text: '向量化执行引擎', level: 3 },
  { id: 'sparse-index', text: '稀疏索引机制', level: 3 },
  { id: 'compression', text: '数据压缩算法', level: 3 },
  { id: 'mergetree', text: 'MergeTree 引擎', level: 2 },
  { id: 'lsm-tree', text: 'LSM-Tree 设计思想', level: 3 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比其他 OLAP 引擎', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function ClickHouseArchitecture({ meta }: { meta: KnowledgeNode }) {
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
              ClickHouse 是一个面向列式存储的分布式 OLAP 数据库管理系统，专为实时分析查询而设计，能够在普通硬件上实现每秒处理数亿行数据的惊人性能。
            </blockquote>
            <SideNote label="为什么叫 ClickHouse？">
              ClickHouse 由俄罗斯搜索引擎巨头 Yandex 开发，名称来源于其最初的应用场景——为 Yandex.Metrica（类似 Google Analytics）提供实时数据分析服务。Click 代表"点击"，House 代表"数据存储"。
            </SideNote>
          </section>

          {/* 整体架构 */}
          <section id="overview" className="mb-8">
            <h2 id="overview" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              整体架构
            </h2>
            <DiagramBlock title="ClickHouse 架构概览">
              {`graph TD
                CLIENT["Client"] --> PROTOCOL["Protocol Layer<br/>HTTP/TCP"]
                PROTOCOL --> PARSER["SQL Parser"]
                PARSER --> ANALYZER["Query Analyzer"]
                ANALYZER --> OPTIMIZER["Query Optimizer"]
                OPTIMIZER --> EXECUTOR["Execution Engine<br/>Vectorized"]
                EXECUTOR --> STORAGE["Storage Engine<br/>MergeTree Family"]
                STORAGE --> DISK["Disk Storage<br/>Columnar Format"]
                EXECUTOR --> CACHE["Cache Layer<br/>Mark Cache/Page Cache"]
              `}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 的核心架构包含以下关键组件：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">协议层</strong>：支持 HTTP、TCP、MySQL 等多种协议接入</li>
              <li><strong className="text-ink">SQL 解析器</strong>：将 SQL 语句解析为抽象语法树（AST）</li>
              <li><strong className="text-ink">查询优化器</strong>：基于规则的优化（RBO），包括谓词下推、常量折叠等</li>
              <li><strong className="text-ink">向量化执行引擎</strong>：SIMD 指令加速，批量处理数据</li>
              <li><strong className="text-ink">存储引擎</strong>：以 MergeTree 家族为核心，支持多种表引擎</li>
              <li><strong className="text-ink">缓存层</strong>：标记缓存、主键缓存、非压缩块缓存等多级缓存</li>
            </ul>
          </section>

          {/* 核心原理 */}
          <section id="core" className="mb-8">
            <h2 id="core" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              核心原理
            </h2>

            <h3 id="columnar-storage" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              列式存储原理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 采用列式存储，与传统行式存储相比，在 OLAP 场景下具有显著优势：
            </p>

            <ContextSwitcher
              simpleContent={
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>行式存储</strong>：同一行的数据存储在一起，适合 OLTP 场景（频繁增删改）。
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>列式存储</strong>：同一列的数据存储在一起，适合 OLAP 场景（聚合查询、只读取部分列）。
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                    列式存储的优势：<strong>高压缩率</strong>（同类型数据连续存储）、<strong>I/O 效率高</strong>（只读取需要的列）、<strong>向量化执行友好</strong>（SIMD 指令加速）。
                  </p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-ink mb-2">行式 vs 列式存储对比</h4>
                    <Playground
                      code={`-- 原始数据
id | name     | age | city
---|----------|-----|--------
1  | Alice    | 25  | Beijing
2  | Bob      | 30  | Shanghai
3  | Charlie  | 25  | Beijing

-- 行式存储（传统关系型数据库）
Row1: [1, "Alice", 25, "Beijing"]
Row2: [2, "Bob", 30, "Shanghai"]
Row3: [3, "Charlie", 25, "Beijing"]

-- 列式存储（ClickHouse）
id:   [1, 2, 3]
name: ["Alice", "Bob", "Charlie"]
age:  [25, 30, 25]
city: ["Beijing", "Shanghai", "Beijing"]

-- 查询：SELECT avg(age) FROM users
-- 行式存储：需要读取所有列，浪费 I/O
-- 列式存储：只需读取 age 列，效率提升 4 倍`}
                      language="sql"
                      description="列式存储在聚合查询场景下 I/O 效率显著提升"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">列式存储的物理布局</h4>
                    <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                      ClickHouse 将每列数据分为多个<strong>granule</strong>（粒度单元，默认 8192 行），每个 granule 包含：
                    </p>
                    <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
                      <li><strong>压缩数据块</strong>：使用 LZ4、ZSTD 等算法压缩</li>
                      <li><strong>标记文件（.mrk）</strong>：记录每个 granule 在压缩文件中的偏移量</li>
                      <li><strong>稀疏索引</strong>：记录每个 granule 的主键值范围</li>
                    </ul>
                    <DiagramBlock title="列式存储物理结构">
                      {`graph LR
                        COL["Column: age"] --> G1["Granule 1<br/>[25, 30, 25, ...]<br/>8192 rows"]
                        COL --> G2["Granule 2<br/>[28, 35, 22, ...]<br/>8192 rows"]
                        COL --> G3["Granule 3<br/>..."]
                        G1 --> COMP1["Compressed Block<br/>LZ4/ZSTD"]
                        G2 --> COMP2["Compressed Block"]
                        MARK["Mark File (.mrk)"] --> OFFSET1["Offset: 0"]
                        MARK --> OFFSET2["Offset: 4096"]
                        INDEX["Sparse Index"] --> KEY1["Key: 25"]
                        INDEX --> KEY2["Key: 28"]
                      `}
                    </DiagramBlock>
                  </div>
                </div>
              }
            />

            <h3 id="vectorized-execution" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              向量化执行引擎
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 使用向量化执行引擎，通过 SIMD（Single Instruction Multiple Data）指令集实现批量数据处理，大幅提升 CPU 利用率：
            </p>

            <Playground
              code={`-- 传统逐行处理（Scalar Execution）
for each row in table:
    result = column_a[i] + column_b[i]  # 每次处理 1 行

-- 向量化处理（Vectorized Execution）
batch_size = 8192  # 一个 granule 的大小
result_vector = column_a[0:batch_size] + column_b[0:batch_size]  # 一次处理 8192 行

-- SIMD 指令示例（AVX2）
-- 一条指令同时处理 4 个 double 类型数据
vaddpd ymm0, ymm1, ymm2  # Parallel addition of 4 doubles

-- 性能提升：
-- 标量执行：~1 亿行/秒
-- 向量化执行：~5-10 亿行/秒（提升 5-10 倍）`}
              language="python"
              description="向量化执行通过 SIMD 指令实现批处理，显著提升吞吐量"
            />

            <SideNote label="SIMD 指令集">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>SSE</strong>（Streaming SIMD Extensions）：128-bit 寄存器，同时处理 4 个 float</li>
                <li><strong>AVX</strong>（Advanced Vector Extensions）：256-bit 寄存器，同时处理 8 个 float</li>
                <li><strong>AVX-512</strong>：512-bit 寄存器，同时处理 16 个 float（最新 CPU 支持）</li>
                <li>ClickHouse 会根据 CPU 特性自动选择最优指令集</li>
              </ul>
            </SideNote>

            <h3 id="sparse-index" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              稀疏索引机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 使用稀疏索引（Sparse Index）而非传统的 B+ 树索引，每个索引条目对应一个 granule（默认 8192 行）：
            </p>

            <Playground
              code={`-- 创建表时指定主键（即排序键和索引键）
CREATE TABLE events (
    event_date Date,
    event_id UInt64,
    user_id UInt32,
    event_type String
) ENGINE = MergeTree()
ORDER BY (event_date, event_id);  -- 主键即索引

-- 稀疏索引结构（假设 granule 大小为 3 行用于演示）
Index Entry 1: (2024-01-01, 100)    → Granule 1 (rows 1-3)
Index Entry 2: (2024-01-01, 200)    → Granule 2 (rows 4-6)
Index Entry 3: (2024-01-02, 50)     → Granule 3 (rows 7-9)
Index Entry 4: (2024-01-02, 300)    → Granule 4 (rows 10-12)

-- 查询：WHERE event_date = '2024-01-02' AND event_id > 100
-- 1. 二分查找索引，定位到 Entry 3 和 Entry 4
-- 2. 只读取 Granule 3 和 Granule 4 的数据
-- 3. 在内存中过滤出符合条件的行

-- 优势：
-- - 索引体积小（每 8192 行才有一个索引项）
-- - 可以快速跳过大量不相关数据
-- - 适合范围查询和前缀匹配`}
              language="sql"
              description="稀疏索引大幅减少 I/O，但无法精确定位单行数据"
            />

            <h3 id="compression" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              数据压缩算法
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 支持多种压缩算法，可根据数据类型和场景选择：
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-border rounded-paper-md p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-ink mb-2">LZ4</h4>
                <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1">
                  <li>• 默认压缩算法</li>
                  <li>• 压缩速度快，解压速度极快</li>
                  <li>• 压缩率中等（3-5 倍）</li>
                  <li>• 适合大多数场景</li>
                </ul>
              </div>
              <div className="border border-border rounded-paper-md p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-ink mb-2">ZSTD</h4>
                <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-1">
                  <li>• Facebook 开发的现代压缩算法</li>
                  <li>• 压缩率高（5-10 倍）</li>
                  <li>• 压缩/解压速度均衡</li>
                  <li>• 适合冷数据或存储空间敏感场景</li>
                </ul>
              </div>
            </div>

            <Playground
              code={`-- 指定压缩算法（表级别）
CREATE TABLE events_compressed (
    event_date Date,
    event_id UInt64
) ENGINE = MergeTree()
ORDER BY event_date
SETTINGS compress = 'zstd';  -- 使用 ZSTD 压缩

-- 查看压缩效果
SELECT 
    table,
    formatReadableSize(data_compressed_bytes) AS compressed,
    formatReadableSize(data_uncompressed_bytes) AS uncompressed,
    round(data_uncompressed_bytes / data_compressed_bytes, 2) AS ratio
FROM system.parts
WHERE table = 'events_compressed';

-- 典型压缩率：
-- 数值类型：10-20 倍
-- 字符串类型：3-8 倍
-- 日期类型：15-30 倍`}
              language="sql"
              description="合理选择压缩算法可在性能和存储空间之间取得平衡"
            />
          </section>

          {/* MergeTree 引擎 */}
          <section id="mergetree" className="mb-8">
            <h2 id="mergetree" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              MergeTree 引擎
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MergeTree 是 ClickHouse 最核心的表引擎，所有高级引擎（如 ReplicatedMergeTree、Distributed）都基于它构建：
            </p>

            <h3 id="lsm-tree" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              LSM-Tree 设计思想
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MergeTree 借鉴了 LSM-Tree（Log-Structured Merge-Tree）的设计思想，将数据写入和查询分离：
            </p>

            <DiagramBlock title="MergeTree 数据合并流程">
              {`graph TD
                INSERT["INSERT 操作"] --> PART1["Part 1<br/>新写入数据"]
                INSERT --> PART2["Part 2<br/>新写入数据"]
                PART1 --> MERGE["后台合并任务"]
                PART2 --> MERGE
                PART3["Part 3<br/>旧数据"] --> MERGE
                MERGE --> PART_MERGED["Merged Part<br/>排序+去重+压缩"]
                PART_MERGED --> DELETE["删除旧 Parts"]
                DELETE --> GC["垃圾回收"]
              `}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>工作流程</strong>：
            </p>
            <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>数据写入</strong>：每次 INSERT 生成一个新的 Part（不可变数据片段）</li>
              <li><strong>后台合并</strong>：定期将多个小 Part 合并为大 Part，执行排序、去重、压缩</li>
              <li><strong>删除旧数据</strong>：合并完成后删除旧的 Parts，释放磁盘空间</li>
              <li><strong>查询时合并</strong>：查询需要同时读取多个 Parts，在内存中合并结果</li>
            </ol>

            <Playground
              code={`-- 创建 MergeTree 表
CREATE TABLE events (
    event_date Date,
    event_id UInt64,
    user_id UInt32,
    event_type String,
    properties String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)  -- 按月分区
ORDER BY (event_date, event_id)    -- 排序键（也是主键）
SETTINGS 
    index_granularity = 8192,      -- 索引粒度
    min_bytes_for_wide_part = 0;   -- 强制使用宽格式存储

-- 查看 Parts 信息
SELECT 
    name,
    partition,
    rows,
    formatReadableSize(bytes_on_disk) AS size,
    active
FROM system.parts
WHERE table = 'events'
ORDER BY modification_time;

-- 手动触发合并（调试用）
OPTIMIZE TABLE events FINAL;`}
              language="sql"
              description="MergeTree 通过后台合并机制实现高效的写入和查询"
            />

            <SideNote label="Part 的生命周期">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>Active</strong>：活跃的 Part，参与查询</li>
                <li><strong>Inactive</strong>：已被合并但仍保留的 Part，等待删除</li>
                <li><strong>Deleting</strong>：正在删除的 Part</li>
                <li>可以通过 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">system.parts</code> 表监控 Part 状态</li>
              </ul>
            </SideNote>
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 使用 C++ 编写，以下是查询执行的核心流程简化版：
            </p>

            <Playground
              code={`// ClickHouse 查询执行流程（简化版）

// 1. SQL 解析为 AST
ASTPtr ast = parseQuery(query_string);

// 2. 语义分析和优化
auto analyzed_query = analyzeQuery(ast, context);
auto optimized_query = optimizeQuery(analyzed_query);

// 3. 构建执行计划
auto pipeline = buildQueryPipeline(optimized_query);

// 4. 向量化执行
class IProcessor {
public:
    // 每个 Processor 处理一个算子（Filter、Aggregation、Join 等）
    virtual Status prepare() = 0;
    virtual void work() = 0;
    
    // 输入输出端口
    PortInputs inputs;
    PortOutputs outputs;
};

// 5. 列式数据处理
class ColumnVector : public IColumn {
private:
    PaddedPODArray<T> data;  // 连续内存存储
    
public:
    // 向量化操作
    void filter(const PaddedPODArray<UInt8> & filter) {
        // 使用 SIMD 指令批量过滤
        for (size_t i = 0; i < filter.size(); i += 8) {
            __m256i mask = _mm256_loadu_si256((__m256i*)&filter[i]);
            // ... AVX2 指令处理
        }
    }
};

// 6. 异步 I/O 和并行执行
thread_pool.schedule([&]() {
    auto block = storage.read(partition_key, primary_key_range);
    pipeline.push(block);
});`}
              language="cpp"
              description="ClickHouse 通过 Pipeline 模型实现高效的查询执行"
            />

            <SideNote label="为什么 ClickHouse 这么快？">
              <ol className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>列式存储</strong>：只读取需要的列，I/O 效率高</li>
                <li><strong>向量化执行</strong>：SIMD 指令批量处理数据</li>
                <li><strong>稀疏索引</strong>：快速跳过无关数据</li>
                <li><strong>数据压缩</strong>：减少磁盘 I/O 和内存占用</li>
                <li><strong>并行处理</strong>：多核 CPU 并行执行查询</li>
                <li><strong>零拷贝</strong>：避免不必要的数据复制</li>
              </ol>
            </SideNote>
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>

            <div className="space-y-4">
              <Callout type="danger" title="误区 1：ClickHouse 适合所有场景">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 专为 OLAP 场景设计，不适合：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>频繁的 UPDATE/DELETE 操作（OLTP 场景）</li>
                  <li>事务处理（不支持 ACID 事务）</li>
                  <li>高并发点查询（QPS &lt; 100）</li>
                  <li>小表 JOIN（性能不如 MySQL）</li>
                </ul>
              </Callout>

              <Callout type="danger" title="误区 2：主键唯一约束">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 的主键（ORDER BY）只是排序键和索引键，<strong>不保证唯一性</strong>。如需去重，需使用 ReplacingMergeTree 或在查询时使用 DISTINCT。
                </p>
              </Callout>

              <Callout type="warning" title="误区 3：索引越多越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 只有稀疏索引（主键索引），不支持二级索引。过多的投影（Projection）或物化视图会增加写入开销。应合理设计主键顺序，将高频过滤字段放在前面。
                </p>
              </Callout>

              <Callout type="info" title="误区 4：JOIN 性能差">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 的 JOIN 性能取决于数据分布和 JOIN 策略：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>大表 JOIN 小表：性能优秀（小表加载到内存）</li>
                  <li>大表 JOIN 大表：性能较差（需要 Shuffle）</li>
                  <li>建议使用字典（Dictionary）或全局 JOIN 优化</li>
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
                  question: 'ClickHouse 为什么这么快？',
                  answer: `主要原因有 6 点：
1. 列式存储：只读取需要的列，I/O 效率高，压缩率高
2. 向量化执行：SIMD 指令批量处理数据，CPU 利用率高
3. 稀疏索引：快速跳过无关数据，减少扫描范围
4. 数据压缩：LZ4/ZSTD 算法减少磁盘 I/O 和内存占用
5. 并行处理：多核 CPU 并行执行查询，充分利用硬件资源
6. 零拷贝技术：避免不必要的数据复制，减少内存开销

性能参考：单机可处理 1-10 亿行/秒的聚合查询，延迟通常在毫秒级。`,
                },
                {
                  question: 'ClickHouse 的 MergeTree 引擎工作原理是什么？',
                  answer: `MergeTree 借鉴了 LSM-Tree 的设计思想：

1. 数据写入：每次 INSERT 生成一个新的 Part（不可变数据片段）
2. 后台合并：定期将多个小 Part 合并为大 Part，执行排序、去重、压缩
3. 删除旧数据：合并完成后删除旧的 Parts，释放磁盘空间
4. 查询时合并：查询需要同时读取多个 Parts，在内存中合并结果

特点：
- Part 是不可变的，保证了写入的高性能
- 后台异步合并，不影响查询性能
- 支持数据分区（PARTITION BY），便于管理和删除历史数据
- 主键即排序键，数据按主键有序存储`,
                },
                {
                  question: 'ClickHouse 的稀疏索引和 B+ 树索引有什么区别？',
                  answer: `主要区别：

1. 索引粒度：
   - 稀疏索引：每 8192 行（一个 granule）一个索引项
   - B+ 树索引：每行都有索引项

2. 索引大小：
   - 稀疏索引：非常小（百万分之一）
   - B+ 树索引：较大（与数据量成正比）

3. 查询精度：
   - 稀疏索引：只能定位到 granule，需要在内存中进一步过滤
   - B+ 树索引：可以精确定位到单行

4. 适用场景：
   - 稀疏索引：适合 OLAP 范围查询，I/O 效率高
   - B+ 树索引：适合 OLTP 点查询，精确度高

ClickHouse 选择稀疏索引是因为 OLAP 场景通常是范围查询，且数据量大，稀疏索引可以在保证查询性能的同时大幅减少索引存储空间。`,
                },
                {
                  question: '如何优化 ClickHouse 的查询性能？',
                  answer: `优化策略：

1. 合理设计主键：
   - 将高频过滤字段放在 ORDER BY 前面
   - 利用主键的前缀匹配特性

2. 使用合适的分区策略：
   - 按时间分区（如按月），便于删除历史数据
   - 避免分区过多（建议 &lt; 1000 个分区）

3. 选择合适的表引擎：
   - 普通场景：MergeTree
   - 去重场景：ReplacingMergeTree
   - 聚合场景：AggregatingMergeTree
   - 分布式场景：Distributed + MergeTree

4. 使用物化视图预聚合：
   - 提前计算常用聚合指标
   - 减少查询时的计算量

5. 调整系统参数：
   - max_threads：控制并行度
   - max_memory_usage：限制内存使用
   - use_uncompressed_cache：启用非压缩块缓存

6. 避免全表扫描：
   - 确保查询条件能利用主键索引
   - 使用 PREWHERE 代替 WHERE（先过滤再读取其他列）`,
                },
                {
                  question: 'ClickHouse 和 Elasticsearch 有什么区别？如何选择？',
                  answer: `主要区别：

1. 数据存储：
   - ClickHouse：列式存储，结构化数据
   - Elasticsearch：倒排索引，半结构化/非结构化数据

2. 查询能力：
   - ClickHouse：强大的 SQL 支持，复杂聚合、JOIN
   - Elasticsearch：全文检索，模糊匹配，相关性排序

3. 性能特点：
   - ClickHouse：聚合查询极快（亿级数据秒级响应）
   - Elasticsearch：全文检索快，聚合性能较弱

4. 适用场景：
   - ClickHouse：日志分析、用户行为分析、实时监控、BI 报表
   - Elasticsearch：全文搜索、日志检索、推荐系统、异常检测

选择建议：
- 结构化数据分析、复杂聚合 → ClickHouse
- 全文检索、模糊匹配 → Elasticsearch
- 两者可以配合使用：ES 做检索，CH 做分析`,
                },
                {
                  question: 'ClickHouse 如何处理数据更新和删除？',
                  answer: `ClickHouse 不擅长频繁的单行更新/删除，但有以下几种方案：

1. Mutation（ALTER UPDATE/DELETE）：
   - 异步执行，重写整个 Part
   - 适合批量更新，不适合高频单行更新
   - 语法：ALTER TABLE tbl UPDATE col=val WHERE condition

2. ReplacingMergeTree：
   - 在合并时根据版本字段去重
   - 适合最终一致性场景
   - 注意：查询时可能看到重复数据，需使用 FINAL 或 GROUP BY

3. CollapsingMergeTree：
   - 通过 sign 字段标记插入/删除
   - 适合事件溯源场景

4. VersionedCollapsingMergeTree：
   - 结合版本号和 sign 字段
   - 更精确的状态管理

最佳实践：
- 尽量避免 UPDATE/DELETE，采用追加写模式
- 如需更新，使用批量 Mutation
- 对于状态变更，使用 ReplacingMergeTree + 版本号`,
                },
              ]}
            />
          </section>

          {/* 对比其他 OLAP 引擎 */}
          <section id="comparison" className="mb-8">
            <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              对比其他 OLAP 引擎
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">特性</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">ClickHouse</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Apache Druid</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Apache Doris</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">存储引擎</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">列式存储（MergeTree）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">列式存储（Segment）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">列式存储（Segment）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">查询语言</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">SQL（扩展语法）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">SQL（有限支持）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">SQL（MySQL 兼容）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">实时性</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">秒级可见</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">秒级可见</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">秒级可见</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">聚合性能</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（最快）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">JOIN 支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 弱（适合大表 JOIN 小表）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 强（支持多表 JOIN）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">更新/删除</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 支持但不推荐</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 支持（Unique Key）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">生态成熟度</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐⭐（最成熟）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">适用场景</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">日志分析、用户行为、实时监控</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">时序数据、实时监控</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">BI 报表、即席查询、数据仓库</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
              <strong>选型建议</strong>：追求极致聚合性能选 ClickHouse；需要强 JOIN 能力和更新支持选 Doris；时序数据场景选 Druid。
            </p>
          </section>

          {/* 知识关联 */}
          <section id="related" className="mb-8">
            <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识关联
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">⚡ ClickHouse 性能优化</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  深入学习分区策略、物化视图、查询优化等性能调优技巧
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🌐 ClickHouse 分布式集群</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  了解分片、副本、ZooKeeper 协调等分布式架构设计
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">📊 Flink 实时计算</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习如何将 Flink 实时数据写入 ClickHouse 进行实时分析
                </p>
              </div>
              <div className="border border-border rounded-paper-md p-4 hover:border-accent transition-colors">
                <h4 className="font-semibold text-ink mb-2">🗄️ Kafka 消息队列</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  了解如何使用 Kafka Engine 直接消费 Kafka 数据
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
