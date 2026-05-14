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
  { id: 'performance-metrics', text: '性能指标体系', level: 2 },
  { id: 'slow-query-analysis', text: '慢查询分析', level: 3 },
  { id: 'execution-plan', text: '执行计划详解', level: 3 },
  { id: 'parameter-tuning', text: '参数调优策略', level: 2 },
  { id: 'innodb-config', text: 'InnoDB 核心参数', level: 3 },
  { id: 'connection-pool', text: '连接池优化', level: 3 },
  { id: 'buffer-pool', text: '缓冲池配置', level: 3 },
  { id: 'monitoring-tools', text: '监控工具链', level: 2 },
  { id: 'prometheus-grafana', text: 'Prometheus + Grafana', level: 3 },
  { id: 'pt-tools', text: 'Percona Toolkit', level: 3 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比其他数据库调优', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function MysqlPerformanceTuning({ meta }: { meta: KnowledgeNode }) {
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
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一句话定义
            </h2>
            <blockquote className="pl-4 border-l-4 border-accent bg-accent-soft/40 py-3 pr-4 rounded-r-paper-md italic text-ink-light">
              MySQL 性能调优是通过慢查询分析、执行计划优化、参数调整、索引设计和硬件升级等手段，系统性提升数据库吞吐量、降低响应时间的工程实践。
            </blockquote>
            <SideNote label="性能调优的核心原则">
              先监控定位瓶颈，再针对性优化；避免过早优化和过度优化；每次只改变一个变量，量化优化效果。
            </SideNote>
          </section>

          {/* 性能指标体系 */}
          <section id="performance-metrics" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              性能指标体系
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 性能调优需要建立完整的指标体系，核心指标包括 QPS、TPS、响应时间、连接数、缓冲池命中率等。
            </p>
            <DiagramBlock title="MySQL 核心性能指标">
              {`graph TD
                METRICS["性能指标"] --> THROUGHPUT["吞吐量"]
                METRICS --> LATENCY["延迟"]
                METRICS --> RESOURCES["资源使用"]
                
                THROUGHPUT --> QPS["QPS<br/>每秒查询数"]
                THROUGHPUT --> TPS["TPS<br/>每秒事务数"]
                
                LATENCY --> AVG_RT["平均响应时间"]
                LATENCY --> P95_RT["P95 响应时间"]
                LATENCY --> P99_RT["P99 响应时间"]
                
                RESOURCES --> CPU["CPU 使用率"]
                RESOURCES --> MEMORY["内存使用"]
                RESOURCES --> IO["I/O 等待"]
                RESOURCES --> CONNECTIONS["连接数"]
                
                style THROUGHPUT fill:#69db7c,stroke:#2b8a3e,color:#fff
                style LATENCY fill:#ffd43b,stroke:#f08c00,color:#000
              `}
            </DiagramBlock>
            <Playground
              code={`-- 查看 QPS/TPS
SHOW GLOBAL STATUS LIKE 'Questions';
SHOW GLOBAL STATUS LIKE 'Com_commit';
SHOW GLOBAL STATUS LIKE 'Com_rollback';

-- 查看当前连接数
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';

-- 查看缓冲池命中率
SHOW STATUS LIKE 'Innodb_buffer_pool_read_requests';
SHOW STATUS LIKE 'Innodb_buffer_pool_reads';

-- 计算命中率: (1 - Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests) * 100%`}
              language="sql"
              description="查看核心性能指标"
            />
            <Callout type="info" title="关键阈值参考">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>缓冲池命中率 &gt; 99%</li>
                <li>连接使用率 &lt; 80%（Max_used_connections / max_connections）</li>
                <li>InnoDB 日志写入等待 &lt; 10ms</li>
                <li>临时表创建率 &lt; 5%</li>
              </ul>
            </Callout>
          </section>

          {/* 慢查询分析 */}
          <section id="slow-query-analysis" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              慢查询分析
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              慢查询日志是性能调优的入口，记录执行时间超过阈值的 SQL 语句。通过分析慢查询可以快速定位性能瓶颈。
            </p>
            <Playground
              code={`-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL slow_query_log_file = '/var/lib/mysql/slow.log';
SET GLOBAL long_query_time = 2;  -- 超过2秒的查询
SET GLOBAL log_queries_not_using_indexes = 'ON';  -- 未使用索引的查询

-- 查看慢查询配置
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- 查看慢查询数量
SHOW GLOBAL STATUS LIKE 'Slow_queries';`}
              language="sql"
              description="配置慢查询日志"
            />
            <SideNote label="long_query_time 设置建议">
              生产环境建议设置为 1-2 秒。设置过小会导致日志量过大，设置过大会遗漏潜在问题。对于高并发系统，可以设置为 0.5 秒。
            </SideNote>
            <Playground
              code={`# 使用 mysqldumpslow 分析慢查询日志
# 按查询时间排序，显示前10条
mysqldumpslow -s t -t 10 /var/lib/mysql/slow.log

# 按出现次数排序
mysqldumpslow -s c -t 10 /var/lib/mysql/slow.log

# 按锁定时间排序
mysqldumpslow -s l -t 10 /var/lib/mysql/slow.log

# 使用 pt-query-digest（更强大）
pt-query-digest /var/lib/mysql/slow.log --limit 10`}
              language="bash"
              description="分析慢查询日志"
            />
          </section>

          {/* 执行计划详解 */}
          <section id="execution-plan" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              执行计划详解
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              EXPLAIN 是分析 SQL 执行计划的核心工具，通过解读执行计划可以判断是否使用了索引、扫描行数、临时表等关键信息。
            </p>
            <Playground
              code={`-- 基本用法
EXPLAIN SELECT * FROM users WHERE age > 18;

-- 详细模式（MySQL 5.7+）
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE age > 18;

-- 实际执行（MySQL 8.0+）
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 18;`}
              language="sql"
              description="EXPLAIN 基本用法"
            />
            <DiagramBlock title="EXPLAIN 关键字段解读">
              {`graph LR
                EXPLAIN["EXPLAIN 输出"] --> TYPE["type<br/>访问类型"]
                EXPLAIN --> KEY["key<br/>使用的索引"]
                EXPLAIN --> ROWS["rows<br/>扫描行数"]
                EXPLAIN --> EXTRA["Extra<br/>额外信息"]
                
                TYPE --> SYSTEM["system/const<br/>最优"]
                TYPE --> REF["ref/range<br/>良好"]
                TYPE --> ALL["ALL<br/>全表扫描<br/>需优化"]
                
                EXTRA --> USING_FILESORT["Using filesort<br/>需优化"]
                EXTRA --> USING_TEMP["Using temporary<br/>需优化"]
                EXTRA --> USING_INDEX["Using index<br/>覆盖索引"]
                
                style SYSTEM fill:#69db7c,stroke:#2b8a3e,color:#fff
                style ALL fill:#ff6b6b,stroke:#c92a2a,color:#fff
              `}
            </DiagramBlock>
            <Callout type="warning" title="type 字段性能排序">
              <p className="mb-2"><strong>从最优到最差：</strong></p>
              <code className="font-mono text-[13px] bg-parchment-deep px-2 py-1 rounded-[3px] block">
                system &gt; const &gt; eq_ref &gt; ref &gt; range &gt; index &gt; ALL
              </code>
              <p className="mt-2">目标：至少达到 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">range</code> 级别，避免 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">ALL</code> 全表扫描。</p>
            </Callout>
          </section>

          {/* 参数调优策略 */}
          <section id="parameter-tuning" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              参数调优策略
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 有 300+ 个可调参数，但核心参数不超过 20 个。调优应遵循"二八原则"，重点关注影响最大的核心参数。
            </p>
            <DiagramBlock title="参数调优优先级">
              {`graph TD
                TUNING["参数调优"] --> HIGH["高优先级<br/>影响巨大"]
                TUNING --> MEDIUM["中优先级<br/>显著影响"]
                TUNING --> LOW["低优先级<br/>微调"]
                
                HIGH --> INNODB_BUFFER["innodb_buffer_pool_size"]
                HIGH --> INNODB_LOG["innodb_log_file_size"]
                HIGH --> MAX_CONN["max_connections"]
                
                MEDIUM --> QUERY_CACHE["query_cache_type"]
                MEDIUM --> SORT_BUFFER["sort_buffer_size"]
                MEDIUM --> JOIN_BUFFER["join_buffer_size"]
                
                LOW --> THREAD_CACHE["thread_cache_size"]
                LOW --> TABLE_CACHE["table_open_cache"]
                
                style HIGH fill:#ff6b6b,stroke:#c92a2a,color:#fff
              `}
            </DiagramBlock>
          </section>

          {/* InnoDB 核心参数 */}
          <section id="innodb-config" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              InnoDB 核心参数
            </h3>
            <Playground
              code={`[mysqld]
# === InnoDB 缓冲池（最重要）===
# 设置为物理内存的 50-70%
innodb_buffer_pool_size = 8G
innodb_buffer_pool_instances = 8  # 8GB以上时设置为8-16

# === InnoDB 日志文件 ===
# 总大小建议为缓冲池的 25%
innodb_log_file_size = 2G
innodb_log_buffer_size = 64M
innodb_flush_log_at_trx_commit = 1  # 1=最安全, 2=性能更好

# === 刷新策略 ===
innodb_max_dirty_pages_pct = 75
innodb_io_capacity = 2000  # SSD 可设置为 2000-5000
innodb_io_capacity_max = 4000

# === 并发控制 ===
innodb_read_io_threads = 8
innodb_write_io_threads = 8
innodb_purge_threads = 4

# === 其他重要参数 ===
innodb_file_per_table = ON  # 每表一个文件
innodb_flush_method = O_DIRECT  # 避免双重缓冲`}
              language="ini"
              description="InnoDB 核心参数配置"
            />
            <SideNote label="innodb_buffer_pool_size 计算公式">
              <code className="font-mono text-[13px] bg-parchment-deep px-2 py-1 rounded-[3px] block mb-2">
                buffer_pool_size = 物理内存 × 0.6 ~ 0.7
              </code>
              <p className="text-sm text-ink-muted">例如 16GB 内存的服务器，设置为 10-12GB。预留足够内存给操作系统和其他进程。</p>
            </SideNote>
          </section>

          {/* 连接池优化 */}
          <section id="connection-pool" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              连接池优化
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              合理的连接池配置可以避免连接风暴和资源浪费。需要平衡连接数和线程开销。
            </p>
            <Playground
              code={`[mysqld]
# 最大连接数（根据业务峰值设置）
max_connections = 500

# 连接超时时间
wait_timeout = 600
interactive_timeout = 600

# 线程缓存（减少线程创建销毁开销）
thread_cache_size = 50

# 每个连接的缓冲区（谨慎设置，避免内存爆炸）
# 总内存 ≈ max_connections × (read_buffer + sort_buffer + join_buffer)
read_buffer_size = 2M
sort_buffer_size = 2M
join_buffer_size = 2M`}
              language="ini"
              description="连接池参数配置"
            />
            <Callout type="danger" title="连接数设置的陷阱">
              <p className="mb-2">假设 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">max_connections = 1000</code>，每个连接的缓冲区总计 10MB，则极端情况下需要 <strong>10GB</strong> 内存仅用于连接缓冲！</p>
              <p><strong>正确做法：</strong>使用连接池中间件（如 ProxySQL、HikariCP）控制应用层连接数，MySQL 层设置合理的上限。</p>
            </Callout>
          </section>

          {/* 缓冲池配置 */}
          <section id="buffer-pool" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              缓冲池配置
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              InnoDB 缓冲池是性能调优的核心，缓存数据和索引页。合理配置可以显著提升读写性能。
            </p>
            <DiagramBlock title="InnoDB 缓冲池架构">
              {`graph TB
                BUFFER_POOL["InnoDB Buffer Pool"] --> INSTANCES["Buffer Pool Instances"]
                
                INSTANCES --> INSTANCE1["Instance 1"]
                INSTANCES --> INSTANCE2["Instance 2"]
                INSTANCES --> INSTANCE8["Instance N"]
                
                INSTANCE1 --> LRU["LRU List"]
                INSTANCE1 --> FREE["Free List"]
                INSTANCE1 --> FLUSH["Flush List"]
                
                LRU --> NEW["New Sublist<br/>热数据"]
                LRU --> OLD["Old Sublist<br/>冷数据"]
                
                style BUFFER_POOL fill:#4dabf7,stroke:#1864ab,color:#fff
              `}
            </DiagramBlock>
            <Playground
              code={`-- 查看缓冲池状态
SHOW ENGINE INNODB STATUS\\G

-- 关键指标
SELECT 
  VARIABLE_NAME, 
  VARIABLE_VALUE 
FROM information_schema.GLOBAL_STATUS 
WHERE VARIABLE_NAME IN (
  'Innodb_buffer_pool_read_requests',
  'Innodb_buffer_pool_reads',
  'Innodb_buffer_pool_pages_total',
  'Innodb_buffer_pool_pages_free',
  'Innodb_buffer_pool_pages_dirty'
);

-- 计算命中率
SELECT 
  (1 - @@global.Innodb_buffer_pool_reads / @@global.Innodb_buffer_pool_read_requests) * 100 AS hit_rate;`}
              language="sql"
              description="监控缓冲池状态"
            />
          </section>

          {/* 监控工具链 */}
          <section id="monitoring-tools" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              监控工具链
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              完善的监控体系是性能调优的基础，包括实时监控、历史趋势分析和告警机制。
            </p>
          </section>

          {/* Prometheus + Grafana */}
          <section id="prometheus-grafana" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Prometheus + Grafana
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Prometheus + Grafana 是目前最流行的 MySQL 监控方案，提供丰富的可视化面板和告警功能。
            </p>
            <DiagramBlock title="MySQL 监控架构">
              {`graph LR
                MYSQL["MySQL Server"] --> EXPORTER["mysqld_exporter"]
                EXPORTER --> PROMETHEUS["Prometheus"]
                PROMETHEUS --> GRAFANA["Grafana"]
                PROMETHEUS --> ALERT["AlertManager"]
                ALERT --> NOTIFY["邮件/钉钉/企业微信"]
                
                style MYSQL fill:#4dabf7,stroke:#1864ab,color:#fff
                style GRAFANA fill:#ffd43b,stroke:#f08c00,color:#000
              `}
            </DiagramBlock>
            <Playground
              code={`# docker-compose.yml
version: '3'
services:
  mysqld-exporter:
    image: prom/mysqld-exporter
    environment:
      - DATA_SOURCE_NAME=root:password@(mysql:3306)/
    ports:
      - "9104:9104"
  
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
  
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin`}
              language="yaml"
              description="部署 MySQL 监控栈"
            />
            <SideNote label="推荐 Dashboard">
              Percona 提供的 <a href="https://grafana.com/grafana/dashboards/7362" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">MySQL Overview</a> Dashboard（ID: 7362）是最常用的监控面板，包含 QPS、TPS、连接数、缓冲池命中率等核心指标。
            </SideNote>
          </section>

          {/* Percona Toolkit */}
          <section id="pt-tools" className="mb-8">
            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              Percona Toolkit
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              Percona Toolkit 是一套强大的 MySQL 管理和诊断工具集，包含 30+ 个命令行工具。
            </p>
            <Playground
              code={`# 分析慢查询日志
pt-query-digest /var/lib/mysql/slow.log --limit 10

# 查找重复索引
pt-duplicate-key-checker --host=localhost --user=root --password=xxx

# 查找未使用的索引
pt-index-usage --host=localhost --user=root --password=xxx /var/lib/mysql/slow.log

# 在线修改表结构（不锁表）
pt-online-schema-change \\
  --alter "ADD COLUMN email VARCHAR(100)" \\
  --execute D=mydb,t=users

# 检查主从一致性
pt-table-checksum --host=master --user=root --password=xxx
pt-table-sync --execute --print h=slave,u=root,p=xxx`}
              language="bash"
              description="Percona Toolkit 常用命令"
            />
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 性能优化的底层原理涉及存储引擎、查询优化器、执行器等核心模块。以下是关键流程的伪代码实现：
            </p>
            <Playground
              code={`// sql/sql_select.cc - 查询优化器核心逻辑
JOIN::optimize() {
  // 1. 预处理：语法检查、权限验证
  preprocess_query();
  
  // 2. 条件简化：常量传播、等价谓词推导
  simplify_conditions();
  
  // 3. 访问路径选择：基于成本的优化（CBO）
  for (each table in query) {
    // 估算不同访问方式的成本
    cost_full_scan = estimate_full_scan_cost();
    cost_index_scan = estimate_index_scan_cost();
    cost_index_lookup = estimate_index_lookup_cost();
    
    // 选择成本最低的访问方式
    best_access_path = min(cost_full_scan, cost_index_scan, cost_index_lookup);
  }
  
  // 4. 连接顺序优化：动态规划算法
  optimal_join_order = find_optimal_join_order();
  
  // 5. 生成执行计划
  generate_execution_plan();
}`}
              language="cpp"
              description="查询优化器核心逻辑"
            />
            <Playground
              code={`// storage/innobase/buf/buf0buf.cc - 缓冲池管理
buf_page_get_gen(page_id, mode) {
  // 1. 在缓冲池中查找页
  block = buf_pool->look_up(page_id);
  
  if (block != NULL) {
    // 缓存命中
    if (mode == BUF_GET_PEEK) {
      return block;  // 仅查看，不加锁
    }
    
    // 将页移动到 LRU 链表头部（热数据）
    buf_LRU_move_to_head(block);
    return block;
  }
  
  // 2. 缓存未命中，从磁盘读取
  block = buf_pool->allocate_free_block();
  
  if (block == NULL) {
    // 没有空闲块，驱逐冷数据
    evict_block = buf_LRU_evict_cold_page();
    flush_if_dirty(evict_block);
    block = evict_block;
  }
  
  // 3. 从磁盘读取页到缓冲池
  os_file_read(page_id, block->frame);
  
  // 4. 插入到 LRU 链表的 Old 子列表
  buf_LRU_add_to_old(block);
  
  return block;
}`}
              language="cpp"
              description="InnoDB 缓冲池页面读取逻辑"
            />
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>
            <div className="space-y-4">
              <Callout type="danger" title="误区 1：索引越多越好">
                <p className="mb-2">每个索引都会增加写操作的开销（INSERT/UPDATE/DELETE 需要更新所有索引），并占用额外的存储空间。过多的索引反而会降低整体性能。</p>
                <p><strong>正确做法：</strong>根据查询场景精心设计索引，定期清理未使用的索引（使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">pt-index-usage</code> 工具）。</p>
              </Callout>
              
              <Callout type="danger" title="误区 2：COUNT(*) 比 COUNT(1) 慢">
                <p className="mb-2">在 InnoDB 引擎中，<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">COUNT(*)</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">COUNT(1)</code>、<code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">COUNT(id)</code> 的性能差异微乎其微。MySQL 优化器会自动选择最优的执行方式。</p>
                <p><strong>正确做法：</strong>优先使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">COUNT(*)</code>，语义清晰且符合 SQL 标准。</p>
              </Callout>
              
              <Callout type="danger" title="误区 3：大事务一定不好">
                <p className="mb-2">大事务确实会占用更多锁资源和 Undo Log，但在某些场景下（如批量导入），大事务比小事务更高效（减少日志刷盘次数）。</p>
                <p><strong>正确做法：</strong>根据业务场景权衡。OLTP 场景避免大事务，批量处理场景可以适当增大批次。</p>
              </Callout>
              
              <Callout type="danger" title="误区 4：启用 Query Cache 能提升性能">
                <p className="mb-2">Query Cache 在 MySQL 5.7.20 已废弃，8.0 已移除。原因是高并发下 Query Cache 的互斥锁成为瓶颈，反而降低性能。</p>
                <p><strong>正确做法：</strong>使用应用层缓存（Redis/Memcached）替代 Query Cache。</p>
              </Callout>
              
              <Callout type="danger" title="误区 5：ORDER BY 一定会触发 filesort">
                <p className="mb-2">如果 ORDER BY 的列上有合适的索引，MySQL 可以直接利用索引的有序性，避免 filesort。</p>
                <p><strong>正确做法：</strong>为经常排序的列创建索引，确保索引顺序与 ORDER BY 一致。</p>
              </Callout>
            </div>
          </section>

          {/* 面试真题 */}
          <section id="interview" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              面试真题
            </h2>
            <InterviewSection
              questions={[
                {
                  question: '如何定位和优化慢查询？',
                  answer: '① 开启慢查询日志（long_query_time = 1-2秒）；② 使用 pt-query-digest 分析慢查询日志，找出 Top N 慢查询；③ 使用 EXPLAIN 分析执行计划，检查是否使用索引、扫描行数；④ 优化手段包括添加索引、改写 SQL、拆分大查询、使用覆盖索引等；⑤ 验证优化效果，对比优化前后的执行时间和资源消耗。',
                },
                {
                  question: 'EXPLAIN 结果中 type 字段有哪些值？性能如何排序？',
                  answer: '从最优到最差：system > const > eq_ref > ref > range > index > ALL。system/const 表示唯一索引查找，eq_ref 表示主键/唯一索引关联，ref 表示普通索引查找，range 表示范围扫描，index 表示全索引扫描，ALL 表示全表扫描。目标是至少达到 range 级别。',
                },
                {
                  question: 'InnoDB 缓冲池的作用是什么？如何设置大小？',
                  answer: 'InnoDB 缓冲池缓存数据和索引页，减少磁盘 I/O，是性能调优的核心参数。设置公式：buffer_pool_size = 物理内存 × 0.6 ~ 0.7。例如 16GB 内存的服务器设置为 10-12GB。通过 SHOW ENGINE INNODB STATUS 监控缓冲池命中率，目标 > 99%。',
                },
                {
                  question: '什么是覆盖索引？有什么优势？',
                  answer: '覆盖索引是指查询的列都在索引中，无需回表查询数据行。优势：① 减少 I/O（索引通常比数据行小）；② 索引是有序的，适合范围查询和排序；③ Extra 字段显示 "Using index"。例如：SELECT id, name FROM users WHERE age > 18，如果 (age, id, name) 是联合索引，则构成覆盖索引。',
                },
                {
                  question: '如何优化深分页查询（LIMIT 1000000, 10）？',
                  answer: '三种方案：① 延迟关联：先通过覆盖索引查出主键，再 JOIN 原表获取完整数据；② 记录上次查询的最大 ID，使用 WHERE id > last_id LIMIT 10；③ 使用 Elasticsearch 等搜索引擎替代 MySQL 分页。推荐方案 2，性能最优。',
                },
                {
                  question: 'innodb_flush_log_at_trx_commit 的三个值有什么区别？',
                  answer: '0：每秒刷盘一次，性能最好但可能丢失 1 秒数据；1：每次事务提交都刷盘，最安全但性能最差（默认值）；2：每次事务提交写入 OS 缓存，每秒刷盘一次，性能和安全性折中。金融场景用 1，一般场景用 2，测试环境用 0。',
                },
                {
                  question: '如何监控 MySQL 性能？有哪些关键指标？',
                  answer: '监控方案：Prometheus + mysqld_exporter + Grafana。关键指标：① QPS/TPS（吞吐量）；② 响应时间（P95/P99）；③ 连接数使用率；④ 缓冲池命中率（> 99%）；⑤ 慢查询数量；⑥ 主从复制延迟；⑦ CPU/内存/磁盘 I/O 使用率。设置告警阈值，及时发现性能问题。',
                },
              ]}
            />
          </section>

          {/* 对比其他数据库调优 */}
          <section id="comparison" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              对比其他数据库调优
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border-light text-sm">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border-light px-4 py-2 text-left">特性</th>
                    <th className="border border-border-light px-4 py-2 text-left">MySQL</th>
                    <th className="border border-border-light px-4 py-2 text-left">PostgreSQL</th>
                    <th className="border border-border-light px-4 py-2 text-left">ClickHouse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">核心调优方向</td>
                    <td className="border border-border-light px-4 py-2">索引优化、缓冲池</td>
                    <td className="border border-border-light px-4 py-2">VACUUM、工作内存</td>
                    <td className="border border-border-light px-4 py-2">分区键、压缩算法</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">缓存机制</td>
                    <td className="border border-border-light px-4 py-2">InnoDB Buffer Pool</td>
                    <td className="border border-border-light px-4 py-2">Shared Buffers + OS Cache</td>
                    <td className="border border-border-light px-4 py-2">Mark Cache + Page Cache</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">并发控制</td>
                    <td className="border border-border-light px-4 py-2">MVCC + 行锁</td>
                    <td className="border border-border-light px-4 py-2">MVCC + 多版本</td>
                    <td className="border border-border-light px-4 py-2">不支持事务，无锁</td>
                  </tr>
                  <tr>
                    <td className="border border-border-light px-4 py-2 font-medium">适用场景</td>
                    <td className="border border-border-light px-4 py-2">OLTP 通用场景</td>
                    <td className="border border-border-light px-4 py-2">复杂查询、GIS</td>
                    <td className="border border-border-light px-4 py-2">OLAP 实时分析</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout type="info" title="选型建议">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>OLTP 场景</strong>：MySQL（成熟稳定，生态完善）或 PostgreSQL（功能丰富，扩展性强）</li>
                <li><strong>OLAP 场景</strong>：ClickHouse（列式存储，极致查询性能）</li>
                <li><strong>混合负载</strong>：PostgreSQL（支持 JSONB、全文检索等 NoSQL 能力）</li>
              </ul>
            </Callout>
          </section>

          {/* 知识关联 */}
          <section id="related" className="mb-8">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-deep rounded-paper-md border border-border-light">
                <h4 className="font-semibold text-ink mb-2">前置知识</h4>
                <ul className="space-y-1 text-sm text-ink-muted">
                  <li>• <a href="/docs/mysql/mysql-architecture" className="text-accent hover:underline">MySQL 架构与存储引擎</a></li>
                  <li>• <a href="/docs/mysql/mysql-index-optimization" className="text-accent hover:underline">MySQL 索引优化实战</a></li>
                </ul>
              </div>
              <div className="p-4 bg-parchment-deep rounded-paper-md border border-border-light">
                <h4 className="font-semibold text-ink mb-2">相关知识点</h4>
                <ul className="space-y-1 text-sm text-ink-muted">
                  <li>• <a href="/docs/mysql/mysql-replication-ha" className="text-accent hover:underline">MySQL 主从复制与高可用</a></li>
                  <li>• <a href="/docs/postgresql/postgresql-core" className="text-accent hover:underline">PostgreSQL 核心原理</a></li>
                  <li>• <a href="/docs/clickhouse/clickhouse-performance" className="text-accent hover:underline">ClickHouse 性能优化</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ArticleNav 必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，禁止用 <aside> 包裹！组件自行管理桌面/移动端显隐 */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
