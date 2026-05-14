import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'architecture-comparison', text: '一、架构对比', level: 2 },
  { id: 'clickhouse', text: '二、ClickHouse', level: 2 },
  { id: 'doris', text: '三、Apache Doris', level: 2 },
  { id: 'presto-trino', text: '四、Presto/Trino', level: 2 },
  { id: 'druid', text: '五、Apache Druid', level: 2 },
  { id: 'performance-benchmark', text: '六、性能基准测试', level: 2 },
  { id: 'selection-guide', text: '七、选型指南', level: 2 },
  { id: 'cost-analysis', text: '八、成本分析', level: 2 },
  { id: 'misconceptions', text: '九、常见误区', level: 2 },
  { id: 'interview', text: '十、面试真题', level: 2 },
  { id: 'related', text: '十一、知识关联', level: 2 },
]

export default function OlapDatabaseComparison({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              OLAP（Online Analytical Processing）数据库是专为<strong className="text-accent">复杂分析查询</strong>设计的数据库系统，采用列式存储、向量化执行和分布式计算，
              支持海量数据的实时聚合、多维分析和即席查询，与 OLTP 数据库形成互补。
            </p>
          </blockquote>

          <Callout type="tip" title="OLAP vs OLTP">
            OLTP（如 MySQL）擅长高并发事务处理，每次操作少量数据；OLAP（如 ClickHouse）擅长复杂分析查询，每次扫描大量数据。现代架构通常是 OLTP + OLAP 的组合。
          </Callout>

          <DiagramBlock title="OLAP 数据库全景图">
            {`graph TB
  subgraph "存储引擎"
    A[列式存储] --> B[数据压缩]
    A --> C[稀疏索引]
    D[行式存储] --> E[B+树索引]
  end
  
  subgraph "执行引擎"
    F[向量化执行] --> G[SIMD指令]
    H[传统逐行执行] --> I[解释器模式]
  end
  
  subgraph "典型代表"
    J[ClickHouse] --> K[MergeTree]
    L[Doris] --> M[Unique Key]
    N[Presto/Trino] --> O[内存计算]
    P[Druid] --> Q[时序优化]
  end
  
  A --> F
  D --> H
  J & L & N & P --> R[OLAP场景]`}
          </DiagramBlock>

          <h2 id="architecture-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、架构对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            主流 OLAP 数据库在架构设计上各有侧重，理解其核心差异是选型的关键。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">维度</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">ClickHouse</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Apache Doris</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Presto/Trino</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Apache Druid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">存储方式</td>
                <td className="border border-border px-3 py-2 text-ink-muted">列式存储（本地磁盘）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">列式存储（本地磁盘）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">内存计算（无存储）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">列式存储（深度索引）</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">数据模型</td>
                <td className="border border-border px-3 py-2 text-ink-muted">MergeTree（LSM-Tree）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">Unique/Duplicate/Aggregate</td>
                <td className="border border-border px-3 py-2 text-ink-muted">连接器模式</td>
                <td className="border border-border px-3 py-2 text-ink-muted">Segment + Rollup</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">更新能力</td>
                <td className="border border-border px-3 py-2 text-ink-muted">弱（异步 Merge）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">强（主键唯一性）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">不支持</td>
                <td className="border border-border px-3 py-2 text-ink-muted">追加为主</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">JOIN 能力</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中等（大表 JOIN 慢）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">强（Colocate Join）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">极强（分布式 Shuffle）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">弱（Lookup Join）</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">实时性</td>
                <td className="border border-border px-3 py-2 text-ink-muted">秒级可见</td>
                <td className="border border-border px-3 py-2 text-ink-muted">亚秒级可见</td>
                <td className="border border-border px-3 py-2 text-ink-muted">依赖源系统</td>
                <td className="border border-border px-3 py-2 text-ink-muted">毫秒级可见</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">适用场景</td>
                <td className="border border-border px-3 py-2 text-ink-muted">日志分析、宽表查询</td>
                <td className="border border-border px-3 py-2 text-ink-muted">统一数仓、报表系统</td>
                <td className="border border-border px-3 py-2 text-ink-muted">跨源联邦查询</td>
                <td className="border border-border px-3 py-2 text-ink-muted">实时监控、用户行为</td>
              </tr>
            </tbody>
          </table>

          <SideNote label="架构演进趋势">
            现代 OLAP 数据库正朝着"存算分离"和"湖仓一体"方向发展。ClickHouse 推出 S3 存储引擎，Doris 支持 Iceberg/Hudi，Presto 天然支持多数据源，Druid 集成 Kafka 实时摄入。
          </SideNote>

          <h2 id="clickhouse" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、ClickHouse
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ClickHouse 是 Yandex 开源的列式数据库，以极致查询性能著称，适合日志分析、用户行为分析等场景。
          </p>

          <h3 id="ch-advantages" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            核心优势
          </h3>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 space-y-2 ml-2">
            <li><strong className="text-ink">向量化执行引擎</strong>：充分利用 CPU SIMD 指令，单核可达数十 GB/s 吞吐</li>
            <li><strong className="text-ink">高效数据压缩</strong>：LZ4/ZSTD 压缩比可达 10:1，大幅降低存储成本</li>
            <li><strong className="text-ink">稀疏索引</strong>：无需维护完整索引树，写入性能极高</li>
            <li><strong className="text-ink">丰富的表引擎</strong>：MergeTree、ReplacingMergeTree、SummingMergeTree 等满足不同场景</li>
          </ul>

          <Playground
            code={`-- 创建 MergeTree 表
CREATE TABLE user_events (
    event_id UInt64,
    user_id UInt32,
    event_type String,
    event_time DateTime,
    properties String
) ENGINE = MergeTree()
ORDER BY (user_id, event_time)
PARTITION BY toYYYYMM(event_time);

-- 高性能聚合查询（亿级数据亚秒响应）
SELECT 
    user_id,
    count() as event_count,
    uniqExact(event_type) as unique_events
FROM user_events
WHERE event_time >= '2024-01-01'
GROUP BY user_id
ORDER BY event_count DESC
LIMIT 100;`}
            language="sql"
            highlights={[2, 8, 15]}
            filename="clickhouse_query.sql"
            description="ClickHouse 典型查询模式"
          />

          <Callout type="warning" title="ClickHouse 的局限性">
            ClickHouse 不擅长高频点查、复杂 JOIN 和数据更新。如果需要频繁 UPDATE/DELETE，建议使用 Doris 或结合 Kafka 做流式处理。
          </Callout>

          <h2 id="doris" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、Apache Doris
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Apache Doris（原百度 Palo）是 MPP 架构的实时分析数据库，兼顾高性能查询和实时更新能力，适合统一数仓场景。
          </p>

          <h3 id="doris-features" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            核心特性
          </h3>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 space-y-2 ml-2">
            <li><strong className="text-ink">三种数据模型</strong>：Unique Key（主键去重）、Duplicate Key（明细数据）、Aggregate Key（预聚合）</li>
            <li><strong className="text-ink">Colocate Join</strong>：相同分片的数据本地 JOIN，避免网络 Shuffle</li>
            <li><strong className="text-ink">物化视图自动选择</strong>：查询优化器自动路由到最优物化视图</li>
            <li><strong className="text-ink">MySQL 协议兼容</strong>：可直接使用 MySQL 客户端和 BI 工具连接</li>
          </ul>

          <Playground
            code={`-- 创建 Unique Key 表（支持实时更新）
CREATE TABLE user_profile (
    user_id INT,
    name STRING,
    age INT,
    city STRING,
    last_login DATETIME
) UNIQUE KEY(user_id)
DISTRIBUTED BY HASH(user_id) BUCKETS 10
PROPERTIES ("replication_num" = "3");

-- 插入/更新数据（主键存在则更新）
INSERT INTO user_profile VALUES 
(1001, 'Alice', 25, 'Beijing', '2024-01-15 10:30:00'),
(1002, 'Bob', 30, 'Shanghai', '2024-01-15 11:00:00');

-- 复杂多表 JOIN（利用 Colocate Join）
SELECT 
    u.user_id,
    u.name,
    COUNT(o.order_id) as order_count,
    SUM(o.amount) as total_amount
FROM user_profile u
JOIN orders o ON u.user_id = o.user_id
WHERE u.city = 'Beijing'
GROUP BY u.user_id, u.name;`}
            language="sql"
            highlights={[2, 13, 20]}
            filename="doris_query.sql"
            description="Doris 实时更新与 JOIN 查询"
          />

          <SideNote label="Doris vs ClickHouse">
            Doris 在数据更新和复杂 JOIN 方面优于 ClickHouse，但纯聚合查询性能略逊。如果业务需要频繁更新和多点查询，优先选择 Doris；如果是纯日志分析，ClickHouse 更合适。
          </SideNote>

          <h2 id="presto-trino" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、Presto/Trino
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Presto（现 Trino）是 Facebook 开源的分布式 SQL 查询引擎，采用存算分离架构，支持跨多种数据源的联邦查询。
          </p>

          <h3 id="presto-architecture" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            架构特点
          </h3>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 space-y-2 ml-2">
            <li><strong className="text-ink">存算分离</strong>：Coordinator 负责解析和优化，Worker 负责执行，无状态设计易于扩展</li>
            <li><strong className="text-ink">Connector 插件化</strong>：支持 Hive、MySQL、PostgreSQL、Kafka、Elasticsearch 等 30+ 数据源</li>
            <li><strong className="text-ink">内存计算</strong>：数据不落地，直接从源系统读取并计算，适合临时分析</li>
            <li><strong className="text-ink">ANSI SQL 兼容</strong>：支持标准 SQL 语法，学习成本低</li>
          </ul>

          <Playground
            code={`-- 跨源联邦查询示例
SELECT 
    h.customer_id,
    h.customer_name,
    m.order_count,
    c.total_spent
FROM hive.sales.customers h
JOIN mysql.crm.orders m ON h.customer_id = m.customer_id
JOIN cassandra.analytics.consumption c ON h.customer_id = c.customer_id
WHERE h.region = 'North America'
  AND m.order_date >= '2024-01-01';`}
            language="sql"
            highlights={[2, 7, 8, 9]}
            filename="presto_federated_query.sql"
            description="Presto 跨源联邦查询"
          />

          <Callout type="info" title="Presto vs Trino">
            Trino 是 PrestoSQL 改名而来（原 PrestoDB 由 Facebook 维护）。两者 API 兼容，但 Trino 发展更活跃，社区贡献更多。新项目建议直接使用 Trino。
          </Callout>

          <h2 id="druid" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、Apache Druid
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Apache Druid 是专为实时分析设计的数据库，特别适合时间序列数据和用户行为分析，提供毫秒级查询延迟。
          </p>

          <h3 id="druid-features" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            核心特性
          </h3>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 space-y-2 ml-2">
            <li><strong className="text-ink">实时摄入</strong>：直接对接 Kafka，数据摄入后毫秒级可见</li>
            <li><strong className="text-ink">深度索引</strong>：Bitmap 索引 + Roaring Bitmap，支持高基数维度的快速过滤</li>
            <li><strong className="text-ink">近似计算</strong>：HyperLogLog、Quantile Sketches，牺牲精度换取性能</li>
            <li><strong className="text-ink">自动分层存储</strong>：热数据在内存，温数据在 SSD，冷数据在 HDD</li>
          </ul>

          <Playground
            code={`-- Druid SQL 查询示例
SELECT 
    TIME_FLOOR(__time, 'PT1H') AS hour,
    country,
    COUNT(*) AS page_views,
    APPROX_COUNT_DISTINCT(user_id) AS unique_users,
    AVG(time_on_page) AS avg_time
FROM wikipedia
WHERE __time >= CURRENT_TIMESTAMP - INTERVAL '1' DAY
  AND channel = '#en.wikipedia'
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;`}
            language="sql"
            highlights={[2, 4, 5, 6]}
            filename="druid_query.sql"
            description="Druid 实时分析查询"
          />

          <SideNote label="Druid 的典型场景">
            Druid 在监控告警、用户行为分析、广告实时竞价等场景表现优异。Uber、Airbnb、Netflix 等公司都使用 Druid 处理每秒数百万事件的实时分析。
          </SideNote>

          <h2 id="performance-benchmark" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、性能基准测试
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            以下测试基于 TPC-H 数据集（100GB），在相同硬件配置下对比各数据库的查询性能。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">查询类型</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">ClickHouse</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Doris</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Trino</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Druid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">简单聚合（SUM/COUNT）</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">0.5s</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">0.8s</td>
                <td className="border border-border px-3 py-2 text-ink-muted">2.5s</td>
                <td className="border border-border px-3 py-2 text-ink-muted">1.2s</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">GROUP BY（高基数）</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">1.2s</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">1.5s</td>
                <td className="border border-border px-3 py-2 text-ink-muted">4.0s</td>
                <td className="border border-border px-3 py-2 text-ink-muted">2.0s</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">多表 JOIN（3 表）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">5.0s</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">2.5s</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">3.5s</td>
                <td className="border border-border px-3 py-2 text-ink-muted">N/A</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">实时写入吞吐</td>
                <td className="border border-border px-3 py-2 text-ink-muted">500K rows/s</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">1M rows/s</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">N/A</td>
                <td className="border border-border px-3 py-2 text-ink-muted">2M rows/s</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">并发查询（QPS）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">100</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">500</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">200</td>
                <td className="border border-border px-3 py-2 text-ink-muted">1000+</td>
              </tr>
            </tbody>
          </table>

          <Callout type="tip" title="性能测试注意事项">
            实际性能受数据分布、硬件配置、查询复杂度等因素影响。建议在选型前使用真实业务数据进行 POC 测试，而非仅依赖基准测试结果。
          </Callout>

          <h2 id="selection-guide" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、选型指南
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            根据业务场景选择合适的 OLAP 数据库，避免"一刀切"的选型策略。
          </p>

          <DiagramBlock title="OLAP 数据库选型决策树">
            {`flowchart TD
  A[开始选型] --> B{是否需要实时更新?}
  B -->|是| C{是否需要频繁UPDATE?}
  B -->|否| D[ClickHouse]
  
  C -->|是| E[Apache Doris]
  C -->|否| F{数据来源是否单一?}
  
  F -->|是| G[ClickHouse]
  F -->|否| H[Trino/Presto]
  
  E --> I{是否需要毫秒级查询?}
  I -->|是| J[Apache Druid]
  I -->|否| K[Doris]
  
  D --> L[日志分析/宽表查询]
  G --> M[用户行为分析]
  H --> N[跨源联邦查询]
  J --> O[实时监控/时序数据]
  K --> P[统一数仓/报表系统]`}
          </DiagramBlock>

          <h3 id="scenario-recommendations" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
            场景推荐
          </h3>
          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 space-y-2 ml-2">
            <li><strong className="text-ink">日志分析平台</strong>：ClickHouse（高吞吐写入 + 快速聚合）</li>
            <li><strong className="text-ink">统一数据仓库</strong>：Apache Doris（实时更新 + 复杂 JOIN + MySQL 兼容）</li>
            <li><strong className="text-ink">跨源数据分析</strong>：Trino/Presto（连接器丰富 + 存算分离）</li>
            <li><strong className="text-ink">实时监控告警</strong>：Apache Druid（毫秒级可见 + 高并发查询）</li>
            <li><strong className="text-ink">用户行为分析</strong>：ClickHouse 或 Druid（取决于是否需要实时更新）</li>
            <li><strong className="text-ink">BI 报表系统</strong>：Apache Doris（物化视图 + 高并发支持）</li>
          </ul>

          <h2 id="cost-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、成本分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            除了技术因素，成本也是选型的重要考量。以下是各数据库的总体拥有成本（TCO）对比。
          </p>

          <table className="w-full border-collapse my-6 text-[13px] sm:text-[14px]">
            <thead>
              <tr className="bg-parchment-deep">
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">成本项</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">ClickHouse</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Doris</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Trino</th>
                <th className="border border-border px-3 py-2 text-left font-semibold text-ink">Druid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">存储成本</td>
                <td className="border border-border px-3 py-2 text-ink-muted">低（高压缩比）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中</td>
                <td className="border border-border px-3 py-2 text-ink-muted">依赖源系统</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中（深度索引）</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">计算资源</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中</td>
                <td className="border border-border px-3 py-2 text-ink-muted">高（全内存）</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中高</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">运维复杂度</td>
                <td className="border border-border px-3 py-2 text-ink-muted">中（需调优）</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">低</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">中</td>
                <td className="border border-border px-3 py-2 text-ink-muted">高（组件多）</td>
              </tr>
              <tr className="bg-parchment-light/50">
                <td className="border border-border px-3 py-2 font-medium text-ink">学习曲线</td>
                <td className="border border-border px-3 py-2 text-ink-muted">陡峭</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">平缓</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">平缓</td>
                <td className="border border-border px-3 py-2 text-ink-muted">陡峭</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-medium text-ink">社区生态</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">活跃</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">快速增长</td>
                <td className="border border-border px-3 py-2 text-ink-muted"><strong className="text-green-600">成熟</strong></td>
                <td className="border border-border px-3 py-2 text-ink-muted">中等</td>
              </tr>
            </tbody>
          </table>

          <Callout type="warning" title="隐藏成本提醒">
            ClickHouse 和 Druid 的运维复杂度较高，需要专职 DBA 调优；Doris 和 Trino 相对友好。此外，Trino 虽然无需存储，但需要为源系统支付额外成本。
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、常见误区
          </h2>

          <Callout type="danger" title="误区 1：OLAP 可以替代 OLTP">
            OLAP 和 OLTP 是互补关系，不是替代关系。OLAP 不适合高频点查和事务处理，强行用 OLAP 做 OLTP 会导致性能灾难。
          </Callout>

          <Callout type="danger" title="误区 2：ClickHouse 适合所有分析场景">
            ClickHouse 在简单聚合和宽表查询上表现优异，但在复杂 JOIN、数据更新和高并发场景下不如 Doris 或 Trino。
          </Callout>

          <Callout type="danger" title="误区 3：列式存储一定比行式存储快">
            列式存储在聚合查询上有优势，但在点查和需要返回整行的场景下，行式存储可能更快。选择取决于具体查询模式。
          </Callout>

          <Callout type="danger" title="误区 4：实时性越高越好">
            毫秒级实时性带来更高的成本和复杂度。如果业务允许分钟级延迟，使用批处理 + ClickHouse 可能更经济。
          </Callout>

          <Callout type="danger" title="误区 5：不需要做 POC 测试">
            每个业务的查询模式、数据分布、并发需求都不同。必须使用真实数据进行 POC 测试，避免上线后性能不达标。
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、面试真题
          </h2>

          <InterviewSection
            questions={[
              {
                question: 'ClickHouse 为什么查询这么快？',
                answer: `1. **列式存储**：只读取需要的列，减少 I/O
2. **向量化执行**：利用 SIMD 指令并行处理数据
3. **数据压缩**：LZ4/ZSTD 压缩降低磁盘 I/O
4. **稀疏索引**：快速定位数据块，无需遍历全文
5. **并行查询**：多核 CPU 并行执行查询计划
6. **预聚合**：Materialized View 提前计算结果`,
              },
              {
                question: 'Doris 的 Unique Key 模型如何实现实时更新？',
                answer: `Doris 使用 **Merge-on-Read** 机制：
1. 新数据写入时标记版本号和删除标识
2. 查询时合并同一主键的多条记录，保留最新版本
3. Compaction 进程定期合并数据，清理旧版本
4. 通过 Bloom Filter 加速主键查找

相比 ClickHouse 的 ReplacingMergeTree，Doris 的更新可见性更高（亚秒级 vs 分钟级）。`,
              },
              {
                question: 'Trino 和 Spark SQL 有什么区别？',
                answer: `**Trino**：
- 纯内存计算，无中间结果落地
- 适合交互式查询（秒级响应）
- 不支持迭代计算和机器学习
- 轻量级部署，启动快

**Spark SQL**：
- 基于 RDD/DataFrame，支持中间结果缓存
- 适合批量处理和迭代计算
- 支持 MLlib、GraphX 等高级功能
- 重量级部署，资源占用大

选型建议：交互式分析用 Trino，批量 ETL 用 Spark。`,
              },
              {
                question: 'Druid 的 Bitmap 索引有什么优势？',
                answer: `Druid 使用 **Roaring Bitmap** 索引：
1. **高基数维度优化**：即使有百万个不同值，索引仍然紧凑
2. **快速位运算**：AND/OR/NOT 操作直接在 bitmap 上进行
3. **压缩存储**：Roaring Bitmap 比普通 bitmap 节省 90% 空间
4. **并发友好**：bitmap 操作无锁，适合高并发查询

适用场景：用户 ID、设备 ID、城市等高基数维度的快速过滤。`,
              },
              {
                question: '如何设计一个支持实时更新的 OLAP 系统？',
                answer: `**方案 1：Apache Doris**
- 使用 Unique Key 模型
- Kafka → Flink → Doris Stream Load
- 亚秒级更新可见

**方案 2：ClickHouse + Kafka**
- ClickHouse Kafka Engine 实时消费
- CollapsingMergeTree 处理更新
- 最终一致性（分钟级可见）

**方案 3：Lambda 架构**
- 实时层：Druid/Kafka Streams
- 批处理层：Spark + ClickHouse
- 服务层：合并实时和批处理结果

推荐方案 1（Doris），架构最简单，一致性最好。`,
              },
            ]}
          />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、知识关联
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            OLAP 数据库与其他技术栈的关联关系：
          </p>

          <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-4 space-y-2 ml-2">
            <li><strong className="text-ink">数据同步</strong>：CDC（Canal/Debezium）→ Kafka → OLAP 数据库</li>
            <li><strong className="text-ink">实时计算</strong>：Flink 实时聚合后写入 OLAP，降低查询压力</li>
            <li><strong className="text-ink">数据湖</strong>：Iceberg/Hudi + Trino 实现湖仓一体</li>
            <li><strong className="text-ink">BI 工具</strong>：Superset/Metabase 连接 OLAP 数据库生成报表</li>
            <li><strong className="text-ink">监控系统</strong>：Prometheus + Grafana 监控 OLAP 集群健康状态</li>
          </ul>

          <DiagramBlock title="现代数据平台架构">
            {`graph LR
  A[MySQL/PostgreSQL] -->|CDC| B[Kafka]
  B -->|实时摄入| C[Flink]
  B -->|批量摄入| D[Spark]
  C --> E[ClickHouse/Doris]
  D --> F[Data Lake]
  F -->|Trino| G[BI Tools]
  E --> G
  G --> H[Superset/Metabase]`}
          </DiagramBlock>

          <SideNote label="延伸阅读">
            想了解具体某个 OLAP 数据库的深度原理，可以参考：
            - ClickHouse：clickhouse-architecture、clickhouse-performance
            - Doris：待补充
            - Trino：待补充
            - Druid：待补充
          </SideNote>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
