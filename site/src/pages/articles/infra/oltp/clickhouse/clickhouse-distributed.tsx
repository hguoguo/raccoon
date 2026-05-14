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
  { id: 'architecture', text: '分布式架构', level: 2 },
  { id: 'sharding', text: '分片机制', level: 3 },
  { id: 'replication', text: '副本机制', level: 3 },
  { id: 'zookeeper', text: 'ZooKeeper 协调', level: 2 },
  { id: 'distributed-table', text: '分布式表', level: 2 },
  { id: 'global-dictionary', text: '全局字典', level: 3 },
  { id: 'load-balancing', text: '负载均衡', level: 3 },
  { id: 'source-code', text: '源码分析', level: 2 },
  { id: 'misconceptions', text: '常见误区', level: 2 },
  { id: 'interview', text: '面试真题', level: 2 },
  { id: 'comparison', text: '对比其他分布式方案', level: 2 },
  { id: 'related', text: '知识关联', level: 2 },
]

export default function ClickHouseDistributed({ meta }: { meta: KnowledgeNode }) {
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
              ClickHouse 分布式集群通过数据分片（Sharding）实现水平扩展，通过副本复制（Replication）实现高可用，借助 ZooKeeper 进行元数据协调和故障检测，能够线性扩展到数百个节点，支持 PB 级数据存储和实时分析。
            </blockquote>
            <SideNote label="为什么需要分布式？">
              单机 ClickHouse 虽然性能强劲，但受限于单机的存储容量、CPU 核心数和内存大小。当数据量超过 TB 级别或 QPS 要求极高时，需要通过分布式集群实现水平扩展，将数据和查询负载分散到多个节点上。
            </SideNote>
          </section>

          {/* 分布式架构 */}
          <section id="architecture" className="mb-8">
            <h2 id="architecture" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              分布式架构
            </h2>
            <DiagramBlock title="ClickHouse 分布式集群架构">
              {`graph TD
                CLIENT["Client"] --> DIST["Distributed Table<br/>分布式表"]
                DIST --> SHARD1["Shard 1<br/>节点 A + 节点 B<br/>主从副本"]
                DIST --> SHARD2["Shard 2<br/>节点 C + 节点 D<br/>主从副本"]
                DIST --> SHARD3["Shard 3<br/>节点 E + 节点 F<br/>主从副本"]
                SHARD1 --> ZK["ZooKeeper Cluster<br/>元数据协调"]
                SHARD2 --> ZK
                SHARD3 --> ZK
                ZK --> FAILOVER["故障检测与自动切换"]
              `}
            </DiagramBlock>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 分布式集群的核心组件：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong className="text-ink">分片（Shard）</strong>：数据水平切分，每个分片存储部分数据</li>
              <li><strong className="text-ink">副本（Replica）</strong>：每个分片有多个副本，实现高可用</li>
              <li><strong className="text-ink">分布式表（Distributed Table）</strong>：逻辑表，路由查询到各个分片</li>
              <li><strong className="text-ink">ZooKeeper</strong>：协调副本同步、故障检测、元数据管理</li>
              <li><strong className="text-ink">负载均衡器</strong>：分发客户端请求到不同节点</li>
            </ul>

            <h3 id="sharding" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              分片机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              分片是 ClickHouse 实现水平扩展的核心机制，通过分片键（Sharding Key）将数据分布到不同的节点：
            </p>

            <ContextSwitcher
              simpleContent={
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-3">
                    <strong>分片的作用</strong>：
                  </p>
                  <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
                    <li><strong>水平扩展</strong>：增加节点即可线性提升存储和计算能力</li>
                    <li><strong>并行查询</strong>：查询可以同时在多个分片上执行</li>
                    <li><strong>负载均衡</strong>：数据和查询负载分散到多个节点</li>
                  </ul>
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted">
                    <strong>分片策略</strong>：随机分片（均匀分布）、哈希分片（相同 key 在同一分片）、自定义分片（业务逻辑控制）。
                  </p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-ink mb-2">分片键选择原则</h4>
                    <Playground
                      code={`-- ❌ 错误示例：低区分度分片键（导致数据倾斜）
CREATE TABLE events_bad ON CLUSTER my_cluster (
    event_date Date,
    city String,  -- 只有几个城市，区分度低
    event_id UInt64
) ENGINE = ReplicatedMergeTree('/clickhouse/tables/{shard}/events', '{replica}')
ORDER BY event_id;

-- 创建分布式表
CREATE TABLE events_dist ON CLUSTER my_cluster AS events_bad
ENGINE = Distributed(my_cluster, default, events_bad, city);
-- 问题：某些城市数据量大，导致分片不均衡

-- ✅ 正确示例：使用哈希函数均匀分布
CREATE TABLE events_good ON CLUSTER my_cluster (
    event_date Date,
    user_id UInt64,
    event_id UInt64
) ENGINE = ReplicatedMergeTree('/clickhouse/tables/{shard}/events', '{replica}')
ORDER BY (event_date, event_id);

-- 创建分布式表（使用哈希分片）
CREATE TABLE events_dist ON CLUSTER my_cluster AS events_good
ENGINE = Distributed(
    my_cluster,           -- 集群名称
    default,              -- 数据库名
    events_good,          -- 本地表名
    sipHash64(user_id)    -- 分片键：对用户 ID 哈希
);
-- 优势：数据均匀分布到各个分片

-- 🔍 检查数据分布
SELECT 
    _shard_num,
    count() AS row_count,
    formatReadableSize(sum(bytes_on_disk)) AS size
FROM events_dist
GROUP BY _shard_num
ORDER BY _shard_num;`}
                      language="sql"
                      description="合理的分片键可以避免数据倾斜，实现负载均衡"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">分片查询流程</h4>
                    <DiagramBlock title="分布式查询执行流程">
                      {`graph TD
                        CLIENT["Client Query"] --> DIST_NODE["Distributed Node<br/>协调节点"]
                        DIST_NODE --> PARSE["解析 SQL"]
                        PARSE --> ROUTE["路由到各个分片"]
                        ROUTE --> SHARD1["Shard 1<br/>本地查询"]
                        ROUTE --> SHARD2["Shard 2<br/>本地查询"]
                        ROUTE --> SHARD3["Shard 3<br/>本地查询"]
                        SHARD1 --> MERGE["结果合并<br/>Merge/Aggregate"]
                        SHARD2 --> MERGE
                        SHARD3 --> MERGE
                        MERGE --> RESULT["返回结果给客户端"]
                      `}
                    </DiagramBlock>
                    <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
                      <strong>查询优化</strong>：如果查询条件包含分片键，ClickHouse 可以只查询相关分片（分片裁剪），避免全集群扫描。
                    </p>
                  </div>
                </div>
              }
            />

            <h3 id="replication" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              副本机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              副本是 ClickHouse 实现高可用的关键机制，每个分片可以有多个副本（通常 2-3 个）：
            </p>

            <DiagramBlock title="副本同步流程">
              {`graph TD
                WRITE["INSERT 写入"] --> MASTER["Master Replica<br/>主副本"]
                MASTER --> ZK_LOG["写入 ZooKeeper Log"]
                ZK_LOG --> REPLICA1["Replica 1<br/>从副本"]
                ZK_LOG --> REPLICA2["Replica 2<br/>从副本"]
                REPLICA1 --> FETCH["Fetch Data Part"]
                REPLICA2 --> FETCH
                FETCH --> DISK1["Disk Storage"]
                FETCH --> DISK2["Disk Storage"]
                MASTER -.-> |心跳| ZK["ZooKeeper"]
                REPLICA1 -.-> |心跳| ZK
                REPLICA2 -.-> |心跳| ZK
              `}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>副本同步机制</strong>：
            </p>
            <ol className="list-decimal list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>写入主副本</strong>：客户端写入请求发送到主副本（任意一个副本都可以作为主副本）</li>
              <li><strong>记录日志</strong>：主副本将写入操作记录到 ZooKeeper 的 log 节点</li>
              <li><strong>从副本拉取</strong>：从副本监听 ZooKeeper，发现新日志后拉取数据 Part</li>
              <li><strong>一致性保证</strong>：所有副本都写入成功后，才认为写入成功（可配置）</li>
              <li><strong>故障检测</strong>：ZooKeeper 通过心跳检测副本状态，自动触发故障转移</li>
            </ol>

            <Playground
              code={`-- 创建带副本的表
CREATE TABLE events_replicated ON CLUSTER my_cluster (
    event_date Date,
    event_id UInt64,
    user_id UInt32
) ENGINE = ReplicatedMergeTree(
    '/clickhouse/tables/{shard}/events',  -- ZooKeeper 路径
    '{replica}'                            -- 副本名称
)
ORDER BY (event_date, event_id);

-- 参数说明：
-- - /clickhouse/tables/{shard}/events：ZooKeeper 中的路径模板
--   - {shard}：自动替换为分片编号（如 01, 02, 03）
--   - 同一分片的副本共享同一个 ZooKeeper 路径
-- - {replica}：副本名称，每个副本必须唯一（如 replica_1, replica_2）

-- 创建分布式表
CREATE TABLE events_dist ON CLUSTER my_cluster AS events_replicated
ENGINE = Distributed(
    my_cluster,
    default,
    events_replicated,
    sipHash64(user_id)
);

-- 写入数据（自动复制到所有副本）
INSERT INTO events_dist VALUES 
    ('2024-01-01', 1, 100),
    ('2024-01-01', 2, 200);

-- 查询数据（自动从所有分片聚合）
SELECT count() FROM events_dist;`}
              language="sql"
              description="ReplicatedMergeTree 引擎自动处理副本同步和故障转移"
            />

            <SideNote label="副本一致性级别">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>异步复制</strong>（默认）：主副本写入成功后立即返回，从副本异步同步</li>
                <li><strong>同步复制</strong>：等待所有副本写入成功后才返回（配置 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">insert_quorum</code>）</li>
                <li><strong>权衡</strong>：异步复制性能好但可能丢失数据，同步复制安全性高但性能较差</li>
                <li><strong>推荐</strong>：生产环境使用异步复制 + 定期备份，平衡性能和安全性</li>
              </ul>
            </SideNote>
          </section>

          {/* ZooKeeper 协调 */}
          <section id="zookeeper" className="mb-8">
            <h2 id="zookeeper" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              ZooKeeper 协调
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ZooKeeper 是 ClickHouse 分布式集群的"大脑"，负责元数据管理、副本协调和故障检测：
            </p>

            <DiagramBlock title="ZooKeeper 在 ClickHouse 中的作用">
              {`graph TD
                ZK["ZooKeeper Cluster"] --> META["元数据存储<br/>表结构、Part 信息"]
                ZK --> LEADER["Leader 选举<br/>副本主从切换"]
                ZK --> LOCK["分布式锁<br/>防止并发冲突"]
                ZK --> LOG["操作日志<br/>副本同步队列"]
                ZK --> HEALTH["健康检查<br/>心跳监控"]
                
                CH1["ClickHouse Node 1"] --> |读写| ZK
                CH2["ClickHouse Node 2"] --> |读写| ZK
                CH3["ClickHouse Node 3"] --> |读写| ZK
              `}
            </DiagramBlock>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              <strong>ZooKeeper 存储的关键数据</strong>：
            </p>
            <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4 space-y-2 ml-4">
              <li><strong>表元数据</strong>：表结构、列定义、引擎类型</li>
              <li><strong>Part 信息</strong>：每个 Part 的名称、大小、校验和</li>
              <li><strong>副本状态</strong>：副本是否活跃、最后心跳时间</li>
              <li><strong>操作日志</strong>：INSERT、ALTER、MERGE 等操作记录</li>
              <li><strong>分布式锁</strong>：防止多个副本同时执行相同操作</li>
            </ul>

            <Playground
              code={`# ZooKeeper 配置（config.xml）
<zookeeper>
    <node index="1">
        <host>zk1.example.com</host>
        <port>2181</port>
    </node>
    <node index="2">
        <host>zk2.example.com</host>
        <port>2181</port>
    </node>
    <node index="3">
        <host>zk3.example.com</host>
        <port>2181</port>
    </node>
    <session_timeout_ms>30000</session_timeout_ms>
    <operation_timeout_ms>10000</operation_timeout_ms>
</zookeeper>

# 查看 ZooKeeper 中的 ClickHouse 数据
# 使用 zkCli.sh 连接 ZooKeeper
ls /clickhouse/tables/01/events  # 查看分片 01 的表信息
get /clickhouse/tables/01/events/log/log-0000000001  # 查看操作日志

# 监控 ZooKeeper 连接状态
SELECT * FROM system.zookeeper WHERE path = '/clickhouse';

# 常见问题：
# 1. ZooKeeper 不可用会导致无法创建/删除表
# 2. 查询仍然可以进行（使用本地数据）
# 3. 建议部署 3-5 个 ZooKeeper 节点保证高可用`}
              language="xml"
              description="ZooKeeper 是 ClickHouse 分布式集群的核心依赖，必须保证高可用"
            />

            <SideNote label="ZooKeeper 的性能瓶颈">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>写入放大</strong>：每次 INSERT 都会在 ZooKeeper 中创建多个节点</li>
                <li><strong>小文件问题</strong>：频繁的小 Part 会导致 ZooKeeper 节点数量激增</li>
                <li><strong>解决方案</strong>：
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>调整 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">min_bytes_for_wide_part</code> 减少 Part 数量</li>
                    <li>定期执行 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">OPTIMIZE TABLE</code> 合并 Part</li>
                    <li>使用 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">AsyncInsert</code> 批量写入</li>
                  </ul>
                </li>
              </ul>
            </SideNote>
          </section>

          {/* 分布式表 */}
          <section id="distributed-table" className="mb-8">
            <h2 id="distributed-table" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              分布式表
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              分布式表（Distributed Table）是 ClickHouse 提供的逻辑表 abstraction，客户端通过分布式表访问整个集群的数据：
            </p>

            <Playground
              code={`-- 分布式表引擎语法
ENGINE = Distributed(
    cluster,        -- 集群名称（在 clusters.xml 中配置）
    database,       -- 数据库名
    table,          -- 本地表名
    [sharding_key]  -- 分片键（可选）
)

-- 完整示例
-- 1. 在每个节点上创建本地表
CREATE TABLE events_local ON CLUSTER my_cluster (
    event_date Date,
    event_id UInt64,
    user_id UInt32,
    event_type String
) ENGINE = ReplicatedMergeTree(
    '/clickhouse/tables/{shard}/events',
    '{replica}'
)
ORDER BY (event_date, event_id);

-- 2. 在任意节点上创建分布式表（只需创建一次）
CREATE TABLE events_dist ON CLUSTER my_cluster AS events_local
ENGINE = Distributed(
    my_cluster,
    default,
    events_local,
    sipHash64(user_id)
);

-- 3. 写入数据（通过分布式表）
INSERT INTO events_dist VALUES 
    ('2024-01-01', 1, 100, 'click'),
    ('2024-01-01', 2, 200, 'view');
-- 数据会根据分片键自动路由到对应的分片

-- 4. 查询数据（自动聚合所有分片的结果）
SELECT 
    event_date,
    count() AS event_count,
    uniq(user_id) AS uv
FROM events_dist
WHERE event_date >= '2024-01-01'
GROUP BY event_date;

-- 5. 查看数据分布
SELECT 
    _shard_num,
    count() AS row_count
FROM events_dist
GROUP BY _shard_num
ORDER BY _shard_num;`}
              language="sql"
              description="分布式表屏蔽了底层分片细节，提供透明的全局视图"
            />

            <h3 id="global-dictionary" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              全局字典
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              在分布式集群中，字典（Dictionary）需要在所有节点上创建，或者使用全局字典：
            </p>

            <Playground
              code={`-- 方法 1：在每个节点上创建相同的字典
CREATE DICTIONARY user_dict ON CLUSTER my_cluster (
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

-- 方法 2：使用全局字典（推荐）
-- 字典数据存储在一张分布式表中，所有节点共享
CREATE TABLE users_global ON CLUSTER my_cluster (
    id UInt64,
    name String,
    age UInt8
) ENGINE = ReplicatedMergeTree(
    '/clickhouse/tables/{shard}/users',
    '{replica}'
)
ORDER BY id;

CREATE DICTIONARY user_dict_global ON CLUSTER my_cluster (
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
    table 'users_global'
))
LAYOUT(HASHED())
LIFETIME(MIN 300 MAX 360);

-- 使用字典（在所有节点上都能查询）
SELECT 
    dictGet('user_dict_global', 'name', toUInt64(user_id)) AS user_name,
    count() AS event_count
FROM events_dist
GROUP BY user_id;`}
              language="sql"
              description="全局字典可以避免在每个节点上维护独立的字典数据"
            />

            <h3 id="load-balancing" className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              负载均衡
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 支持多种负载均衡策略，将客户端请求分发到不同的节点：
            </p>

            <Playground
              code={`# 集群配置（clusters.xml 或 config.xml）
<remote_servers>
    <my_cluster>
        <!-- 分片 1 -->
        <shard>
            <weight>1</weight>  <!-- 权重 -->
            <internal_replication>true</internal_replication>
            <replica>
                <host>node1.example.com</host>
                <port>9000</port>
            </replica>
            <replica>
                <host>node2.example.com</host>
                <port>9000</port>
            </replica>
        </shard>
        
        <!-- 分片 2 -->
        <shard>
            <weight>1</weight>
            <internal_replication>true</internal_replication>
            <replica>
                <host>node3.example.com</host>
                <port>9000</port>
            </replica>
            <replica>
                <host>node4.example.com</host>
                <port>9000</port>
            </replica>
        </shard>
    </my_cluster>
</remote_servers>

# 负载均衡策略：
# 1. in_order：按顺序选择节点（默认）
# 2. random：随机选择节点
# 3. nearest_hostname：优先选择主机名相近的节点
# 4. next_shard：轮流选择分片

# 配置负载均衡策略
<distributed_product_mode>global</distributed_product_mode>
<load_balancing>random</load_balancing>

# 跳过不可用的分片
<skip_unavailable_shards>1</skip_unavailable_shards>`}
              language="xml"
              description="合理的负载均衡策略可以提升集群的整体吞吐量"
            />
          </section>

          {/* 源码分析 */}
          <section id="source-code" className="mb-8">
            <h2 id="source-code" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              源码分析
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              ClickHouse 的分布式查询执行涉及多个组件的协作，以下是简化版的核心流程：
            </p>

            <Playground
              code={`// ClickHouse 分布式查询执行流程（简化版）

// 1. 分布式表接收查询
class StorageDistributed : public IStorage {
public:
    void read(
        QueryPlan & query_plan,
        const Names & column_names,
        const StorageSnapshotPtr & storage_snapshot,
        SelectQueryInfo & query_info,
        ContextPtr context,
        QueryProcessingStage::Enum processed_stage,
        size_t max_block_size,
        size_t num_streams
    ) override {
        // 2. 解析查询，确定需要查询的分片
        auto shards = getShardsForQuery(query_info.query);
        
        // 3. 为每个分片创建远程查询
        for (const auto & shard : shards) {
            auto remote_query = buildRemoteQuery(shard, query_info.query);
            
            // 4. 异步执行远程查询
            thread_pool.schedule([remote_query]() {
                auto connection = pool.get();  // 从连接池获取连接
                auto result = connection->executeQuery(remote_query);
                return result;
            });
        }
        
        // 5. 合并所有分片的结果
        query_plan.addStep(std::make_unique<MergingSortedTransform>(
            inputs, outputs, sort_description
        ));
    }
};

// 2. 副本同步机制
class StorageReplicatedMergeTree : public StorageMergeTree {
private:
    void backgroundProcess() {
        while (!shutdown) {
            // 监听 ZooKeeper 日志
            auto log_entry = zookeeper->waitForChanges(log_path);
            
            if (log_entry.type == "GET_PART") {
                // 从其他副本拉取 Part
                fetchPart(log_entry.part_name);
            } else if (log_entry.type == "MERGE_PARTS") {
                // 执行合并操作
                mergeParts(log_entry.parts);
            }
        }
    }
    
    void fetchPart(const String & part_name) {
        // 从 ZooKeeper 获取 Part 元数据
        auto part_info = zookeeper->get(part_path + "/" + part_name);
        
        // 从其他副本下载 Part 文件
        for (const auto & replica : replicas) {
            if (replica.hasPart(part_name)) {
                downloadPart(replica.host, part_name);
                break;
            }
        }
        
        // 验证 Part 完整性
        verifyPartChecksum(part_name);
        
        // 注册 Part
        attachPart(part_name);
    }
};

// 3. 故障检测和自动切换
class ReplicatedMergeTreeQueue {
public:
    void checkReplicaHealth() {
        for (auto & replica : replicas) {
            // 检查心跳
            if (now() - replica.last_heartbeat > session_timeout) {
                // 标记副本为失效
                replica.is_active = false;
                
                // 触发 Leader 选举
                electNewLeader();
            }
        }
    }
    
    void electNewLeader() {
        // 使用 ZooKeeper 的临时节点实现 Leader 选举
        auto leader_path = zookeeper->createEphemeralSequential(
            leader_election_path,
            replica_name
        );
        
        // 如果创建的节点是最小的，则成为 Leader
        if (leader_path == getMinNode(leader_election_path)) {
            becomeLeader();
        }
    }
};`}
              language="cpp"
              description="ClickHouse 通过 ZooKeeper 实现副本协调和故障转移"
            />

            <SideNote label="分布式系统的挑战">
              <ul className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted space-y-2">
                <li><strong>网络分区</strong>：节点之间网络中断可能导致脑裂（Split-Brain）</li>
                <li><strong>数据一致性</strong>：CAP 理论中，ClickHouse 选择 AP（可用性 + 分区容错性）</li>
                <li><strong>时钟漂移</strong>：不同节点的时钟不一致可能导致时序问题</li>
                <li><strong>解决方案</strong>：使用 ZooKeeper 的强一致性保证、Quorum 机制、向量时钟等</li>
              </ul>
            </SideNote>
          </section>

          {/* 常见误区 */}
          <section id="misconceptions" className="mb-8">
            <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              常见误区
            </h2>

            <div className="space-y-4">
              <Callout type="danger" title="误区 1：分片越多越好">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：过多的分片会导致：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>查询时需要连接更多节点，网络开销增大</li>
                  <li>结果合并复杂度增加</li>
                  <li>ZooKeeper 元数据膨胀</li>
                  <li>建议：根据数据量和 QPS 合理选择分片数（通常 3-10 个分片）</li>
                </ul>
              </Callout>

              <Callout type="danger" title="误区 2：副本越多越安全">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：过多的副本会导致：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>存储空间浪费（3 副本 = 3 倍存储成本）</li>
                  <li>写入性能下降（需要同步到更多副本）</li>
                  <li>ZooKeeper 压力增大</li>
                  <li>建议：生产环境使用 2-3 个副本即可</li>
                </ul>
              </Callout>

              <Callout type="warning" title="误区 3：ZooKeeper 不重要">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ZooKeeper 是 ClickHouse 分布式集群的核心依赖：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>ZooKeeper 不可用会导致无法创建/删除表</li>
                  <li>副本同步依赖 ZooKeeper 日志</li>
                  <li>故障检测依赖 ZooKeeper 心跳</li>
                  <li>建议：部署 3-5 个 ZooKeeper 节点，保证高可用</li>
                </ul>
              </Callout>

              <Callout type="info" title="误区 4：分布式 JOIN 性能优秀">
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  <strong>事实</strong>：ClickHouse 的分布式 JOIN 性能取决于场景：
                </p>
                <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mt-2 ml-4">
                  <li>大表 JOIN 小表：使用 GLOBAL JOIN 或字典，性能优秀</li>
                  <li>大表 JOIN 大表：需要 Shuffle，性能较差</li>
                  <li>建议在应用层预 JOIN 或使用物化视图</li>
                  <li>复杂 JOIN 场景建议使用 Apache Doris</li>
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
                  question: 'ClickHouse 分布式集群的工作原理是什么？',
                  answer: `ClickHouse 分布式集群通过以下机制实现水平扩展和高可用：

1. 分片（Sharding）：
   - 数据水平切分到多个节点
   - 通过分片键（Sharding Key）决定数据路由
   - 查询时并行执行，结果合并

2. 副本（Replication）：
   - 每个分片有多个副本（通常 2-3 个）
   - 使用 ReplicatedMergeTree 引擎
   - 通过 ZooKeeper 协调副本同步

3. ZooKeeper 协调：
   - 存储元数据（表结构、Part 信息）
   - 记录操作日志（INSERT、MERGE）
   - 故障检测和 Leader 选举
   - 分布式锁防止并发冲突

4. 分布式表：
   - 逻辑表 abstraction，屏蔽底层分片细节
   - 客户端通过分布式表访问整个集群
   - 自动路由查询到各个分片并合并结果

架构优势：
- 线性扩展：增加节点即可提升存储和计算能力
- 高可用：副本机制保证节点故障时服务不中断
- 透明访问：客户端无需关心数据分布细节`,
                },
                {
                  question: '如何避免 ClickHouse 的数据倾斜问题？',
                  answer: `数据倾斜的表现：某些分片数据量大，负载高，其他分片空闲。

解决方案：

1. 优化分片键：
   - 避免使用低区分度字段（如城市、性别）
   - 使用哈希函数均匀分布：sipHash64(user_id)
   - 添加随机因子：cityHash64(user_id, rand() % 10)

2. 监控数据分布：
   SELECT 
       _shard_num,
       count() AS row_count,
       formatReadableSize(sum(bytes_on_disk)) AS size
   FROM your_table
   GROUP BY _shard_num
   ORDER BY _shard_num;

3. 重新分片（Resharding）：
   - 导出数据
   - 修改分片键
   - 重新导入

4. 使用多层分片：
   - 第一层：粗粒度分片（如按日期）
   - 第二层：细粒度分片（如哈希）

预防优于治理：在设计阶段就要考虑数据分布的均匀性，选择合适的分片键。`,
                },
                {
                  question: 'ClickHouse 的副本同步机制是如何工作的？',
                  answer: `副本同步流程：

1. 写入主副本：
   - 客户端写入请求发送到任意副本
   - 该副本成为本次写入的主副本

2. 记录日志：
   - 主副本将写入操作记录到 ZooKeeper 的 log 节点
   - 日志包含 Part 名称、校验和等信息

3. 从副本拉取：
   - 从副本监听 ZooKeeper 日志变化
   - 发现新日志后，从主副本或其他副本拉取 Part 文件

4. 验证和注册：
   - 验证 Part 文件的完整性（校验和）
   - 将 Part 注册到本地存储

5. 确认写入：
   - 异步复制：主副本写入成功后立即返回
   - 同步复制：等待所有副本写入成功后返回（insert_quorum）

故障处理：
- ZooKeeper 通过心跳检测副本状态
- 如果主副本失效，自动选举新的主副本
- 新主副本继续处理写入请求

注意事项：
- 副本同步是异步的，可能存在短暂延迟
- 建议定期监控副本同步状态（system.replicas 表）
- 避免频繁的小 Part 写入，会增加 ZooKeeper 压力`,
                },
                {
                  question: 'ClickHouse 分布式集群和单机相比有什么优势和劣势？',
                  answer: `优势：

1. 水平扩展：
   - 存储容量：从 TB 级扩展到 PB 级
   - 计算能力：多节点并行查询，吞吐量线性提升
   - 并发能力：请求分散到多个节点，QPS 提升

2. 高可用：
   - 副本机制保证节点故障时服务不中断
   - 自动故障检测和转移
   - 数据冗余，避免单点故障

3. 灵活性：
   - 可以动态增加/删除节点
   - 支持在线扩容（需手动迁移数据）

劣势：

1. 复杂度增加：
   - 需要部署和维护 ZooKeeper 集群
   - 运维复杂度提高（监控、告警、备份）
   - 故障排查更困难

2. 性能开销：
   - 网络通信开销（跨节点数据传输）
   - 结果合并开销（协调节点需要聚合所有分片的结果）
   - ZooKeeper 成为潜在瓶颈

3. 一致性问题：
   - 异步复制可能导致数据短暂不一致
   - 分布式事务支持有限

适用场景：
- 数据量 > 10 TB
- QPS > 1000
- 需要高可用保障
- 单机资源不足`,
                },
                {
                  question: '如何监控 ClickHouse 分布式集群的健康状态？',
                  answer: `监控方法：

1. 系统表监控：
   - system.clusters：集群节点信息
   - system.replicas：副本同步状态
   - system.parts：Part 状态和分布
   - system.zookeeper：ZooKeeper 连接状态
   - system.metrics：实时指标

2. 关键指标：
   - 副本同步延迟：system.replicas.is_readonly, absolute_delay
   - Part 合并队列长度：system.metrics.MergeQueueLength
   - ZooKeeper 会话状态：system.zookeeper.root_nodes
   - 查询延迟：system.query_log.query_duration_ms
   - 节点存活状态：system.clusters.errors_count

3. 数据分布检查：
   SELECT 
       _shard_num,
       count() AS row_count,
       formatReadableSize(sum(bytes_on_disk)) AS size
   FROM your_table
   GROUP BY _shard_num
   ORDER BY _shard_num;
   -- 检查各分片数据量是否均衡

4. 告警规则：
   - 副本同步延迟 > 60s
   - Part 合并队列长度 > 100
   - ZooKeeper 连接失败
   - 节点宕机（errors_count > 0）
   - 查询延迟 P95 > 1s

5. 监控工具：
   - Prometheus + Grafana：采集和可视化指标
   - clickhouse-exporter：导出 ClickHouse 指标
   - AlertManager：发送告警通知

最佳实践：
- 建立完善的监控体系，覆盖基础设施、ClickHouse、业务三层
- 设置合理的告警阈值，避免告警疲劳
- 定期巡检集群状态，提前发现潜在问题`,
                },
                {
                  question: 'ClickHouse 分布式集群如何进行扩容？',
                  answer: `ClickHouse 不支持自动扩容，需要手动操作：

方案 1：添加新分片（推荐）

步骤：
1. 部署新节点，安装 ClickHouse
2. 更新集群配置（clusters.xml），添加新分片
3. 在新节点上创建本地表（ReplicatedMergeTree）
4. 重新创建分布式表（包含新分片）
5. 迁移历史数据（可选）：
   - 使用 INSERT INTO ... SELECT 从旧分片迁移
   - 或使用 clickhouse-copier 工具

优点：简单，不影响现有数据
缺点：历史数据不会自动迁移到新分片

方案 2：重新分片（复杂）

步骤：
1. 导出所有数据
2. 修改分片键或分片策略
3. 重新导入数据

优点：数据重新均匀分布
缺点：停机时间长，操作复杂

方案 3：使用云服务商的托管服务

- AWS MSK for ClickHouse
- Alibaba Cloud ClickHouse
- Yandex Cloud ClickHouse

优点：自动扩容，无需手动操作
缺点：成本高，锁定云厂商

最佳实践：
- 设计阶段预留足够的分片数量（如 10 个分片，初期只使用 3 个）
- 使用虚拟分片（Virtual Shard），后期可以映射到物理分片
- 定期评估数据增长趋势，提前规划扩容`,
                },
              ]}
            />
          </section>

          {/* 对比其他分布式方案 */}
          <section id="comparison" className="mb-8">
            <h2 id="comparison" className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              对比其他分布式方案
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-border text-[14px] sm:text-[15px]">
                <thead>
                  <tr className="bg-parchment-deep">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">特性</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">ClickHouse</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Apache Doris</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-ink">Elasticsearch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">分布式架构</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">分片 + 副本 + ZooKeeper</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">FE（元数据）+ BE（数据）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">分片 + 副本（无外部依赖）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">协调服务</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">ZooKeeper（外部依赖）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">内置 FE（无外部依赖）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">内置 Master（无外部依赖）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">扩容方式</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">手动（需迁移数据）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">自动（数据自动均衡）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">自动（数据自动均衡）</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">JOIN 支持</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 弱（适合大表 JOIN 小表）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 强（支持多表 JOIN）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">❌ 不支持</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">更新/删除</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⚠️ 支持但不推荐</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 支持（Unique Key）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">✅ 支持</td>
                  </tr>
                  <tr className="bg-parchment-deep/50">
                    <td className="border border-border px-4 py-2 font-medium text-ink">运维复杂度</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐⭐（高，需维护 ZK）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐（低，无外部依赖）</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">⭐⭐⭐（中）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-medium text-ink">适用场景</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">日志分析、用户行为、实时监控</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">BI 报表、即席查询、数据仓库</td>
                    <td className="border border-border px-4 py-2 text-ink-muted">全文检索、日志检索、推荐系统</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mt-4">
              <strong>选型建议</strong>：追求极致性能且能接受运维复杂度选 ClickHouse；需要简单易用和强 JOIN 能力选 Doris；全文检索场景选 Elasticsearch。
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
                <h4 className="font-semibold text-ink mb-2">⚡ ClickHouse 性能优化</h4>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted">
                  学习分区策略、物化视图、查询优化等性能调优技巧
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
