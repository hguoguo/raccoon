import KnowledgeLayout from '../../../../../components/knowledge/KnowledgeLayout'
import Playground from '../../../../../components/knowledge/Playground'
import SideNote from '../../../../../components/knowledge/SideNote'
import ContextSwitcher from '../../../../../components/knowledge/ContextSwitcher'
import SmartTOC from '../../../../../components/knowledge/SmartTOC'
import Callout from '../../../../../components/ui/Callout'
import DiagramBlock from '../../../../../components/ui/DiagramBlock'
import InterviewSection from '../../../../../components/ui/InterviewSection'
import ArticleNav from '../../../../../components/article/ArticleNav'
import { getArticleNav } from '../../../../../data/chapters'
import type { KnowledgeNode, TocItem } from '../../../../../data/types'

const tocItems: TocItem[] = [
  { id: 'definition', text: '一句话定义', level: 2 },
  { id: 'overview', text: '一、整体架构对比', level: 2 },
  { id: 'architecture', text: '二、核心架构差异', level: 2 },
  { id: 'storage-engine', text: '三、存储引擎', level: 2 },
  { id: 'concurrency', text: '四、并发控制机制', level: 2 },
  { id: 'indexing', text: '五、索引实现', level: 2 },
  { id: 'replication', text: '六、复制与高可用', level: 2 },
  { id: 'json-support', text: '七、JSON 支持', level: 2 },
  { id: 'ecosystem', text: '八、生态系统', level: 2 },
  { id: 'performance', text: '九、性能对比', level: 2 },
  { id: 'selection-guide', text: '十、选型指南', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function MysqlVsPostgresql({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 max-w-[820px] min-w-0 px-4 sm:px-6 lg:px-12 pb-20">
        <KnowledgeLayout meta={meta}>

          {/* 1. 一句话定义 */}
          <section id="definition">
            <blockquote className="border-l-[3px] border-l-accent pl-4 py-2 my-6 bg-accent-glow rounded-r-paper-md">
              <p className="text-[15px] sm:text-base font-medium text-ink leading-[1.7]">
                MySQL 和 PostgreSQL 都是开源关系型数据库，MySQL 以简单高效著称，适合 Web 应用；PostgreSQL 以功能丰富和标准兼容见长，适合复杂业务场景。
              </p>
            </blockquote>
          </section>

          {/* 2. 整体架构对比 */}
          <section id="overview">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              一、整体架构对比
            </h2>
            <DiagramBlock title="MySQL vs PostgreSQL 架构全景图">
              <div className="grid grid-cols-2 gap-6 p-4">
                <div className="space-y-3">
                  <h3 className="text-center font-semibold text-blue-600">MySQL</h3>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm space-y-2">
                    <div><strong>连接层：</strong>线程池模型</div>
                    <div><strong>服务层：</strong>SQL解析、优化器、缓存</div>
                    <div><strong>存储引擎层：</strong>InnoDB（默认）、MyISAM</div>
                    <div><strong>文件系统：</strong>数据文件、日志文件</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-center font-semibold text-indigo-600">PostgreSQL</h3>
                  <div className="bg-indigo-50 p-3 rounded-lg text-sm space-y-2">
                    <div><strong>连接层：</strong>进程模型（每个连接一个进程）</div>
                    <div><strong>服务层：</strong>查询规划器、执行器</div>
                    <div><strong>存储层：</strong>Heap表、WAL日志</div>
                    <div><strong>扩展层：</strong>插件系统、自定义类型</div>
                  </div>
                </div>
              </div>
            </DiagramBlock>

            <Callout type="info" title="核心差异总结">
              <ul className="list-disc list-inside space-y-1 text-[14px]">
                <li><strong>架构哲学：</strong>MySQL 追求简单易用和高性能；PostgreSQL 追求功能完整和标准兼容</li>
                <li><strong>并发模型：</strong>MySQL 使用线程；PostgreSQL 使用进程</li>
                <li><strong>扩展性：</strong>PostgreSQL 提供更强大的扩展能力（自定义函数、类型、索引方法）</li>
              </ul>
            </Callout>
          </section>

          {/* 3. 核心架构差异 */}
          <section id="architecture">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              二、核心架构差异
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              2.1 连接处理
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 采用<strong>线程池模型</strong>，每个客户端连接分配一个线程，上下文切换开销小，适合高并发短连接场景。
            </p>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              PostgreSQL 采用<strong>进程模型</strong>，每个连接 fork 一个新进程，隔离性好但资源消耗大，通常配合连接池（如 PgBouncer）使用。
            </p>

            <SideNote label="性能影响">
              在高并发场景下（1000+ 连接），MySQL 的线程模型更具优势；PostgreSQL 必须使用连接池中间件来管理连接数。
            </SideNote>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              2.2 MVCC 实现
            </h3>
            <ContextSwitcher
              simpleContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong>MySQL InnoDB：</strong>在聚簇索引记录中隐藏两个字段（事务ID、回滚指针），旧版本数据存储在 Undo Log 中。</p>
                  <p className="text-[14px] text-ink-muted"><strong>PostgreSQL：</strong>直接在数据页中保留多个版本（通过 xmin/xmax 事务ID标记），需要 VACUUM 清理过期版本。</p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">MySQL InnoDB MVCC</h4>
                    <Playground
                      code={`-- InnoDB 隐藏列
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50)
  -- 隐藏列（不可见）：
  -- DB_TRX_ID: 最近修改的事务ID
  -- DB_ROLL_PTR: 指向Undo Log的回滚指针
);

-- 读取时根据事务ID判断可见性
-- 当前事务ID > 记录的DB_TRX_ID → 可见
-- 否则检查Undo Log中的历史版本`}
                      language="sql"
                      filename="mysql_mvcc.sql"
                      description="InnoDB MVCC 隐藏列结构"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">PostgreSQL MVCC</h4>
                    <Playground
                      code={`-- PostgreSQL 每行都有可见性字段
SELECT ctid, xmin, xmax, * FROM users;

-- ctid: 物理位置标识
-- xmin: 插入此行的事务ID
-- xmax: 删除或更新此行的事务ID（0表示未删除）

-- 多版本共存于同一数据页
-- 需要定期 VACUUM 清理过期版本`}
                      language="sql"
                      filename="postgresql_mvcc.sql"
                      description="PostgreSQL MVCC 可见性字段"
                    />
                  </div>
                </div>
              }
            />

            <Callout type="warning" title="VACUUM 的重要性">
              PostgreSQL 的 MVCC 会导致表膨胀（bloat），必须定期运行 VACUUM 或使用自动清理（autovacuum）。MySQL 的 Undo Log 由后台线程自动清理，无需手动干预。
            </Callout>
          </section>

          {/* 4. 存储引擎 */}
          <section id="storage-engine">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              三、存储引擎
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              MySQL 采用<strong>插件式存储引擎架构</strong>，支持 InnoDB、MyISAM、Memory 等多种引擎，可根据表的需求选择。PostgreSQL 只有一种存储引擎（Heap表），但通过扩展实现特殊功能。
            </p>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">特性</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">MySQL InnoDB</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">PostgreSQL Heap</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">事务支持</td>
                    <td className="py-2 px-3 text-ink">✅ ACID</td>
                    <td className="py-2 px-3 text-ink">✅ ACID</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">外键约束</td>
                    <td className="py-2 px-3 text-ink">✅ 支持</td>
                    <td className="py-2 px-3 text-ink">✅ 支持</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">全文索引</td>
                    <td className="py-2 px-3 text-ink">✅ 内置</td>
                    <td className="py-2 px-3 text-ink">✅ 内置（更强大）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">空间索引</td>
                    <td className="py-2 px-3 text-ink">⚠️ 基础支持</td>
                    <td className="py-2 px-3 text-ink">✅ PostGIS（业界最强）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">JSON 支持</td>
                    <td className="py-2 px-3 text-ink">✅ JSON/JSONB</td>
                    <td className="py-2 px-3 text-ink">✅ JSONB（更高效）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">分区表</td>
                    <td className="py-2 px-3 text-ink">✅ 支持</td>
                    <td className="py-2 px-3 text-ink">✅ 声明式分区</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SideNote label="存储引擎选择">
              MySQL 8.0 之前可以根据表选择不同引擎（如 MyISAM 用于只读表），但 8.0+ 推荐全部使用 InnoDB。PostgreSQL 没有这个概念，所有表使用相同的存储结构。
            </SideNote>
          </section>

          {/* 5. 并发控制机制 */}
          <section id="concurrency">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              四、并发控制机制
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              4.1 锁机制
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              两者都支持行级锁、表级锁和意向锁，但实现细节有差异：
            </p>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">锁类型</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">MySQL</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">PostgreSQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">行锁</td>
                    <td className="py-2 px-3 text-ink">基于索引记录锁定</td>
                    <td className="py-2 px-3 text-ink">基于 TID（元组ID）锁定</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">间隙锁（Gap Lock）</td>
                    <td className="py-2 px-3 text-ink">✅ RR 隔离级别启用</td>
                    <td className="py-2 px-3 text-ink">❌ 不支持</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">死锁检测</td>
                    <td className="py-2 px-3 text-ink">实时检测并回滚</td>
                    <td className="py-2 px-3 text-ink">超时检测（deadlock_timeout）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">锁等待超时</td>
                    <td className="py-2 px-3 text-ink">innodb_lock_wait_timeout（默认50秒）</td>
                    <td className="py-2 px-3 text-ink">lock_timeout（可配置）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="danger" title="关键差异：间隙锁">
              MySQL 在 REPEATABLE READ 隔离级别下使用间隙锁防止幻读，这可能导致锁范围扩大（如锁定不存在的记录）。PostgreSQL 通过 MVCC 天然避免幻读，不需要间隙锁，并发性能更好。
            </Callout>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              4.2 隔离级别
            </h3>
            <Playground
              code={`-- MySQL 支持的隔离级别
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;  -- 默认
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- PostgreSQL 支持的隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;   -- 默认
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 注意：PostgreSQL 不支持 READ UNCOMMITTED（实际等同于 READ COMMITTED）`}
              language="sql"
              highlights={[3, 8]}
              filename="isolation_levels.sql"
              description="隔离级别对比"
            />

            <SideNote label="SERIALIZABLE 实现">
              PostgreSQL 的 SERIALIZABLE 使用 SSI（Serializable Snapshot Isolation）技术，比传统的两阶段锁性能更好。MySQL 的 SERIALIZABLE 实际上是将所有 SELECT 转换为 SELECT ... FOR SHARE，性能较差。
            </SideNote>
          </section>

          {/* 6. 索引实现 */}
          <section id="indexing">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              五、索引实现
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              5.1 B+树索引
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              两者都使用 B+树作为默认索引结构，但组织方式不同：
            </p>

            <ContextSwitcher
              simpleContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong>MySQL InnoDB：</strong>聚簇索引（数据存储在叶子节点），主键索引即数据本身。二级索引叶子节点存储主键值，需要回表查询。</p>
                  <p className="text-[14px] text-ink-muted"><strong>PostgreSQL：</strong>堆表组织（数据和索引分离），所有索引都是二级索引，通过 TID（物理位置）指向数据行。</p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">MySQL 聚簇索引</h4>
                    <DiagramBlock title="InnoDB 聚簇索引结构">
                      <pre className="text-xs bg-slate-50 p-3 rounded">
{`主键索引（聚簇索引）：
┌─────────────┐
│  B+树根节点  │
└──────┬──────┘
       │
┌──────┴──────┐
│ 内部节点     │  ← 存储主键范围
└──────┬──────┘
       │
┌──────┴──────┐
│ 叶子节点     │  ← 存储完整行数据
│ id=1, name=A│
│ id=2, name=B│
└─────────────┘

二级索引：
┌─────────────┐
│  B+树       │
└──────┬──────┘
       │
┌──────┴──────┐
│ 叶子节点     │  ← 存储 (索引列, 主键)
│ name=A, id=1│  ← 需要回表查询完整数据
└─────────────┘`}
                      </pre>
                    </DiagramBlock>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">PostgreSQL 堆表索引</h4>
                    <DiagramBlock title="PostgreSQL 索引结构">
                      <pre className="text-xs bg-slate-50 p-3 rounded">
{`堆表（数据存储）：
┌──────────────────┐
│ TID=(0,1) Row 1  │  ← 物理位置标识
│ TID=(0,2) Row 2  │
│ TID=(0,3) Row 3  │
└──────────────────┘

索引（独立结构）：
┌─────────────┐
│  B+树       │
└──────┬──────┘
       │
┌──────┴──────┐
│ 叶子节点     │  ← 存储 (索引列, TID)
│ name=A, (0,1)│  ← 直接定位到物理位置
└─────────────┘`}
                      </pre>
                    </DiagramBlock>
                  </div>
                </div>
              }
            />

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              5.2 高级索引类型
            </h3>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">索引类型</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">MySQL</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">PostgreSQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">B+树</td>
                    <td className="py-2 px-3 text-ink">✅ 默认</td>
                    <td className="py-2 px-3 text-ink">✅ 默认</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">哈希索引</td>
                    <td className="py-2 px-3 text-ink">✅ Memory 引擎</td>
                    <td className="py-2 px-3 text-ink">✅ 支持</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">全文索引</td>
                    <td className="py-2 px-3 text-ink">✅ InnoDB FT</td>
                    <td className="py-2 px-3 text-ink">✅ GIN/GiST（更强大）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">空间索引</td>
                    <td className="py-2 px-3 text-ink">✅ R-tree</td>
                    <td className="py-2 px-3 text-ink">✅ GiST（PostGIS）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">GIN 索引</td>
                    <td className="py-2 px-3 text-ink">❌ 不支持</td>
                    <td className="py-2 px-3 text-ink">✅ 倒排索引（JSONB/数组）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">BRIN 索引</td>
                    <td className="py-2 px-3 text-ink">❌ 不支持</td>
                    <td className="py-2 px-3 text-ink">✅ 块范围索引（大数据集）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">部分索引</td>
                    <td className="py-2 px-3 text-ink">❌ 不支持</td>
                    <td className="py-2 px-3 text-ink">✅ WHERE 条件索引</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">表达式索引</td>
                    <td className="py-2 px-3 text-ink">✅ 有限支持</td>
                    <td className="py-2 px-3 text-ink">✅ 任意表达式</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="tip" title="PostgreSQL 索引优势">
              PostgreSQL 的 GIN 索引对 JSONB 和数组类型的查询性能极佳，BRIN 索引适合时间序列等有序数据的大规模扫描。这些高级索引类型是 MySQL 不具备的。
            </Callout>
          </section>

          {/* 7. 复制与高可用 */}
          <section id="replication">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              六、复制与高可用
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              6.1 复制机制
            </h3>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">特性</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">MySQL</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">PostgreSQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">异步复制</td>
                    <td className="py-2 px-3 text-ink">✅ Binlog 复制</td>
                    <td className="py-2 px-3 text-ink">✅ WAL 流复制</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">半同步复制</td>
                    <td className="py-2 px-3 text-ink">✅ 插件支持</td>
                    <td className="py-2 px-3 text-ink">❌ 需第三方工具</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">并行复制</td>
                    <td className="py-2 px-3 text-ink">✅ 基于逻辑时钟</td>
                    <td className="py-2 px-3 text-ink">✅ 并行 Apply</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">逻辑复制</td>
                    <td className="py-2 px-3 text-ink">✅ 8.0+ 支持</td>
                    <td className="py-2 px-3 text-ink">✅ 9.4+ 成熟支持</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">延迟复制</td>
                    <td className="py-2 px-3 text-ink">✅ MASTER_DELAY</td>
                    <td className="py-2 px-3 text-ink">✅ recovery_min_apply_delay</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              6.2 高可用方案
            </h3>
            <Playground
              code={`# MySQL 高可用方案
# 1. MHA (Master High Availability)
# 2. Orchestrator (推荐)
# 3. MySQL Group Replication (MGR)
# 4. Percona XtraDB Cluster (PXC)
# 5. InnoDB Cluster (官方方案)

# PostgreSQL 高可用方案
# 1. Patroni + etcd/Consul (推荐)
# 2. Pgpool-II
# 3. repmgr
# 4. Stolon
# 5. Kubernetes Operator (CloudNativePG)`}
              language="bash"
              filename="ha_solutions.sh"
              description="主流高可用方案对比"
            />

            <SideNote label="生产建议">
              MySQL 推荐使用 Orchestrator 或 MGR；PostgreSQL 推荐使用 Patroni。两者都能实现自动故障检测和主从切换，RPO ≈ 0，RTO &lt; 30秒。
            </SideNote>
          </section>

          {/* 8. JSON 支持 */}
          <section id="json-support">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              七、JSON 支持
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
              两者都支持 JSON 数据类型，但实现方式和性能有显著差异：
            </p>

            <ContextSwitcher
              simpleContent={
                <div className="space-y-3">
                  <p className="text-[14px] text-ink-muted"><strong>MySQL：</strong>提供 JSON 和 JSONB 两种类型（8.0.13+），JSONB 采用二进制格式，支持索引和高效查询。</p>
                  <p className="text-[14px] text-ink-muted"><strong>PostgreSQL：</strong>提供 JSON 和 JSONB 两种类型，JSONB 是原生二进制格式，支持 GIN 索引，查询性能远超 MySQL。</p>
                </div>
              }
              hardcoreContent={
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">MySQL JSON 查询</h4>
                    <Playground
                      code={`CREATE TABLE docs (
  id INT PRIMARY KEY,
  data JSON  -- 或 JSONB (8.0.13+)
);

INSERT INTO docs VALUES (1, '{"name": "Alice", "age": 30, "tags": ["dev", "java"]}');

-- 查询 JSON 字段
SELECT data->>'$.name' AS name FROM docs;  -- "Alice"
SELECT data->'$.tags' FROM docs;           -- ["dev", "java"]

-- JSON 函数
SELECT JSON_EXTRACT(data, '$.age') FROM docs;  -- 30
SELECT JSON_CONTAINS(data, '"dev"', '$.tags') FROM docs;  -- 1 (true)

-- 生成列索引（模拟 JSONB 索引）
ALTER TABLE docs ADD COLUMN name_idx VARCHAR(50) 
  GENERATED ALWAYS AS (data->>'$.name') STORED;
CREATE INDEX idx_name ON docs(name_idx);`}
                      language="sql"
                      filename="mysql_json.sql"
                      description="MySQL JSON 操作示例"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">PostgreSQL JSONB 查询</h4>
                    <Playground
                      code={`CREATE TABLE docs (
  id SERIAL PRIMARY KEY,
  data JSONB  -- 推荐始终使用 JSONB
);

INSERT INTO docs VALUES (1, '{"name": "Alice", "age": 30, "tags": ["dev", "java"]}');

-- 查询 JSONB 字段（操作符更简洁）
SELECT data->>'name' FROM docs;        -- "Alice"
SELECT data->'tags' FROM docs;         -- ["dev", "java"]
SELECT data->'tags'->>0 FROM docs;     -- "dev"

-- GIN 索引（高性能查询）
CREATE INDEX idx_data_gin ON docs USING GIN (data);

-- 路径查询
SELECT * FROM docs WHERE data @> '{"name": "Alice"}';  -- 包含查询
SELECT * FROM docs WHERE data ? 'tags';                -- 键存在
SELECT * FROM docs WHERE data->'tags' ? 'java';        -- 数组包含

-- 聚合和修改
SELECT jsonb_agg(data->>'name') FROM docs;
UPDATE docs SET data = jsonb_set(data, '{age}', '31');`}
                      language="sql"
                      filename="postgresql_jsonb.sql"
                      description="PostgreSQL JSONB 操作示例"
                    />
                  </div>
                </div>
              }
            />

            <Callout type="tip" title="JSONB 性能对比">
              PostgreSQL 的 JSONB + GIN 索引在复杂查询场景下性能优于 MySQL，特别是在文档检索、标签过滤等场景。如果大量使用 JSON 数据，PostgreSQL 是更好的选择。
            </Callout>
          </section>

          {/* 9. 生态系统 */}
          <section id="ecosystem">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              八、生态系统
            </h2>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">维度</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">MySQL</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">PostgreSQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">ORM 支持</td>
                    <td className="py-2 px-3 text-ink">✅ Hibernate, MyBatis, Sequelize</td>
                    <td className="py-2 px-3 text-ink">✅ SQLAlchemy, TypeORM, Prisma</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">云服务</td>
                    <td className="py-2 px-3 text-ink">✅ AWS RDS, Aurora, 阿里云 RDS</td>
                    <td className="py-2 px-3 text-ink">✅ AWS RDS, Azure, Google Cloud SQL</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">监控工具</td>
                    <td className="py-2 px-3 text-ink">✅ Percona Monitoring, PMM</td>
                    <td className="py-2 px-3 text-ink">✅ pg_stat_statements, Datadog</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">备份工具</td>
                    <td className="py-2 px-3 text-ink">✅ mysqldump, XtraBackup</td>
                    <td className="py-2 px-3 text-ink">✅ pg_dump, pgBackRest, Barman</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">社区活跃度</td>
                    <td className="py-2 px-3 text-ink">🔥 极高（Oracle 支持）</td>
                    <td className="py-2 px-3 text-ink">🔥 极高（社区驱动）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">企业版</td>
                    <td className="py-2 px-3 text-ink">✅ MySQL Enterprise</td>
                    <td className="py-2 px-3 text-ink">✅ EDB Postgres</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 10. 性能对比 */}
          <section id="performance">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              九、性能对比
            </h2>

            <div className="overflow-x-auto my-5">
              <table className="w-full text-[12px] sm:text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 font-semibold text-ink">场景</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">MySQL</th>
                    <th className="text-left py-2 px-3 font-semibold text-ink">PostgreSQL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">简单读写（OLTP）</td>
                    <td className="py-2 px-3 text-ink">⚡ 略优（线程模型）</td>
                    <td className="py-2 px-3 text-ink">✅ 优秀</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">复杂查询（JOIN/子查询）</td>
                    <td className="py-2 px-3 text-ink">✅ 良好</td>
                    <td className="py-2 px-3 text-ink">⚡ 更优（优化器更强）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">并发写入</td>
                    <td className="py-2 px-3 text-ink">✅ 良好</td>
                    <td className="py-2 px-3 text-ink">⚡ 更优（无间隙锁）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">全文检索</td>
                    <td className="py-2 px-3 text-ink">✅ 内置</td>
                    <td className="py-2 px-3 text-ink">⚡ 更优（GIN 索引）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">JSON 查询</td>
                    <td className="py-2 px-3 text-ink">✅ 良好</td>
                    <td className="py-2 px-3 text-ink">⚡ 显著更优</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">分析型查询（OLAP）</td>
                    <td className="py-2 px-3 text-ink">⚠️ 一般</td>
                    <td className="py-2 px-3 text-ink">✅ 较好（并行查询）</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 px-3 text-ink-muted">高并发连接</td>
                    <td className="py-2 px-3 text-ink">⚡ 更优（线程池）</td>
                    <td className="py-2 px-3 text-ink">⚠️ 需连接池</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="info" title="性能总结">
              <ul className="list-disc list-inside space-y-1 text-[14px]">
                <li><strong>简单 CRUD：</strong>MySQL 略胜一筹（尤其是读多写少场景）</li>
                <li><strong>复杂查询：</strong>PostgreSQL 的查询优化器更智能，处理复杂 JOIN 和子查询更高效</li>
                <li><strong>高并发：</strong>MySQL 的线程模型在高并发短连接场景更有优势</li>
                <li><strong>数据分析：</strong>PostgreSQL 支持并行查询、窗口函数等高级特性，更适合 OLAP</li>
              </ul>
            </Callout>
          </section>

          {/* 11. 选型指南 */}
          <section id="selection-guide">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              十、选型指南
            </h2>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              选择 MySQL 的场景
            </h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
              <ul className="list-disc list-inside space-y-2 text-[14px] text-ink-muted">
                <li><strong>Web 应用：</strong>博客、电商、CMS 等传统 Web 应用</li>
                <li><strong>简单架构：</strong>团队熟悉 MySQL，追求快速开发</li>
                <li><strong>读多写少：</strong>内容管理系统、新闻门户</li>
                <li><strong>云原生：</strong>AWS Aurora MySQL、阿里云 RDS MySQL 生态成熟</li>
                <li><strong>高并发：</strong>社交网络、即时通讯等高并发场景</li>
              </ul>
            </div>

            <h3 className="font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink">
              选择 PostgreSQL 的场景
            </h3>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-4">
              <ul className="list-disc list-inside space-y-2 text-[14px] text-ink-muted">
                <li><strong>复杂业务：</strong>金融系统、ERP、CRM 等需要复杂查询和事务</li>
                <li><strong>地理信息：</strong>GIS 应用（PostGIS 是业界最强空间数据库）</li>
                <li><strong>JSON 文档：</strong>半结构化数据存储和查询</li>
                <li><strong>数据分析：</strong>需要窗口函数、CTE、并行查询等高级特性</li>
                <li><strong>标准兼容：</strong>严格遵循 SQL 标准，便于迁移</li>
                <li><strong>扩展需求：</strong>需要自定义类型、函数、索引方法</li>
              </ul>
            </div>

            <Callout type="tip" title="混合使用策略">
              很多公司采用混合架构：MySQL 处理核心交易数据，PostgreSQL 处理复杂分析和 JSON 文档。根据业务特点选择合适的数据库，不必二选一。
            </Callout>
          </section>

          {/* 12. 常见误区 */}
          <section id="misconceptions">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              十一、常见误区
            </h2>

            <Callout type="danger" title="误区一：MySQL 性能一定比 PostgreSQL 好">
              <span className="font-semibold text-ink-light">你以为的：</span>MySQL 更快，所以应该优先选择<br />
              <span className="font-semibold text-accent">实际：</span>在简单 CRUD 场景 MySQL 略优，但在复杂查询、JSON 处理、并发写入等场景 PostgreSQL 性能更好。性能取决于具体业务场景。
            </Callout>

            <Callout type="danger" title="误区二：PostgreSQL 不适合高并发">
              <span className="font-semibold text-ink-light">你以为的：</span>PostgreSQL 进程模型资源消耗大，无法处理高并发<br />
              <span className="font-semibold text-accent">实际：</span>配合 PgBouncer 连接池，PostgreSQL 可以轻松处理数千并发连接。Twitter、Instagram 等大厂都在使用 PostgreSQL 处理高流量。
            </Callout>

            <Callout type="danger" title="误区三：MySQL 不支持 JSON">
              <span className="font-semibold text-ink-light">你以为的：</span>MySQL 只能存字符串，不能处理 JSON<br />
              <span className="font-semibold text-accent">实际：</span>MySQL 5.7+ 支持 JSON 类型，8.0.13+ 支持 JSONB，功能和性能都很不错，只是相比 PostgreSQL 的 GIN 索引稍逊一筹。
            </Callout>

            <Callout type="danger" title="误区四：PostgreSQL 学习曲线陡峭">
              <span className="font-semibold text-ink-light">你以为的：</span>PostgreSQL 太复杂，团队难以掌握<br />
              <span className="font-semibold text-accent">实际：</span>基础 CRUD 操作与 MySQL 几乎一致，SQL 语法高度兼容。只有在使用高级特性（如自定义类型、扩展）时才需要额外学习。
            </Callout>

            <Callout type="danger" title="误区五：MySQL 和 PostgreSQL 可以无缝迁移">
              <span className="font-semibold text-ink-light">你以为的：</span>都是 SQL 数据库，迁移很简单<br />
              <span className="font-semibold text-accent">实际：</span>虽然基础 SQL 兼容，但数据类型、函数、自增主键、分页语法等有差异。迁移需要仔细测试，特别是存储过程和触发器。
            </Callout>
          </section>

          {/* 13. 面试真题 */}
          <section id="interview">
            <InterviewSection questions={[
              {
                question: "MySQL 和 PostgreSQL 的 MVCC 实现有什么区别？",
                answer: "MySQL InnoDB 将旧版本数据存储在 Undo Log 中，通过隐藏的事务ID和回滚指针管理版本，由后台线程自动清理。PostgreSQL 直接在数据页中保留多个版本（通过 xmin/xmax 标记），需要定期 VACUUM 清理过期版本，否则会导致表膨胀。"
              },
              {
                question: "为什么 PostgreSQL 在高并发写入场景下性能更好？",
                answer: "PostgreSQL 不使用间隙锁（Gap Lock），通过 MVCC 天然避免幻读，锁粒度更小。而 MySQL 在 REPEATABLE READ 级别下使用间隙锁，可能锁定不存在的记录范围，导致并发度降低。此外，PostgreSQL 的并行查询能力也更强。"
              },
              {
                question: "MySQL 的聚簇索引和 PostgreSQL 的堆表有什么区别？",
                answer: "MySQL InnoDB 使用聚簇索引，数据按主键顺序存储在 B+树叶子节点中，主键查询非常快，但二级索引需要回表。PostgreSQL 使用堆表，数据和索引分离，所有索引都是二级索引，通过 TID（物理位置）直接定位数据行，不存在回表问题，但更新数据时可能需要移动行位置。"
              },
              {
                question: "什么场景下应该选择 PostgreSQL 而不是 MySQL？",
                answer: "以下场景推荐 PostgreSQL：① 需要复杂查询（多表 JOIN、子查询、窗口函数）；② 需要 GIS 空间数据（PostGIS）；③ 大量 JSON 文档存储和查询；④ 需要自定义类型、函数或索引方法；⑤ 严格遵循 SQL 标准；⑥ 需要高级索引类型（GIN、BRIN、部分索引）。"
              },
              {
                question: "MySQL 和 PostgreSQL 的复制机制有何不同？",
                answer: "MySQL 基于 Binlog 进行复制，支持语句级、行级和混合模式，8.0+ 支持并行复制和半同步复制。PostgreSQL 基于 WAL 日志进行流复制，9.4+ 支持逻辑复制。MySQL 的半同步复制更成熟，PostgreSQL 的逻辑复制更灵活（可以选择性复制表）。"
              },
              {
                question: "PostgreSQL 的 VACUUM 有什么作用？为什么 MySQL 不需要类似操作？",
                answer: "PostgreSQL 的 MVCC 会在数据页中保留多个版本，DELETE 和 UPDATE 不会立即删除旧数据，而是标记为无效。VACUUM 负责清理这些过期版本，回收空间，防止表膨胀。MySQL 的旧版本存储在 Undo Log 中，由 Purge 线程异步清理，对用户透明，不需要手动干预。"
              },
              {
                question: "MySQL 和 PostgreSQL 在 JSON 支持方面哪个更好？",
                answer: "PostgreSQL 的 JSONB 支持更成熟：① 原生二进制格式，查询性能更好；② 支持 GIN 索引，可以快速检索 JSON 字段；③ 操作符更简洁（@>、?、->等）；④ 支持更丰富的 JSON 函数。MySQL 8.0+ 的 JSONB 也不错，但在复杂查询场景下性能不如 PostgreSQL。"
              }
            ]} />
          </section>

          {/* 14. 知识关联 */}
          <section id="related">
            <h2 className="font-display font-bold text-[20px] sm:text-display-sm mt-10 sm:mt-12 mb-4 sm:mb-5 text-ink">
              十三、知识关联
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-parchment-light border border-border rounded-paper-md">
                <div className="text-[10px] font-mono text-ink-ghost mb-1">前置知识</div>
                <div className="text-[13px] font-medium text-ink">MySQL 架构与存储引擎、PostgreSQL 核心原理</div>
              </div>
              <div className="p-4 bg-accent-glow border border-accent/20 rounded-paper-md">
                <div className="text-[10px] font-mono text-accent mb-1">延伸知识</div>
                <div className="text-[13px] font-medium text-ink">SQL 优化与索引、TiDB vs MySQL、OLAP 数据库选型</div>
              </div>
            </div>
          </section>

          {/* 文章导航，必须在 KnowledgeLayout 内部的最后 */}
          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* SmartTOC 直接渲染，不要用 <aside> 包裹！ */}
      <SmartTOC items={tocItems} />
    </div>
  )
}
