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
  { id: 'architecture-overview', text: '一、TiDB 整体架构', level: 2 },
  { id: 'tidb-server', text: '二、TiDB Server（SQL 层）', level: 2 },
  { id: 'pd-server', text: '三、PD Server（调度层）', level: 2 },
  { id: 'tikv-storage', text: '四、TiKV（存储层）', level: 2 },
  { id: 'tiflash', text: '五、TiFlash（列式存储）', level: 2 },
  { id: 'htap-architecture', text: '六、HTAP 混合负载架构', level: 2 },
  { id: 'distributed-transaction', text: '七、分布式事务实现', level: 2 },
  { id: 'mysql-compatibility', text: '八、MySQL 兼容性', level: 2 },
  { id: 'horizontal-scaling', text: '九、水平扩展能力', level: 2 },
  { id: 'misconceptions', text: '十、常见误区', level: 2 },
  { id: 'interview', text: '十一、面试真题', level: 2 },
  { id: 'related', text: '十二、知识关联', level: 2 },
]

export default function TidbArchitecture({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              TiDB 是 PingCAP 开源的<strong className="text-accent">分布式 NewSQL 数据库</strong>，采用计算存储分离架构，支持 HTAP（混合事务/分析处理），
              兼容 MySQL 协议，具备<strong>水平扩展</strong>、<strong>强一致性</strong>和<strong>高可用</strong>特性，适用于海量数据场景。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么选择 TiDB？">
            传统 MySQL 在数据量超过千万级时面临性能瓶颈，分库分表方案复杂且难以维护。TiDB 通过分布式架构自动解决扩容问题，同时保持 MySQL 兼容性，降低迁移成本。HTAP 能力让一套系统同时支持 OLTP 和 OLAP 场景，简化技术栈。
          </Callout>

          <h2 id="architecture-overview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、TiDB 整体架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB 采用<strong>计算存储分离</strong>的云原生架构，由三个核心组件组成：<strong>TiDB Server</strong>（无状态 SQL 层）、<strong>PD Server</strong>（元数据与调度层）、<strong>TiKV/TiFlash</strong>（存储层）。这种设计使得各组件可以独立扩展。
          </p>

          <DiagramBlock title="TiDB 架构全景图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌─────────────────────────────────────────────────┐
│           Client Applications                     │
│     (MySQL Protocol Compatible)                   │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          TiDB Server Layer (Stateless)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ TiDB-1   │  │ TiDB-2   │  │ TiDB-N       │  │
│  │(SQL Parse│  │(SQL Parse│  │(SQL Parse    │  │
│  │& Optimize│  │& Optimize│  │& Optimize    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│         Load Balanced (Horizontal Scaling)      │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          PD Server Layer (Metadata)              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ PD-1     │  │ PD-2     │  │ PD-3         │  │
│  │(Leader)  │  │(Follower)│  │(Follower)    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│     Raft Consensus (High Availability)          │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│        Storage Engine Layer                      │
│  ┌──────────────────────────────────────────┐   │
│  │          TiKV (Row Store)                 │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐       │   │
│  │  │Region-1│ │Region-2│ │Region-N│       │   │
│  │  │(Raft)  │ │(Raft)  │ │(Raft)  │       │   │
│  │  └────────┘ └────────┘ └────────┘       │   │
│  └──────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────┐   │
│  │        TiFlash (Column Store)             │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐       │   │
│  │  │Replica-1│ │Replica-2│ │Replica-N│      │   │
│  │  └────────┘ └────────┘ └────────┘       │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <SideNote label="云原生设计哲学">
            TiDB 的架构完全符合云原生理念：① <strong>无状态计算层</strong>（TiDB Server）可快速扩缩容；② <strong>存算分离</strong>允许独立扩展存储和计算资源；③ <strong>多租户隔离</strong>通过 Resource Group 实现；④ <strong>自动化运维</strong>由 PD 统一调度。这使得 TiDB 天然适合 Kubernetes 部署。
          </SideNote>

          <h2 id="tidb-server" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、TiDB Server（SQL 层）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB Server 是无状态的 SQL 解析和优化引擎，负责接收客户端请求、解析 SQL、生成执行计划、协调分布式事务。它<strong>不存储任何数据</strong>，所有数据操作都下推到 TiKV/TiFlash 执行。
          </p>

          <Playground
            code={`# 查看 TiDB Server 状态
SHOW STATUS LIKE 'tidb_server_info';

# 查看当前连接数
SHOW STATUS LIKE 'Threads_connected';

# 查看 SQL 执行计划（与 MySQL 兼容）
EXPLAIN SELECT * FROM users WHERE age > 18;

# 查看分布式执行计划
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 18;

# 调整 TiDB Server 配置（动态生效，无需重启）
SET GLOBAL tidb_mem_quota_query = 1073741824; -- 1GB

# 查看慢查询日志
SELECT * FROM information_schema.slow_query 
ORDER BY query_time DESC LIMIT 10;`}
            language="sql"
            highlights={[2, 5, 8, 11, 14, 17]}
            filename="tidb_server_management.sql"
            description="TiDB Server 管理命令"
          />

          <Callout type="info" title="TiDB Server 关键特性">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>MySQL 协议兼容</strong>：应用无需修改代码即可连接 TiDB，使用标准 MySQL 驱动。</li>
              <li><strong>分布式查询优化</strong>：优化器考虑数据分布，生成最优的分布式执行计划。</li>
              <li><strong>并行执行</strong>：支持 Hash Join、Sort Merge Join 等算子的并行化。</li>
              <li><strong>动态裁剪</strong>：根据分区键自动裁剪无关分区，减少扫描范围。</li>
              <li><strong>无状态设计</strong>：可通过负载均衡器（如 HAProxy）轻松水平扩展。</li>
            </ul>
          </Callout>

          <h2 id="pd-server" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、PD Server（调度层）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            PD（Placement Driver）是 TiDB 集群的<strong>大脑</strong>，负责元数据管理、全局时间戳分配、Region 调度和负载均衡。PD 基于 Raft 协议保证高可用，通常部署 3 或 5 个节点。
          </p>

          <DiagramBlock title="PD 核心功能">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
PD Server 三大职责：

1. 元数据存储（Store in etcd）
   ├─ Cluster ID
   ├─ Store 信息（TiKV/TiFlash 节点）
   ├─ Region 元数据（Range → Store 映射）
   └─ 全局配置

2. TSO（Timestamp Oracle）
   ├─ 生成全局单调递增时间戳
   ├─ 用于分布式事务的版本控制
   └─ 保证线性一致性

3. Region 调度
   ├─ 负载均衡（Balance Leader/Region）
   ├─ 故障恢复（Peer 副本迁移）
   ├─ Hot Spot 检测与缓解
   └─ 存储容量均衡

调度策略示例：
┌────────────────────────────────────┐
│ Region A: Store-1 → Store-2       │ ← Leader 迁移
│ Region B: Store-3 → Store-1       │ ← Region 迁移
│ Region C: Split into C1, C2       │ ← Region 分裂
└────────────────────────────────────┘
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 查看 PD 成员信息
pd-ctl member

# 查看集群状态
pd-ctl cluster

# 查看 Store 信息
pd-ctl store

# 查看 Region 分布
pd-ctl region

# 手动触发平衡操作
pd-ctl scheduler add balance-leader-scheduler
pd-ctl scheduler add balance-region-scheduler

# 查看热点 Region
pd-ctl hot read
pd-ctl hot write

# 查看调度历史
pd-ctl operator show`}
            language="bash"
            highlights={[2, 5, 8, 11, 14, 17, 20, 23]}
            filename="pd_management.sh"
            description="PD 集群管理命令"
          />

          <SideNote label="TSO 的重要性">
            TSO（Timestamp Oracle）是 TiDB 实现分布式事务的核心。每次事务开始时，TiDB Server 向 PD 请求一个全局唯一的时间戳，作为事务的 start_ts 和 commit_ts。这确保了跨节点事务的线性一致性，是实现 Percolator 事务模型的基础。
          </SideNote>

          <h2 id="tikv-storage" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、TiKV（存储层）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiKV 是分布式 KV 存储引擎，采用 <strong>Raft 共识算法</strong>保证数据可靠性，以 <strong>Region</strong> 为单位进行数据分片和复制。每个 Region 默认 3 副本，分布在不同的 TiKV 节点上。
          </p>

          <DiagramBlock title="TiKV 数据组织方式">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
数据分层结构：

Table → Index/Row → Key-Value → Region → Store

1. Table 编码为 Key
   t{table_id}_r{row_id}         → 行数据
   t{table_id}_i{index_id}_{idx} → 索引数据

2. Region 划分（默认 96MB）
   ┌─────────────────────────────┐
   │ Region-1: [start_key, end)  │
   │ Region-2: [end_key, end)    │
   │ ...                         │
   └─────────────────────────────┘

3. Raft Group（每个 Region 一个）
   ┌─────────────────────────────┐
   │ Leader: Store-1             │ ← 处理读写
   │ Follower: Store-2           │ ← 同步数据
   │ Follower: Store-3           │ ← 同步数据
   └─────────────────────────────┘

4. 写入流程（Raft）
   Client → Leader → Append Log → Replicate to Followers
          → Majority Ack → Apply to State Machine → Response
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 查看 TiKV 状态
tiup ctl tikv --pd=<pd-address> stores

# 查看 Region 详细信息
tiup ctl tikv --pd=<pd-address> region <region-id>

# 查看 Raft 状态
tiup ctl tikv --pd=<pd-address> raft status

# 手动分裂 Region（不推荐，PD 自动管理）
tiup ctl tikv --pd=<pd-address> region split <region-id> <key>

# 查看存储引擎统计信息
SELECT * FROM information_schema.tikv_region_status 
LIMIT 10;

# 监控 Region 大小
SELECT 
    region_id,
    start_key,
    end_key,
    approx_size,
    leader_store_id
FROM information_schema.tikv_region_status
WHERE approx_size > 100 * 1024 * 1024; -- > 100MB`}
            language="sql"
            highlights={[2, 5, 8, 11, 14, 17]}
            filename="tikv_management.sql"
            description="TiKV 存储管理"
          />

          <Callout type="warning" title="Region 分裂机制">
            TiKV 自动管理 Region 分裂：当 Region 大小超过阈值（默认 96MB）或行数过多时，PD 会触发分裂操作，将一个大 Region 拆分为两个小 Region。这个过程对应用透明，但会短暂增加元数据操作开销。避免手动干预 Region 分裂，除非有特殊需求。
          </Callout>

          <h2 id="tiflash" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、TiFlash（列式存储）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiFlash 是 TiDB 的<strong>列式存储引擎</strong>，专为 OLAP 场景优化。它通过 Raft Learner 角色从 TiKV 实时同步数据，提供 MPP（大规模并行处理）能力，加速复杂分析查询。
          </p>

          <DiagramBlock title="TiFlash 数据同步机制">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
TiKV → TiFlash 数据流：

┌──────────┐     Raft Log      ┌──────────────┐
│  TiKV    │────────────────▶│  TiFlash     │
│ (Leader) │  (Learner Role)  │ (Columnar)   │
└──────────┘                  └──────────────┘
     │                              │
     │ Row Format                   │ Column Format
     │ (Key-Value)                  │ (Delta Tree)
     ▼                              ▼
┌──────────┐                  ┌──────────────┐
│ Write    │                  │ Read         │
│ Request  │                  │ Request      │
└──────────┘                  └──────────────┘

启用 TiFlash 副本：
ALTER TABLE users SET TIFLASH REPLICA 1;

查询自动路由：
- OLTP 查询 → TiKV（行存）
- OLAP 查询 → TiFlash（列存）
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 为表添加 TiFlash 副本
ALTER TABLE orders SET TIFLASH REPLICA 1;
ALTER TABLE order_items SET TIFLASH REPLICA 2;

# 查看 TiFlash 副本状态
SELECT * FROM information_schema.tiflash_replica;

# 强制使用 TiFlash 执行查询
SELECT /*+ READ_FROM_STORAGE(TIFLASH[orders]) */ 
    o.order_id, 
    SUM(oi.amount) as total
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

# 查看执行计划（确认使用 TiFlash）
EXPLAIN SELECT /*+ READ_FROM_STORAGE(TIFLASH[orders]) */ 
    COUNT(*) FROM orders;

# 监控 TiFlash 同步进度
SELECT 
    table_name,
    replica_count,
    available,
    progress
FROM information_schema.tiflash_replica
WHERE progress < 1.0; -- 未完全同步的表`}
            language="sql"
            highlights={[2, 3, 6, 9, 16, 19, 22]}
            filename="tiflash_usage.sql"
            description="TiFlash 使用示例"
          />

          <SideNote label="MPP 并行执行">
            TiFlash 支持 MPP（Massively Parallel Processing）模式，将查询任务分发到多个 TiFlash 节点并行执行，最后汇总结果。对于大表聚合、多表 JOIN 等 OLAP 场景，MPP 可将查询速度提升 10-100 倍。通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">SET tidb_allow_mpp=ON;</code> 启用。
          </SideNote>

          <h2 id="htap-architecture" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、HTAP 混合负载架构
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            HTAP（Hybrid Transactional/Analytical Processing）是 TiDB 的核心优势之一。通过<strong>行存（TiKV）+ 列存（TiFlash）</strong>的组合，一套系统同时支持 OLTP 和 OLAP 场景，无需 ETL 和数据同步。
          </p>

          <DiagramBlock title="HTAP 工作流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
OLTP 场景（高并发事务）：
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Application│→│ TiDB     │→│  TiKV    │
│ (INSERT/  │   │ Server   │   │ (Row     │
│  UPDATE)  │   │          │   │  Store)  │
└──────────┘   └──────────┘   └──────────┘

OLAP 场景（复杂分析）：
┌──────────┐     ┌──────────┐     ┌──────────┐
│ BI Tool  │→│ TiDB     │→│ TiFlash  │
│ (SELECT  │   │ Server   │   │(Column   │
│  AGGREGATE)│  │          │   │ Store)   │
└──────────┘   └──────────┘   └──────────┘

数据实时同步：
TiKV --Raft Log--> TiFlash（毫秒级延迟）

优势：
✅ 无需 ETL 工具
✅ 数据强一致性
✅ 实时分析（秒级延迟）
✅ 简化技术栈
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 典型 HTAP 场景：实时报表

-- OLTP 交易（写入 TiKV）
INSERT INTO orders (user_id, amount, created_at) 
VALUES (1001, 299.99, NOW());

-- OLAP 分析（读取 TiFlash，自动路由）
SELECT 
    DATE(created_at) as order_date,
    COUNT(*) as order_count,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value
FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(created_at)
ORDER BY order_date;

-- 验证执行引擎
EXPLAIN ANALYZE 
SELECT COUNT(*) FROM orders;
-- 输出中查看 "store_type": "tiflash"

-- 实时监控看板查询
SELECT 
    HOUR(created_at) as hour,
    COUNT(*) as transactions,
    SUM(amount) as revenue
FROM orders
WHERE created_at >= CURDATE()
GROUP BY HOUR(created_at);`}
            language="sql"
            highlights={[3, 7, 18, 24, 28]}
            filename="htap_example.sql"
            description="HTAP 混合负载示例"
          />

          <Callout type="tip" title="HTAP 最佳实践">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>智能路由</strong>：TiDB 优化器自动判断查询类型，OLTP 走 TiKV，OLAP 走 TiFlash。</li>
              <li><strong>Hint 强制指定</strong>：使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">READ_FROM_STORAGE(TIFLASH[...])</code> 强制使用 TiFlash。</li>
              <li><strong>副本数量</strong>：TiFlash 副本数建议 ≥ 2，保证高可用和负载均衡。</li>
              <li><strong>同步延迟监控</strong>：通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">information_schema.tiflash_replica</code> 监控同步进度。</li>
              <li><strong>资源隔离</strong>：使用 Resource Group 限制 OLAP 查询的资源占用，避免影响 OLTP。</li>
            </ul>
          </Callout>

          <h2 id="distributed-transaction" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、分布式事务实现
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB 基于 Google Percolator 模型实现分布式事务，通过 <strong>两阶段提交（2PC）</strong>和 <strong>乐观锁</strong>保证 ACID 特性。事务协调由 TiDB Server 完成，数据一致性由 PD 的 TSO 保证。
          </p>

          <DiagramBlock title="Percolator 事务模型">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
事务提交流程（2PC + Optimistic Locking）：

Phase 1: Prewrite（预写）
┌────────────────────────────────────┐
│ TiDB Server                        │
│ 1. 获取 start_ts from PD (TSO)     │
│ 2. 检查写冲突（Check Write Conflicts）│
│ 3. 写入 Lock CF（锁定键值对）       │
│ 4. 写入 Data CF（实际数据）         │
│ 5. 等待所有 Primary Key 预写成功    │
└────────────────────────────────────┘
              │
              │ All Prewrite Success
              ▼
Phase 2: Commit（提交）
┌────────────────────────────────────┐
│ TiDB Server                        │
│ 1. 获取 commit_ts from PD (TSO)    │
│ 2. 清除 Lock CF（释放锁）           │
│ 3. 写入 Write CF（标记已提交）      │
│ 4. 异步清理旧版本（GC）             │
└────────────────────────────────────┘

冲突检测：
- 读-写冲突：Reader 检测到未提交的 Lock，等待或回滚
- 写-写冲突：Prewrite 时发现已有 Lock，后发起者回滚
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 分布式事务示例

START TRANSACTION;

-- 转账操作（跨行更新）
UPDATE accounts SET balance = balance - 100 
WHERE user_id = 1001;

UPDATE accounts SET balance = balance + 100 
WHERE user_id = 1002;

-- 插入交易记录
INSERT INTO transactions (from_user, to_user, amount, created_at)
VALUES (1001, 1002, 100, NOW());

COMMIT;

# 查看事务信息
SELECT * FROM information_schema.tidb_trx;

# 查看锁等待情况
SELECT * FROM information_schema.data_lock_waits;

# 调整事务超时时间（默认 1 小时）
SET GLOBAL tidb_txn_mode = 'optimistic';
SET GLOBAL innodb_lock_wait_timeout = 50;

# 悲观锁模式（适用于高冲突场景）
SET tidb_txn_mode = 'pessimistic';
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1001 FOR UPDATE;
COMMIT;`}
            language="sql"
            highlights={[3, 6, 9, 12, 16, 19, 22, 25, 28, 31]}
            filename="distributed_transaction.sql"
            description="分布式事务示例"
          />

          <SideNote label="乐观锁 vs 悲观锁">
            TiDB 默认使用<strong>乐观锁</strong>（Optimistic），假设冲突概率低，提交时检测冲突。适用于读多写少场景。<strong>悲观锁</strong>（Pessimistic）在读取时就加锁，适用于高冲突场景（如秒杀）。通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">SET tidb_txn_mode = 'pessimistic';</code> 切换。
          </SideNote>

          <h2 id="mysql-compatibility" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、MySQL 兼容性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB 高度兼容 MySQL 协议和语法，大多数应用无需修改代码即可迁移。但仍有一些差异需要注意，特别是在存储过程、触发器、外键等高级特性方面。
          </p>

          <Playground
            code={`# 完全兼容的功能
✅ MySQL 协议（使用 mysql 客户端连接）
✅ 标准 SQL 语法（SELECT/INSERT/UPDATE/DELETE）
✅ 事务（ACID、隔离级别）
✅ 索引（B+Tree、唯一索引、联合索引）
✅ 视图（View）
✅ 预编译语句（Prepared Statement）
✅ 字符集和排序规则（UTF8MB4）

# 部分兼容的功能
⚠️ 存储过程（支持但不完善）
⚠️ 触发器（支持但不推荐使用）
⚠️ 外键（语法支持但不强制执行）
⚠️ 全文索引（TiFlash 支持，TiKV 不支持）

# 不支持的功能
❌ 游标（Cursor）
❌ 自定义函数（UDF）
❌ 事件调度器（Event Scheduler）
❌ MyISAM 引擎（仅 InnoDB）

# 验证兼容性
SELECT VERSION(); -- 返回 TiDB 版本，模拟 MySQL 格式
SELECT @@sql_mode; -- 查看 SQL 模式

# 迁移前检查工具
tiup bench ddl --threads=16 --tables=100 --rows=10000`}
            language="sql"
            highlights={[2, 9, 12, 17, 22, 25, 28]}
            filename="mysql_compatibility.sql"
            description="MySQL 兼容性检查"
          />

          <Callout type="warning" title="迁移注意事项">
            从 MySQL 迁移到 TiDB 时：① 使用 <strong>Dumpling + Lightning</strong> 工具链进行全量迁移；② 使用 <strong>DM（Data Migration）</strong> 进行增量同步；③ 测试存储过程和触发器是否正常工作；④ 评估外键约束是否需要应用层实现；⑤ 调整连接池配置（TiDB 无状态，可承受更多连接）。
          </Callout>

          <h2 id="horizontal-scaling" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、水平扩展能力
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB 的核心优势是<strong>在线水平扩展</strong>，无需停机即可增加节点，PD 自动重新平衡数据。这与传统 MySQL 分库分表方案形成鲜明对比。
          </p>

          <DiagramBlock title="扩容流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
扩容前（3 个 TiKV 节点）：
┌────────────────────────────────────┐
│ Store-1: Region-1, Region-4        │
│ Store-2: Region-2, Region-5        │
│ Store-3: Region-3, Region-6        │
└────────────────────────────────────┘

添加新节点 Store-4：
tiup cluster scale-out tidb-cluster tikv.yml

PD 自动调度（后台进行，对应用透明）：
┌────────────────────────────────────┐
│ Store-1: Region-1, Region-4        │
│ Store-2: Region-2                  │ ← Region-5 迁移
│ Store-3: Region-3                  │ ← Region-6 迁移
│ Store-4: Region-5, Region-6        │ ← 新节点接收
└────────────────────────────────────┘

扩容优势：
✅ 无需停机
✅ 自动数据迁移
✅ 负载均衡
✅ 线性扩展（性能随节点数增长）
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 扩容 TiKV 节点

# 1. 准备新节点的配置文件（tikv-new.yml）
cat > tikv-new.yml << EOF
tikv_servers:
  - host: 192.168.1.104
    ssh_port: 22
    port: 20160
    status_port: 20180
    deploy_dir: /tidb-deploy/tikv-20160
    data_dir: /tidb-data/tikv-20160
EOF

# 2. 执行扩容命令
tiup cluster scale-out tidb-cluster tikv-new.yml

# 3. 监控扩容进度
tiup cluster display tidb-cluster

# 4. 查看 Region 分布（PD 自动平衡）
pd-ctl store

# 5. 验证性能提升
sysbench oltp_read_write \
  --mysql-host=192.168.1.100 \
  --mysql-port=4000 \
  --tables=10 \
  --table-size=1000000 \
  --time=60 \
  run

# 缩容节点（反向操作）
tiup cluster scale-in tidb-cluster --node 192.168.1.103:20160`}
            language="bash"
            highlights={[2, 15, 18, 21, 24, 33]}
            filename="scaling_operations.sh"
            description="TiDB 扩缩容操作"
          />

          <SideNote label="弹性伸缩最佳实践">
            在 Kubernetes 环境中，TiDB Operator 支持基于 CPU/内存使用率的<strong>自动扩缩容</strong>（HPA）。设置合理的阈值（如 CPU {'>'} 70% 扩容，CPU {'<'} 30% 缩容），结合 Prometheus 监控实现真正的云原生弹性。注意缩容前确保数据已迁移完毕，PD 会自动处理。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、常见误区
          </h2>

          <Callout type="danger" title="误区 1：TiDB 是 MySQL 的分叉版本">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 是基于 MySQL 源码修改的。</p>
            <p><strong>正确理解</strong>：TiDB 是<strong>完全重写</strong>的分布式数据库，仅兼容 MySQL 协议和语法。内部架构（Raft、Percolator、MVCC）与 MySQL 完全不同。这意味着 TiDB 可以享受分布式优势，但也失去了 MySQL 的一些高级特性（如存储过程、触发器）。
</p>
          </Callout>

          <Callout type="danger" title="误区 2：TiDB 适合所有场景">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 可以替代所有 MySQL 场景。</p>
            <p><strong>正确理解</strong>：TiDB 最适合<strong>海量数据</strong>（TB 级）、<strong>高并发写入</strong>、<strong>实时分析</strong>场景。对于小数据量（GB 级）、简单查询的应用，单机 MySQL 性能更好且成本更低。避免过度工程化。
</p>
          </Callout>

          <Callout type="danger" title="误区 3：TiDB 不需要索引优化">
            <p className="mb-2"><strong>错误认知</strong>：分布式数据库自动优化查询，无需关心索引。</p>
            <p><strong>正确理解</strong>：TiDB 同样需要合理的索引设计。缺少索引会导致全表扫描，在分布式环境下代价更高（跨节点网络传输）。使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">EXPLAIN ANALYZE</code> 分析执行计划，确保索引被正确使用。
</p>
          </Callout>

          <Callout type="warning" title="误区 4：TiFlash 可以完全替代 TiKV">
            <p className="mb-2"><strong>错误认知</strong>：启用 TiFlash 后就不再需要 TiKV。</p>
            <p><strong>正确理解</strong>：TiFlash 是 TiKV 的<strong>补充</strong>而非替代。TiKV 负责 OLTP 事务（行存），TiFlash 负责 OLAP 分析（列存）。两者通过 Raft 同步，缺一不可。删除 TiKV 会导致事务无法执行。
</p>
          </Callout>

          <Callout type="warning" title="误区 5：TiDB 的事务性能与 MySQL 相同">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 兼容 MySQL，所以事务性能也一样。</p>
            <p><strong>正确理解</strong>：TiDB 的分布式事务涉及跨节点协调（2PC、TSO 请求），单次事务延迟略高于单机 MySQL（约 2-5ms vs 1ms）。但 TiDB 的<strong>吞吐量</strong>可通过横向扩展线性增长，适合高并发场景。对于低延迟敏感的场景，需评估是否接受额外开销。
</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "TiDB 的整体架构是什么？各组件的职责是什么？",
              answer: "TiDB 采用计算存储分离架构，包含三个核心组件：① TiDB Server（无状态 SQL 层）：负责 SQL 解析、优化、分布式事务协调，兼容 MySQL 协议；② PD Server（调度层）：基于 Raft 实现高可用，负责元数据管理、TSO 时间戳分配、Region 调度和负载均衡；③ TiKV/TiFlash（存储层）：TiKV 是行式存储，基于 Raft 保证数据可靠性，负责 OLTP 事务；TiFlash 是列式存储，通过 Raft Learner 从 TiKV 同步数据，负责 OLAP 分析。三者可独立水平扩展。"
            },
            {
              question: "TiDB 如何实现分布式事务？",
              answer: "TiDB 基于 Google Percolator 模型实现分布式事务，采用两阶段提交（2PC）+ 乐观锁。流程：① TiDB Server 从 PD 获取 start_ts（TSO）；② Prewrite 阶段：检查写冲突，写入 Lock CF 和 Data CF；③ 所有 Primary Key 预写成功后，TiDB Server 从 PD 获取 commit_ts；④ Commit 阶段：清除 Lock CF，写入 Write CF 标记提交，异步 GC 清理旧版本。冲突检测通过检查 Lock CF 实现，读-写冲突时 Reader 等待或回滚，写-写冲突时后发起者回滚。"
            },
            {
              question: "TiDB 的 HTAP 能力是如何实现的？",
              answer: "TiDB 通过 TiKV（行存）+ TiFlash（列存）实现 HTAP。TiKV 负责 OLTP 事务，TiFlash 通过 Raft Learner 角色从 TiKV 实时同步数据（毫秒级延迟），转换为列式存储格式。TiDB 优化器根据查询类型自动路由：OLTP 查询（点查、短事务）走 TiKV，OLAP 查询（聚合、多表 JOIN）走 TiFlash。TiFlash 支持 MPP 并行执行，将查询任务分发到多个节点并行处理，加速复杂分析查询。优势是无需 ETL、数据强一致性、实时分析。"
            },
            {
              question: "TiDB 如何保证数据一致性？",
              answer: "TiDB 通过多层机制保证一致性：① Raft 共识算法：每个 Region 有 3 副本，写入需多数派（≥2）确认，保证副本间一致性；② TSO（Timestamp Oracle）：PD 生成全局单调递增时间戳，作为事务的 start_ts 和 commit_ts，保证线性一致性；③ Percolator 事务模型：2PC + 乐观锁，提交时检测冲突，确保 ACID；④ MVCC：通过多版本控制实现快照隔离，读写不阻塞；⑤ WAL（Write-Ahead Logging）：先写 Raft Log 再应用状态机，保证崩溃恢复。"
            },
            {
              question: "TiDB 的水平扩展机制是什么？扩容时数据如何迁移？",
              answer: "TiDB 以 Region 为单位进行数据分片（默认 96MB），每个 Region 有 3 副本分布在不同的 TiKV 节点。扩容时：① 添加新 TiKV 节点，注册到 PD；② PD 检测到负载不均，触发 Balance Region 调度器；③ PD 选择源节点上的 Region，发起 Leader Transfer 或 Peer Add 操作；④ 新节点通过 Raft Snapshot 或 Incremental Sync 接收数据；⑤ 数据同步完成后，PD 更新元数据，流量逐步切换到新节点。整个过程对应用透明，无需停机。"
            },
            {
              question: "TiDB 与 MySQL 的主要区别是什么？何时选择 TiDB？",
              answer: "主要区别：① 架构：MySQL 是单机/主从架构，TiDB 是分布式计算存储分离架构；② 扩展性：MySQL 需手动分库分表，TiDB 自动水平扩展；③ 事务：MySQL 单机事务性能好，TiDB 分布式事务有额外开销但吞吐量大；④ HTAP：TiDB 内置 TiFlash 支持实时分析，MySQL 需额外搭建 OLAP 系统；⑤ 兼容性：TiDB 兼容 MySQL 协议但不支持存储过程、触发器等高级特性。选择 TiDB 的场景：数据量 TB 级、高并发写入、实时分析需求、希望简化技术栈。小数据量、低并发场景仍推荐 MySQL。"
            },
            {
              question: "TiDB 的 PD 组件有什么作用？为什么需要 Raft？",
              answer: "PD（Placement Driver）是 TiDB 集群的大脑，负责：① 元数据管理：存储集群拓扑、Region 分布、Store 信息（基于 etcd）；② TSO 服务：生成全局唯一单调递增时间戳，用于分布式事务的版本控制；③ Region 调度：负载均衡、故障恢复、热点检测、存储容量均衡。PD 使用 Raft 协议保证高可用：通常部署 3 或 5 个节点，选举一个 Leader 处理请求，Follower 同步数据。Leader 故障时自动选举新 Leader，确保集群元数据服务不中断。TSO 必须由 Leader 生成，保证时间戳的全局有序性。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/mysql/mysql-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">MySQL 架构与存储引擎</div>
              <div className="text-[12px] text-ink-muted mt-1">理解传统关系型数据库架构</div>
            </a>
            <a href="/docs/tidb/tidb-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">深入学习 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">TiDB 性能调优与实践</div>
              <div className="text-[12px] text-ink-muted mt-1">执行计划、索引优化、统计信息</div>
            </a>
            <a href="/docs/tidb/tidb-vs-mysql" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">对比学习 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">TiDB vs MySQL 选型指南</div>
              <div className="text-[12px] text-ink-muted mt-1">技术选型、迁移策略、场景对比</div>
            </a>
            <a href="/docs/clickhouse/clickhouse-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关技术 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">ClickHouse 架构与原理</div>
              <div className="text-[12px] text-ink-muted mt-1">列式存储、OLAP 数据库对比</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            TiDB 架构是理解分布式数据库的基础。建议按以下顺序深入：① 掌握三层架构（TiDB Server、PD、TiKV/TiFlash）的职责和交互；② 理解 Raft 共识算法在数据一致性中的作用；③ 学习 Percolator 分布式事务模型；④ 实践 HTAP 场景，体验 TiFlash 的 OLAP 能力；⑤ 通过 tiup 工具进行集群部署和扩缩容操作。理论结合实践才能真正掌握分布式数据库的精髓。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
