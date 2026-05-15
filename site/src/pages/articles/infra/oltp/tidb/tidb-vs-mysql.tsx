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
  { id: 'feature-comparison', text: '二、功能特性对比', level: 2 },
  { id: 'performance-comparison', text: '三、性能对比', level: 2 },
  { id: 'scenario-selection', text: '四、场景选型指南', level: 2 },
  { id: 'migration-strategy', text: '五、迁移策略', level: 2 },
  { id: 'cost-analysis', text: '六、成本分析', level: 2 },
  { id: 'case-studies', text: '七、典型案例', level: 2 },
  { id: 'misconceptions', text: '八、常见误区', level: 2 },
  { id: 'interview', text: '九、面试真题', level: 2 },
  { id: 'related', text: '十、知识关联', level: 2 },
]

export default function TidbVsMysql({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              TiDB 与 MySQL 的选型决策应基于<strong className="text-accent">数据规模</strong>、<strong>并发需求</strong>、<strong>业务场景</strong>综合评估：MySQL 适合中小规模 OLTP，TiDB 适合海量数据、高并发、HTAP 混合负载场景。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么需要对比选型？">
            很多团队在技术选型时容易陷入两个极端：要么盲目追求新技术（"TiDB 一定比 MySQL 好"），要么过度保守（"MySQL 够用就行"）。正确的做法是根据业务特点、数据规模、团队技术栈、运维能力等因素综合评估，选择最适合的方案。本文提供系统化的对比维度和选型指南。
          </Callout>

          <h2 id="architecture-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、架构对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB 和 MySQL 的架构设计哲学完全不同：MySQL 采用单机/主从架构，强调简单可靠；TiDB 采用分布式计算存储分离架构，强调水平扩展和高可用。
          </p>

          <DiagramBlock title="架构对比图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
MySQL 架构（主从复制）：
┌──────────┐     ┌──────────┐
│ Master   │────▶│ Slave-1  │
│ (RW)     │     │ (RO)     │
└──────────┘     └──────────┘
       │         ┌──────────┐
       └────────▶│ Slave-2  │
                 │ (RO)     │
                 └──────────┘
特点：简单、成熟、单点瓶颈

TiDB 架构（分布式）：
┌──────────┐  ┌──────────┐  ┌──────────┐
│ TiDB-1   │  │ TiDB-2   │  │ TiDB-N   │ ← 无状态 SQL 层
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │
     └─────────────┼─────────────┘
                   │
          ┌────────▼────────┐
          │  PD Cluster     │ ← 元数据与调度
          └────────┬────────┘
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ TiKV-1   │ │ TiKV-2   │ │ TiKV-N   │ ← 分布式存储
└──────────┘ └──────────┘ └──────────┘
特点：复杂、可扩展、自动负载均衡
            `}</pre>
          </DiagramBlock>

          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">维度</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">MySQL</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">TiDB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">架构类型</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">单机 / 主从复制</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">分布式（计算存储分离）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">扩展方式</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">垂直扩展（升级硬件）或分库分表</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">水平扩展（添加节点）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">高可用</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">主从切换（MHA、Orchestrator）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">Raft 多副本（自动故障恢复）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">数据一致性</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">主从异步/半同步复制（可能延迟）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">强一致性（Raft 多数派确认）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">事务模型</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">单机 ACID 事务</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">分布式事务（Percolator + 2PC）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">HTAP 能力</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">❌ 不支持（需额外搭建 OLAP 系统）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 内置 TiFlash（行存+列存）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SideNote label="架构演进趋势">
            传统 MySQL 架构在数据量增长到 TB 级时面临瓶颈，常见的演进路径是：① 垂直扩展（升级 CPU、内存、SSD）；② 读写分离（主从架构）；③ 分库分表（ShardingSphere、MyCat）；④ 迁移到分布式数据库（TiDB、OceanBase）。每一步都增加了系统复杂度，而 TiDB 从设计上就解决了扩展性问题，避免了分库分表的痛苦。
          </SideNote>

          <h2 id="feature-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、功能特性对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            TiDB 高度兼容 MySQL 协议，但在高级特性上有所取舍。了解功能差异有助于评估迁移成本和适用性。
          </p>

          <Playground
            code={`# 兼容性测试示例

-- ✅ 完全兼容的功能
SELECT * FROM users WHERE id = 1; -- 标准 SQL
START TRANSACTION; COMMIT; -- 事务
CREATE INDEX idx_name ON users(name); -- 索引
CREATE VIEW user_view AS SELECT * FROM users; -- 视图

-- ⚠️ 部分兼容的功能
DELIMITER // -- 存储过程（TiDB 支持但不完善）
CREATE PROCEDURE proc_test()
BEGIN
  SELECT COUNT(*) FROM users;
END //
DELIMITER ;

-- ❌ 不支持的功能
CREATE TRIGGER trg_before_insert -- 触发器（不推荐使用）
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  SET NEW.created_at = NOW();
END;

CREATE EVENT evt_cleanup -- 事件调度器
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

# 验证兼容性
SELECT VERSION(); -- TiDB 返回类似 "5.7.25-TiDB-v6.5.0"
SELECT @@sql_mode; -- 查看 SQL 模式`}
            language="sql"
            highlights={[4, 7, 10, 13, 17, 24, 30, 34]}
            filename="compatibility_test.sql"
            description="功能兼容性测试"
          />

          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">功能</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">MySQL</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">TiDB</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">影响</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">MySQL 协议</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 原生支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 完全兼容</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">应用无需修改驱动</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">ACID 事务</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 完整支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 完整支持（分布式）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">无影响</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">存储过程</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 完善支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">⚠️ 基础支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">复杂逻辑需重构</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">触发器</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">⚠️ 不推荐</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">需在应用层实现</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">外键约束</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 强制执行</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">⚠️ 语法支持但不执行</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">需在应用层保证一致性</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">全文索引</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ InnoDB 支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">⚠️ 仅 TiFlash 支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">建议使用 Elasticsearch</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">地理空间索引</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 完善支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">⚠️ 基础支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">GIS 场景需谨慎评估</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">在线 DDL</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">⚠️ 部分支持（pt-osc）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">✅ 原生支持</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">TiDB 更优</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="warning" title="迁移前的功能审计">
            从 MySQL 迁移到 TiDB 前，务必进行功能审计：① 扫描所有存储过程和触发器，评估重构工作量；② 检查外键约束是否在应用层有对应逻辑；③ 验证全文索引是否可替换为 Elasticsearch；④ 测试 GIS 功能是否满足需求；⑤ 评估自定义函数（UDF）是否有替代方案。PingCAP 提供的 <strong>TiDB Migration Tool</strong> 可自动检测不兼容项。
          </Callout>

          <h2 id="performance-comparison" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、性能对比
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            性能对比需要分场景讨论：MySQL 在单机 OLTP 场景下延迟更低，TiDB 在高并发和海量数据场景下吞吐量更大。没有绝对的优劣，只有适合的场景。
          </p>

          <DiagramBlock title="性能对比矩阵">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
场景                    | MySQL      | TiDB       | 说明
------------------------|------------|------------|------------------
点查（WHERE id = ?）     | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐    | MySQL 延迟更低（1ms vs 2-5ms）
范围查询（索引扫描）      | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐    | 相近，TiDB 略高（跨节点）
复杂 JOIN（多表关联）     | ⭐⭐⭐      | ⭐⭐⭐⭐⭐  | TiDB 并行执行优势明显
聚合查询（COUNT/SUM）    | ⭐⭐⭐      | ⭐⭐⭐⭐⭐  | TiFlash MPP 加速 10-100 倍
高并发写入（{'>'}10K QPS）  | ⭐⭐⭐      | ⭐⭐⭐⭐⭐  | TiDB 水平扩展能力强
批量导入（百万级）        | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐  | TiDB Lightning 极速导入
大表扫描（全表）          | ⭐⭐        | ⭐⭐⭐⭐⭐  | TiFlash 列式存储优势
事务冲突（高竞争）        | ⭐⭐⭐⭐    | ⭐⭐⭐      | TiDB 分布式锁开销较大
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 性能基准测试示例（使用 sysbench）

# MySQL 测试
sysbench oltp_read_write \
  --mysql-host=192.168.1.100 \
  --mysql-port=3306 \
  --mysql-user=root \
  --mysql-password=password \
  --tables=10 \
  --table-size=1000000 \
  --time=60 \
  --threads=32 \
  run

# TiDB 测试
sysbench oltp_read_write \
  --mysql-host=192.168.1.200 \
  --mysql-port=4000 \
  --mysql-user=root \
  --mysql-password= \
  --tables=10 \
  --table-size=1000000 \
  --time=60 \
  --threads=32 \
  run

# 典型结果对比（仅供参考）：
# MySQL（单机，32 线程）：
#   TPS: 5000, QPS: 100000, 平均延迟: 6ms
# TiDB（3 节点，32 线程）：
#   TPS: 8000, QPS: 160000, 平均延迟: 8ms
# 
# 结论：TiDB 吞吐量更高，但单次查询延迟略高`}
            language="bash"
            highlights={[4, 17, 30]}
            filename="performance_benchmark.sh"
            description="性能基准测试"
          />

          <SideNote label="延迟 vs 吞吐量">
            选择数据库时需要权衡<strong>延迟</strong>和<strong>吞吐量</strong>：① 低延迟敏感场景（如金融交易、实时竞价）：MySQL 单机延迟更低（1-2ms），适合对响应时间要求极高的场景；② 高吞吐场景（如电商大促、社交网络）：TiDB 可通过横向扩展支撑更高并发（10 万+ QPS），适合流量峰值明显的业务；③ HTAP 场景：TiDB 一套系统同时支持 OLTP 和 OLAP，简化架构，降低运维成本。
          </SideNote>

          <h2 id="scenario-selection" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、场景选型指南
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            根据业务场景选择合适的数据库是关键。以下提供系统化的选型决策树和具体建议。
          </p>

          <DiagramBlock title="选型决策树">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
开始
 │
 ├─ 数据量 {'<'} 100GB？
 │   ├─ 是 → MySQL（单机足够，成本低）
 │   └─ 否 ↓
 │
 ├─ 是否需要实时分析（OLAP）？
 │   ├─ 是 → TiDB（HTAP 能力）
 │   └─ 否 ↓
 │
 ├─ 预期 QPS {'>'} 10000？
 │   ├─ 是 → TiDB（水平扩展）
 │   └─ 否 ↓
 │
 ├─ 是否需要强一致性？
 │   ├─ 是 → TiDB（Raft 保证）
 │   └─ 否 ↓
 │
 ├─ 团队是否有分布式数据库运维经验？
 │   ├─ 是 → TiDB
 │   └─ 否 → MySQL（学习成本低）
 │
 └─ 是否计划上云或使用 Kubernetes？
     ├─ 是 → TiDB（云原生设计）
     └─ 否 → MySQL
            `}</pre>
          </DiagramBlock>

          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">场景</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">推荐方案</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">小型应用（博客、CMS）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">MySQL</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">数据量小，MySQL 简单可靠，运维成本低</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">电商平台（中等规模）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">MySQL + 读写分离</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">读多写少，主从架构可满足，成本低</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">大型电商（双 11 级别）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">TiDB</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">高并发、海量数据、需弹性扩容</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">金融核心交易系统</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">MySQL（或 TiDB）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">MySQL 成熟稳定；TiDB 强一致性，需评估延迟</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">实时数仓 / BI 分析</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">TiDB + TiFlash</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">HTAP 能力，无需 ETL，实时分析</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">日志存储 / 监控数据</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">TiDB 或 ClickHouse</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">TiDB 支持 SQL 查询；ClickHouse 写入性能更强</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">游戏服务器（全球同服）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">TiDB</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">跨地域部署、水平扩展、高可用</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">IoT 设备数据存储</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">TiDB</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">海量时序数据、高并发写入、自动扩缩容</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="info" title="混合架构方案">
            不是非此即彼的选择，可以采用混合架构：① <strong>核心交易用 MySQL</strong>，保证低延迟和稳定性；② <strong>订单历史、用户行为用 TiDB</strong>，利用其扩展性和 HTAP 能力；③ 通过 <strong>CDC（Change Data Capture）</strong>工具（如 TiDB DM、Canal）实现 MySQL → TiDB 的数据同步；④ 分析查询走 TiDB，交易查询走 MySQL，各司其职。这种方案兼顾性能和灵活性，适合中大型企业。
          </Callout>

          <h2 id="migration-strategy" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、迁移策略
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            从 MySQL 迁移到 TiDB 需要周密的计划和测试。PingCAP 提供了完整的迁移工具链，支持全量迁移、增量同步、数据校验等功能。
          </p>

          <DiagramBlock title="迁移流程">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
迁移步骤：

1. 评估阶段
   ├─ 功能兼容性检查（存储过程、触发器、外键）
   ├─ 性能基准测试（对比 MySQL 和 TiDB）
   └─ 制定迁移计划（时间表、回滚方案）

2. 准备阶段
   ├─ 部署 TiDB 集群（测试环境）
   ├─ 安装迁移工具（Dumpling、Lightning、DM）
   └─ 创建目标库表结构

3. 全量迁移
   ├─ 使用 Dumpling 导出 MySQL 数据
   ├─ 使用 Lightning 导入 TiDB（极速模式）
   └─ 数据校验（checksum 对比）

4. 增量同步
   ├─ 配置 DM 任务（监听 MySQL Binlog）
   ├─ 实时同步变更到 TiDB
   └─ 监控同步延迟（保持 {'<'} 1s）

5. 切换阶段
   ├─ 停止应用写入 MySQL
   ├─ 等待 DM 同步完成（延迟为 0）
   ├─ 切换应用连接指向 TiDB
   └─ 验证业务功能正常

6. 观察阶段
   ├─ 监控 TiDB 性能指标（QPS、延迟、错误率）
   ├─ 保留 MySQL 作为备份（1-2 周）
   └─ 确认无问题后下线 MySQL
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`# 全量迁移示例（Dumpling + Lightning）

# 1. 使用 Dumpling 导出 MySQL 数据
dumpling \
  --host 192.168.1.100 \
  --port 3306 \
  --user root \
  --password 'password' \
  --database test_db \
  --output /data/dumpling_output \
  --threads 16 \
  --rows 10000

# 2. 使用 Lightning 导入 TiDB（物理导入模式，最快）
tiup tidb-lightning \
  --config lightning.toml

# lightning.toml 配置示例：
# [lightning]
# level = "info"
# file = "lightning.log"
# 
# [tikv-importer]
# backend = "local"  # 物理导入模式
# sorted-kv-dir = "/tmp/sorted-kv"
# 
# [mydumper]
# data-source-dir = "/data/dumpling_output"
# 
# [tidb]
# host = "192.168.1.200"
# port = 4000
# user = "root"
# password = ""

# 3. 数据校验
tiup bench checksum \
  --source-db mysql \
  --target-db tidb \
  --database test_db

# 4. 配置 DM 增量同步
# dm-task.yaml 配置示例：
# name: mysql-to-tidb
# task-mode: all
# target-database:
#   host: 192.168.1.200
#   port: 4000
#   user: root
# mysql-instances:
#   - source-id: mysql-source
#     block-allow-list: instance
# block-allow-list:
#   instance:
#     do-dbs: ["test_db"]

# 启动 DM 任务
tiup dmctl start-task dm-task.yaml

# 监控同步状态
tiup dmctl query-status mysql-to-tidb`}
            language="bash"
            highlights={[4, 14, 38, 48, 62]}
            filename="migration_workflow.sh"
            description="MySQL 到 TiDB 迁移流程"
          />

          <SideNote label="迁移风险控制">
            迁移过程中最大的风险是<strong>数据不一致</strong>和<strong>业务中断</strong>。控制措施：① 全量迁移后进行 checksum 校验，确保数据完整；② 增量同步阶段持续监控延迟，确保追平后再切换；③ 切换前进行灰度测试（10% 流量切到 TiDB）；④ 保留 MySQL 作为热备，出现问题可快速回滚；⑤ 选择在业务低峰期（如凌晨）执行切换；⑥ 提前准备回滚预案（切换 DNS 或修改配置回到 MySQL）。
          </SideNote>

          <h2 id="cost-analysis" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、成本分析
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            成本不仅包括软件许可费用，还包括硬件、运维、人力等隐性成本。TiDB 开源免费，但需要更多节点；MySQL 简单但可能需要昂贵的商业版或分库分表中间件。
          </p>

          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">成本项</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">MySQL</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">TiDB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">软件许可</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">社区版免费；企业版 $5000+/年</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">开源免费（Apache 2.0）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">硬件成本</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">单机高性能服务器（CPU、内存、SSD）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">多节点普通服务器（至少 3 PD + 3 TiKV + 2 TiDB）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">运维复杂度</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">低（成熟工具链，文档丰富）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">中（需学习分布式概念，工具链较新）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">人力成本</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">低（MySQL DBA 普遍）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">中（TiDB 专家较少，薪资较高）</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">扩展成本</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">高（分库分表开发和维护成本高）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">低（添加节点即可，自动平衡）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">存储成本</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">较低（单副本，可选压缩）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink">较高（3 副本，但支持压缩和 TiFlash）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="TCO（总拥有成本）对比">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>小规模场景（{'<'}100GB）</strong>：MySQL TCO 更低，硬件投入少，运维简单。</li>
              <li><strong>中规模场景（100GB-1TB）</strong>：两者相当，MySQL 需考虑分库分表成本，TiDB 需考虑多节点硬件成本。</li>
              <li><strong>大规模场景（{'>'}1TB）</strong>：TiDB TCO 更低，避免分库分表的开发和运维成本，线性扩展能力强。</li>
              <li><strong>HTAP 场景</strong>：TiDB 显著降低成本，无需额外搭建 OLAP 系统（如 Hadoop、Spark），一套系统搞定。</li>
              <li><strong>云环境</strong>：TiDB 云原生设计更适合 Kubernetes，可利用云的弹性伸缩进一步降低成本。</li>
            </ul>
          </Callout>

          <h2 id="case-studies" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、典型案例
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            以下是真实世界中从 MySQL 迁移到 TiDB 的典型案例，涵盖不同行业和场景。
          </p>

          <div className="space-y-4 my-5">
            <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
              <h3 className="font-semibold text-ink mb-2">案例 1：某电商平台（双 11 大促）</h3>
              <p className="text-[14px] text-ink-muted mb-2"><strong>背景</strong>：日均订单 100 万，双 11 峰值 QPS 5 万，MySQL 分库分表维护困难。</p>
              <p className="text-[14px] text-ink-muted mb-2"><strong>方案</strong>：迁移到 TiDB，使用 10 个 TiKV 节点 + 4 个 TiDB Server。</p>
              <p className="text-[14px] text-ink-muted"><strong>效果</strong>：双 11 期间平稳支撑 10 万 QPS，无需手动分片，扩容操作简单。实时报表通过 TiFlash 加速，查询速度提升 50 倍。</p>
            </div>

            <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
              <h3 className="font-semibold text-ink mb-2">案例 2：某金融机构（核心交易系统）</h3>
              <p className="text-[14px] text-ink-muted mb-2"><strong>背景</strong>：对数据一致性要求极高，MySQL 主从切换存在数据丢失风险。</p>
              <p className="text-[14px] text-ink-muted mb-2"><strong>方案</strong>：采用 TiDB，利用 Raft 强一致性保证，部署跨机房多副本。</p>
              <p className="text-[14px] text-ink-muted"><strong>效果</strong>：实现 RPO = 0（零数据丢失），RTO {'<'} 30s（快速故障恢复）。事务延迟从 MySQL 的 1ms 增加到 3ms，但在可接受范围内。</p>
            </div>

            <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
              <h3 className="font-semibold text-ink mb-2">案例 3：某游戏公司（全球同服）</h3>
              <p className="text-[14px] text-ink-muted mb-2"><strong>背景</strong>：玩家数据快速增长，MySQL 单表突破 5 亿行，查询性能下降。</p>
              <p className="text-[14px] text-ink-muted mb-2"><strong>方案</strong>：迁移到 TiDB，利用其水平扩展能力，按地域部署集群。</p>
              <p className="text-[14px] text-ink-muted"><strong>效果</strong>：单表行数不再成为瓶颈，通过添加 TiKV 节点线性扩展。全球玩家访问延迟降低 40%（就近接入）。</p>
            </div>
          </div>

          <SideNote label="成功案例的共同点">
            这些成功案例的共同特点是：① <strong>充分测试</strong>：迁移前进行了 3-6 个月的测试和性能调优；② <strong>渐进式迁移</strong>：先迁移非核心业务，积累经验后再迁移核心系统；③ <strong>团队协作</strong>：DBA、开发、运维紧密配合，PingCAP 提供技术支持；④ <strong>监控完善</strong>：建立完善的监控告警体系，及时发现问题；⑤ <strong>持续优化</strong>：迁移后持续进行性能调优和参数调整。
          </SideNote>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、常见误区
          </h2>

          <Callout type="danger" title="误区 1：TiDB 可以完全替代 MySQL">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 在所有场景下都比 MySQL 好。</p>
            <p><strong>正确理解</strong>：TiDB 适合大规模、高并发、HTAP 场景。对于小数据量、低并发、对延迟极度敏感的应用，MySQL 仍然是更好的选择。避免过度工程化，选择合适的工具解决合适的问题。
</p>
          </Callout>

          <Callout type="danger" title="误区 2：迁移到 TiDB 后性能一定会提升">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 是分布式数据库，所以性能一定比 MySQL 强。</p>
            <p><strong>正确理解</strong>：TiDB 的优势在于<strong>吞吐量</strong>和<strong>扩展性</strong>，而非单次查询的<strong>延迟</strong>。对于点查（WHERE id = ?），MySQL 单机延迟更低（1ms vs 2-5ms）。如果未进行合理的索引设计和统计信息维护，TiDB 性能甚至可能不如 MySQL。迁移后必须进行性能调优。
</p>
          </Callout>

          <Callout type="danger" title="误区 3：TiDB 不需要 DBA">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 自动化程度高，不需要专门的 DBA。</p>
            <p><strong>正确理解</strong>：虽然 TiDB 自动化了 Region 分裂、负载均衡等操作，但仍需要 DBA 进行：① 性能调优（执行计划分析、索引优化）；② 容量规划（节点数量、资源配置）；③ 故障排查（慢查询诊断、热点处理）；④ 版本升级和补丁管理；⑤ 备份恢复策略。TiDB 降低了运维门槛，但不能完全替代 DBA。
</p>
          </Callout>

          <Callout type="warning" title="误区 4：MySQL 分库分表是更好的方案">
            <p className="mb-2"><strong>错误认知</strong>：分库分表可以解决所有扩展问题，没必要迁移到 TiDB。</p>
            <p><strong>正确理解</strong>：分库分表确实能解决扩展问题，但带来了巨大代价：① 应用层改造（路由逻辑、跨库 JOIN、分布式事务）；② 运维复杂度（多个实例管理、数据迁移困难）；③ 功能限制（全局唯一索引、跨库聚合查询困难）；④ 扩容痛苦（重新分片需停机迁移）。TiDB 将这些复杂性封装在数据库内部，应用无感知。对于新系统，直接使用 TiDB 比分库分表更合理。
</p>
          </Callout>

          <Callout type="warning" title="误区 5：TiDB 的学习成本太高">
            <p className="mb-2"><strong>错误认知</strong>：TiDB 是新技术，团队需要很长时间才能掌握。</p>
            <p><strong>正确理解</strong>：TiDB 兼容 MySQL 协议，开发人员无需学习新语法。运维方面，TiUP 工具简化了部署和升级，Grafana 监控面板提供可视化指标。对于熟悉 MySQL 的团队，通常 1-2 周即可上手 TiDB 基本操作。真正需要深入学习的是分布式概念（Raft、Region、TSO），但这对于构建大规模系统是必备知识，投资回报率高。
</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "什么场景下应该选择 TiDB 而不是 MySQL？",
              answer: "选择 TiDB 的场景：① 数据量大（{'>'}500GB 或单表 {'>'}1000 万行），MySQL 单机性能瓶颈明显；② 高并发写入（QPS {'>'} 10000），需要水平扩展；③ HTAP 需求，需要实时分析能力，不想维护额外的 OLAP 系统；④ 强一致性要求，不能接受主从延迟导致的数据不一致；⑤ 计划上云或使用 Kubernetes，TiDB 云原生设计更适合；⑥ 希望避免分库分表的复杂性。选择 MySQL 的场景：数据量小（{'<'}100GB）、低并发、对延迟极度敏感（{'<'}1ms）、团队缺乏分布式数据库经验、预算有限。"
            },
            {
              question: "从 MySQL 迁移到 TiDB 的主要挑战是什么？如何解决？",
              answer: "主要挑战：① 功能兼容性：存储过程、触发器、外键等在 TiDB 中支持不完善。解决：迁移前进行功能审计，重构不兼容的代码，将业务逻辑移到应用层；② 性能差异：分布式事务延迟略高。解决：性能测试，优化索引和统计信息，必要时调整架构（如缓存热点数据）；③ 数据一致性：迁移过程中保证数据不丢失。解决：使用 DM 工具进行全量+增量迁移，checksum 校验，灰度切换；④ 运维经验不足：团队不熟悉分布式数据库。解决：培训、引入专家、借助 PingCAP 技术支持；⑤ 监控告警：建立完善的监控体系。解决：使用 Prometheus + Grafana 监控关键指标（QPS、延迟、Region 分布、PD 调度）。"
            },
            {
              question: "TiDB 和 MySQL 的性能差异主要体现在哪些方面？",
              answer: "性能差异：① 延迟：MySQL 单机点查延迟更低（1-2ms），TiDB 因跨节点通信延迟略高（2-5ms）；② 吞吐量：TiDB 可通过横向扩展支撑更高并发（10 万+ QPS），MySQL 单机通常在 1-2 万 QPS；③ 复杂查询：TiDB 的并行执行和 TiFlash MPP 使复杂 JOIN、聚合查询性能远超 MySQL（10-100 倍）；④ 写入性能：TiDB 分布式写入可线性扩展，MySQL 单机写入受限于磁盘 I/O；⑤ 大表扫描：TiFlash 列式存储使全表扫描性能远超 MySQL（10-50 倍）；⑥ 事务冲突：高竞争场景下 MySQL 性能更好（无分布式锁开销）。总结：MySQL 适合低延迟场景，TiDB 适合高吞吐和复杂分析场景。"
            },
            {
              question: "TiDB 的 HTAP 能力相比 MySQL + Elasticsearch 方案有什么优势？",
              answer: "TiDB HTAP 优势：① 架构简化：一套系统同时支持 OLTP 和 OLAP，无需维护 MySQL + Elasticsearch + Logstash 等多套系统，降低运维成本；② 数据一致性：TiFlash 通过 Raft 从 TiKV 实时同步，保证强一致性；MySQL + ES 通过 Binlog 异步同步，存在延迟和数据不一致风险；③ 实时性：TiFlash 同步延迟毫秒级，ES 通常秒级延迟；④ SQL 兼容：TiFlash 支持标准 SQL，无需学习 ES 的 DSL 查询语言；⑤ 成本：减少组件数量，降低硬件和人力成本；⑥ 开发效率：应用层无需维护多套数据源，统一使用 SQL。劣势：ES 在全文检索、模糊匹配方面更强大，TiDB 全文索引功能较弱。最佳实践：核心业务用 TiDB HTAP，全文检索用 ES，各司其职。"
            },
            {
              question: "如何评估从 MySQL 迁移到 TiDB 的成本和收益？",
              answer: "评估方法：① 成本侧：硬件成本（TiDB 需多节点，但至少 3 TiKV + 2 TiDB + 3 PD）、人力成本（学习曲线、迁移工作量）、运维成本（监控、备份、升级）、机会成本（迁移期间业务影响）；② 收益侧：性能提升（吞吐量、查询速度）、扩展性（无需分库分表）、运维简化（自动平衡、在线扩容）、功能增强（HTAP、实时分析）、风险降低（强一致性、高可用）；③ ROI 计算：量化收益（如减少的开发工时、降低的服务器数量、提升的业务指标）减去成本，计算投资回报周期；④ 风险评估：迁移失败的概率和影响，制定回滚预案；⑤ 试点验证：先迁移非核心业务，验证效果和成本，再决定是否全面迁移。建议制作详细的 TCO（总拥有成本）对比表，包含 3-5 年的预测。"
            },
            {
              question: "TiDB 和 MySQL 在高可用方面有什么区别？",
              answer: "高可用对比：① MySQL：依赖主从复制 + 切换工具（MHA、Orchestrator），故障恢复时间 RTO 通常 30-60s，可能存在数据丢失（异步复制）或延迟（半同步复制）；② TiDB：基于 Raft 共识算法，每个 Region 有 3 副本，多数派（≥2）确认即成功，保证强一致性。故障恢复自动进行，RTO {'<'} 30s，RPO = 0（零数据丢失）；③ MySQL 需要手动配置主从、监控延迟、处理脑裂问题；④ TiDB 自动处理副本选举、数据同步、故障转移，运维更简单；⑤ MySQL 跨机房部署复杂（延迟增加、同步困难）；⑥ TiDB 天然支持跨机房部署（Placement Rules 控制副本分布）。总结：TiDB 在高可用方面更胜一筹，特别是强一致性和自动化运维。"
            },
            {
              question: "如果迁移到 TiDB 后发现性能不如预期，应该如何排查和优化？",
              answer: "排查步骤：① 定位慢查询：通过 information_schema.slow_query 找出性能差的 SQL；② 分析执行计划：EXPLAIN ANALYZE 检查是否有 TableScan、算子是否下推、estRows 是否准确；③ 检查统计信息：SHOW STATS_HEALTHY，过时则执行 ANALYZE TABLE；④ 验证索引使用：确认索引被正确使用，添加缺失索引或调整联合索引顺序；⑤ 检查 Region 分布：information_schema.tikv_region_status 查看是否有热点 Region，使用 SHARD_ROW_ID_BITS 打散数据；⑥ 检查资源竞争：Resource Group 监控各业务的资源使用，避免 OLAP 影响 OLTP；⑦ 启用 TiFlash：对于 OLAP 查询，添加 TiFlash 副本并强制使用；⑧ 调整配置：根据 workload 调整 TiDB Server、TiKV、PD 的参数（如缓存大小、并发度）；⑨ 横向扩展：添加 TiKV 节点分散负载；⑩ 寻求支持：联系 PingCAP 技术支持，提供慢查询日志和执行计划。常见优化手段：索引优化、统计信息更新、SQL 重写、TiFlash 加速、资源隔离、横向扩展。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/tidb/tidb-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">TiDB 架构与存储引擎</div>
              <div className="text-[12px] text-ink-muted mt-1">深入理解 TiDB 内部机制</div>
            </a>
            <a href="/docs/mysql/mysql-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">对比学习 →</div>
              <div className="font-semibold text-ink group-hover:text-accent">MySQL 架构与存储引擎</div>
              <div className="text-[12px] text-ink-muted mt-1">理解传统关系型数据库架构</div>
            </a>
            <a href="/docs/tidb/tidb-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">深入学习 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">TiDB 性能调优与实践</div>
              <div className="text-[12px] text-ink-muted mt-1">迁移后的性能优化指南</div>
            </a>
            <a href="/docs/database-comparison/mysql-vs-postgresql" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">相关对比 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">MySQL vs PostgreSQL</div>
              <div className="text-[12px] text-ink-muted mt-1">其他数据库选型对比</div>
            </a>
          </div>

          <Callout type="info" title="总结与建议">
            TiDB 和 MySQL 各有优劣，没有银弹。选型时应遵循以下原则：① <strong>实事求是</strong>：根据实际业务需求和技术条件选择，不盲目追求新技术；② <strong>长远规划</strong>：考虑未来 3-5 年的数据增长和业务扩展，避免频繁重构；③ <strong>渐进式演进</strong>：从小规模试点开始，逐步扩大范围，降低风险；④ <strong>持续学习</strong>：无论选择哪种数据库，都要深入理解其原理和最佳实践；⑤ <strong>混合架构</strong>：不必非此即彼，可根据场景组合使用多种数据库。最终目标是构建稳定、高效、可扩展的数据基础设施，支撑业务发展。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
