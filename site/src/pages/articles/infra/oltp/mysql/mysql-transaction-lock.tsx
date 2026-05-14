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
  { id: 'acid', text: '一、ACID 事务特性', level: 2 },
  { id: 'isolation-levels', text: '二、事务隔离级别', level: 2 },
  { id: 'lock-types', text: '三、锁类型详解', level: 2 },
  { id: 'row-lock', text: '四、行级锁实现原理', level: 2 },
  { id: 'gap-lock', text: '五、间隙锁（Gap Lock）', level: 2 },
  { id: 'next-key-lock', text: '六、Next-Key Lock', level: 2 },
  { id: 'deadlock', text: '七、死锁检测与处理', level: 2 },
  { id: 'mvcc-implementation', text: '八、MVCC 实现细节', level: 2 },
  { id: 'undo-log', text: '九、Undo Log 回滚日志', level: 2 },
  { id: 'lock-monitoring', text: '十、锁监控与排查', level: 2 },
  { id: 'misconceptions', text: '十一、常见误区', level: 2 },
  { id: 'interview', text: '十二、面试真题', level: 2 },
  { id: 'related', text: '十三、知识关联', level: 2 },
]

export default function MysqlTransactionLock({ meta }: { meta: KnowledgeNode }) {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden">
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20">
        <KnowledgeLayout meta={meta}>

          <h2 id="definition" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一句话定义
          </h2>
          <blockquote className="border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md">
            <p className="text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium">
              MySQL InnoDB 通过<strong className="text-accent">多版本并发控制（MVCC）+ 锁机制</strong>实现事务隔离，支持四种隔离级别（读未提交、读已提交、可重复读、串行化），
              使用行锁、间隙锁、Next-Key Lock 保证数据一致性，通过死锁检测自动解决循环等待问题，Undo Log 提供事务回滚和 MVCC 版本链支持。
            </p>
          </blockquote>

          <Callout type="tip" title="为什么事务和锁如此重要？">
            在高并发场景下，多个事务同时修改同一数据会导致脏读、不可重复读、幻读等问题。理解事务隔离级别和锁机制是编写正确并发程序的基础。错误的锁使用会导致死锁、性能下降甚至数据不一致，而合理的锁策略能在保证一致性的前提下最大化并发性能。
          </Callout>

          <h2 id="acid" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            一、ACID 事务特性
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            ACID 是事务的四个基本特性，InnoDB 通过不同机制保证每个特性：
          </p>

          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">特性</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">含义</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">InnoDB 实现机制</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>Atomicity</strong><br/>（原子性）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">事务要么全部成功，要么全部失败回滚</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">Undo Log 记录反向操作，失败时回滚</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>Consistency</strong><br/>（一致性）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">事务前后数据保持一致性约束</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">由其他三个特性共同保证 + 外键约束</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>Isolation</strong><br/>（隔离性）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">并发事务互不干扰</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">MVCC + 锁机制（行锁、间隙锁）</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>Durability</strong><br/>（持久性）</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">事务提交后数据永久保存</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">Redo Log + binlog 双写机制</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Playground
            code={`-- 事务基本操作
START TRANSACTION;  -- 或 BEGIN

UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

-- 检查是否有错误
-- 如果成功：
COMMIT;

-- 如果失败：
ROLLBACK;

-- 查看当前事务隔离级别
SELECT @@transaction_isolation;

-- 设置事务隔离级别（会话级别）
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- 设置全局隔离级别
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;`}
            language="sql"
            highlights={[2, 4, 5, 9, 12, 15, 18, 21]}
            filename="transaction_basics.sql"
            description="事务基本操作"
          />

          <SideNote label="自动提交（autocommit）">
            MySQL 默认启用 autocommit，每条 SQL 都是一个独立事务。对于多语句事务，必须显式使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">START TRANSACTION</code> 关闭自动提交。可通过 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">SET autocommit = 0</code> 禁用自动提交。
          </SideNote>

          <h2 id="isolation-levels" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            二、事务隔离级别
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            SQL 标准定义了四种隔离级别，从低到高依次解决脏读、不可重复读、幻读问题。InnoDB 默认使用 <strong>REPEATABLE READ</strong>。
          </p>

          <DiagramBlock title="隔离级别与并发问题对照表">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
┌────────────────────┬──────────┬──────────────┬────────┐
│   隔离级别          │ 脏读     │ 不可重复读    │ 幻读   │
├────────────────────┼──────────┼──────────────┼────────┤
│ READ UNCOMMITTED   │ ❌ 可能  │ ❌ 可能       │ ❌ 可能│
│ READ COMMITTED     │ ✅ 避免  │ ❌ 可能       │ ❌ 可能│
│ REPEATABLE READ    │ ✅ 避免  │ ✅ 避免       │ ✅ 避免│
│ SERIALIZABLE       │ ✅ 避免  │ ✅ 避免       │ ✅ 避免│
└────────────────────┴──────────┴──────────────┴────────┘

并发问题说明：
- 脏读：读到未提交的数据
- 不可重复读：同一事务中多次读取结果不一致
- 幻读：同一查询条件，后续查询多出或少了记录

InnoDB 在 RR 级别通过 MVCC + Next-Key Lock 避免幻读
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`-- 实验 1：脏读（READ UNCOMMITTED）
-- 事务 A
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE user_id = 1;  -- 读到 1000

-- 事务 B（未提交）
START TRANSACTION;
UPDATE accounts SET balance = 900 WHERE user_id = 1;

-- 事务 A 再次查询
SELECT balance FROM accounts WHERE user_id = 1;  -- 读到 900（脏读！）

-- 事务 B 回滚
ROLLBACK;

-- 事务 A 再查
SELECT balance FROM accounts WHERE user_id = 1;  -- 又变回 1000


-- 实验 2：不可重复读（READ COMMITTED）
-- 事务 A
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE user_id = 1;  -- 读到 1000

-- 事务 B（提交）
START TRANSACTION;
UPDATE accounts SET balance = 900 WHERE user_id = 1;
COMMIT;

-- 事务 A 再次查询
SELECT balance FROM accounts WHERE user_id = 1;  -- 读到 900（不可重复读！）


-- 实验 3：幻读（REPEATABLE READ 下 InnoDB 已避免）
-- 事务 A
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT * FROM users WHERE age > 20;  -- 返回 5 条记录

-- 事务 B（插入新记录并提交）
INSERT INTO users (name, age) VALUES ('NewUser', 25);
COMMIT;

-- 事务 A 再次查询
SELECT * FROM users WHERE age > 20;  -- 仍返回 5 条（无幻读！）`}
            language="sql"
            highlights={[3, 5, 7, 9, 12, 15, 18, 22, 24, 26, 28, 31, 34, 37, 40, 43, 46]}
            filename="isolation_experiments.sql"
            description="隔离级别实验演示"
          />

          <Callout type="warning" title="隔离级别选择建议">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>READ UNCOMMITTED</strong>：几乎不用，脏读问题严重</li>
              <li><strong>READ COMMITTED</strong>：Oracle 默认级别，适合大多数 OLTP 场景，并发性能好</li>
              <li><strong>REPEATABLE READ</strong>：MySQL 默认级别，通过 MVCC + Next-Key Lock 避免幻读，适合需要强一致性的场景</li>
              <li><strong>SERIALIZABLE</strong>：最高隔离级别，但并发性能极差（所有读都加锁），仅在极端场景使用</li>
            </ul>
          </Callout>

          <h2 id="lock-types" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            三、锁类型详解
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            InnoDB 支持多种锁类型，按粒度分为表锁和行锁，按性质分为共享锁和排他锁：
          </p>

          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-parchment-deep">
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">锁类型</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">别名</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">兼容性</th>
                  <th className="border border-border px-3 py-2 text-left text-[13px] font-semibold text-ink">使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>共享锁</strong></td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">S 锁 / 读锁</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">S-S 兼容，S-X 互斥</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">SELECT ... LOCK IN SHARE MODE</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>排他锁</strong></td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">X 锁 / 写锁</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">X-X、X-S 都互斥</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">UPDATE、DELETE、SELECT ... FOR UPDATE</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>意向锁</strong></td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">IS / IX 锁</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">表级锁，快速判断冲突</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">自动添加，无需手动干预</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>行锁</strong></td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">Record Lock</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">锁定单行记录</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">WHERE 条件命中索引</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>间隙锁</strong></td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">Gap Lock</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">锁定记录之间的间隙</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">范围查询防止幻读</td>
                </tr>
                <tr className="bg-parchment-light/50">
                  <td className="border border-border px-3 py-2 text-[13px] text-ink"><strong>Next-Key Lock</strong></td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">行锁 + 间隙锁</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">锁定记录及其前间隙</td>
                  <td className="border border-border px-3 py-2 text-[13px] text-ink-muted">RR 级别下的默认行为</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Playground
            code={`-- 显式加共享锁（读锁）
SELECT * FROM accounts WHERE user_id = 1 LOCK IN SHARE MODE;
-- 其他事务可以读，但不能写

-- 显式加排他锁（写锁）
SELECT * FROM accounts WHERE user_id = 1 FOR UPDATE;
-- 其他事务不能读（RC 级别）或不能读写（RR 级别）

-- 查看当前锁情况
SELECT * FROM information_schema.INNODB_LOCKS;
SELECT * FROM information_schema.INNODB_LOCK_WAITS;

-- 查看事务和锁的关系
SELECT 
    trx.trx_id,
    trx.trx_state,
    trx.trx_query,
    lock.lock_type,
    lock.lock_mode,
    lock.lock_table
FROM information_schema.INNODB_TRX trx
JOIN information_schema.INNODB_LOCKS lock
ON trx.trx_id = lock.lock_trx_id;`}
            language="sql"
            highlights={[2, 6, 10, 11, 15, 16, 17, 18, 19, 20]}
            filename="lock_types.sql"
            description="锁类型使用示例"
          />

          <h2 id="row-lock" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            四、行级锁实现原理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            InnoDB 的行锁是通过<strong>索引项</strong>实现的，而非记录本身。如果查询条件没有使用索引，行锁会升级为表锁，严重影响并发性能。
          </p>

          <Playground
            code={`CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    INDEX idx_age(age)
);

-- 场景 1：通过主键加锁（行锁）
START TRANSACTION;
SELECT * FROM users WHERE id = 1 FOR UPDATE;  -- ✅ 行锁
-- 其他事务可以操作 id != 1 的记录

-- 场景 2：通过辅助索引加锁（行锁）
START TRANSACTION;
SELECT * FROM users WHERE age = 25 FOR UPDATE;  -- ✅ 行锁（通过 idx_age）

-- 场景 3：未使用索引（升级为表锁！）
START TRANSACTION;
SELECT * FROM users WHERE name = 'Alice' FOR UPDATE;  -- ❌ 表锁（name 无索引）
-- 其他事务无法操作任何记录，直到事务提交

-- 场景 4：范围查询（锁定多行）
START TRANSACTION;
SELECT * FROM users WHERE age > 20 AND age < 30 FOR UPDATE;
-- 锁定所有满足条件的行 + 间隙（防止幻读）

-- 验证锁粒度
-- 开启两个会话，分别执行上述操作，观察阻塞情况`}
            language="sql"
            highlights={[9, 10, 14, 15, 19, 20, 24, 25]}
            filename="row_lock_implementation.sql"
            description="行锁实现原理"
          />

          <SideNote label="为什么行锁依赖索引？">
            InnoDB 通过索引定位记录并加锁。如果没有索引，只能全表扫描，为避免漏掉任何可能被其他事务修改的记录，只能锁定整张表。这就是为什么<strong>为高频更新字段创建索引</strong>如此重要——不仅加速查询，还能提高并发性能。
          </SideNote>

          <h2 id="gap-lock" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            五、间隙锁（Gap Lock）
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            间隙锁锁定索引记录之间的"空隙"，防止其他事务在间隙中插入新记录，从而避免幻读。<strong>仅在 RR 级别的范围查询中生效</strong>，RC 级别不使用间隙锁。
          </p>

          <DiagramBlock title="间隙锁示意图">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
假设索引值为：5, 10, 15, 20

间隙锁锁定范围：
(-∞, 5) (5, 10) (10, 15) (15, 20) (20, +∞)
  ↑       ↑       ↑       ↑       ↑
 Gap1   Gap2    Gap3    Gap4    Gap5

示例：SELECT * FROM users WHERE age > 10 AND age < 20 FOR UPDATE;

锁定内容：
- 记录锁：age=15 这一行
- 间隙锁：(10, 15) 和 (15, 20) 两个间隙

效果：
✅ 其他事务可以查询这些记录
❌ 其他事务不能插入 age=12、16、18 等记录（会被阻塞）
✅ 其他事务可以插入 age=3、25 等记录（不在锁定范围内）

注意：等值查询（age=15）不会加间隙锁，只有范围查询才会
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`-- 实验：间隙锁阻止插入
-- 前提：users 表中 age 字段有索引，现有记录 age=10, 15, 20

-- 事务 A
START TRANSACTION;
SELECT * FROM users WHERE age > 10 AND age < 20 FOR UPDATE;
-- 锁定 age=15 及间隙 (10, 15) 和 (15, 20)

-- 事务 B（尝试插入）
INSERT INTO users (name, age) VALUES ('Test', 12);  -- ❌ 被阻塞！
INSERT INTO users (name, age) VALUES ('Test', 18);  -- ❌ 被阻塞！
INSERT INTO users (name, age) VALUES ('Test', 25);  -- ✅ 成功（不在锁定范围）

-- 事务 A 提交后，事务 B 的插入才能执行
COMMIT;

-- 如何避免间隙锁？
-- 方法 1：使用 RC 隔离级别（不推荐，可能有幻读）
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 方法 2：精确等值查询（不加间隙锁）
SELECT * FROM users WHERE age = 15 FOR UPDATE;  -- 只锁 age=15 这一行

-- 方法 3：唯一索引等值查询（退化为行锁）
-- 如果 age 是唯一索引，等值查询不会加间隙锁`}
            language="sql"
            highlights={[5, 6, 10, 11, 12, 16, 19, 22, 25]}
            filename="gap_lock_demo.sql"
            description="间隙锁实验演示"
          />

          <Callout type="danger" title="间隙锁的性能影响">
            间隙锁会阻塞插入操作，在高并发写入场景下可能导致大量事务等待。优化建议：① 尽量使用等值查询而非范围查询；② 如果业务允许，使用 RC 隔离级别；③ 为查询条件创建唯一索引，等值查询时不会加间隙锁；④ 避免大范围查询，缩小锁定范围。
          </Callout>

          <h2 id="next-key-lock" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            六、Next-Key Lock
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Next-Key Lock 是<strong>行锁 + 间隙锁</strong>的组合，锁定一个左开右闭区间 <code className="font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]">(prev, current]</code>。这是 InnoDB 在 RR 级别下的默认加锁方式，既能防止其他事务修改当前记录，又能防止在之前插入新记录。
          </p>

          <Playground
            code={`-- Next-Key Lock 锁定示例
-- 假设索引值：5, 10, 15, 20

-- 查询：age > 10 AND age <= 15
SELECT * FROM users WHERE age > 10 AND age <= 15 FOR UPDATE;

-- 锁定内容：
-- Next-Key Lock 1: (5, 10]  → 间隙 (5, 10) + 记录 10
-- Next-Key Lock 2: (10, 15] → 间隙 (10, 15) + 记录 15

-- 效果：
-- ❌ 不能修改 age=10 或 age=15 的记录
-- ❌ 不能插入 age=11, 12, 13, 14 的记录
-- ✅ 可以插入 age=3 或 age=18 的记录

-- 特殊情况：等值查询且命中唯一索引
SELECT * FROM users WHERE id = 10 FOR UPDATE;  -- id 是主键
-- 退化为 Record Lock（只锁 id=10 这一行），不加间隙锁
-- 因为唯一索引保证不会有重复值，无需防止插入

-- 特殊情况：等值查询但未命中（记录不存在）
SELECT * FROM users WHERE age = 12 FOR UPDATE;  -- age=12 不存在
-- 加 Gap Lock (10, 15)，防止其他事务插入 age=12`}
            language="sql"
            highlights={[5, 18, 22]}
            filename="next_key_lock.sql"
            description="Next-Key Lock 机制"
          />

          <SideNote label="Next-Key Lock 的退化规则">
            InnoDB 会根据查询条件智能调整锁粒度：① 唯一索引等值查询 → Record Lock；② 非唯一索引等值查询 → Next-Key Lock；③ 范围查询 → 多个 Next-Key Lock；④ 等值查询但记录不存在 → Gap Lock。理解这些规则有助于预测锁行为，避免死锁。
          </SideNote>

          <h2 id="deadlock" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            七、死锁检测与处理
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            死锁是指两个或多个事务相互等待对方释放锁，形成循环等待。InnoDB 通过<strong>等待图（Wait-For Graph）</strong>检测死锁，并选择一个事务作为牺牲品回滚。
          </p>

          <Playground
            code={`-- 死锁示例
-- 初始状态：accounts 表有两行记录 id=1 和 id=2

-- 事务 A
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- 锁定 id=1
-- 等待锁定 id=2...

-- 事务 B
START TRANSACTION;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;   -- 锁定 id=2
UPDATE accounts SET balance = balance + 50 WHERE id = 1;   -- ❌ 等待 id=1（被 A 锁定）

-- 事务 A 继续
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- ❌ 等待 id=2（被 B 锁定）

-- 死锁检测触发！
-- InnoDB 选择其中一个事务回滚（通常是 undo log 较少的那个）
-- 另一个事务继续执行

-- 查看死锁日志
SHOW ENGINE INNODB STATUS\G
-- 输出中包含 "LATEST DETECTED DEADLOCK" 部分

-- 死锁超时配置
SHOW VARIABLES LIKE 'innodb_deadlock_detect';  -- 默认 ON
SHOW VARIABLES LIKE 'innodb_lock_wait_timeout'; -- 默认 50 秒

-- 调整超时时间（谨慎修改）
SET GLOBAL innodb_lock_wait_timeout = 30;`}
            language="sql"
            highlights={[5, 6, 10, 11, 12, 16, 22, 25, 26, 29]}
            filename="deadlock_demo.sql"
            description="死锁检测与处理"
          />

          <DiagramBlock title="死锁预防策略">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
预防死锁的最佳实践：

1. 固定访问顺序
   所有事务都按相同顺序访问资源（如先 id=1 再 id=2）
   
2. 一次性获取所有锁
   在事务开始时锁定所有需要的资源
   
3. 降低隔离级别
   使用 RC 级别减少锁的使用（但需接受幻读风险）
   
4. 缩短事务时长
   尽快提交事务，减少锁持有时间
   
5. 使用超时机制
   设置合理的 innodb_lock_wait_timeout
   
6. 添加重试逻辑
   应用层捕获死锁异常并重试

死锁 vs 锁等待：
- 死锁：循环等待，InnoDB 自动检测并回滚其中一个事务
- 锁等待：单向等待，超过 timeout 后报错
            `}</pre>
          </DiagramBlock>

          <Callout type="tip" title="应用层死锁处理">
            在 Java 应用中，可以捕获 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">DeadlockLoserDataAccessException</code> 或 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">SQLTransactionRollbackException</code>，实现自动重试机制。一般重试 2-3 次即可成功，因为另一个事务已完成并释放锁。
          </Callout>

          <h2 id="mvcc-implementation" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            八、MVCC 实现细节
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            MVCC 通过 Undo Log 维护数据的历史版本链，配合 ReadView 实现快照读。每行记录包含三个隐藏字段：<strong>DB_TRX_ID</strong>（最近修改的事务 ID）、<strong>DB_ROLL_PTR</strong>（回滚指针）、<strong>DB_ROW_ID</strong>（隐藏行 ID）。
          </p>

          <DiagramBlock title="MVCC 版本链结构">
            <pre className="font-mono text-[11px] sm:text-[12px] text-ink-muted leading-[1.6] whitespace-pre">{`
聚簇索引记录结构：
┌─────────────────────────────────┐
│ DB_TRX_ID: 101 (事务 ID)        │
│ DB_ROLL_PTR: 指向 Undo Log      │──┐
│ DB_ROW_ID: 1                    │  │
│ id: 1                           │  │
│ name: 'Alice'                   │  │
│ age: 25                         │  │
└─────────────────────────────────┘  │
                                     ▼
                              ┌──────────────┐
                              │  Undo Log    │
                              │  version 2   │
                              │  age: 24     │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  Undo Log    │
                              │  version 1   │
                              │  age: 23     │
                              └──────────────┘

ReadView 可见性判断：
1. 如果 DB_TRX_ID < min_trx_id → 可见（事务已提交）
2. 如果 DB_TRX_ID >= max_trx_id → 不可见（事务后启动）
3. 如果 DB_TRX_ID 在 m_ids 中 → 不可见（事务活跃）
4. 否则 → 可见（事务已提交）

沿着版本链向上查找，找到第一个可见的版本即为当前读到的数据
            `}</pre>
          </DiagramBlock>

          <Playground
            code={`-- MVCC 工作流程实验
-- 初始状态：users 表中 id=1 的记录 age=25

-- 事务 A（T1 时刻启动）
START TRANSACTION;
SELECT age FROM users WHERE id = 1;  -- 读到 25（创建 ReadView）

-- 事务 B（T2 时刻启动并提交）
START TRANSACTION;
UPDATE users SET age = 26 WHERE id = 1;
COMMIT;

-- 事务 A 再次查询（RR 级别）
SELECT age FROM users WHERE id = 1;  -- 仍读到 25（复用 ReadView）
-- 虽然事务 B 已提交，但 T1 < T2，根据可见性规则不可见

-- 事务 A 提交后再查
COMMIT;
SELECT age FROM users WHERE id = 1;  -- 读到 26（新事务，新 ReadView）

-- RC 级别的行为
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT age FROM users WHERE id = 1;  -- 读到 25

-- 事务 C 修改并提交
UPDATE users SET age = 27 WHERE id = 1;
COMMIT;

SELECT age FROM users WHERE id = 1;  -- 读到 27（每次 SELECT 创建新 ReadView）`}
            language="sql"
            highlights={[4, 5, 8, 9, 10, 13, 17, 18, 22, 23, 24, 27, 28, 31]}
            filename="mvcc_workflow.sql"
            description="MVCC 工作流程"
          />

          <h2 id="undo-log" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            九、Undo Log 回滚日志
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            Undo Log 记录数据的逻辑反向操作，用于事务回滚和 MVCC 版本管理。与 Redo Log 的物理日志不同，Undo Log 是逻辑日志（如 "将 age 从 26 改回 25"）。
          </p>

          <Playground
            code={`-- Undo Log 的作用
-- 1. 事务回滚（原子性）
START TRANSACTION;
UPDATE users SET age = 26 WHERE id = 1;
-- Undo Log 记录：将 id=1 的 age 从 25 改为 26
ROLLBACK;
-- 根据 Undo Log 反向操作：将 age 从 26 改回 25

-- 2. MVCC 版本链（隔离性）
-- 每次 UPDATE 都会在 Undo Log 中创建新版本
-- 历史版本通过 DB_ROLL_PTR 链接形成版本链

-- 查看 Undo Log 相关配置
SHOW VARIABLES LIKE 'innodb_undo_logs';
SHOW VARIABLES LIKE 'innodb_undo_tablespaces';
SHOW VARIABLES LIKE 'innodb_max_undo_log_size';

-- Undo Log 清理策略
-- InnoDB Purge 线程定期清理不再需要的 Undo Log
-- 判断标准：该版本对所有活跃事务都不可见时才可删除

-- 监控 Undo Log 使用情况
SELECT * FROM information_schema.INNODB_METRICS 
WHERE NAME LIKE '%undo%';`}
            language="sql"
            highlights={[3, 4, 5, 7, 14, 15, 16, 23, 24]}
            filename="undo_log_details.sql"
            description="Undo Log 详解"
          />

          <SideNote label="Undo Log vs Redo Log">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Undo Log</strong>：逻辑日志，记录反向操作，用于回滚和 MVCC，自动清理</li>
              <li><strong>Redo Log</strong>：物理日志，记录数据页变化，用于崩溃恢复，循环写入</li>
              <li><strong>协作关系</strong>：事务提交时先写 Redo Log（prepare），再写 binlog，最后将 Redo Log 改为 commit。如果崩溃，通过 Redo Log 重做；如果需要回滚，通过 Undo Log 撤销。</li>
            </ul>
          </SideNote>

          <h2 id="lock-monitoring" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十、锁监控与排查
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4">
            生产环境中，及时发现和解决锁问题至关重要。MySQL 提供了多个系统表和命令用于锁监控。
          </p>

          <Playground
            code={`-- 1. 查看当前正在执行的事务
SELECT * FROM information_schema.INNODB_TRX;

-- 关键字段：
-- trx_state: RUNNING / LOCK WAIT
-- trx_started: 事务开始时间
-- trx_query: 当前执行的 SQL
-- trx_rows_locked: 锁定的行数

-- 2. 查看锁等待情况
SELECT 
    r.trx_id waiting_trx_id,
    r.trx_mysql_thread_id waiting_thread,
    r.trx_query waiting_query,
    b.trx_id blocking_trx_id,
    b.trx_mysql_thread_id blocking_thread,
    b.trx_query blocking_query
FROM information_schema.INNODB_LOCK_WAITS w
JOIN information_schema.INNODB_TRX r ON r.trx_id = w.requesting_trx_id
JOIN information_schema.INNODB_TRX b ON b.trx_id = w.blocking_trx_id;

-- 3. 查看详细的锁信息
SELECT * FROM performance_schema.data_locks;
SELECT * FROM performance_schema.data_lock_waits;

-- 4. 杀死长时间等待的事务
KILL <thread_id>;

-- 5. 查看最近的死锁信息
SHOW ENGINE INNODB STATUS\G
-- 查找 "LATEST DETECTED DEADLOCK" 部分

-- 6. 监控锁等待时间
SELECT 
    trx_id,
    trx_state,
    TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS duration_seconds
FROM information_schema.INNODB_TRX
WHERE trx_state = 'LOCK WAIT'
ORDER BY duration_seconds DESC;

-- 7. 自动化脚本：找出阻塞源头
SELECT 
    blocked.trx_id AS blocked_trx_id,
    blocked.trx_query AS blocked_query,
    blocker.trx_id AS blocker_trx_id,
    blocker.trx_query AS blocker_query
FROM information_schema.INNODB_LOCK_WAITS w
JOIN information_schema.INNODB_TRX blocked ON blocked.trx_id = w.requesting_trx_id
JOIN information_schema.INNODB_TRX blocker ON blocker.trx_id = w.blocking_trx_id;`}
            language="sql"
            highlights={[2, 11, 12, 13, 14, 15, 16, 23, 24, 27, 30, 34, 35, 36, 37, 38, 43, 44, 45, 46]}
            filename="lock_monitoring.sql"
            description="锁监控与排查"
          />

          <Callout type="tip" title="锁问题排查流程">
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">INNODB_TRX</code> 查看长时间运行的事务</li>
              <li>使用 <code className="font-mono text-[12px] bg-parchment-warm text-accent-deep px-[5px] py-[2px] rounded-[3px]">INNODB_LOCK_WAITS</code> 找出锁等待关系</li>
              <li>分析阻塞源头的 SQL，判断是否合理</li>
              <li>如果是异常事务，使用 KILL 终止</li>
              <li>优化慢 SQL，添加索引减少锁范围</li>
              <li>调整事务逻辑，缩短锁持有时间</li>
            </ol>
          </Callout>

          <h2 id="misconceptions" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十一、常见误区
          </h2>

          <Callout type="danger" title="误区 1：RR 级别完全没有幻读">
            <p className="mb-2"><strong>错误认知</strong>：REPEATABLE READ 级别下绝对不会出现幻读。</p>
            <p><strong>正确理解</strong>：InnoDB 在 RR 级别通过 MVCC + Next-Key Lock 避免了大部分幻读场景，但在某些特殊情况下仍可能出现：① 当前读（SELECT ... FOR UPDATE）后的快照读可能看到新插入的记录；② 半一致性读（semi-consistent read）在特定条件下可能产生幻读。严格来说，只有 SERIALIZABLE 级别才能完全避免幻读。</p>
          </Callout>

          <Callout type="danger" title="误区 2：行锁一定比表锁性能好">
            <p className="mb-2"><strong>错误认知</strong>：行锁总是优于表锁。</p>
            <p><strong>正确理解</strong>：行锁在并发读写时性能好，但如果查询未使用索引，行锁会升级为表锁。此外，当需要锁定大部分记录时（如 UPDATE users SET status=1），表锁反而更高效，因为减少了锁管理的开销。MyISAM 只支持表锁，在某些批量操作场景下性能可能更好。</p>
          </Callout>

          <Callout type="danger" title="误区 3：死锁是可以完全避免的">
            <p className="mb-2"><strong>错误认知</strong>：通过良好的设计可以完全避免死锁。</p>
            <p><strong>正确理解</strong>：在复杂的高并发系统中，死锁难以完全避免。正确的做法是：① 通过固定访问顺序、缩短事务时长等措施降低死锁概率；② 在应用层实现死锁重试机制；③ 监控死锁频率，异常时告警。InnoDB 的死锁检测机制能自动解决死锁，但会带来性能开销。</p>
          </Callout>

          <Callout type="warning" title="误区 4：MVCC 不需要锁">
            <p className="mb-2"><strong>错误认知</strong>：MVCC 实现了无锁并发，完全不需要锁机制。</p>
            <p><strong>正确理解</strong>：MVCC 仅对<strong>快照读</strong>（普通 SELECT）不加锁。<strong>当前读</strong>（SELECT ... FOR UPDATE、UPDATE、DELETE、INSERT）仍需加锁。MVCC + 锁机制共同保证了事务隔离性。混淆两者会导致对并发行为的错误预期。</p>
          </Callout>

          <Callout type="warning" title="误区 5：间隙锁只在范围查询中出现">
            <p className="mb-2"><strong>错误认知</strong>：只有 WHERE age &gt; 10 AND age &lt; 20 这样的范围查询才会加间隙锁。</p>
            <p><strong>正确理解</strong>：以下情况也会加间隙锁：① 等值查询但记录不存在（WHERE id=100，但 id=100 不存在）；② 唯一索引的范围查询；③ INSERT 时的唯一性检查。理解这些隐性场景有助于避免意外的锁等待。</p>
          </Callout>

          <h2 id="interview" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十二、面试真题
          </h2>

          <InterviewSection questions={[
            {
              question: "InnoDB 的四种隔离级别分别解决了哪些并发问题？",
              answer: "① READ UNCOMMITTED：未解决任何问题，可能脏读、不可重复读、幻读；② READ COMMITTED：解决脏读，通过 MVCC 每次 SELECT 创建新 ReadView，但仍可能不可重复读和幻读；③ REPEATABLE READ（MySQL 默认）：解决脏读和不可重复读，通过 MVCC 复用首次创建的 ReadView，并通过 Next-Key Lock 避免大部分幻读场景；④ SERIALIZABLE：解决所有问题，通过强制串行执行（所有读都加锁），但并发性能极差。"
            },
            {
              question: "什么是间隙锁？它的作用是什么？",
              answer: "间隙锁（Gap Lock）锁定索引记录之间的空隙，防止其他事务在间隙中插入新记录，从而避免幻读。例如索引值 5, 10, 15，间隙锁可以锁定 (5, 10) 这个区间，阻止插入 age=7、8、9 等记录。间隙锁仅在 RR 级别的范围查询中生效，RC 级别不使用。缺点是会降低并发插入性能，优化方法是尽量使用等值查询或降低隔离级别。"
            },
            {
              question: "Next-Key Lock 是什么？它在什么情况下会退化？",
              answer: "Next-Key Lock 是行锁 + 间隙锁的组合，锁定左开右闭区间 (prev, current]。退化规则：① 唯一索引等值查询 → 退化为 Record Lock（只锁记录，不加间隙）；② 等值查询但记录不存在 → 退化为 Gap Lock（只锁间隙）；③ 非唯一索引等值查询或范围查询 → 保持 Next-Key Lock。退化目的是在保证一致性的前提下提高并发性能。"
            },
            {
              question: "InnoDB 如何检测和解决死锁？",
              answer: "InnoDB 使用等待图（Wait-For Graph）检测死锁：每个事务是节点，等待关系是有向边。当图中出现环时，判定为死锁。解决方法：选择一个事务作为牺牲品回滚，通常选择 undo log 较少（回滚成本低）的事务。配置参数：innodb_deadlock_detect=ON（默认开启），innodb_lock_wait_timeout=50秒（锁等待超时）。应用层应实现死锁重试机制。"
            },
            {
              question: "MVCC 是如何实现的？ReadView 的作用是什么？",
              answer: "MVCC 通过 Undo Log 维护数据版本链，每行记录包含 DB_TRX_ID（事务 ID）和 DB_ROLL_PTR（回滚指针）。ReadView 是事务启动时创建的快照，包含四个关键属性：m_ids（活跃事务列表）、min_trx_id（最小活跃事务 ID）、max_trx_id（下一个要分配的 ID）、creator_trx_id（创建者 ID）。可见性判断：比较记录的 DB_TRX_ID 与 ReadView，如果事务已提交且早于当前事务，则可见；否则沿着版本链向上查找。RC 级别每次 SELECT 创建新 ReadView，RR 级别复用首次创建的 ReadView。"
            },
            {
              question: "为什么行锁依赖索引？没有索引会怎样？",
              answer: "InnoDB 的行锁是通过索引项实现的。如果查询条件使用了索引，可以精确定位到具体记录并加锁；如果没有索引，只能全表扫描，为避免漏掉任何可能被其他事务修改的记录，InnoDB 会将行锁升级为表锁，导致所有并发操作都被阻塞。这就是为什么为高频更新字段创建索引如此重要——不仅加速查询，还能提高并发性能。可以通过 EXPLAIN 检查是否使用了索引。"
            },
            {
              question: "如何排查和优化锁等待问题？",
              answer: "排查步骤：① 使用 information_schema.INNODB_TRX 查看长时间运行的事务；② 使用 INNODB_LOCK_WAITS 找出锁等待关系；③ 使用 SHOW ENGINE INNODB STATUS 查看死锁信息；④ 分析阻塞源头的 SQL 和执行计划。优化方法：① 为查询条件添加索引，减少锁范围；② 缩短事务时长，尽快提交；③ 调整事务访问顺序，避免循环等待；④ 降低隔离级别（如改用 RC）；⑤ 拆分大事务为小事务；⑥ 应用层实现超时重试机制。"
            }
          ]} />

          <h2 id="related" className="font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink">
            十三、知识关联
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <a href="/docs/mysql/mysql-architecture" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-teal mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-teal">MySQL 架构与存储引擎</div>
              <div className="text-[12px] text-ink-muted mt-1">InnoDB 架构、Redo Log、Undo Log</div>
            </a>
            <a href="/docs/mysql/mysql-index-optimization" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-accent mb-1">前置知识 ←</div>
              <div className="font-semibold text-ink group-hover:text-accent">MySQL 索引优化实战</div>
              <div className="text-[12px] text-ink-muted mt-1">索引结构、执行计划分析</div>
            </a>
            <a href="/docs/mysql/mysql-replication-ha" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-indigo mb-1">深入学习 →</div>
              <div className="font-semibold text-ink group-hover:text-indigo">MySQL 主从复制与高可用</div>
              <div className="text-[12px] text-ink-muted mt-1">Binlog、GTID、读写分离</div>
            </a>
            <a href="/docs/backend/java/spring-transaction" className="block p-4 bg-parchment-light border border-border rounded-paper-md hover:border-accent hover:shadow-paper transition-all group">
              <div className="text-[11px] font-mono text-rose mb-1">应用实践 →</div>
              <div className="font-semibold text-ink group-hover:text-rose">Spring 声明式事务</div>
              <div className="text-[12px] text-ink-muted mt-1">@Transactional、传播机制、隔离级别</div>
            </a>
          </div>

          <Callout type="info" title="学习建议">
            事务和锁是 MySQL 最复杂的主题之一。建议按以下步骤掌握：① 理解 ACID 特性和四种隔离级别；② 通过实验验证不同隔离级别下的并发行为；③ 深入理解 MVCC 实现原理和 ReadView 机制；④ 掌握各种锁类型（行锁、间隙锁、Next-Key Lock）的使用场景；⑤ 学会使用监控工具排查锁问题；⑥ 在实际项目中应用锁优化技巧。理论与实践结合才能真正驾驭高并发场景。
          </Callout>

          <ArticleNav {...getArticleNav(meta.category, meta.id)} />
        </KnowledgeLayout>
      </div>

      {/* TOC — rendered by SmartTOC itself (desktop right sidebar + mobile floating button) */}
        <SmartTOC items={tocItems} />

    </div>
  )
}
